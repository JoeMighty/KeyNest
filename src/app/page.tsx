import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(37,99,235,0.05)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> Built for UK Home Buyers
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Your Journey Home, <br /> Simplified.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Everything you need to buy your first home in the UK. Calculators, checklists, and planning tools. No login, no fees, just clarity.
            </p>
            <div className="flex flex-col sm:row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base" asChild>
                <Link href="/tools">Explore All Tools <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base" asChild>
                <Link href="/stamp-duty-calculator">Calculate Stamp Duty</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Bento Grid Tools */}
        <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50 border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Launch Toolkit</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to navigate the UK property market. No login, no friction.</p>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/tools">View All Tools <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
              {/* Stamp Duty - Big Bento (Span 8x2) */}
              <Link 
                href="/stamp-duty-calculator" 
                className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-[2.5rem] bg-primary p-10 md:p-14 text-white transition-all hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="max-w-md">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                      <Calculator className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Stamp Duty <br /> Calculator</h3>
                    <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                      Instant SDLT calculations for first-time buyers and home movers. Updated for 2024/25 rates.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-lg group-hover:gap-4 transition-all mt-12">
                    Calculate Now <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Calculator className="w-64 h-64 rotate-12" />
                </div>
              </Link>

              {/* Total Cost - Medium Bento (Span 4x1) */}
              <Link 
                href="/total-cost-calculator" 
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white transition-all hover:shadow-2xl hover:shadow-slate-900/20"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <Wallet className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Total Buying Cost</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Estimate the total cash needed for your deposit and all associated fees.
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 self-end text-primary transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              </Link>

              {/* Monthly Cost - Small Bento (Span 4x1) */}
              <Link 
                href="/monthly-cost-calculator" 
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800 border p-8 transition-all hover:shadow-xl hover:border-primary/50"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <TrendingUp className="w-10 h-10 mb-4 text-accent" />
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Monthly Budget</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Plan your mortgage, bills, and maintenance in one place.
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 self-end text-accent transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </Link>

              {/* Checklist - Landscape Bento (Span 4x1) */}
              <Link 
                href="/checklist-generator" 
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-accent p-8 text-white transition-all hover:shadow-2xl hover:shadow-accent/20"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <CheckSquare className="w-10 h-10 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Buyer Checklist</h3>
                    <p className="text-accent-foreground/90 text-sm leading-relaxed">
                      Your step-by-step PDF guide from savings to keys.
                    </p>
                  </div>
                  <div className="absolute bottom-[-20px] right-[-10px] opacity-20 group-hover:rotate-12 transition-transform">
                    <FileText className="w-32 h-32" />
                  </div>
                </div>
              </Link>

              {/* Offer Calc - Small Bento (Span 4x1) */}
              <Link 
                href="/offer-calculator" 
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-warning p-8 text-white transition-all hover:shadow-2xl hover:shadow-warning/20"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <Sparkles className="w-10 h-10 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Offer Strategy</h3>
                    <p className="text-warning-foreground/90 text-sm leading-relaxed">
                      Strategic bidding advice based on market conditions.
                    </p>
                  </div>
                  <div className="absolute top-1/2 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                </div>
              </Link>

              {/* Rent vs Buy - Small Bento (Span 4x1) */}
              <Link 
                href="/rent-vs-buy" 
                className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800 border p-8 transition-all hover:shadow-xl hover:border-primary/50"
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <Home className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Rent vs Buy</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Compare the long-term cost of renting vs owning.
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 self-end text-primary transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-muted-foreground">We don't ask for your name, email, or data. All calculations happen in your browser.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Downloadable Reports</h3>
                <p className="text-muted-foreground">Every tool supports high-quality PDF exports to take with you on viewings.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center text-warning">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">UK Specific</h3>
                <p className="text-muted-foreground">Tailored for the UK property market, including Stamp Duty and Scottish LBTT support.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
