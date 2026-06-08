"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

// Onboarding steps for Learners
const learnerSteps = [
  { id: 1, title: "Motivation", description: "Tell us why you want to join" },
  { id: 2, title: "Commitment", description: "Confirm your availability" },
  { id: 3, title: "Skills", description: "Assess your current level" },
  { id: 4, title: "Interests", description: "Select your focus areas" },
  { id: 5, title: "Infrastructure", description: "Check your setup readiness" },
];

// Onboarding steps for Interns
const internSteps = [
  { id: 1, title: "Profile", description: "Tell us about yourself" },
  { id: 2, title: "Skills", description: "Detail your expertise" },
  { id: 3, title: "Portfolio", description: "Share your work" },
  { id: 4, title: "Experience", description: "Your professional background" },
  { id: 5, title: "Readiness", description: "Confirm your availability" },
];

export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<"learner" | "intern" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Check if user exists and get their type
    if (user) {
      setUserType(user.role as "learner" | "intern");
      
      // If onboarding is already completed, redirect to dashboard
      if (user.onboarding_completed) {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  const steps = userType === "intern" ? internSteps : learnerSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (stepData: Record<string, any>) => {
    setFormData({ ...formData, ...stepData });
  };

  const submitOnboarding = async () => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("User not authenticated");

      // Save onboarding responses
      const onboardingData = {
        user_id: user.id,
        path_type: userType,
        motivation_text: formData.motivation,
        career_goals: formData.careerGoals,
        weekly_hours: formData.weeklyHours,
        skill_level: formData.skillLevel,
        interests: formData.interests || formData.skillAreas || [],
        laptop_access: formData.laptopAccess,
        internet_quality: formData.internetQuality,
        power_reliability: formData.powerReliability,
        quiet_workspace: formData.quietWorkspace,
        years_experience: formData.yearsExperience,
        linkedin_url: formData.linkedinUrl,
        portfolio_url: formData.portfolioUrl,
        github_url: formData.githubUrl,
        can_work_uk_hours: formData.canWorkUkHours,
        interview_ready: formData.interviewReady,
        preferred_start_date: formData.preferredStartDate,
        completed_at: new Date().toISOString(),
      };

      const { error: onboardingError } = await supabase
        .from('onboarding_responses')
        .upsert(onboardingData);

      if (onboardingError) throw onboardingError;

      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !userType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              Complete Your Profile
            </h1>
            <span className="text-gold font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? "text-gold" : "text-muted"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      index < currentStep
                        ? "bg-gold text-black"
                        : index === currentStep
                        ? "bg-gold/20 border-2 border-gold"
                        : "bg-surface border-2 border-border"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{step.id}</span>
                    )}
                  </div>
                  <span className="text-xs hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
              <p className="text-secondary">{steps[currentStep].description}</p>
            </div>

            {userType === "learner" ? (
              <LearnerStep
                step={currentStep}
                formData={formData}
                updateFormData={updateFormData}
              />
            ) : (
              <InternStep
                step={currentStep}
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-border">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={isLoading}
                className="btn-primary flex-[2] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Complete
                    <CheckCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Learner-specific form steps
function LearnerStep({ step, formData, updateFormData }: { 
  step: number; 
  formData: Record<string, any>; 
  updateFormData: (data: Record<string, any>) => void;
}) {
  switch (step) {
    case 0: // Motivation
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Why do you want to join The Gate Project?
            </label>
            <textarea
              value={formData.motivation || ""}
              onChange={(e) => updateFormData({ motivation: e.target.value })}
              placeholder="Tell us about your goals, what drives you, and why this opportunity matters to you..."
              className="w-full h-40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              What do you hope to achieve in the next 12 months?
            </label>
            <textarea
              value={formData.goals || ""}
              onChange={(e) => updateFormData({ goals: e.target.value })}
              placeholder="Describe your short-term career objectives..."
              className="w-full h-32"
            />
          </div>
        </div>
      );

    case 1: // Commitment
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">
              How many hours per week can you commit?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["10-15 hours", "15-20 hours", "20-30 hours", "30+ hours"].map((hours) => (
                <label
                  key={hours}
                  className={`card p-4 cursor-pointer transition-colors ${
                    formData.weeklyHours === hours ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="weeklyHours"
                    value={hours}
                    checked={formData.weeklyHours === hours}
                    onChange={(e) => updateFormData({ weeklyHours: e.target.value })}
                    className="sr-only"
                  />
                  <span className="font-medium">{hours}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-lg p-4">
            <p className="text-sm text-secondary">
              <span className="text-gold font-medium">Note:</span> The learner program is a 
              <span className="text-white font-medium"> 2-month intensive program</span>. 
              Please ensure you can commit to this duration before proceeding.
            </p>
          </div>
        </div>
      );

    case 2: // Skills
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">
              What is your current skill level?
            </label>
            <div className="space-y-3">
              {[
                { value: "none", label: "No prior experience", desc: "Complete beginner" },
                { value: "beginner", label: "Beginner", desc: "Some basic understanding" },
                { value: "intermediate", label: "Intermediate", desc: "Can work on projects with guidance" },
                { value: "advanced", label: "Advanced", desc: "Can work independently" },
              ].map((level) => (
                <label
                  key={level.value}
                  className={`card p-4 cursor-pointer transition-colors flex items-center gap-4 ${
                    formData.skillLevel === level.value ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="skillLevel"
                    value={level.value}
                    checked={formData.skillLevel === level.value}
                    onChange={(e) => updateFormData({ skillLevel: e.target.value })}
                    className="sr-only"
                  />
                  <div>
                    <span className="font-medium block">{level.label}</span>
                    <span className="text-sm text-secondary">{level.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    case 3: // Interests
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">
              Select your areas of interest (choose all that apply)
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "ai-automation", label: "AI & Automation", icon: "🤖" },
                { id: "aeo", label: "Answer Engine Optimization", icon: "🔍" },
                { id: "geo", label: "Generative Engine Optimization", icon: "✨" },
                { id: "linkedin-marketing", label: "LinkedIn Authority Marketing", icon: "💼" },
              ].map((interest) => (
                <label
                  key={interest.id}
                  className={`card p-4 cursor-pointer transition-colors ${
                    formData.interests?.includes(interest.id) ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={interest.id}
                    checked={formData.interests?.includes(interest.id) || false}
                    onChange={(e) => {
                      const current = formData.interests || [];
                      if (e.target.checked) {
                        updateFormData({ interests: [...current, interest.id] });
                      } else {
                        updateFormData({ interests: current.filter((i: string) => i !== interest.id) });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <span className="font-medium">{interest.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    case 4: // Infrastructure
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">
              Do you have reliable access to the following?
            </label>
            <div className="space-y-4">
              {[
                { id: "laptop", label: "Laptop or Computer", essential: true },
                { id: "internet", label: "Reliable Internet Connection", essential: true },
                { id: "power", label: "Reliable Power Supply", essential: true },
                { id: "workspace", label: "Quiet Workspace", essential: false },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`card p-4 cursor-pointer transition-colors flex items-center justify-between ${
                    formData[item.id] ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={formData[item.id] || false}
                      onChange={(e) => updateFormData({ [item.id]: e.target.checked })}
                      className="w-5 h-5 rounded border-border"
                    />
                    <div>
                      <span className="font-medium">{item.label}</span>
                      {item.essential && (
                        <span className="text-xs text-gold ml-2">(Required)</span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

// Intern-specific form steps
function InternStep({ step, formData, updateFormData }: { 
  step: number; 
  formData: Record<string, any>; 
  updateFormData: (data: Record<string, any>) => void;
}) {
  switch (step) {
    case 0: // Profile
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Professional Summary
            </label>
            <textarea
              value={formData.summary || ""}
              onChange={(e) => updateFormData({ summary: e.target.value })}
              placeholder="Describe your professional background and expertise..."
              className="w-full h-40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={formData.linkedin || ""}
              onChange={(e) => updateFormData({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full"
            />
          </div>
        </div>
      );

    case 1: // Skills
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">
              Select your skill areas (choose all that apply)
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "business-communications", label: "Business Communications", icon: "💬" },
                { id: "sales-marketing", label: "Sales & Marketing", icon: "📈" },
                { id: "ai-automation", label: "AI & Automation", icon: "🤖" },
                { id: "admin-support", label: "Admin Support", icon: "📋" },
                { id: "data-research", label: "Data Entry & Research", icon: "📊" },
                { id: "customer-service", label: "Customer Service", icon: "🎧" },
              ].map((skill) => (
                <label
                  key={skill.id}
                  className={`card p-4 cursor-pointer transition-colors ${
                    formData.skillAreas?.includes(skill.id) ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={skill.id}
                    checked={formData.skillAreas?.includes(skill.id) || false}
                    onChange={(e) => {
                      const current = formData.skillAreas || [];
                      if (e.target.checked) {
                        updateFormData({ skillAreas: [...current, skill.id] });
                      } else {
                        updateFormData({ skillAreas: current.filter((s: string) => s !== skill.id) });
                      }
                    }}
                    className="sr-only"
                  />
                  <div className="text-2xl mb-2">{skill.icon}</div>
                  <span className="font-medium text-sm">{skill.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">
              Years of Experience
            </label>
            <div className="grid grid-cols-3 gap-4">
              {["0-2 years", "3-5 years", "5+ years"].map((exp) => (
                <label
                  key={exp}
                  className={`card p-4 cursor-pointer transition-colors text-center ${
                    formData.experience === exp ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={exp}
                    checked={formData.experience === exp}
                    onChange={(e) => updateFormData({ experience: e.target.value })}
                    className="sr-only"
                  />
                  <span className="font-medium">{exp}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );

    case 2: // Portfolio
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Portfolio/Work Samples URL
            </label>
            <input
              type="url"
              value={formData.portfolio || ""}
              onChange={(e) => updateFormData({ portfolio: e.target.value })}
              placeholder="https://yourportfolio.com"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              GitHub/Other Repository URL (Optional)
            </label>
            <input
              type="url"
              value={formData.github || ""}
              onChange={(e) => updateFormData({ github: e.target.value })}
              placeholder="https://github.com/yourusername"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Key Projects Description
            </label>
            <textarea
              value={formData.projects || ""}
              onChange={(e) => updateFormData({ projects: e.target.value })}
              placeholder="Describe 2-3 significant projects you've worked on..."
              className="w-full h-32"
            />
          </div>
        </div>
      );

    case 3: // Experience
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Work History
            </label>
            <textarea
              value={formData.workHistory || ""}
              onChange={(e) => updateFormData({ workHistory: e.target.value })}
              placeholder="List your relevant work experience with roles and responsibilities..."
              className="w-full h-40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Education
            </label>
            <input
              type="text"
              value={formData.education || ""}
              onChange={(e) => updateFormData({ education: e.target.value })}
              placeholder="Your highest education level and field of study"
              className="w-full"
            />
          </div>
        </div>
      );

    case 4: // Readiness
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">
              Can you work UK business hours?
            </label>
            <div className="flex gap-4">
              {["Yes", "No", "Partially"].map((option) => (
                <label
                  key={option}
                  className={`card p-4 cursor-pointer transition-colors flex-1 text-center ${
                    formData.ukHours === option ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="ukHours"
                    value={option}
                    checked={formData.ukHours === option}
                    onChange={(e) => updateFormData({ ukHours: e.target.value })}
                    className="sr-only"
                  />
                  <span className="font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">
              Are you ready for interviews?
            </label>
            <div className="flex gap-4">
              {["Immediately", "Within 1 week", "Within 2 weeks"].map((option) => (
                <label
                  key={option}
                  className={`card p-4 cursor-pointer transition-colors flex-1 text-center ${
                    formData.interviewReady === option ? "border-gold bg-gold/5" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="interviewReady"
                    value={option}
                    checked={formData.interviewReady === option}
                    onChange={(e) => updateFormData({ interviewReady: e.target.value })}
                    className="sr-only"
                  />
                  <span className="font-medium text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Start Date
            </label>
            <input
              type="date"
              value={formData.startDate || ""}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
              className="w-full"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}