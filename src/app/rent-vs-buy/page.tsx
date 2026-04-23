"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateRentVsBuy } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Scale, TrendingUp, TrendingDown, Info, Home, Building } from "lucide-react";

export default function RentVsBuyPage() {
  const [price, setPrice] = useState<number>(350000);
  const [deposit, setDeposit] = useState<number>(35000);
  const [rent, setRent] = useState<number>(1500);
  const [rate, setRate] = useState<number>(4.5);
  const [appreciation, setAppreciation] = useState<number>(3);
  const [maint, setMaint] = useState<number>(1500);
  const [fees, setFees] = useState<number>(5000);
  const [years, setYears] = useState<number>(5);

  const result = useMemo(() => {
    return calculateRentVsBuy(price, deposit, rent, rate, appreciation, maint, fees, years);
  }, [price, deposit, rent, rate, appreciation, maint, fees, years]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Rent vs Buy Calculator</h1>
            <p className="text-muted-foreground">Compare the long-term financial impact of renting vs owning a home.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Buying Scenario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Property Price</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} isNumeric />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dep">Deposit</Label>
                      <Input id="dep" type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate">Mortgage Rate %</Label>
                      <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} isNumeric />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Renting Scenario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rent">Monthly Rent</Label>
                    <Input id="rent" type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} isNumeric />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Time Period (Years)</Label>
                    <Input id="years" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} isNumeric />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Market Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app">Property Appreciation (%/year)</Label>
                    <Input id="app" type="number" step="0.5" value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))} isNumeric />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className={`p-8 text-white ${result?.betterOption === "buy" ? "bg-accent" : "bg-primary"}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Scale className="w-6 h-6" />
                    <span className="uppercase tracking-widest text-xs font-bold opacity-80">Better Financial Choice</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
                    {result?.betterOption === "buy" ? "Buying is Better" : "Renting is Better"}
                  </h2>
                  <p className="text-lg opacity-90">
                    Over {years} years, buying could save you <span className="font-bold">{result ? formatCurrency(result.difference) : "£0"}</span>.
                  </p>
                </div>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-wider">
                        <Building className="w-4 h-4" /> Renting Cost
                      </div>
                      <p className="text-3xl font-bold font-mono">{result ? formatCurrency(result.totalRentCost) : "£0"}</p>
                      <p className="text-xs text-muted-foreground">Total rent paid over {years} years.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-wider">
                        <Home className="w-4 h-4" /> Buying Cost
                      </div>
                      <p className="text-3xl font-bold font-mono">{result ? formatCurrency(result.totalBuyCost) : "£0"}</p>
                      <p className="text-xs text-muted-foreground">Interest + Fees + Maintenance - Appreciation.</p>
                    </div>
                  </div>

                  <div className="mt-12 space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider">Equity Growth (Buying)</h3>
                    <div className="h-40 w-full flex items-end gap-2 px-2">
                      {result?.yearlyBreakdown.map((y, i) => (
                        <div key={i} className="flex-grow flex flex-col items-center gap-2 group">
                          <div 
                            className="w-full bg-accent/40 group-hover:bg-accent transition-all rounded-t" 
                            style={{ height: `${(y.equity / (result?.yearlyBreakdown[result.yearlyBreakdown.length-1].equity || 1)) * 100}%` }}
                          />
                          <span className="text-[10px] font-bold opacity-50">Y{y.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted p-6 rounded-xl">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                   <Info className="w-4 h-4" /> Consideration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <p className="font-bold text-foreground">Why Buy?</p>
                    <p>Fixed payments, potential for capital gains, and eventual mortgage-free living.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-foreground">Why Rent?</p>
                    <p>Flexibility to move, no maintenance responsibility, and deposit can be invested elsewhere.</p>
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
