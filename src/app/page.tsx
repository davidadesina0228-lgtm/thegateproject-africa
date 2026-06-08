"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Building2, Target, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container-gate">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold text-white">The Gate Project</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#mission" className="text-secondary hover:text-gold transition-colors">Mission</Link>
              <Link href="#pathways" className="text-secondary hover:text-gold transition-colors">Pathways</Link>
              <Link href="/alumni" className="text-secondary hover:text-gold transition-colors">Alumni</Link>
              <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
              <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/30 rounded-full" />
        
        {/* Content */}
        <div className="container-gate relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-8">
                Talent Development & Internship Pipeline
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              Opening the{" "}
              <span className="gold-gradient">Gate</span>
              <br />
              to Opportunity
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-secondary mb-12 max-w-2xl mx-auto"
            >
              Connecting African learners and skilled interns with Western companies 
              through structured training, mentorship, and meaningful career pathways.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/auth/signup?type=learner" className="btn-primary flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5" />
                Apply as a Learner
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/auth/signup?type=intern" className="btn-secondary flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5" />
                Apply as an Intern
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="section-padding">
        <div className="container-gate">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold font-medium mb-4 block">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Removing Barriers.
                <br />
                Creating <span className="gold-gradient">Structure.</span>
              </h2>
              <p className="text-lg text-secondary mb-6">
                The Gate Project was founded on a simple truth: talent is everywhere, 
                but opportunity is not. We exist to bridge that gap through a rigorous, 
                structured approach to talent development.
              </p>
              <p className="text-lg text-secondary mb-8">
                We don&apos;t believe in handouts. We believe in building capable, 
                confident professionals ready to contribute meaningfully to Western businesses 
                while advancing their careers.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="card">
                  <Target className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-2">Structured Learning</h3>
                  <p className="text-secondary text-sm">Clear pathways from learner to internship-ready professional</p>
                </div>
                <div className="card">
                  <Users className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-2">Mentorship</h3>
                  <p className="text-secondary text-sm">Direct guidance from industry professionals</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-surface rounded-3xl border border-border p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center mb-8">
                    <Building2 className="w-12 h-12 text-black" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">The Gateway Model</h3>
                  <p className="text-secondary max-w-sm">
                    A three-stage progression from applicant to certified intern, 
                    with clear milestones and measurable outcomes.
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 border border-gold/20 rounded-full" />
                <div className="absolute bottom-10 left-10 w-16 h-16 border border-gold/30 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section id="pathways" className="section-padding bg-surface">
        <div className="container-gate">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold font-medium mb-4 block">Choose Your Path</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Two Pathways.
              <br />
              One <span className="gold-gradient">Destination.</span>
            </h2>
            <p className="text-lg text-secondary">
              Whether you&apos;re starting from scratch or bringing existing skills, 
              we have a structured path for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Learner Path */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <GraduationCap className="w-8 h-8 text-gold" />
                </div>
                <span className="status-badge status-pending">Beginner Friendly</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Learner Path</h3>
              <p className="text-secondary mb-6">
                Master cutting-edge AI skills including AI & Automation, Answer Engine Optimization, 
                Generative Engine Optimization, and LinkedIn Authority Marketing.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "2-month intensive learning program",
                  "Weekly mentorship sessions",
                  "Portfolio development",
                  "Progress tracking & feedback",
                  "Internship placement support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/auth/signup?type=learner" className="btn-primary w-full flex items-center justify-center gap-2">
                Start as a Learner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            {/* Intern Path */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Briefcase className="w-8 h-8 text-gold" />
                </div>
                <span className="status-badge status-approved">Experienced</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Intern Path</h3>
              <p className="text-secondary mb-6">
                For skilled professionals ready for Western opportunities. Join our waitlist while we 
                thoroughly vet your profile. Receive mentorship and support while waiting for the right match.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Join the intern waitlist",
                  "Thorough vetting process",
                  "Mentorship while you wait",
                  "Interview preparation",
                  "Direct company matching"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-secondary">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/auth/signup?type=intern" className="btn-primary w-full flex items-center justify-center gap-2">
                Apply as an Intern
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-surface">
        <div className="container-gate">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Step Through
              <br />
              <span className="gold-gradient">The Gate?</span>
            </h2>
            <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
              Take the first step toward transforming your career through structured 
              training and real opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                Create Your Account
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="container-gate">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xl">G</span>
                </div>
                <span className="text-xl font-bold text-white">The Gate Project</span>
              </Link>
              <p className="text-secondary max-w-sm mb-6">
                A structured talent development and internship pipeline connecting 
                African learners with Western companies.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center text-secondary hover:text-gold hover:border-gold border border-border transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center text-secondary hover:text-gold hover:border-gold border border-border transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">For Applicants</h4>
              <ul className="space-y-3">
                <li><Link href="/auth/signup?type=learner" className="text-secondary hover:text-gold transition-colors">Apply as Learner</Link></li>
                <li><Link href="/auth/signup?type=intern" className="text-secondary hover:text-gold transition-colors">Apply as Intern</Link></li>
                <li><Link href="/about" className="text-secondary hover:text-gold transition-colors">How It Works</Link></li>
                <li><Link href="/faq" className="text-secondary hover:text-gold transition-colors">FAQ</Link></li>
              </ul>
            </div>
            

          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary text-sm">
              © {new Date().getFullYear()} The Gate Project. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-secondary text-sm hover:text-gold transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-secondary text-sm hover:text-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}