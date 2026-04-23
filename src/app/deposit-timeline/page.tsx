"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateSavingsTimeline } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Download, Rocket, PiggyBank, Calendar, Leaf } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function SavingsTimelinePage() {
  const [target, setTarget] = useState<number>(50000);
  const [current, setCurrent] = useState<number>(10000);
  const [contribution, setContribution] = useState<number>(1000);
  const [rate, setRate] = useState<number>(4.0);
  const [isEco, setIsEco] = useState(false);

  const result = useMemo(() => {
    return calculateSavingsTimeline(target, current, contribution, rate);
  }, [target, current, contribution, rate]);

  const downloadPDF = (ecoMode: boolean = false) => {
    const doc = new jsPDF();
    
    if (!ecoMode) {
      doc.setFillColor(37, 99, 235);
      doc.roundedRect(20, 15, 12, 12, 3, 3, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("K", 26, 23, { align: "center" });
    }
    
    doc.setTextColor(ecoMode ? 0 : 37, ecoMode ? 0 : 99, ecoMode ? 0 : 235);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("KeyNest", ecoMode ? 20 : 35, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Deposit Savings Timeline", 20, 38);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Target Deposit: ${formatCurrency(target)}`, 20, 52);
    doc.text(`Current Savings: ${formatCurrency(current)}`, 20, 59);
    doc.text(`Monthly Contribution: ${formatCurrency(contribution)}`, 20, 66);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Goal Reached in: ${result.monthsToTarget} Months`, 20, 80);
    doc.text(`Approx. Date: ${new Date(new Date().setMonth(new Date().getMonth() + result.monthsToTarget)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`, 20, 90);
    
    doc.save(`KeyNest_Savings_Timeline_${ecoMode ? 'eco' : 'full'}.pdf`);
    toast.success("PDF Downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Deposit Savings Timeline</h1>
            <p className="text-muted-foreground">Plan your path to homeownership. Visualize exactly when you'll reach your target deposit.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Goal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Deposit</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input id="target" type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="pl-7" isNumeric />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Savings</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input id="current" type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="pl-7" isNumeric />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Monthly Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contribution">Monthly Contribution</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input id="contribution" type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} className="pl-7" isNumeric />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Savings Interest Rate (%)</Label>
                    <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} isNumeric />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Card className="bg-slate-900 text-white overflow-hidden shadow-2xl">
                <div className="p-8 pb-4">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">
                        {Math.floor(result.monthsToTarget / 12)}y {result.monthsToTarget % 12}m
                      </h2>
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Until Goal Reached</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Target Date</span>
                      <span className="font-bold text-primary">
                        {new Date(new Date().setMonth(new Date().getMonth() + result.monthsToTarget)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-primary transition-all duration-1000" 
                        style={{ width: `${Math.min(100, (current / target) * 100)}%` }} 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Interest Earned</p>
                        <p className="text-lg font-mono font-bold text-green-400">{formatCurrency(result.totalInterest)}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Contributions</p>
                        <p className="text-lg font-mono font-bold">{formatCurrency(result.monthsToTarget * contribution)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-white/10">
                    <Button variant={!isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(false)} className="rounded-lg h-10 px-4">Standard</Button>
                    <Button variant={isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(true)} className="rounded-lg h-10 px-4 text-green-400 gap-2"><Leaf className="w-3 h-3" /> Eco</Button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <Button onClick={() => downloadPDF(isEco)} className="gap-2 h-10 rounded-lg px-6 bg-primary text-white hover:bg-primary/90"><Download className="w-4 h-4" /> Download</Button>
                  </div>
                </div>
              </Card>

              <div className="p-6 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex gap-4">
                <PiggyBank className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Boost your timeline</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Check if you are eligible for a **Lifetime ISA (LISA)**. The government adds a 25% bonus (up to £1,000/year) on top of your savings.
                  </p>
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
