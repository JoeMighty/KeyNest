"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateOfferStrategy } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Target, TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function OfferCalculatorPage() {
  const [askingPrice, setAskingPrice] = useState<number>(350000);
  const [maxPrice, setMaxPrice] = useState<number>(360000);
  const [marketHeat, setMarketHeat] = useState<"cold" | "neutral" | "hot">("neutral");
  const [condition, setCondition] = useState<"perfect" | "good" | "needs-work" | "renovation">("good");

  const result = useMemo(() => {
    return calculateOfferStrategy(askingPrice, maxPrice, marketHeat, condition);
  }, [askingPrice, maxPrice, marketHeat, condition]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Offer Calculator</h1>
            <p className="text-muted-foreground">Strategic advice on how much to offer based on the property and market conditions.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="asking">Asking Price</Label>
                    <Input id="asking" type="number" value={askingPrice} onChange={(e) => setAskingPrice(Number(e.target.value))} isNumeric />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max">Your Absolute Max Price</Label>
                    <Input id="max" type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} isNumeric />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Market & Condition</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Market Heat</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "cold", label: "Buyer's", icon: TrendingDown },
                        { id: "neutral", label: "Neutral", icon: Minus },
                        { id: "hot", label: "Seller's", icon: TrendingUp },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMarketHeat(m.id as any)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-xs font-medium transition-all ${
                            marketHeat === m.id
                              ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          <m.icon className="w-4 h-4" />
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Property Condition</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "perfect", label: "Turnkey" },
                        { id: "good", label: "Good" },
                        { id: "needs-work", label: "Needs TLC" },
                        { id: "renovation", label: "Full Reno" },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCondition(c.id as any)}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            condition === c.id
                              ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strategy Card */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="bg-primary text-white p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-6 h-6" />
                    <span className="uppercase tracking-widest text-xs font-bold opacity-80">Recommended Initial Offer</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold font-mono mb-4">
                    {result ? formatCurrency(result.recommendedOffer) : "£0"}
                  </h2>
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold">
                    Strategy: {result?.strategy}
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4" /> The Pros
                      </h3>
                      <ul className="space-y-2">
                        {result?.pros.map((pro, i) => (
                          <li key={i} className="text-sm flex gap-2">
                            <span className="text-primary">•</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-red-600 dark:text-red-400">
                        <XCircle className="w-4 h-4" /> The Cons
                      </h3>
                      <ul className="space-y-2">
                        {result?.cons.map((con, i) => (
                          <li key={i} className="text-sm flex gap-2">
                            <span className="text-primary">•</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                
                <div className="bg-muted/50 p-6 border-t flex gap-4">
                  <Button asChild className="w-full">
                    <Link href="/offer-letter">Generate Offer Letter</Link>
                  </Button>
                  <Button variant="outline" className="w-full">Save Strategy</Button>
                </div>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-blue-200">
                  Negotiation Tip
                </h4>
                <p className="text-sm text-slate-700 dark:text-blue-300 leading-relaxed">
                  Always justify your offer. If you're offering below asking, mention specific works needed or recent similar sales in the area. Being a "proceedable" buyer (mortgage in principle ready, no chain) is as good as cash to some sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
