import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square, Rocket } from "lucide-react";

const roadmapItems = [
  { name: "Stamp Duty Calculator (UK)", completed: true },
  { name: "Total Cost of Buying Calculator", completed: true },
  { name: "Monthly Cost Calculator", completed: true },
  { name: "Rent vs Buy Calculator", completed: true },
  { name: "Offer Strategy Calculator", completed: true },
  { name: "FTB Checklist Generator (PDF)", completed: true },
  { name: "Offer Letter Generator", completed: true },
  { name: "Property Comparison Tool", completed: true },
  { name: "Mortgage Overpayment Calculator", completed: true },
  { name: "Deposit Savings Timeline", completed: true },
  { name: "House Viewing Checklist (PDF)", completed: true },
  { name: "Moving Cost Estimator", completed: true },
  { name: "Affordability Stress Test", completed: true },
  { name: "Offer Scenario Simulator", completed: true },
  { name: "Neighborhood Crime Checker", completed: true },
  { name: "Neighborhood Intelligence Dashboard", completed: true },
  { name: "Regional Price Benchmark Tool", completed: false },
  { name: "Postcode Comparison Tool", completed: false },
  { name: "Council Tax Estimator (Data-assisted)", completed: false },
  { name: "Home Setup Cost Calculator", completed: false },
  { name: "New Build Snagging Checklist", completed: false },
  { name: "Buyer Readiness Checker", completed: false },
  { name: "Interactive Buyer Glossary", completed: false },
];

export default function RoadmapPage() {
  const completedCount = roadmapItems.filter(i => i.completed).length;
  const totalCount = roadmapItems.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Roadmap</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our vision for the most comprehensive home buying toolkit in the UK.
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>Overall Progress</span>
                <span className="text-primary">{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </header>

          <Card className="rounded-[2rem] shadow-xl overflow-hidden border-2">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y">
                {roadmapItems.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${item.completed ? 'bg-primary/5' : 'bg-background'}`}>
                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${item.completed ? 'text-primary' : 'text-slate-300 dark:text-slate-700'}`}>
                      {item.completed ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                    </div>
                    <span className={`font-medium ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.name}
                    </span>
                    {item.completed && (
                      <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">Live</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-16 p-8 bg-primary rounded-3xl text-white text-center shadow-xl shadow-primary/20">
            <Rocket className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Help shape the future</h2>
            <p className="text-primary-foreground/80 mb-6">
              Have a tool idea we missed? We're open source and community driven.
            </p>
            <Button variant="secondary" size="lg" className="rounded-xl px-8" asChild>
              <a href="https://github.com/JoeMighty/KeyNest" target="_blank" rel="noopener noreferrer">Submit Feature Request</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
