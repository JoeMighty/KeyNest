"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateStampDuty } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Download, Share2, Info } from "lucide-react";

export default function StampDutyPage() {
  const [price, setPrice] = useState<number>(350000);
  const [buyerType, setBuyerType] = useState<"first-time" | "mover" | "additional">("mover");

  const result = useMemo(() => {
    return calculateStampDuty(price, buyerType);
  }, [price, buyerType]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Stamp Duty Calculator (UK)</h1>
            <p className="text-muted-foreground">Calculate how much Stamp Duty Land Tax (SDLT) you'll pay on your property purchase.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Inputs Section */}
            <div className="md:col-span-5 lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Purchase Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Property Price</Label>
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

                  <div className="space-y-3">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: "first-time", label: "First-time buyer" },
                        { id: "mover", label: "Existing home owner" },
                        { id: "additional", label: "Additional property / Buy-to-let" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setBuyerType(type.id as any)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                            buyerType === type.id
                              ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  The calculator uses the latest 2024/25 SDLT rates for England and Northern Ireland.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="md:col-span-7 lg:col-span-8 space-y-6">
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="bg-primary text-primary-foreground p-8 text-center md:text-left flex flex-col md:row items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium opacity-90 mb-1">Total Stamp Duty Payable</p>
                    <h2 className="text-4xl md:text-5xl font-bold font-mono">
                      {result ? formatCurrency(result.totalTax) : "£0"}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium opacity-90 mb-1">Effective Tax Rate</p>
                    <p className="text-2xl font-bold font-mono">
                      {result ? result.effectiveRate.toFixed(2) : "0.00"}%
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      Tax Breakdown
                    </h3>
                    <div className="space-y-3">
                      {result?.bands.map((band, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">{band.threshold}</p>
                            <p className="text-xs text-muted-foreground">{band.rate}% Rate</p>
                          </div>
                          <p className="font-mono font-medium">{formatCurrency(band.tax)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <div className="bg-muted/50 p-4 border-t flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" /> Copy Link
                  </Button>
                </div>
              </Card>

              {/* Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What is Stamp Duty?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Stamp Duty Land Tax (SDLT) is a tax you must pay when buying a property or land over a certain price in England and Northern Ireland. Scotland has LBTT and Wales has LTT.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">When do I pay it?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      You must send an SDLT return to HMRC and pay the tax within 14 days of completion. Usually, your solicitor will handle this for you.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
