"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Users,
  ThumbsUp,
  Share2,
  Loader2,
  Plus,
  Search,
} from "lucide-react";

export default function CommunityPage() {
  const { user, loading } = useAuth();
  const session = user;
  const status = loading ? "loading" : user ? "authenticated" : "unauthenticated";
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/community/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchPosts();
    }
  }, [session]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-secondary hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Community</h1>
              <p className="text-secondary text-sm">
                Connect with fellow learners and interns
              </p>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-12 pr-4 py-4"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["All", "Announcements", "General", "Help", "Success Stories", "Resources"].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-surface border border-border rounded-full text-sm font-medium hover:border-gold transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center py-16"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">No posts yet</h3>
              <p className="text-secondary mb-6">
                Be the first to start a conversation in the community!
              </p>
              <button className="btn-primary">
                Create First Post
              </button>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-lg">
                      {post.author?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{post.author?.name}</span>
                      <span className="text-muted text-sm">•</span>
                      <span className="text-muted text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-secondary mb-4">{post.content}</p>
                    
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-secondary hover:text-gold transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="flex items-center gap-2 text-secondary hover:text-gold transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Comment</span>
                      </button>
                      <button className="flex items-center gap-2 text-secondary hover:text-gold transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}