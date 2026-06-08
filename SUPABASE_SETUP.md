# Quick Start Guide - Supabase Backend

## 1. Setup Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your Project URL and Anon Key
3. Save the Service Role Key (for Edge Functions)

## 2. Run Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/schema.sql` from this project
3. Copy the entire SQL content
4. Run it in the SQL Editor

This will create:
- All tables (users, profiles, onboarding, scores, cohorts, files, admin notes)
- Row Level Security policies
- Indexes for performance
- Triggers for updated_at

## 3. Create Storage Buckets

In Supabase Dashboard → Storage:

Create these buckets:
- `cvs` - For CV uploads
- `portfolios` - For portfolio documents
- `assignments` - For assignment submissions
- `certifications` - For certificates
- `avatars` - For profile pictures

Set RLS policies (in Storage → Policies):
- Users can only access their own folder (user_id as folder name)
- Admins can read all files

## 4. Deploy Edge Functions

Install Supabase CLI:
```bash
npm install -g supabase
```

Login and link project:
```bash
supabase login
supabase link --project-ref your-project-ref
```

Deploy functions:
```bash
supabase functions deploy calculate-readiness
supabase functions deploy approve-user
supabase functions deploy check-onboarding
```

## 5. Environment Variables

Create `.env.local` in your Next.js project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: n8n webhooks
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/...
```

## 6. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## 7. Create Supabase Client

**lib/supabase.ts:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Admin client (server-side only)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

## 8. Auth Flow Example

**Signup:**
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
})

// Create user record in users table
await supabase.from('users').insert({
  id: data.user?.id,
  email: data.user?.email,
  role: 'learner', // or 'intern'
})
```

**Check Onboarding Status:**
```typescript
const { data } = await supabase.functions.invoke('check-onboarding')
if (data.onboardingRequired) {
  router.push('/onboarding')
}
```

## 9. Onboarding Flow

Save each step:
```typescript
await supabase.from('onboarding_responses').upsert({
  user_id: user.id,
  path_type: 'learner',
  motivation_text: '...',
  // ... other fields
})
```

Complete onboarding:
```typescript
await supabase.from('onboarding_responses').update({
  completed_at: new Date().toISOString()
}).eq('user_id', user.id)
```

## 10. Admin Approval

Call Edge Function:
```typescript
await supabase.functions.invoke('approve-user', {
  body: {
    userId: 'user-uuid',
    approved: true,
    notes: 'Great motivation and skills'
  }
})
```

## 11. Readiness Scoring

Calculate scores:
```typescript
await supabase.functions.invoke('calculate-readiness', {
  body: { userId: 'user-uuid' }
})
```

Get scores:
```typescript
const { data } = await supabase
  .from('readiness_scores')
  .select('*')
  .eq('user_id', user.id)
  .single()
```

## 12. File Upload

Upload CV:
```typescript
const { data, error } = await supabase.storage
  .from('cvs')
  .upload(`${user.id}/cv_${Date.now()}.pdf`, file)

// Save metadata
await supabase.from('files').insert({
  user_id: user.id,
  file_type: 'cv',
  file_name: file.name,
  file_url: data.path,
})
```

## Data Flow Summary

```
1. User signs up → Creates auth.users + users record
2. User completes onboarding → Creates onboarding_responses
3. Admin reviews → Calls approve-user Edge Function
4. User status updated → Can access dashboard
5. Readiness scores calculated → Updates automatically
6. Score >= 80 → Status changes to internship_ready
```

## Security Summary

✅ Row Level Security on all tables
✅ Users can only see/edit their own data
✅ Admins can see all data
✅ Edge Functions verify admin permissions
✅ File access restricted by user_id
✅ All status changes logged for audit

## Free Tier Limits

- Database: 500MB
- Storage: 1GB
- Edge Functions: 500K requests/month
- Auth: Unlimited users

You're ready to go! 🚀
