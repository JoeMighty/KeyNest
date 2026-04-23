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
  Key,
  Shield
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Redesigned for Maximum Impact & Readability */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
          {/* High-Quality Hero Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
              alt="Premium UK Property"
              className="w-full h-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-[0.3em] mb-10 border border-white/10 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" /> Trusted by UK Home Buyers
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 text-white leading-[0.9]"
            >
              Master Your <br className="hidden md:block" /> Property Journey.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-14 leading-relaxed font-light"
            >
              The definitive, privacy-first toolkit for the UK market. <br className="hidden md:block" /> Every calculator, checklist, and generator you need - 100% free.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="rounded-2xl px-12 h-18 text-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 bg-white text-slate-950 hover:bg-slate-50 border-none" asChild>
                <Link href="/tools">Get Started Now <ArrowRight className="ml-2 w-6 h-6" /></Link>
              </Button>
              <Button size="lg" className="rounded-2xl px-12 h-18 text-xl font-bold border border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95" asChild>
                <Link href="/roadmap">View Roadmap</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid - Clean & High Contrast */}
        <section className="py-32 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">The Launch Toolkit.</h2>
                <p className="text-xl text-slate-500 dark:text-slate-400">Everything you need to navigate the UK property market from day one.</p>
              </div>
              <Link href="/tools" className="text-primary font-bold flex items-center gap-2 hover:underline text-lg">
                View All Tools <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
              {/* Stamp Duty - Massive Featured Bento */}
              <Link 
                href="/stamp-duty-calculator" 
                className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-[3rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-2xl hover:border-primary/50"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" 
                    alt="Property"
                    className="w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative z-10 h-full p-12 md:p-16 flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 bg-primary text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-xl shadow-primary/20">
                      <Calculator className="w-10 h-10" />
                    </div>
                    <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter text-slate-950 dark:text-white leading-tight">Stamp Duty <br /> Calculator</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed max-w-md">
                      Calculate your SDLT in seconds with 2024/25 rates for England and NI.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-xl text-primary group-hover:gap-6 transition-all">
                    Open Tool <ArrowRight className="w-7 h-7" />
                  </div>
                </div>
              </Link>

              {/* Total Cost - Vertical Bento */}
              <Link 
                href="/total-cost-calculator" 
                className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-[3rem] bg-primary p-12 text-white shadow-2xl transition-all hover:scale-[1.02]"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
                      <Wallet className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-bold mb-6 tracking-tight leading-tight">Total Cost <br /> of Buying</h3>
                    <p className="text-primary-foreground/90 text-lg leading-relaxed">
                      Don't miss a single fee. We calculate legal, survey, mortgage, and removal costs.
                    </p>
                  </div>
                  <div className="pt-10 border-t border-white/20">
                    <p className="text-sm font-bold opacity-80 uppercase tracking-[0.2em]">Budget with precision</p>
                  </div>
                </div>
              </Link>

              {/* Other Tools - Simple & Professional */}
              {[
                { title: "Monthly Budget", icon: TrendingUp, href: "/monthly-cost-calculator", color: "text-accent", desc: "Plan your mortgage and bills." },
                { title: "Offer Letter", icon: FileText, href: "/offer-letter", color: "text-primary", desc: "Professional templates for agents." },
                { title: "Buyer Checklist", icon: CheckSquare, href: "/checklist-generator", color: "text-green-500", desc: "Step-by-step PDF guide." }
              ].map((tool, i) => (
                <Link 
                  key={i}
                  href={tool.href}
                  className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 transition-all hover:shadow-xl hover:border-primary/50"
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <tool.icon className={`w-10 h-10 mb-6 ${tool.color}`} />
                      <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-950 dark:text-white">{tool.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Pillars */}
        <section className="py-40 border-t border-slate-100 dark:border-slate-900">
          <div className="container mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              <div className="space-y-6">
                <Shield className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">100% Private</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">No tracking, no emails, no data collection. All logic happens on your device.</p>
              </div>
              <div className="space-y-6">
                <MapPin className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">UK Centric</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Built specifically for the UK market with up-to-date legal and tax logic.</p>
              </div>
              <div className="space-y-6">
                <Key className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Free Forever</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Independent tools with no hidden fees or agendas. Built for the community.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
