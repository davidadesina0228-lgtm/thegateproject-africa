import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { userId } = await req.json()

    // Verify admin permissions
    const { data: { user } } = await supabaseClient.auth.getUser()
    const { data: adminCheck } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', user?.id)
      .single()

    if (!adminCheck || !['admin', 'reviewer'].includes(adminCheck.role)) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      )
    }

    // Get onboarding data
    const { data: onboarding } = await supabaseClient
      .from('onboarding_responses')
      .select('*')
      .eq('user_id', userId)
      .single()

    const { data: userData } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    // Calculate scores
    let engagementScore = 0
    let completionScore = 0
    let reliabilityScore = 0
    let mentorFeedbackScore = 0

    // Completion score
    if (onboarding) {
      const fields = [
        onboarding.motivation_text,
        onboarding.weekly_hours,
        onboarding.skill_level,
        onboarding.interests?.length > 0,
        onboarding.laptop_access !== null,
        onboarding.internet_quality,
        onboarding.power_reliability
      ]
      const completedFields = fields.filter(f => f !== null && f !== undefined && f !== '').length
      completionScore = Math.round((completedFields / fields.length) * 100)
    }

    // Reliability score
    if (onboarding) {
      const infraPoints = [
        onboarding.laptop_access ? 25 : 0,
        onboarding.internet_quality === 'excellent' ? 25 : onboarding.internet_quality === 'good' ? 20 : 10,
        onboarding.power_reliability === 'excellent' ? 25 : onboarding.power_reliability === 'good' ? 20 : 10,
        onboarding.quiet_workspace ? 25 : 15
      ]
      reliabilityScore = Math.min(100, infraPoints.reduce((a, b) => a + b, 0))
    }

    // Calculate weighted total
    const weights = { engagement: 0.25, completion: 0.30, reliability: 0.25, mentor: 0.20 }
    const totalScore = Math.round(
      (engagementScore * weights.engagement) +
      (completionScore * weights.completion) +
      (reliabilityScore * weights.reliability) +
      (mentorFeedbackScore * weights.mentor)
    )

    // Update scores
    await supabaseClient
      .from('readiness_scores')
      .upsert({
        user_id: userId,
        engagement_score: engagementScore,
        completion_score: completionScore,
        reliability_score: reliabilityScore,
        mentor_feedback_score: mentorFeedbackScore,
        total_score: totalScore,
        last_updated: new Date().toISOString(),
        updated_by: user?.id
      })

    // Log history
    await supabaseClient
      .from('readiness_score_history')
      .insert({
        user_id: userId,
        engagement_score: engagementScore,
        completion_score: completionScore,
        reliability_score: reliabilityScore,
        mentor_feedback_score: mentorFeedbackScore,
        total_score: totalScore,
        reason: 'Automated calculation',
        created_by: user?.id
      })

    // Update status if threshold met
    if (totalScore >= 80 && userData?.status === 'learner') {
      await supabaseClient
        .from('users')
        .update({ status: 'internship_ready' })
        .eq('id', userId)

      await supabaseClient
        .from('user_status_changes')
        .insert({
          user_id: userId,
          old_status: userData.status,
          new_status: 'internship_ready',
          changed_by: user?.id,
          reason: `Readiness score reached ${totalScore}`
        })
    }

    return new Response(
      JSON.stringify({ success: true, scores: { engagement: engagementScore, completion: completionScore, reliability: reliabilityScore, mentor: mentorFeedbackScore, total: totalScore } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
