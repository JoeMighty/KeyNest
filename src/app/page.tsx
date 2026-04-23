import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
  Calculator, 
  CheckSquare, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Scale,
  Clock,
  PiggyBank,
  Truck,
  Shield,
  Eye,
  FileSearch,
  CheckCircle2,
  Lock
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const categories = [
    {
      title: "Financial Planning",
      desc: "Every cost, from stamp duty to solicitors, calculated with precision.",
      icon: TrendingUp,
      tools: [
        { name: "Total Cost", href: "/total-cost-calculator" },
        { name: "Monthly Budget", href: "/monthly-cost-calculator" },
        { name: "Stamp Duty", href: "/stamp-duty-calculator" }
      ],
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Strategic Search",
      desc: "Compare properties side-by-side and calculate the perfect offer.",
      icon: Scale,
      tools: [
        { name: "Property Comparison", href: "/compare-properties" },
        { name: "Offer Strategy", href: "/offer-calculator" },
        { name: "Rent vs Buy", href: "/rent-vs-buy" }
      ],
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Logistics & Closing",
      desc: "Professional checklists and documents to get you to completion.",
      icon: CheckSquare,
      tools: [
        { name: "FTB Checklist", href: "/checklist-generator" },
        { name: "Offer Letter", href: "/offer-letter" },
        { name: "Moving Costs", href: "/moving-costs" }
      ],
      color: "from-emerald-600 to-teal-600",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white">
      <Navbar isHome />
      
      <main className="flex-grow">
        {/* Hero Section - High Polish */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950" />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                Phase 2 Now Live: Decision Support
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                Buy your home <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">smarter.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                Professional tools for UK home buyers. No accounts, no data tracking, just powerful calculators to help you move with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <Link href="/tools">
                  <button className="px-10 h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all shadow-2xl shadow-primary/30 flex items-center gap-2">
                    Start Calculating <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/checklist-generator">
                  <button className="px-10 h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg transition-all backdrop-blur-sm">
                    Get FTB Checklist
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Feature Icons for Visual Polish */}
          <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-slate-500 animate-in fade-in slide-in-from-left-4 duration-1000 delay-500">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Privacy First</span>
            <div className="w-px h-4 bg-slate-800 mx-2" />
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">UK Specific</span>
          </div>
        </section>

        {/* Why KeyNest - The "Professional" Section */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Unbiased Data</h3>
                <p className="text-muted-foreground leading-relaxed">We aren't estate agents or mortgage brokers. Our tools are built for buyers, providing objective mathematical truth.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Zero Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">Your financial data is your business. Every calculation happens locally in your browser and never touches our servers.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Instantly Branded</h3>
                <p className="text-muted-foreground leading-relaxed">Generate professional, high-quality PDFs for your solicitors, agents, or family in a single click.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Toolkit - Modern Cards */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">One toolkit. Total control.</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From your first deposit savings to the day you collect your keys.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-950 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-full`} />
                  
                  <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/10`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{cat.desc}</p>
                  
                  <div className="space-y-3 mb-8">
                    {cat.tools.map((tool, i) => (
                      <Link key={i} href={tool.href} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group/item">
                        <span className="text-sm font-bold">{tool.name}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover/item:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                  
                  <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-black text-primary group-hover:gap-3 transition-all">
                    EXPLORE CATEGORY <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Spotlight: Property Comparison */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:row items-center gap-20">
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-20 bg-primary/20 blur-[120px] rounded-full opacity-50" />
                <div className="relative space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest">
                    NEW FEATURE
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                    Property comparison <br />
                    <span className="text-primary">evolved.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                    Don't settle for vibes. Put your top 4 choices side-by-side and see exactly which home wins the math. We analyze commute times, EPCs, and value automatically.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center"><Eye className="w-4 h-4 text-primary" /></div>
                      <h4 className="font-bold text-sm">Visual Grid</h4>
                      <p className="text-xs text-slate-500">Side-by-side specs for up to 4 homes.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center"><FileSearch className="w-4 h-4 text-primary" /></div>
                      <h4 className="font-bold text-sm">Smart Insights</h4>
                      <p className="text-xs text-slate-500">Auto-highlights best value & commute.</p>
                    </div>
                  </div>
                  <Link href="/compare-properties">
                    <button className="px-10 h-16 rounded-2xl bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-all">
                      Compare Now
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Abstract Visual for Polish */}
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                 <div className="aspect-[4/5] bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-white/10 p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl" />
                    <div className="space-y-3">
                       <div className="h-4 w-full bg-white/5 rounded" />
                       <div className="h-4 w-2/3 bg-white/5 rounded" />
                    </div>
                 </div>
                 <div className="aspect-[4/5] bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-white/10 p-6 flex flex-col justify-between translate-y-12">
                    <div className="w-12 h-12 bg-white/5 rounded-xl" />
                    <div className="space-y-3">
                       <div className="h-4 w-full bg-white/5 rounded" />
                       <div className="h-4 w-2/3 bg-white/5 rounded" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Ultra Polish */}
        <section className="py-24 container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary via-blue-600 to-indigo-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">Start your journey <br /> on solid ground.</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 leading-relaxed">
                KeyNest is the professional toolkit every UK home buyer deserves. Fast, private, and 100% free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/tools">
                  <button className="px-12 h-16 rounded-2xl bg-white text-primary font-black text-xl hover:bg-slate-100 transition-all shadow-xl">
                    Launch All Tools
                  </button>
                </Link>
                <Link href="/roadmap">
                  <button className="px-12 h-16 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-lg transition-all backdrop-blur-sm">
                    View Future Vision
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
