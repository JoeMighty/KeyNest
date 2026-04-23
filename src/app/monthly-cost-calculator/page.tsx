"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateMortgage, calculateMonthlyCost } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Download, PieChart, Home, Zap, ShieldCheck } from "lucide-react";

export default function MonthlyCostPage() {
  // Mortgage Inputs
  const [loanAmount, setLoanAmount] = useState<number>(315000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [term, setTerm] = useState<number>(25);
  
  // Bills Inputs
  const [councilTax, setCouncilTax] = useState<number>(180);
  const [energy, setEnergy] = useState<number>(150);
  const [water, setWater] = useState<number>(40);
  const [broadband, setBroadband] = useState<number>(35);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(50);
  const [maintenance, setMaintenance] = useState<number>(100);

  const result = useMemo(() => {
    const mortgagePayment = calculateMortgage(loanAmount, interestRate, term).monthlyPayment;
    return calculateMonthlyCost(
      mortgagePayment,
      councilTax,
      energy,
      water,
      broadband,
      serviceCharge,
      insurance,
      maintenance
    );
  }, [loanAmount, interestRate, term, councilTax, energy, water, broadband, serviceCharge, insurance, maintenance]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Monthly Cost Calculator</h1>
            <p className="text-muted-foreground">Go beyond the mortgage. Estimate your total monthly outgoings in your new home.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs Section */}
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" /> Mortgage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan">Mortgage Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">£</span>
                      <Input
                        id="loan"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="pl-7"
                        isNumeric
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate">Interest Rate (%)</Label>
                      <Input
                        id="rate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        isNumeric
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="term">Term (Years)</Label>
                      <Input
                        id="term"
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        isNumeric
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" /> Household Bills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="council">Council Tax</Label>
                      <Input id="council" type="number" value={councilTax} onChange={(e) => setCouncilTax(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="energy">Energy</Label>
                      <Input id="energy" type="number" value={energy} onChange={(e) => setEnergy(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water">Water</Label>
                      <Input id="water" type="number" value={water} onChange={(e) => setWater(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="broadband">Internet</Label>
                      <Input id="broadband" type="number" value={broadband} onChange={(e) => setBroadband(Number(e.target.value))} isNumeric />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Others
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sc">Service Charge</Label>
                      <Input id="sc" type="number" value={serviceCharge} onChange={(e) => setServiceCharge(Number(e.target.value))} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ins">Insurance</Label>
                      <Input id="ins" type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} isNumeric />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maint">Maintenance Fund (Monthly)</Label>
                    <Input id="maint" type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} isNumeric />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="overflow-hidden border-2 border-primary/20 sticky top-24">
                <div className="bg-primary text-white p-8">
                  <p className="text-primary-foreground/80 text-sm font-medium mb-1 uppercase tracking-wider">Total Monthly Outgoings</p>
                  <h2 className="text-5xl md:text-6xl font-bold font-mono">
                    {result ? formatCurrency(result.totalMonthly) : "£0"}
                  </h2>
                </div>
                
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Summary Visualization */}
                      <div className="h-4 w-full bg-muted rounded-full overflow-hidden flex">
                        {result && (
                          <>
                            <div className="bg-primary h-full transition-all" style={{ width: `${(result.mortgage / result.totalMonthly) * 100}%` }} title="Mortgage" />
                            <div className="bg-accent h-full transition-all" style={{ width: `${(result.utilities / result.totalMonthly) * 100}%` }} title="Utilities" />
                            <div className="bg-warning h-full transition-all" style={{ width: `${(result.taxes / result.totalMonthly) * 100}%` }} title="Taxes" />
                            <div className="bg-slate-400 h-full transition-all" style={{ width: `${((result.insurance + result.maintenance) / result.totalMonthly) * 100}%` }} title="Other" />
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-y-4">
                        {result?.breakdown.map((item, i) => (
                          <div key={i} className="flex justify-between items-center pr-4 border-r last:border-r-0 border-muted">
                            <div className="space-y-0.5">
                              <p className="text-xs text-muted-foreground uppercase tracking-tight font-bold">{item.name}</p>
                              <p className="font-mono font-medium">{formatCurrency(item.amount)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <div className="bg-muted/50 p-6 border-t flex flex-col md:row gap-4">
                  <Button className="w-full gap-2">
                    <Download className="w-4 h-4" /> Download PDF Report
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <PieChart className="w-4 h-4" /> Compare Scenarios
                  </Button>
                </div>
              </Card>

              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider">Pro Tip: The 1% Rule</h4>
                <p className="text-sm text-muted-foreground">
                  Experts recommend setting aside 1% of your home's value each year for maintenance. For a £350k home, that's roughly £290 per month.
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
