# The Gate Project

A modern, dynamic web platform connecting African talent with Western opportunities through structured training and internship programs.

## Features

### Public-Facing Platform
- **Hero Section**: Bold, impactful landing page with clear value proposition
- **Mission Section**: Detailed explanation of The Gate Project's purpose
- **Pathways**: Two clear tracks - Learner and Intern
- **Company Information**: How Western companies can partner and hire

### Authentication System
- Secure email/password authentication with NextAuth.js
- User registration with country and timezone selection
- Password reset functionality
- Protected routes based on authentication status

### Onboarding Flow
**Learner Path (5 Steps):**
1. Motivation & Intent
2. Commitment Confirmation (2-month program)
3. Current Skill Level Assessment
4. Areas of Interest Selection
5. Infrastructure Readiness Check

**Intern Path (5 Steps):**
1. Professional Profile
2. Skills & Experience
3. Portfolio & Work Samples
4. Work History
5. Availability & Readiness

_Note: Interns are placed on a waitlist after onboarding and undergo thorough vetting while receiving mentorship._

### User Dashboard
- Status tracking (Applicant → Learner → Certified → Internship-Ready)
- Readiness Score display (0-100)
- Progress indicators for learning tracks
- Community announcements
- Upcoming events and milestones

### Community Layer
- Cohort-based discussion areas
- Announcements board
- Mentor updates
- Structured and moderated environment

### Admin Panel
- Review and approve/reject applications
- View readiness scores and user data
- Manage user cohorts
- Export user data
- Analytics and statistics

### Readiness Scoring System
- Engagement metrics
- Completion tracking
- Reliability scoring
- Mentor feedback integration
- Visible but non-gamified presentation

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Credentials Provider
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Design System

### Colors
- **Background**: #0B0B0B (near-black/charcoal)
- **Primary Accent**: #D4AF37 (muted gold)
- **Secondary Accent**: #B8962E (darker gold)
- **Text Primary**: #FFFFFF (white)
- **Text Secondary**: #AAAAAA (light gray)
- **Text Muted**: #888888 (medium gray)
- **Surface**: #111111 (elevated dark)
- **Border**: #2A2A2A (subtle borders)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tight letter-spacing (-0.02em)
- **Body**: Regular weight, comfortable line-height (1.6)

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gate-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/gateproject"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Creating an Admin User

To create an admin user, run the following in your database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Project Structure

```
gate-project/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── admin/      # Admin API routes
│   │   │   └── user/       # User API routes
│   │   ├── auth/           # Auth pages (login, signup, reset)
│   │   ├── admin/          # Admin panel
│   │   ├── community/      # Community page
│   │   ├── dashboard/      # User dashboard
│   │   ├── onboarding/     # Onboarding flow
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   └── providers/      # Context providers
│   └── lib/
│       └── prisma.ts       # Prisma client
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## Key Features Implemented

✅ Modern, responsive landing page with smooth animations  
✅ Complete authentication system (login, signup, password reset)  
✅ Multi-step onboarding for both Learner and Intern paths  
✅ User dashboard with status tracking and readiness scoring  
✅ Admin panel for application management  
✅ Community layer structure  
✅ Database schema with Prisma  
✅ API routes for all functionality  
✅ Protected routes with role-based access  
✅ Responsive design (desktop-first, mobile-friendly)  
✅ Smooth animations and transitions throughout  

## User Flow

1. **Landing Page**: User learns about The Gate Project
2. **Sign Up**: User creates account as Learner or Intern
3. **Onboarding**: User completes multi-step profile setup
4. **Admin Review**: Application is reviewed by admin
5. **Dashboard Access**: Upon approval, user accesses their dashboard
6. **Progress Tracking**: User tracks their readiness score and milestones
7. **Community**: User engages with cohort and mentors

## Database Schema

### Core Models
- **User**: Account information, roles, status
- **Account**: NextAuth account linking
- **Session**: Active sessions
- **VerificationToken**: Password reset tokens

### Application Models
- **Post**: Community posts and discussions
- **Comment**: Post comments
- **Announcement**: Platform announcements
- **Cohort**: Learning cohorts/groups
- **ReadinessHistory**: Score tracking over time

## Security Features

- Password hashing with bcrypt (12 rounds)
- CSRF protection via NextAuth
- Protected API routes
- Role-based access control
- SQL injection prevention via Prisma
- XSS protection via React's automatic escaping

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Ensure these are set in your production environment:
- `DATABASE_URL`: Production PostgreSQL connection string
- `NEXTAUTH_URL`: Your production domain
- `NEXTAUTH_SECRET`: Strong random secret

### Recommended Hosting
- **Vercel**: For Next.js applications
- **Railway/Render**: For PostgreSQL database
- **AWS/GCP/Azure**: For enterprise deployments

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For questions or support, please contact the development team.

---

**The Gate Project** - Opening opportunities through structured talent development.