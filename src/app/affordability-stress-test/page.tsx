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
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  Percent, 
  PoundSterling, 
  Calendar,
  Wallet
} from "lucide-react";
import { calculateMortgage, calculateStressTest, StressTestScenario } from "@/lib/calculators";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AffordabilityStressTest() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [currentRate, setCurrentRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [scenarios, setScenarios] = useState<StressTestScenario[]>([]);

  const basePayment = calculateMortgage(loanAmount, currentRate, term).monthlyPayment;

  useEffect(() => {
    const results = calculateStressTest(loanAmount, currentRate, term);
    setScenarios(results);
  }, [loanAmount, currentRate, term]);

  const getAffordabilityColor = (payment: number) => {
    if (!monthlyIncome) return "text-muted-foreground";
    const ratio = (payment / monthlyIncome) * 100;
    if (ratio <= 30) return "text-emerald-500";
    if (ratio <= 45) return "text-amber-500";
    return "text-destructive";
  };

  const getAffordabilityLabel = (payment: number) => {
    if (!monthlyIncome) return null;
    const ratio = (payment / monthlyIncome) * 100;
    if (ratio <= 30) return "Comfortable";
    if (ratio <= 45) return "Stretched";
    return "High Risk";
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text("Affordability Stress Test Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Loan Amount: £${loanAmount.toLocaleString()}`, 20, 35);
    doc.text(`Current Interest Rate: ${currentRate}%`, 20, 42);
    doc.text(`Loan Term: ${term} Years`, 20, 49);
    doc.text(`Current Monthly Payment: £${basePayment.toFixed(2)}`, 20, 56);
    
    if (monthlyIncome) {
      doc.text(`Monthly Household Income: £${monthlyIncome.toLocaleString()}`, 20, 63);
    }

    // @ts-ignore
    doc.autoTable({
      startY: 75,
      head: [['Rate Increase', 'New Rate', 'Monthly Payment', 'Extra Cost/Month', 'Affordability']],
      body: scenarios.map(s => [
        `+${s.rateIncrease}%`,
        `${s.newRate.toFixed(2)}%`,
        `£${s.monthlyPayment.toFixed(2)}`,
        `+£${s.extraCost.toFixed(2)}`,
        getAffordabilityLabel(s.monthlyPayment) || "N/A"
      ]),
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }
    });

    doc.save("KeyNest-Affordability-Stress-Test.pdf");
    toast.success("Report downloaded successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col items-center justify-center gap-6 text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Affordability Stress Test</h1>
              <p className="text-muted-foreground text-lg">
                See how your mortgage payments would change if interest rates rise. Plan ahead to ensure your home remains affordable.
              </p>
            </div>
            <Button onClick={exportPDF} variant="outline" className="gap-2 rounded-xl h-12 px-6">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-2 border-primary/5 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" /> Mortgage Details
                  </CardTitle>
                  <CardDescription>Enter your current or proposed mortgage info.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Loan Amount */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Loan Amount</Label>
                      <span className="text-lg font-bold font-mono">£{loanAmount.toLocaleString()}</span>
                    </div>
                    <Slider 
                      value={[loanAmount]} 
                      onValueChange={([v]) => setLoanAmount(v)}
                      max={1000000}
                      min={10000}
                      step={5000}
                      className="py-4"
                    />
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Current Interest Rate</Label>
                      <span className="text-lg font-bold font-mono">{currentRate}%</span>
                    </div>
                    <Slider 
                      value={[currentRate]} 
                      onValueChange={([v]) => setCurrentRate(v)}
                      max={15}
                      min={0.1}
                      step={0.1}
                      className="py-4"
                    />
                  </div>

                  {/* Term */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Loan Term (Years)</Label>
                      <span className="text-lg font-bold font-mono">{term} Yrs</span>
                    </div>
                    <Slider 
                      value={[term]} 
                      onValueChange={([v]) => setTerm(v)}
                      max={40}
                      min={1}
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="income" className="text-sm font-medium">Monthly Household Income (After Tax)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                        <Input 
                          id="income"
                          type="number" 
                          value={monthlyIncome || ""} 
                          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                          className="pl-8 h-12 rounded-xl bg-muted/30"
                          placeholder="4000"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground">Used to calculate your affordability risk levels.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="bg-primary text-white overflow-hidden shadow-xl shadow-primary/10">
                <CardContent className="p-8">
                  <p className="text-primary-foreground/80 text-sm font-medium mb-1 uppercase tracking-wider">Current Monthly Payment</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-bold font-mono">£{basePayment.toFixed(2)}</h2>
                  </div>
                  <div className="mt-6 flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                    <p className="text-sm">Based on your current {currentRate}% rate.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scenarios */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.rateIncrease} className="group hover:border-primary/30 transition-all shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className={cn(
                        "w-full md:w-32 flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br",
                        scenario.rateIncrease === 1 ? "from-blue-500 to-blue-600" :
                        scenario.rateIncrease === 2 ? "from-indigo-500 to-indigo-600" :
                        scenario.rateIncrease === 3 ? "from-amber-500 to-amber-600" :
                        "from-destructive to-red-600"
                      )}>
                        <span className="text-sm font-bold opacity-80">INCREASE</span>
                        <span className="text-3xl font-black">+{scenario.rateIncrease}%</span>
                      </div>
                      
                      <CardContent className="p-6 flex-grow">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">New Rate</p>
                            <p className="text-xl font-bold font-mono">{scenario.newRate.toFixed(2)}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">New Payment</p>
                            <p className="text-xl font-bold font-mono">£{scenario.monthlyPayment.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Extra Cost</p>
                            <p className="text-xl font-bold font-mono text-destructive whitespace-nowrap">+£{scenario.extraCost.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Affordability</p>
                            <span className={cn(
                              "text-sm font-bold px-2 py-1 rounded-md bg-muted",
                              getAffordabilityColor(scenario.monthlyPayment)
                            )}>
                              {getAffordabilityLabel(scenario.monthlyPayment) || "---"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-800 rounded-3xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-900 dark:text-amber-100">Why Stress Test?</h4>
                    <p className="text-sm text-amber-800/80 dark:text-amber-100/80 leading-relaxed">
                      Most fixed-rate mortgages last 2 or 5 years. If rates are higher when your deal ends, your monthly payments will jump significantly. By testing a +2% or +3% increase, you can ensure you'll still be able to afford your home in the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
