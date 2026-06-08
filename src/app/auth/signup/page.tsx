"use client";

import { Suspense } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Please select your country"),
  timezone: z.string().min(1, "Please select your timezone"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") || "learner";
  const { signUp } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const watchedEmail = watch("email");
  const watchedName = watch("name");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const { error: signUpError, user } = await signUp(
        data.email,
        data.password,
        userType as 'learner' | 'intern'
      );

      if (signUpError) {
        throw new Error(signUpError.message || "Failed to create account");
      }

      if (user) {
        // Update profile with name, country, timezone
        await supabase.from('profiles').update({
          full_name: data.name,
          country: data.country,
          timezone: data.timezone,
        }).eq('user_id', user.id);
      }

      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    "Nigeria", "Kenya", "Ghana", "South Africa", "Uganda", 
    "Tanzania", "Rwanda", "Ethiopia", "Egypt", "Morocco",
    "Other"
  ];

  const timezones = [
    "UTC", "UTC+1", "UTC+2", "UTC+3", "UTC+4"
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gold/20 rounded-full" />
        
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-2xl">G</span>
            </div>
            <span className="text-2xl font-bold text-white">The Gate Project</span>
          </Link>
          
          <h2 className="text-4xl font-bold mb-6">
            Begin Your Journey
          </h2>
          <p className="text-xl text-secondary mb-8">
            Create an account to start your {userType === "intern" ? "internship" : "learning"} journey 
            with The Gate Project.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span className="text-secondary">Structured training program</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span className="text-secondary">Professional mentorship</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-gold" />
              <span className="text-secondary">Career placement support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold text-white">The Gate Project</span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold text-sm font-medium">
                Step {step} of 2
              </span>
            </div>
            <div className="h-1 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: "50%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Create Your Account
          </h1>
          <p className="text-secondary mb-8">
            Join as a {userType === "intern" ? "Skilled Intern" : "Learner"}
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="John Doe"
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select {...register("country")} className="w-full">
                      <option value="">Select...</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select {...register("timezone")} className="w-full">
                      <option value="">Select...</option>
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                    {errors.timezone && (
                      <p className="text-red-400 text-sm mt-1">{errors.timezone.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!watchedEmail || !watchedName}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex-[2] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          <p className="text-center text-secondary mt-8">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-sm text-muted mt-4">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-secondary">Loading...</p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignupForm />
    </Suspense>
  );
}