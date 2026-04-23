"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateOverpayment } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Download, TrendingDown, Clock, PiggyBank, Leaf } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function OverpaymentPage() {
  const [balance, setBalance] = useState<number>(300000);
  const [rate, setRate] = useState<number>(4.5);
  const [term, setTerm] = useState<number>(25);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState<number>(200);
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [isEco, setIsEco] = useState(false);

  const result = useMemo(() => {
    return calculateOverpayment(balance, rate, term, monthlyOverpayment, lumpSum);
  }, [balance, rate, term, monthlyOverpayment, lumpSum]);

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
    doc.text("Mortgage Overpayment Analysis", 20, 38);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Current Balance: ${formatCurrency(balance)}`, 20, 52);
    doc.text(`Interest Rate: ${rate}% | Original Term: ${term} Years`, 20, 59);
    doc.text(`Extra Monthly Payment: ${formatCurrency(monthlyOverpayment)}`, 20, 66);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Total Interest Saved: ${formatCurrency(result.savings)}`, 20, 80);
    doc.text(`Time Saved: ${result.yearsSaved} Years, ${result.monthsSaved} Months`, 20, 90);
    
    doc.save(`KeyNest_Overpayment_${ecoMode ? 'eco' : 'full'}.pdf`);
    toast.success("PDF Downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Mortgage Overpayment Calculator</h1>
            <p className="text-muted-foreground">Discover how much time and interest you can save by paying a little extra each month.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mortgage Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="balance">Current Balance</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input id="balance" type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} className="pl-7" isNumeric />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate">Interest Rate (%)</Label>
                      <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="term">Remaining Term (Years)</Label>
                      <Input id="term" type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} isNumeric />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Overpayment Strategy</CardTitle>
                  <CardDescription>How much extra can you contribute?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly">Monthly Overpayment</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input id="monthly" type="number" value={monthlyOverpayment} onChange={(e) => setMonthlyOverpayment(Number(e.target.value))} className="pl-7" isNumeric />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lump">One-off Lump Sum</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input id="lump" type="number" value={lumpSum} onChange={(e) => setLumpSum(Number(e.target.value))} className="pl-7" isNumeric />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-900 text-white border-none shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <TrendingDown className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Interest Saved</span>
                    </div>
                    <h3 className="text-3xl font-bold font-mono">{formatCurrency(result.savings)}</h3>
                    <p className="text-xs text-slate-500 mt-2">Total savings over the term</p>
                  </CardContent>
                </Card>
                <Card className="bg-primary text-white border-none shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Time Saved</span>
                    </div>
                    <h3 className="text-3xl font-bold font-mono">
                      {result.yearsSaved}y {result.monthsSaved}m
                    </h3>
                    <p className="text-xs text-primary-foreground/60 mt-2">Mortgage-free sooner</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">The "Extra Pay" Effect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-end gap-4 h-32">
                    <div className="flex-grow space-y-2">
                      <div className="text-xs text-muted-foreground">Standard Interest</div>
                      <div className="bg-muted w-full rounded-t-lg transition-all" style={{ height: "100%" }} />
                      <div className="text-xs font-bold font-mono">{formatCurrency(result.totalInterestStandard)}</div>
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="text-xs text-primary font-bold">New Interest</div>
                      <div className="bg-primary w-full rounded-t-lg transition-all" style={{ height: `${(result.totalInterestWithOverpayment / result.totalInterestStandard) * 100}%` }} />
                      <div className="text-xs font-bold font-mono">{formatCurrency(result.totalInterestWithOverpayment)}</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Original Total Repayment</span>
                      <span className="font-mono">{formatCurrency(result.totalInterestStandard + balance)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-primary">
                      <span>New Total Repayment</span>
                      <span className="font-mono">{formatCurrency(result.totalInterestWithOverpayment + balance - lumpSum)}</span>
                    </div>
                  </div>
                </CardContent>
                
                <div className="bg-muted/50 p-6 border-t flex flex-wrap gap-4 items-center justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-background p-1 rounded-xl border">
                    <Button variant={!isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(false)} className="rounded-lg h-10 px-4">Standard</Button>
                    <Button variant={isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(true)} className="rounded-lg h-10 px-4 text-green-600 gap-2"><Leaf className="w-3 h-3" /> Eco</Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button onClick={() => downloadPDF(isEco)} className="gap-2 h-10 rounded-lg px-6 shadow-lg shadow-primary/10"><Download className="w-4 h-4" /> Download</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
