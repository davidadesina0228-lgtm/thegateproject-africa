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
  Users,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Settings,
  LogOut,
  Loader2,
  ChevronRight,
  TrendingUp,
  Award,
  UserCheck,
  Clock,
} from "lucide-react";

interface UserWithProfile extends User {
  profiles?: Profile;
  readiness_scores?: ReadinessScore;
}

export default function AdminPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }

    // Check if user is admin
    if (user && user.role !== "admin" && user.role !== "reviewer") {
      router.push("/dashboard");
      return;
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select(`
            *,
            profiles(*),
            readiness_scores(*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === "admin" || user?.role === "reviewer") {
      fetchUsers();
    }
  }, [user]);

  const handleApprove = async (userId: string) => {
    try {
      const { error } = await supabase.functions.invoke('approve-user', {
        body: { userId, approved: true, notes: 'Approved by admin' }
      });

      if (!error) {
        setUsers(users.map(u => 
          u.id === userId ? { ...u, status: "learner" } : u
        ));
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const { error } = await supabase.functions.invoke('approve-user', {
        body: { userId, approved: false, notes: 'Rejected by admin' }
      });

      if (!error) {
        setUsers(users.map(u => 
          u.id === userId ? { ...u, status: "rejected" } : u
        ));
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === "all" || user.status === filter;
    const matchesSearch = 
      user.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.profiles?.country?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: users.length,
    pending: users.filter(u => u.status === "applicant").length,
    approved: users.filter(u => u.status === "learner" || u.status === "internship_ready").length,
    learners: users.filter(u => u.role === "learner").length,
    interns: users.filter(u => u.role === "intern").length,
    avgReadiness: users.length > 0 
      ? Math.round(users.reduce((acc, u) => acc + (u.readiness_scores?.total_score || 0), 0) / users.length)
      : 0,
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border hidden lg:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">G</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white block">Gate Project</span>
              <span className="text-xs text-gold">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem href="/admin" icon={LayoutDashboard} active>
            Dashboard
          </NavItem>
          <NavItem href="/admin/applications" icon={Users}>
            Applications
          </NavItem>
          <NavItem href="/admin/cohorts" icon={UserCheck}>
            Cohorts
          </NavItem>
          <NavItem href="/admin/analytics" icon={TrendingUp}>
            Analytics
          </NavItem>
          <NavItem href="/admin/settings" icon={Settings}>
            Settings
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
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-secondary text-sm">
                Manage applications and oversee platform operations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Applicants"
              value={stats.total}
              change="+12 this week"
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Pending Review"
              value={stats.pending}
              subtitle="Requires action"
              icon={Clock}
              color="gold"
            />
            <StatCard
              title="Approved"
              value={stats.approved}
              change={`${Math.round((stats.approved / stats.total) * 100)}% rate`}
              icon={CheckCircle}
              color="green"
            />
            <StatCard
              title="Avg Readiness"
              value={`${stats.avgReadiness}/100`}
              icon={Award}
              color="purple"
            />
          </div>

          {/* User Type Distribution */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-bold mb-4">User Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-secondary">Learners</span>
                    <span className="font-medium">{stats.learners}</span>
                  </div>
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${stats.total ? (stats.learners / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-secondary">Interns</span>
                    <span className="font-medium">{stats.interns}</span>
                  </div>
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${stats.total ? (stats.interns / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-surface-elevated rounded-lg hover:bg-surface-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <span>Review Pending Applications</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-surface-elevated rounded-lg hover:bg-surface-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-gold" />
                    <span>Export User Data</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-surface-elevated rounded-lg hover:bg-surface-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-gold" />
                    <span>Create New Cohort</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Applications Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold">Recent Applications</h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-64"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-40 appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="applicant">Pending</option>
                    <option value="learner">Learner</option>
                    <option value="internship_ready">Ready</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Country</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{user.profiles?.full_name || 'N/A'}</p>
                          <p className="text-sm text-secondary">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm capitalize">{user.role}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm">{user.profiles?.country || 'N/A'}</span>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-surface-elevated rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold rounded-full"
                              style={{ width: `${user.readiness_scores?.total_score || 0}%` }}
                            />
                          </div>
                          <span className="text-sm">{user.readiness_scores?.total_score || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {user.status === "applicant" && (
                            <>
                              <button
                                onClick={() => handleApprove(user.id)}
                                className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleReject(user.id)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="p-2 text-secondary hover:text-gold hover:bg-gold/10 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary">No users found matching your criteria</p>
              </div>
            )}
          </motion.div>
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

function StatCard({ title, value, change, subtitle, icon: Icon, color }: {
  title: string;
  value: number | string;
  change?: string;
  subtitle?: string;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-500/10",
    gold: "text-gold bg-gold/10",
    green: "text-green-500 bg-green-500/10",
    purple: "text-purple-500 bg-purple-500/10",
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
          <p className="text-3xl font-bold mb-1">{value}</p>
          {change && <p className="text-xs text-green-500">{change}</p>}
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    applicant: "bg-gold/10 text-gold",
    learner: "bg-blue-500/10 text-blue-500",
    intern_pool: "bg-purple-500/10 text-purple-500",
    certified: "bg-green-500/10 text-green-500",
    internship_ready: "bg-green-500/10 text-green-500",
    rejected: "bg-red-500/10 text-red-500",
  };

  const labels: Record<string, string> = {
    applicant: "Pending",
    learner: "Learner",
    intern_pool: "Intern Pool",
    certified: "Certified",
    internship_ready: "Ready",
    rejected: "Rejected",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || "bg-gray-500/10 text-gray-500"}`}>
      {labels[status] || status}
    </span>
  );
}