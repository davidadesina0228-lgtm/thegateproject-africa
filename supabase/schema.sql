-- The Gate Project - Supabase Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('learner', 'intern', 'admin', 'reviewer')),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'applicant' CHECK (status IN ('applicant', 'learner', 'intern_pool', 'certified', 'internship_ready', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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
-- ONBOARDING TABLE
-- ============================================

CREATE TABLE onboarding_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path_type TEXT NOT NULL CHECK (path_type IN ('learner', 'intern')),
    motivation_text TEXT,
    career_goals TEXT,
    weekly_hours TEXT CHECK (weekly_hours IN ('10-15 hours', '15-20 hours', '20-30 hours', '30+ hours')),
    skill_level TEXT CHECK (skill_level IN ('none', 'beginner', 'intermediate', 'advanced')),
    interests TEXT[],
    laptop_access BOOLEAN,
    internet_quality TEXT CHECK (internet_quality IN ('excellent', 'good', 'fair', 'poor')),
    power_reliability TEXT CHECK (power_reliability IN ('excellent', 'good', 'fair', 'poor')),
    quiet_workspace BOOLEAN,
    years_experience TEXT CHECK (years_experience IN ('0-2 years', '3-5 years', '5+ years')),
    linkedin_url TEXT,
    portfolio_url TEXT,
    github_url TEXT,
    can_work_uk_hours BOOLEAN,
    interview_ready TEXT CHECK (interview_ready IN ('Immediately', 'Within 1 week', 'Within 2 weeks')),
    preferred_start_date DATE,
    completed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SCORING TABLES
-- ============================================

CREATE TABLE readiness_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    engagement_score INTEGER DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
    completion_score INTEGER DEFAULT 0 CHECK (completion_score >= 0 AND completion_score <= 100),
    reliability_score INTEGER DEFAULT 0 CHECK (reliability_score >= 0 AND reliability_score <= 100),
    mentor_feedback_score INTEGER DEFAULT 0 CHECK (mentor_feedback_score >= 0 AND mentor_feedback_score <= 100),
    total_score INTEGER DEFAULT 0 CHECK (total_score >= 0 AND total_score <= 100),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

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
-- COHORT TABLES
-- ============================================

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
-- ADMIN TABLES
-- ============================================

CREATE TABLE admin_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES users(id),
    note TEXT NOT NULL,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
-- ENABLE RLS
-- ============================================

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

-- ============================================
-- RLS POLICIES
-- ============================================

-- Users: Own data only
CREATE POLICY "Users read own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own" ON users FOR UPDATE USING (auth.uid() = id);

-- Admins: All access
CREATE POLICY "Admins read all users" ON users FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));
CREATE POLICY "Admins update all users" ON users FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- Profiles
CREATE POLICY "Own profile" ON profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin read profiles" ON profiles FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- Onboarding
CREATE POLICY "Own onboarding" ON onboarding_responses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin read onboarding" ON onboarding_responses FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));
CREATE POLICY "Admin update onboarding" ON onboarding_responses FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- Readiness scores
CREATE POLICY "Own scores" ON readiness_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin manage scores" ON readiness_scores FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));
CREATE POLICY "Own score history" ON readiness_score_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin read score history" ON readiness_score_history FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- Cohorts
CREATE POLICY "Read active cohorts" ON cohorts FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin manage cohorts" ON cohorts FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Own cohort membership" ON cohort_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin manage cohort members" ON cohort_members FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Files
CREATE POLICY "Own files" ON files FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin read files" ON files FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- Admin notes
CREATE POLICY "Admin notes" ON admin_notes FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- Status changes
CREATE POLICY "Own status changes" ON user_status_changes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin read status changes" ON user_status_changes FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));
CREATE POLICY "Admin insert status changes" ON user_status_changes FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'reviewer')));

-- ============================================
-- INDICES
-- ============================================

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_onboarding_user_id ON onboarding_responses(user_id);
CREATE INDEX idx_readiness_user_id ON readiness_scores(user_id);
CREATE INDEX idx_cohort_members_user_id ON cohort_members(user_id);
CREATE INDEX idx_files_user_id ON files(user_id);

-- ============================================
-- TRIGGERS
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
