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
  ShieldCheck,
  Building2,
  Key
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white overflow-x-hidden">
      <div className="noise pointer-events-none" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-48 overflow-hidden">
          {/* Advanced Mesh Gradient */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-accent/20 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div 
              {...fadeIn}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-10 border border-primary/10 shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" /> THE UK HOME BUYER'S TOOLKIT
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-[0.9]"
            >
              Move In <br /> With Confidence.
            </motion.h1>
            
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
            >
              KeyNest provides professional-grade tools for first-time buyers. <br className="hidden md:block" /> No login, no marketing, just clear financial guidance.
            </motion.p>
            
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold shadow-2xl shadow-primary/40 hover:translate-y-[-4px] active:translate-y-0 transition-all" asChild>
                <Link href="/tools">Start Exploring <ArrowRight className="ml-2 w-6 h-6" /></Link>
              </Button>
              <div className="flex items-center gap-4 text-slate-500 font-medium">
                <ShieldCheck className="w-5 h-5 text-accent" />
                100% Privacy Focused
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Tools Grid */}
        <section className="py-32 relative bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-24">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Everything you need.</h2>
              <p className="text-2xl text-slate-500 leading-relaxed">Our toolkit covers every financial aspect of your purchase, from deposit savings to completion day.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[320px]">
              {/* Stamp Duty - Big Bento */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-[3rem] bg-slate-950 text-white shadow-2xl"
              >
                <Link href="/stamp-duty-calculator" className="absolute inset-0 z-20" />
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" 
                  alt="Modern House"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                
                <div className="relative z-10 h-full p-12 md:p-16 flex flex-col justify-end">
                  <div className="max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-xs font-bold uppercase tracking-widest mb-6">
                      Updated for 2024/25
                    </div>
                    <h3 className="text-5xl md:text-6xl font-bold mb-6 leading-none tracking-tighter">Stamp Duty <br /> Calculator</h3>
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
                      Avoid surprises. Calculate exactly how much tax you'll owe on your new home instantly.
                    </p>
                    <div className="flex items-center gap-2 font-bold text-lg text-primary group-hover:gap-4 transition-all">
                      Open Tool <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Total Cost - Vertical Bento */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-[3rem] bg-primary p-12 text-white shadow-2xl"
              >
                <Link href="/total-cost-calculator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
                      <Wallet className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-bold mb-6 tracking-tight leading-tight">Total Cash Required</h3>
                    <p className="text-primary-foreground/90 text-lg leading-relaxed mb-8">
                      The "hidden" costs add up. We calculate legal fees, surveys, mortgage costs, and removals.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-white" />
                    </div>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Plan your savings goal</p>
                  </div>
                </div>
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </motion.div>

              {/* Monthly Budget - Simple Bento */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 transition-all hover:shadow-xl"
              >
                <Link href="/monthly-cost-calculator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <TrendingUp className="w-10 h-10 mb-6 text-accent" />
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Monthly Budget</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      Visualize your life after purchase. Plan for mortgage, council tax, and bills.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Offer Letter - Simple Bento */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 transition-all hover:shadow-xl"
              >
                <Link href="/offer-letter" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <FileText className="w-10 h-10 mb-6 text-primary" />
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Offer Letter Gen</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      Stand out to agents with a professional, structured offer letter.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Checklist - Image Bento */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-accent p-10 text-white shadow-xl"
              >
                <Link href="/checklist-generator" className="absolute inset-0 z-20" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <CheckSquare className="w-10 h-10 mb-6" />
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Buyer Checklist</h3>
                    <p className="text-accent-foreground/90 leading-relaxed">
                      Your step-by-step PDF roadmap from viewings to completion.
                    </p>
                  </div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                  <Building2 className="w-48 h-48" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-40 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Private & Anonymous</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  We don't collect emails, names, or financial data. Your calculations stay in your browser. Period.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center text-accent shadow-sm border border-slate-200 dark:border-slate-800">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">UK Market Specific</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tailored logic for England and Northern Ireland, with support for Scottish LBTT and Welsh LTT.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center text-warning shadow-sm border border-slate-200 dark:border-slate-800">
                  <Key className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">No Hidden Agendas</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  We aren't a mortgage broker. We provide independent tools to help you make your own decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden bg-slate-950 text-white">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop" 
            alt="Estate"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">Ready to find home?</h2>
            <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold transition-all hover:scale-105" asChild>
              <Link href="/tools">Access All Tools Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
