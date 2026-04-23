import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, Rocket } from "lucide-react";

const roadmapData = [
  {
    phase: "Phase 1: Foundation (Current)",
    status: "completed",
    items: [
      "Stamp Duty Calculator (UK)",
      "Total Cost of Buying Calculator",
      "Monthly Cost Calculator",
      "Rent vs Buy Calculator",
      "Offer Strategy Calculator",
      "FTB Checklist Generator (PDF)",
      "Offer Letter Generator",
    ]
  },
  {
    phase: "Phase 2: Decision Support",
    status: "in-progress",
    items: [
      "Property Comparison Tool (Multi-property)",
      "Mortgage Overpayment Calculator",
      "Deposit Savings Timeline",
      "House Viewing Checklist (PDF)",
      "Moving Cost Estimator",
    ]
  },
  {
    phase: "Phase 3: Deep Research",
    status: "planned",
    items: [
      "Council Tax Estimator (Data-assisted)",
      "Postcode Comparison Tool",
      "Buyer Readiness Checker",
      "New Build Snagging Checklist",
      "Regional Price Benchmark Tool",
    ]
  },
  {
    phase: "Phase 4: Optimization",
    status: "planned",
    items: [
      "Affordability Stress Test",
      "Offer Scenario Simulator",
      "Home Setup Cost Calculator",
      "Interactive Buyer Glossary",
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Roadmap</h1>
            <p className="text-xl text-muted-foreground">
              Our vision for the most comprehensive home buying toolkit in the UK.
            </p>
          </header>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {roadmapData.map((phase, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500">
                  {phase.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : phase.status === 'in-progress' ? <Clock className="w-5 h-5 animate-pulse" /> : <Circle className="w-5 h-5" />}
                </div>
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                        phase.status === 'completed' ? 'bg-green-100 text-green-700' : phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : 'bg-slate-300'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 bg-primary rounded-3xl text-white text-center">
            <Rocket className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Help shape the future</h2>
            <p className="text-primary-foreground/80 mb-6">
              Have a tool idea we missed? We're open source and community driven.
            </p>
            <Button variant="secondary" asChild>
              <a href="https://github.com/JoeMighty/KeyNest" target="_blank" rel="noopener noreferrer">Submit Feature Request</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
