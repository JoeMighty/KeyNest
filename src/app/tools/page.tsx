import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Wallet, 
  Home, 
  FileText, 
  CheckSquare, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Scale,
  Zap,
  Package,
  ClipboardList,
  Search
} from "lucide-react";

const toolCategories = [
  {
    name: "Financial Calculators",
    icon: Calculator,
    tools: [
      { name: "Stamp Duty Calculator", href: "/stamp-duty-calculator", desc: "Calculate SDLT for England & NI.", status: "live" },
      { name: "Total Cost of Buying", href: "/total-cost-calculator", desc: "Estimate total cash needed.", status: "live" },
      { name: "Monthly Cost Calculator", href: "/monthly-cost-calculator", desc: "Plan your household budget.", status: "live" },
      { name: "Rent vs Buy Calculator", href: "/rent-vs-buy", desc: "Compare renting vs owning.", status: "live" },
      { name: "Mortgage Overpayment", href: "#", desc: "See how much interest you can save.", status: "soon" },
      { name: "Savings Timeline", href: "#", desc: "When will you reach your deposit goal?", status: "soon" },
    ]
  },
  {
    name: "Decision & Comparison",
    icon: Scale,
    tools: [
      { name: "Offer Calculator", href: "/offer-calculator", desc: "Strategic bidding advice.", status: "live" },
      { name: "Property Comparison", href: "/compare-properties", desc: "Compare up to 4 properties side-by-side.", status: "soon" },
      { name: "Buyer Readiness Checker", href: "#", desc: "Are you actually ready to buy?", status: "soon" },
    ]
  },
  {
    name: "Checklists & Templates",
    icon: ClipboardList,
    tools: [
      { name: "Buyer Checklist", href: "/checklist-generator", desc: "Step-by-step PDF guide.", status: "live" },
      { name: "Offer Letter Generator", href: "/offer-letter", desc: "Copyable offer templates.", status: "live" },
      { name: "House Viewing Checklist", href: "#", desc: "What to look for during viewings.", status: "soon" },
      { name: "Completion Day Guide", href: "#", desc: "Everything for the big move.", status: "soon" },
    ]
  },
  {
    name: "Planning & Setup",
    icon: Package,
    tools: [
      { name: "Moving Cost Estimator", href: "#", desc: "Calculate removal and packing costs.", status: "soon" },
      { name: "Home Setup Costs", href: "#", desc: "Budget for furniture and essentials.", status: "soon" },
    ]
  },
  {
    name: "Research Tools",
    icon: Search,
    tools: [
      { name: "Council Tax Estimator", href: "#", desc: "Look up bands and costs by area.", status: "soon" },
      { name: "Postcode Comparison", href: "#", desc: "Compare school and crime stats.", status: "soon" },
    ]
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-12 md:pt-40 md:pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <header className="max-w-2xl mb-12">
            <h1 className="text-4xl font-bold mb-4">All Home Buyer Tools</h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to navigate the UK property market. One keyword per tool, zero friction.
            </p>
          </header>

          <div className="space-y-16">
            {toolCategories.map((category) => (
              <section key={category.name}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool) => (
                    <Card key={tool.name} className={`group relative transition-all duration-300 ${tool.status === 'live' ? 'hover:shadow-xl hover:border-primary/40' : 'opacity-70'}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-bold">{tool.name}</CardTitle>
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-between rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300" 
                            asChild
                          >
                            <Link href={tool.href}>Use Tool <ArrowRight className="w-4 h-4" /></Link>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="w-full justify-between cursor-not-allowed opacity-50" disabled>
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
