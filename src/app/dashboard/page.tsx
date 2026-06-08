"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { User, Profile, ReadinessScore } from "@/lib/supabase";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Bell,
  Settings,
  TrendingUp,
  Award,
  Calendar,
  MessageSquare,
  FileText,
  LogOut,
  Loader2,
} from "lucide-react";

interface DashboardData {
  user: User;
  profile: Profile;
  readinessScore: ReadinessScore | null;
}

export default function DashboardPage() {
  const { user: authUser, profile: authProfile, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push("/auth/login");
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!authUser) return;

      try {
        // Redirect to onboarding if not completed
        if (!authUser.onboarding_completed) {
          router.push("/onboarding");
          return;
        }

        // Fetch readiness score
        const { data: readinessData } = await supabase
          .from('readiness_scores')
          .select('*')
          .eq('user_id', authUser.id)
          .single();

        setDashboardData({
          user: authUser,
          profile: authProfile!,
          readinessScore: readinessData,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) {
      fetchDashboardData();
    }
  }, [authUser, authProfile, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { user, profile, readinessScore } = dashboardData;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border hidden lg:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold text-white">Gate Project</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem href="/dashboard" icon={LayoutDashboard} active>
            Dashboard
          </NavItem>
          <NavItem href="/learning" icon={BookOpen}>
            Learning Track
          </NavItem>
          <NavItem href="/community" icon={Users}>
            Community
          </NavItem>
          <NavItem href="/announcements" icon={Bell}>
            Announcements
          </NavItem>
          <NavItem href="/profile" icon={Settings}>
            Profile
          </NavItem>
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-surface/50 backdrop-blur-md border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name?.split(" ")[0] || 'User'}</h1>
              <p className="text-secondary text-sm">
                Here&apos;s your progress and updates for today
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-secondary hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
              </button>
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                <span className="text-gold font-bold">
                  {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatusCard
              title="Current Status"
              value={user.status.replace('_', ' ')}
              subtitle={user.role}
              icon={Award}
              color="gold"
            />
            <StatusCard
              title="Readiness Score"
              value={`${readinessScore?.total_score || 0}/100`}
              subtitle="Keep improving!"
              icon={TrendingUp}
              color="green"
            />
            <StatusCard
              title="Next Milestone"
              value={getNextMilestone(user.status)}
              subtitle="In progress"
              icon={Calendar}
              color="blue"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Your Progress</h2>
                  <Link href="/learning" className="text-gold hover:underline text-sm">
                    View All
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {getProgressItems(user, readinessScore).map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-secondary text-sm">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gold rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Learning Track */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    {user.role === "learner" ? "Current Module" : "Intern Pool Status"}
                  </h2>
                </div>
                
                {user.role === "learner" ? (
                  <div className="bg-surface-elevated rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Introduction to AI Tools</h3>
                        <p className="text-secondary text-sm mb-4">
                          Learn the fundamentals of AI-powered productivity tools and their applications.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-secondary">Week 2 of 8</span>
                          <button className="text-gold text-sm font-medium hover:underline">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-elevated rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">On the Waitlist</h3>
                        <p className="text-secondary text-sm mb-4">
                          You are being thoroughly vetted and will receive mentorship while waiting for the right opportunity.
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="status-badge status-pending">
                            Awaiting Vetting
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: "Completed module", item: "Introduction to AI Tools", time: "2 hours ago" },
                    { action: "Submitted assignment", item: "Research Project", time: "Yesterday" },
                    { action: "Received feedback", item: "Mentor Session", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-elevated rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-secondary">{activity.item}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Readiness Score */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <h2 className="text-xl font-bold mb-6">Readiness Breakdown</h2>
                <div className="space-y-4">
                  {[
                    { label: "Engagement", score: readinessScore?.engagement_score || 0 },
                    { label: "Completion", score: readinessScore?.completion_score || 0 },
                    { label: "Reliability", score: readinessScore?.reliability_score || 0 },
                    { label: "Mentor Feedback", score: readinessScore?.mentor_feedback_score || 0 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-secondary">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-surface-elevated rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold rounded-full"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Community Updates */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Community</h2>
                  <Link href="/community" className="text-gold hover:underline text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "New cohort starting March 1st", type: "Announcement", time: "1 day ago" },
                    { title: "Weekly mentorship session", type: "Event", time: "2 days ago" },
                    { title: "Success story: Sarah's journey", type: "Story", time: "3 days ago" },
                  ].map((update, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{update.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gold">{update.type}</span>
                          <span className="text-xs text-muted">{update.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h2 className="text-xl font-bold mb-6">Upcoming</h2>
                <div className="space-y-4">
                  {[
                    { title: "Group Mentorship Call", date: "Today, 3:00 PM", type: "mentorship" },
                    { title: "Assignment Due", date: "Tomorrow, 11:59 PM", type: "deadline" },
                    { title: "Career Workshop", date: "Feb 15, 2:00 PM", type: "workshop" },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-secondary">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, children, active = false }: { 
  href: string; 
  icon: any; 
  children: React.ReactNode; 
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-gold/10 text-gold"
          : "text-secondary hover:bg-surface-elevated hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}

function StatusCard({ title, value, subtitle, icon: Icon, color }: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    gold: "text-gold bg-gold/10",
    green: "text-green-500 bg-green-500/10",
    blue: "text-blue-500 bg-blue-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondary text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold mb-1">{value}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}

function getNextMilestone(status: string): string {
  const milestones: Record<string, string> = {
    applicant: "Learner Status",
    learner: "Certified",
    certified: "Internship-Ready",
    intern_pool: "Placement",
    internship_ready: "Job Placement",
  };
  return milestones[status] || "Complete Profile";
}

function getProgressItems(user: User, readinessScore: ReadinessScore | null) {
  if (user.role === "learner") {
    return [
      { title: "Course Progress", progress: readinessScore?.completion_score || 0 },
      { title: "Assignments Completed", progress: Math.round((readinessScore?.engagement_score || 0) * 0.8) },
      { title: "Mentor Sessions", progress: Math.round((readinessScore?.mentor_feedback_score || 0) * 0.9) },
    ];
  }
  return [
    { title: "Profile Completion", progress: readinessScore?.completion_score || 0 },
    { title: "Skills Assessment", progress: readinessScore?.engagement_score || 0 },
    { title: "Interview Readiness", progress: readinessScore?.total_score || 0 },
  ];
}