# The Gate Project - Backend Architecture
## Supabase Implementation Guide

---

## 1. CORE TECH STACK

| Component | Technology | Purpose |
|-----------|------------|---------|
| Backend Platform | Supabase | All-in-one backend (DB, Auth, Storage, Edge Functions) |
| Database | PostgreSQL | Primary data storage with RLS |
| Authentication | Supabase Auth | Email/password + OAuth providers |
| File Storage | Supabase Storage | CVs, portfolios, assignments |
| Server Logic | Supabase Edge Functions | Business logic, scoring, webhooks |
| Workflow Automation | n8n (optional) | Email notifications, reminders |

---

## 2. DATABASE SCHEMA

### Complete PostgreSQL Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- Users table (extends Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('learner', 'intern', 'admin', 'reviewer')),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'applicant' CHECK (status IN ('applicant', 'learner', 'intern_pool', 'certified', 'internship_ready', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT,
    country TEXT,
    timezone TEXT,
    whatsapp_number TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ONBOARDING TABLES
-- ============================================

-- Onboarding responses
CREATE TABLE onboarding_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path_type TEXT NOT NULL CHECK (path_type IN ('learner', 'intern')),
    
    -- Step 1: Motivation
    motivation_text TEXT,
    career_goals TEXT,
    
    -- Step 2: Commitment
    weekly_hours TEXT CHECK (weekly_hours IN ('10-15 hours', '15-20 hours', '20-30 hours', '30+ hours')),
    
    -- Step 3: Skills
    skill_level TEXT CHECK (skill_level IN ('none', 'beginner', 'intermediate', 'advanced')),
    
    -- Step 4: Interests (Learners) / Skill Areas (Interns)
    interests TEXT[], -- Array of selected interests
    
    -- Step 5: Infrastructure
    laptop_access BOOLEAN,
    internet_quality TEXT CHECK (internet_quality IN ('excellent', 'good', 'fair', 'poor')),
    power_reliability TEXT CHECK (power_reliability IN ('excellent', 'good', 'fair', 'poor')),
    quiet_workspace BOOLEAN,
    
    -- Intern-specific fields
    years_experience TEXT CHECK (years_experience IN ('0-2 years', '3-5 years', '5+ years')),
    linkedin_url TEXT,
    portfolio_url TEXT,
    github_url TEXT,
    can_work_uk_hours BOOLEAN,
    interview_ready TEXT CHECK (interview_ready IN ('Immediately', 'Within 1 week', 'Within 2 weeks')),
    preferred_start_date DATE,
    
    -- Status
    completed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SCORING & PROGRESS TABLES
-- ============================================

-- Readiness scores
CREATE TABLE readiness_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Component scores (0-100)
    engagement_score INTEGER DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
    completion_score INTEGER DEFAULT 0 CHECK (completion_score >= 0 AND completion_score <= 100),
    reliability_score INTEGER DEFAULT 0 CHECK (reliability_score >= 0 AND reliability_score <= 100),
    mentor_feedback_score INTEGER DEFAULT 0 CHECK (mentor_feedback_score >= 0 AND mentor_feedback_score <= 100),
    
    -- Weighted total (calculated)
    total_score INTEGER DEFAULT 0 CHECK (total_score >= 0 AND total_score <= 100),
    
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- Readiness score history
CREATE TABLE readiness_score_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    engagement_score INTEGER,
    completion_score INTEGER,
    reliability_score INTEGER,
    mentor_feedback_score INTEGER,
    total_score INTEGER,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- ============================================
-- COHORT MANAGEMENT
-- ============================================

-- Cohorts
CREATE TABLE cohorts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    path_type TEXT NOT NULL CHECK (path_type IN ('learner', 'intern')),
    start_date DATE,
    end_date DATE,
    max_capacity INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Cohort members
CREATE TABLE cohort_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    UNIQUE(cohort_id, user_id)
);

-- ============================================
-- FILE MANAGEMENT
-- ============================================

-- Files metadata
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_type TEXT NOT NULL CHECK (file_type IN ('cv', 'portfolio', 'assignment', 'certification', 'other')),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    description TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ADMIN & REVIEW TABLES
-- ============================================

-- Admin notes
CREATE TABLE admin_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES users(id),
    note TEXT NOT NULL,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User status changes (audit trail)
CREATE TABLE user_status_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    old_status TEXT,
    new_status TEXT NOT NULL,
    changed_by UUID NOT NULL REFERENCES users(id),
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDICES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_onboarding ON users(onboarding_completed);
CREATE INDEX idx_onboarding_user_id ON onboarding_responses(user_id);
CREATE INDEX idx_onboarding_path_type ON onboarding_responses(path_type);
CREATE INDEX idx_readiness_user_id ON readiness_scores(user_id);
CREATE INDEX idx_cohort_members_user_id ON cohort_members(user_id);
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_type ON files(file_type);
CREATE INDEX idx_admin_notes_user_id ON admin_notes(user_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_updated_at BEFORE UPDATE ON onboarding_responses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 3. ROW LEVEL SECURITY (RLS) POLICIES

### Enable RLS on All Tables

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE readiness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE readiness_score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_status_changes ENABLE ROW LEVEL SECURITY;
```

### Core RLS Policies

```sql
-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data (limited fields)
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = (SELECT role FROM users WHERE id = auth.uid()));

-- Admins can read all users
CREATE POLICY "Admins can read all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- Admins can update all users
CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- ============================================
-- PROFILES TABLE POLICIES
-- ============================================

-- Users can CRUD their own profile
CREATE POLICY "Users can manage own profile" ON profiles
    FOR ALL USING (auth.uid() = user_id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- ============================================
-- ONBOARDING RESPONSES POLICIES
-- ============================================

-- Users can read own onboarding
CREATE POLICY "Users can read own onboarding" ON onboarding_responses
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert/update their own onboarding
CREATE POLICY "Users can manage own onboarding" ON onboarding_responses
    FOR ALL USING (auth.uid() = user_id);

-- Admins can read all onboarding
CREATE POLICY "Admins can read all onboarding" ON onboarding_responses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- Admins can update onboarding (for approvals)
CREATE POLICY "Admins can update onboarding" ON onboarding_responses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- ============================================
-- READINESS SCORES POLICIES
-- ============================================

-- Users can read own scores
CREATE POLICY "Users can read own scores" ON readiness_scores
    FOR SELECT USING (auth.uid() = user_id);

-- Only admins can update scores
CREATE POLICY "Only admins can update scores" ON readiness_scores
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- Users can read own score history
CREATE POLICY "Users can read own score history" ON readiness_score_history
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can read all score history
CREATE POLICY "Admins can read all score history" ON readiness_score_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- ============================================
-- COHORTS TABLE POLICIES
-- ============================================

-- All authenticated users can read active cohorts
CREATE POLICY "Users can read active cohorts" ON cohorts
    FOR SELECT USING (is_active = TRUE);

-- Only admins can manage cohorts
CREATE POLICY "Only admins can manage cohorts" ON cohorts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Users can see their cohort memberships
CREATE POLICY "Users can see own cohort memberships" ON cohort_members
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can manage all cohort memberships
CREATE POLICY "Admins can manage cohort memberships" ON cohort_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- FILES TABLE POLICIES
-- ============================================

-- Users can CRUD their own files
CREATE POLICY "Users can manage own files" ON files
    FOR ALL USING (auth.uid() = user_id);

-- Admins can read all files
CREATE POLICY "Admins can read all files" ON files
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- ============================================
-- ADMIN NOTES POLICIES
-- ============================================

-- Only admins can read/write admin notes
CREATE POLICY "Only admins can manage notes" ON admin_notes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- ============================================
-- USER STATUS CHANGES POLICIES
-- ============================================

-- Users can read their own status changes
CREATE POLICY "Users can read own status changes" ON user_status_changes
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can read all status changes
CREATE POLICY "Admins can read all status changes" ON user_status_changes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );

-- Only admins can insert status changes
CREATE POLICY "Only admins can insert status changes" ON user_status_changes
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );
```

---

## 4. SUPABASE EDGE FUNCTIONS

### Function 1: Calculate Readiness Score

**File:** `supabase/functions/calculate-readiness/index.ts`

```typescript
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

    // Calculate scores based on various factors
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

    // Calculate component scores (0-100)
    let engagementScore = 0
    let completionScore = 0
    let reliabilityScore = 0
    let mentorFeedbackScore = 0

    // Completion score based on onboarding completeness
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

    // Reliability score based on infrastructure
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
    const weights = {
      engagement: 0.25,
      completion: 0.30,
      reliability: 0.25,
      mentor: 0.20
    }

    const totalScore = Math.round(
      (engagementScore * weights.engagement) +
      (completionScore * weights.completion) +
      (reliabilityScore * weights.reliability) +
      (mentorFeedbackScore * weights.mentor)
    )

    // Update readiness scores
    const { error: upsertError } = await supabaseClient
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

    if (upsertError) throw upsertError

    // Log score history
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

    // Update user status if threshold met
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
      JSON.stringify({
        success: true,
        scores: {
          engagement: engagementScore,
          completion: completionScore,
          reliability: reliabilityScore,
          mentor: mentorFeedbackScore,
          total: totalScore
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
```

### Function 2: Approve User Onboarding

**File:** `supabase/functions/approve-user/index.ts`

```typescript
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

    // Get admin from JWT
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    const { data: { user: adminUser }, error: authError } = await supabaseClient.auth.getUser(token)

    if (authError || !adminUser) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Verify admin role
    const { data: adminData } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', adminUser.id)
      .single()

    if (!adminData || !['admin', 'reviewer'].includes(adminData.role)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      )
    }

    // Get user data
    const { data: userData } = await supabaseClient
      .from('users')
      .select('status, role')
      .eq('id', userId)
      .single()

    if (!userData) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    const oldStatus = userData.status
    const newStatus = approved ? 
      (userData.role === 'learner' ? 'learner' : 'intern_pool') : 
      'rejected'

    // Update user status
    const { error: updateError } = await supabaseClient
      .from('users')
      .update({ 
        status: newStatus,
        onboarding_completed: approved
      })
      .eq('id', userId)

    if (updateError) throw updateError

    // Update onboarding record
    await supabaseClient
      .from('onboarding_responses')
      .update({
        reviewed_by: adminUser.id,
        review_notes: notes
      })
      .eq('user_id', userId)

    // Log status change
    await supabaseClient
      .from('user_status_changes')
      .insert({
        user_id: userId,
        old_status: oldStatus,
        new_status: newStatus,
        changed_by: adminUser.id,
        reason: notes || (approved ? 'Onboarding approved' : 'Onboarding rejected')
      })

    // Add admin note
    if (notes) {
      await supabaseClient
        .from('admin_notes')
        .insert({
          user_id: userId,
          admin_id: adminUser.id,
          note: `Onboarding ${approved ? 'approved' : 'rejected'}: ${notes}`,
          is_private: true
        })
    }

    // Initialize readiness score for approved users
    if (approved) {
      await supabaseClient
        .from('readiness_scores')
        .upsert({
          user_id: userId,
          engagement_score: 0,
          completion_score: 0,
          reliability_score: 0,
          mentor_feedback_score: 0,
          total_score: 0
        })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `User ${approved ? 'approved' : 'rejected'} successfully`,
        newStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
```

### Function 3: Check Onboarding Status (Middleware)

**File:** `supabase/functions/check-onboarding/index.ts`

```typescript
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

    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', onboardingRequired: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Check user status
    const { data: userData } = await supabaseClient
      .from('users')
      .select('onboarding_completed, status, role')
      .eq('id', user.id)
      .single()

    if (!userData) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Admins bypass onboarding check
    if (userData.role === 'admin') {
      return new Response(
        JSON.stringify({ 
          onboardingRequired: false, 
          onboardingCompleted: true,
          role: userData.role 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        onboardingRequired: !userData.onboarding_completed,
        onboardingCompleted: userData.onboarding_completed,
        status: userData.status,
        role: userData.role
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
```

---

## 5. DATA FLOW DIAGRAM

```
SIGNUP → ONBOARDING → APPROVAL → READINESS SCORING → PLACEMENT

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   SIGNUP    │    │  ONBOARDING │    │   APPROVAL  │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────────────────────────────────────────┐
│  1. User signs up via Supabase Auth              │
│     → Creates users record (role: learner/intern)│
│     → Status: applicant                          │
│                                                  │
│  2. User completes 5-step onboarding             │
│     → Stores in onboarding_responses             │
│     → Validates required fields                  │
│     → Cannot access dashboard until complete     │
│                                                  │
│  3. Admin reviews onboarding                     │
│     → Call approve-user Edge Function            │
│     → Updates user.status                        │
│     → onboarding_completed = true                │
│     → Creates initial readiness_scores record    │
└──────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────┐
│           READINESS SCORING & GROWTH             │
└──────────────────────────────────────────────────┘
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Engagement │   │  Completion │   │  Reliability│
│  Score      │   │  Score      │   │  Score      │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          ▼
                   ┌─────────────┐
                   │ TOTAL SCORE │
                   │   (0-100)   │
                   └──────┬──────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
        Score < 50   Score 50-79   Score >= 80
              │           │           │
              ▼           ▼           ▼
         Continue    Continue    STATUS CHANGE
         Learning    Learning    → internship_ready
```

---

## 6. STORAGE BUCKET STRUCTURE

```
supabase/storage/buckets/
├── cvs/
│   └── {user_id}/
│       └── cv_{timestamp}.pdf
├── portfolios/
│   └── {user_id}/
│       └── portfolio_{timestamp}.pdf
├── assignments/
│   └── {user_id}/
│       └── assignment_{timestamp}.pdf
├── certifications/
│   └── {user_id}/
│       └── cert_{timestamp}.pdf
└── avatars/
    └── {user_id}/
        └── avatar_{timestamp}.jpg
```

### Storage RLS Policies

```sql
-- Allow users to upload to their own folder
CREATE POLICY "Users can upload own files" ON storage.objects
    FOR INSERT WITH CHECK (
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow users to read their own files
CREATE POLICY "Users can read own files" ON storage.objects
    FOR SELECT USING (
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow users to delete their own files
CREATE POLICY "Users can delete own files" ON storage.objects
    FOR DELETE USING (
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Admins can read all files
CREATE POLICY "Admins can read all files" ON storage.objects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
        )
    );
```

---

## 7. IMPLEMENTATION CHECKLIST

### Phase 1: Setup (Week 1)
- [ ] Create Supabase project
- [ ] Run database schema SQL
- [ ] Enable RLS policies
- [ ] Create storage buckets
- [ ] Deploy Edge Functions

### Phase 2: Auth & Onboarding (Week 2)
- [ ] Implement signup/login with Supabase Auth
- [ ] Build 5-step onboarding forms
- [ ] Connect onboarding to database
- [ ] Implement onboarding validation

### Phase 3: Dashboard & Admin (Week 3)
- [ ] Build user dashboard with role-based access
- [ ] Build admin panel
- [ ] Implement approval workflow
- [ ] Add admin notes functionality

### Phase 4: Scoring & Cohorts (Week 4)
- [ ] Implement readiness scoring
- [ ] Create cohort management
- [ ] Add file upload functionality
- [ ] Set up n8n automation (optional)

---

## 8. ENVIRONMENT VARIABLES

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Edge Functions
SUPABASE_FUNCTIONS_URL=https://your-project.supabase.co/functions/v1

# Optional: n8n Webhook URLs
N8N_NOTIFICATION_WEBHOOK=https://n8n.your-domain.com/webhook/...
N8N_REMINDER_WEBHOOK=https://n8n.your-domain.com/webhook/...
```

---

## 9. SECURITY BEST PRACTICES

1. **Never expose Service Role Key in frontend** - Use Edge Functions for admin operations
2. **Validate all inputs** - Use Zod or similar for type validation
3. **Use parameterized queries** - Supabase client does this automatically
4. **Enable audit logging** - All status changes are logged
5. **Rate limiting** - Implement on Edge Functions for public endpoints
6. **CORS configuration** - Restrict to your domain in production
7. **File type validation** - Only allow PDFs, images for uploads
8. **File size limits** - Max 10MB per file in Supabase Storage

---

## 10. SCALING CONSIDERATIONS

**Free Tier Limits (Supabase):**
- Database: 500MB, 2M requests/month
- Storage: 1GB
- Edge Functions: 500K requests/month
- Auth: Unlimited users

**When to Upgrade:**
- Database > 400MB
- Requests > 1.5M/month
- Need for backups/point-in-time recovery
- Multiple team members need dashboard access

**Optimization Tips:**
- Use connection pooling for database
- Cache frequently accessed data
- Implement pagination for admin lists
- Use lazy loading for file previews
- Archive old score history periodically
