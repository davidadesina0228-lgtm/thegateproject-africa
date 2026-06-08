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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userId, approved, notes } = await req.json()

    // Verify admin
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    const { data: { user: adminUser } } = await supabaseClient.auth.getUser(token)

    const { data: adminData } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', adminUser?.id)
      .single()

    if (!adminData || !['admin', 'reviewer'].includes(adminData.role)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      )
    }

    // Get user
    const { data: userData } = await supabaseClient
      .from('users')
      .select('status, role')
      .eq('id', userId)
      .single()

    const oldStatus = userData?.status
    const newStatus = approved ? (userData?.role === 'learner' ? 'learner' : 'intern_pool') : 'rejected'

    // Update user
    await supabaseClient
      .from('users')
      .update({ status: newStatus, onboarding_completed: approved })
      .eq('id', userId)

    // Update onboarding
    await supabaseClient
      .from('onboarding_responses')
      .update({ reviewed_by: adminUser?.id, review_notes: notes })
      .eq('user_id', userId)

    // Log change
    await supabaseClient
      .from('user_status_changes')
      .insert({
        user_id: userId,
        old_status: oldStatus,
        new_status: newStatus,
        changed_by: adminUser?.id,
        reason: notes || `Onboarding ${approved ? 'approved' : 'rejected'}`
      })

    // Add note
    if (notes) {
      await supabaseClient
        .from('admin_notes')
        .insert({
          user_id: userId,
          admin_id: adminUser?.id,
          note: `Onboarding ${approved ? 'approved' : 'rejected'}: ${notes}`,
          is_private: true
        })
    }

    // Initialize scores if approved
    if (approved) {
      await supabaseClient
        .from('readiness_scores')
        .upsert({ user_id: userId, total_score: 0 })
    }

    return new Response(
      JSON.stringify({ success: true, message: `User ${approved ? 'approved' : 'rejected'}`, newStatus }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
