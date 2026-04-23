"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  CheckSquare, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  Home, 
  Scale, 
  MapPin, 
  Clock, 
  PiggyBank,
  Truck,
  Eye,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Financial Planning",
    icon: TrendingUp,
    tools: [
      { name: "Stamp Duty Calculator", href: "/stamp-duty-calculator", desc: "Calculate SDLT for UK properties.", status: "live" },
      { name: "Total Cost of Buying", href: "/total-cost-calculator", desc: "Every fee and tax included.", status: "live" },
      { name: "Monthly Cost Estimator", href: "/monthly-cost-calculator", desc: "Beyond the mortgage.", status: "live" },
      { name: "Mortgage Overpayment", href: "/mortgage-overpayment", desc: "Save years and thousands.", status: "live", icon: Clock },
      { name: "Deposit Timeline", href: "/deposit-timeline", desc: "When will you reach your goal?", status: "live", icon: PiggyBank },
      { name: "Affordability Stress Test", href: "/affordability-stress-test", desc: "Test your buffer for rate rises.", status: "live", icon: ShieldAlert },
    ]
  },
  {
    title: "Comparison & Strategy",
    icon: Scale,
    tools: [
      { name: "Offer Calculator", href: "/offer-calculator", desc: "Strategic bidding advice.", status: "live" },
      { name: "Property Comparison", href: "/compare-properties", desc: "Compare up to 4 properties side-by-side.", status: "live" },
      { name: "Offer Scenario Simulator", href: "/offer-scenario-simulator", desc: "Simulate different bidding outcomes.", status: "live" },
      { name: "Rent vs Buy", href: "/rent-vs-buy", desc: "The ultimate long-term comparison.", status: "live" },
    ]
  },
  {
    title: "Viewings & Logistics",
    icon: MapPin,
    tools: [
      { name: "House Viewing Checklist", href: "/viewing-checklist", desc: "What to look for on-site.", status: "live", icon: Eye },
      { name: "First-Time Buyer Checklist", href: "/checklist-generator", desc: "Your step-by-step roadmap.", status: "live" },
      { name: "Offer Letter Generator", href: "/offer-letter", desc: "Professional bidding documents.", status: "live" },
      { name: "Moving Cost Estimator", href: "/moving-costs", desc: "Budget for the final push.", status: "live", icon: Truck },
    ]
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <header className="max-w-2xl mb-12">
            <h1 className="text-4xl font-bold mb-4">All Home Buyer Tools</h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to navigate the UK property market. Professional-grade calculators and checklists, 100% free.
            </p>
          </header>

          <div className="space-y-16">
            {categories.map((cat) => (
              <section key={cat.title}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary rounded-lg text-white">
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{cat.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.tools.map((tool) => (
                    <Card key={tool.name} className="group hover:border-primary/50 transition-all hover:shadow-xl dark:bg-slate-900/50">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                          {tool.status === 'live' ? (
                            <div className="px-3 py-1 bg-accent/10 text-accent dark:bg-accent/20 rounded-full text-[10px] font-bold uppercase tracking-wider border border-accent/20">Live</div>
                          ) : (
                            <div className="px-3 py-1 bg-slate-100 text-slate-500 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">Phase 2</div>
                          )}
                        </div>
                        <CardDescription className="pt-3 text-sm leading-relaxed">{tool.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {tool.status === 'live' ? (
                          <Link href={tool.href}>
                            <Button className="w-full gap-2 rounded-xl h-11" variant="outline">
                              Open Tool <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        ) : (
                          <Button className="w-full gap-2 rounded-xl h-11" variant="ghost" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
