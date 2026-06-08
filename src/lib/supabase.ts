import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const isConfigured = supabaseUrl.startsWith('https://') && supabaseKey.length > 20

// Client-side Supabase client
export const supabase = isConfigured
  ? createBrowserClient(supabaseUrl, supabaseKey)
  : (null as any)

// Server-side Supabase client (for API routes)
export const supabaseServer = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : (null as any)

// Admin client with service role (server-side only, for admin operations)
export const supabaseAdmin = isConfigured && serviceRoleKey.length > 20
  ? createClient(supabaseUrl, serviceRoleKey)
  : (null as any)

// Types for database tables
export type User = {
  id: string
  email: string
  role: 'learner' | 'intern' | 'admin' | 'reviewer'
  onboarding_completed: boolean
  status: 'applicant' | 'learner' | 'intern_pool' | 'certified' | 'internship_ready' | 'rejected'
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  user_id: string
  full_name: string | null
  country: string | null
  timezone: string | null
  whatsapp_number: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export type OnboardingResponse = {
  id: string
  user_id: string
  path_type: 'learner' | 'intern'
  motivation_text: string | null
  career_goals: string | null
  weekly_hours: string | null
  skill_level: 'none' | 'beginner' | 'intermediate' | 'advanced' | null
  interests: string[] | null
  laptop_access: boolean | null
  internet_quality: 'excellent' | 'good' | 'fair' | 'poor' | null
  power_reliability: 'excellent' | 'good' | 'fair' | 'poor' | null
  quiet_workspace: boolean | null
  years_experience: string | null
  linkedin_url: string | null
  portfolio_url: string | null
  github_url: string | null
  can_work_uk_hours: boolean | null
  interview_ready: string | null
  preferred_start_date: string | null
  completed_at: string | null
  reviewed_by: string | null
  review_notes: string | null
  created_at: string
  updated_at: string
}

export type ReadinessScore = {
  id: string
  user_id: string
  engagement_score: number
  completion_score: number
  reliability_score: number
  mentor_feedback_score: number
  total_score: number
  last_updated: string
  updated_by: string | null
}

export type Cohort = {
  id: string
  name: string
  description: string | null
  path_type: 'learner' | 'intern'
  start_date: string | null
  end_date: string | null
  max_capacity: number | null
  is_active: boolean
  created_at: string
  created_by: string | null
}

export type FileRecord = {
  id: string
  user_id: string
  file_type: 'cv' | 'portfolio' | 'assignment' | 'certification' | 'other'
  file_name: string
  file_url: string
  file_size: number | null
  mime_type: string | null
  description: string | null
  is_verified: boolean
  uploaded_at: string
}

export type AdminNote = {
  id: string
  user_id: string
  admin_id: string
  note: string
  is_private: boolean
  created_at: string
}
