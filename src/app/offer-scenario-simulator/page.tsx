"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  BarChart3, 
  Target, 
  ThumbsUp, 
  ThumbsDown, 
  TrendingDown, 
  TrendingUp,
  Info,
  PoundSterling,
  Percent,
  ChevronRight
} from "lucide-react";
import { calculateOfferScenarios, OfferScenario } from "@/lib/calculators";
import { cn } from "@/lib/utils";

export default function OfferScenarioSimulator() {
  const [askingPrice, setAskingPrice] = useState(300000);
  const [depositPercent, setDepositPercent] = useState(10);
  const [scenarios, setScenarios] = useState<OfferScenario[]>([]);

  useEffect(() => {
    const results = calculateOfferScenarios(askingPrice, depositPercent);
    setScenarios(results);
  }, [askingPrice, depositPercent]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Offer Scenario Simulator</h1>
              <p className="text-muted-foreground text-lg">
                Simulate different bidding strategies to see how they impact your deposit, mortgage, and chances of getting the keys.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Input Section */}
            <Card className="lg:col-span-4 h-fit border-2 border-primary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Strategy Inputs
                </CardTitle>
                <CardDescription>Adjust the price and your planned deposit.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Asking Price */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Asking Price</Label>
                    <span className="text-lg font-bold font-mono">£{askingPrice.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[askingPrice]} 
                    onValueChange={([v]) => setAskingPrice(v)}
                    max={2000000}
                    min={50000}
                    step={1000}
                    className="py-4"
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                    <Input 
                      type="number" 
                      value={askingPrice} 
                      onChange={(e) => setAskingPrice(Number(e.target.value))}
                      className="pl-8 h-12 rounded-xl bg-muted/30"
                    />
                  </div>
                </div>

                {/* Deposit Percent */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Planned Deposit</Label>
                    <span className="text-lg font-bold font-mono">{depositPercent}%</span>
                  </div>
                  <Slider 
                    value={[depositPercent]} 
                    onValueChange={([v]) => setDepositPercent(v)}
                    max={50}
                    min={5}
                    step={1}
                    className="py-4"
                  />
                  <p className="text-[11px] text-muted-foreground">Most lenders require at least 5-10% deposit.</p>
                </div>

                <div className="pt-6 border-t">
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        These scenarios assume your lender's valuation matches the purchase price. If the valuation is lower (a "down-valuation"), you may need a larger cash deposit.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenarios Grid */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.label} className="group hover:border-primary/40 transition-all shadow-md overflow-hidden flex flex-col">
                    <div className={cn(
                      "p-4 flex items-center justify-between text-white",
                      scenario.label.includes("Low") ? "bg-slate-700" :
                      scenario.label.includes("Competitive") ? "bg-blue-600" :
                      scenario.label.includes("Fair") ? "bg-emerald-600" :
                      "bg-indigo-700"
                    )}>
                      <h3 className="font-bold tracking-tight">{scenario.label}</h3>
                      <div className="flex items-center gap-2 bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                        {scenario.likelihood} Likelihood
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex-grow flex flex-col justify-between">
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-3xl font-black font-mono">£{scenario.price.toLocaleString()}</span>
                          <span className={cn(
                            "text-sm font-bold",
                            scenario.difference < 0 ? "text-emerald-500" : scenario.difference > 0 ? "text-destructive" : "text-muted-foreground"
                          )}>
                            {scenario.difference === 0 ? "Asking" : 
                             scenario.difference < 0 ? `-£${Math.abs(scenario.difference).toLocaleString()}` : 
                             `+£${Math.abs(scenario.difference).toLocaleString()}`}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                          "{scenario.description}"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Deposit Needed</p>
                          <p className="font-bold font-mono">£{Math.round(scenario.depositAmount).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Mortgage Amount</p>
                          <p className="font-bold font-mono">£{Math.round(scenario.loanAmount).toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Insights */}
              <Card className="bg-muted/30 border-none">
                <CardContent className="p-8">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" /> Key Takeaways
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                        <TrendingDown className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Going for the <strong>{scenarios[0]?.label}</strong> could save you <strong>£{Math.abs(scenarios[0]?.difference || 0).toLocaleString()}</strong> but carries a high risk of being outbid or dismissed by the seller.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        In a fast-moving market, <strong>{scenarios[3]?.label}</strong> ensures your offer stands out, but it increases your mortgage by <strong>£{Math.abs(scenarios[3]?.difference || 0).toLocaleString()}</strong> compared to asking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Action Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-primary rounded-[2rem] text-white shadow-2xl shadow-primary/20">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to make your move?</h3>
              <p className="text-primary-foreground/80">Use our Offer Letter Generator to create a professional bidding document.</p>
            </div>
            <Button variant="secondary" size="lg" className="rounded-xl h-14 px-8 group" asChild>
              <a href="/offer-letter">
                Generate Offer Letter <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
