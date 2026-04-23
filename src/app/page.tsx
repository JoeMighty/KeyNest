"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Calculator, 
  Wallet, 
  Home, 
  FileText, 
  CheckSquare, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  MapPin,
  ShieldCheck
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white">
      <div className="noise pointer-events-none" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden">
          <div className="spotlight" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div 
              {...fadeIn}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> Built for UK Home Buyers
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-[1.1]"
            >
              Your Journey Home, <br className="hidden md:block" /> Simplified.
            </motion.h1>
            
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              The premium toolkit for the UK property market. Calculators, checklists, and strategic tools designed to give you the upper hand.
            </motion.p>
            
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-2xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95" asChild>
                <Link href="/tools">Explore Toolkit <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-medium backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all" asChild>
                <Link href="/stamp-duty-calculator">Check Stamp Duty</Link>
              </Button>
            </motion.div>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200/50 dark:border-slate-800/50 rounded-full -z-10 animate-ping [animation-duration:8s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-200/50 dark:border-slate-800/50 rounded-full -z-10 animate-pulse [animation-duration:6s]" />
        </section>

        {/* Bento Grid Tools */}
        <section className="py-24 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8"
            >
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Launch Toolkit</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400">Precision tools for every stage of your property purchase.</p>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 rounded-full px-6" asChild>
                <Link href="/tools">View All 30+ Tools <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
              {/* Stamp Duty - Massive Featured Bento */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-[3rem] bg-primary p-12 md:p-16 text-white shadow-2xl transition-all"
              >
                <Link href="/stamp-duty-calculator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="max-w-xl">
                    <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 backdrop-blur-md border border-white/20">
                      <Calculator className="w-10 h-10" />
                    </div>
                    <h3 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.05]">Stamp Duty <br /> Calculator</h3>
                    <p className="text-primary-foreground/90 text-xl md:text-2xl leading-relaxed font-medium">
                      Navigate the UK tax landscape with confidence. Up-to-the-minute 2024/25 rates.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-xl group-hover:gap-6 transition-all duration-500">
                    Get Started <ArrowRight className="w-7 h-7" />
                  </div>
                </div>
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
                <div className="absolute bottom-[-10%] right-[-10%] opacity-10 group-hover:opacity-25 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                  <Calculator className="w-[400px] h-[400px]" />
                </div>
              </motion.div>

              {/* Monthly Cost - High Contrast Light Bento */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-10 transition-all hover:border-primary/50 hover:shadow-xl"
              >
                <Link href="/monthly-cost-calculator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Monthly Budget</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      Plan your mortgage, bills, and upkeep in one unified view.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Total Cost - Dark Mode Focus Bento */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white transition-all hover:shadow-2xl hover:shadow-slate-900/40"
              >
                <Link href="/total-cost-calculator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Total Cost</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Every single fee, tax, and penny accounted for.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              </motion.div>

              {/* Checklist - Accent Bento */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-accent p-10 text-white transition-all"
              >
                <Link href="/checklist-generator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <CheckSquare className="w-12 h-12 mb-6" />
                    <h3 className="text-3xl font-bold mb-3">Buyer Checklist</h3>
                    <p className="text-accent-foreground/90 font-medium">
                      Your step-by-step PDF roadmap to completion.
                    </p>
                  </div>
                </div>
                <FileText className="absolute bottom-[-20%] right-[-10%] w-40 h-40 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
              </motion.div>

              {/* Offer Strategy - Warning/Gold Bento */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-warning p-10 text-white transition-all"
              >
                <Link href="/offer-calculator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <Sparkles className="w-12 h-12 mb-6" />
                    <h3 className="text-3xl font-bold mb-3">Offer Strategy</h3>
                    <p className="text-warning-foreground/90 font-medium">
                      Bid smarter with custom strategic guidance.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Rent vs Buy - Glassmorphism Bento */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-10 transition-all hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-xl"
              >
                <Link href="/rent-vs-buy" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                      <Home className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Rent vs Buy</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      Visualize the math behind your long-term investment.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { icon: ShieldCheck, title: "Privacy First", desc: "No name, no email, no tracking. All data lives on your device.", color: "text-primary" },
                { icon: FileText, title: "Downloadable PDF Reports", desc: "Professional high-quality reports to share with your advisor.", color: "text-accent" },
                { icon: MapPin, title: "UK Market Specialist", desc: "Tailored logic for England, Scotland (LBTT), and Wales (LTT).", color: "text-warning" },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6"
                >
                  <div className={`w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center ${feature.color} border border-slate-200/50 dark:border-slate-800/50`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
