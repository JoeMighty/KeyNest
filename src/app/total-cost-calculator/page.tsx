"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateTotalCost, calculateStampDuty } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Download, Wallet, Plus, Info } from "lucide-react";

export default function TotalCostPage() {
  const [price, setPrice] = useState<number>(350000);
  const [deposit, setDeposit] = useState<number>(35000);
  const [legal, setLegal] = useState<number>(1500);
  const [survey, setSurvey] = useState<number>(500);
  const [mortgage, setMortgage] = useState<number>(999);
  const [removals, setRemovals] = useState<number>(800);
  const [other, setOther] = useState<number>(1000);
  const [buyerType, setBuyerType] = useState<"first-time" | "mover" | "additional">("mover");

  const result = useMemo(() => {
    const stampDuty = calculateStampDuty(price, buyerType).totalTax;
    return calculateTotalCost(price, deposit, stampDuty, { legal, survey, mortgage, removals, other });
  }, [price, deposit, legal, survey, mortgage, removals, other, buyerType]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Total Cost of Buying</h1>
            <p className="text-muted-foreground">Estimate exactly how much cash you need to save before you can move in.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs Section */}
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Purchase & Deposit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Purchase Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="pl-7"
                        isNumeric
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="deposit">Deposit</Label>
                      <span className="text-xs text-muted-foreground">({Math.round((deposit / price) * 100)}%)</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input
                        id="deposit"
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(Number(e.target.value))}
                        className="pl-7"
                        isNumeric
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Estimated Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="legal">Legal Fees</Label>
                      <Input id="legal" type="number" value={legal} onChange={(e) => setLegal(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="survey">Survey</Label>
                      <Input id="survey" type="number" value={survey} onChange={(e) => setSurvey(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mortgage">Mortgage Fees</Label>
                      <Input id="mortgage" type="number" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="removals">Removals</Label>
                      <Input id="removals" type="number" value={removals} onChange={(e) => setRemovals(Number(e.target.value))} isNumeric />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="other">Other (Repairs, Insurance, etc.)</Label>
                    <Input id="other" type="number" value={other} onChange={(e) => setOther(Number(e.target.value))} isNumeric />
                  </div>
                </CardContent>
              </Card>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Don't forget to include the cost of furnishing your new home!
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="bg-slate-900 text-white p-8">
                  <div className="flex flex-col md:row items-center justify-between gap-6">
                    <div>
                      <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Cash Required</p>
                      <h2 className="text-4xl md:text-6xl font-bold font-mono">
                        {result ? formatCurrency(result.totalCashNeeded) : "£0"}
                      </h2>
                    </div>
                    <div className="bg-primary p-4 rounded-2xl flex flex-col items-center justify-center min-w-[140px]">
                      <Wallet className="w-8 h-8 mb-1" />
                      <span className="text-xs uppercase font-bold tracking-widest">Ready to Buy?</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  <div className="p-6 space-y-8">
                    {result?.breakdown.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                          {section.category}
                        </h3>
                        <div className="space-y-3">
                          {section.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center group">
                              <span className="text-sm group-hover:text-primary transition-colors">{item.name}</span>
                              <span className="font-mono font-medium">{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-6 border-t flex justify-between items-center">
                      <span className="font-bold">Total Fees & Taxes</span>
                      <span className="font-mono font-bold text-xl">{result ? formatCurrency(result.totalFees) : "£0"}</span>
                    </div>
                  </div>
                </CardContent>
                
                <div className="bg-muted/50 p-6 border-t flex flex-wrap gap-4 items-center justify-center md:justify-start">
                  <Button className="gap-2 px-8">
                    <Download className="w-4 h-4" /> Download Full Breakdown
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" /> Save to Browser
                  </Button>
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
