"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Download, Mail, Send } from "lucide-react";

export default function OfferLetterPage() {
  const [details, setDetails] = useState({
    agentName: "Estate Agent Name",
    propertyAddress: "123 Example Street, City",
    offerAmount: "350,000",
    buyerName: "Your Name",
    buyerStatus: "First-time buyer with no chain",
    depositAmount: "35,000",
    solicitorDetails: "TBC",
  });

  const updateDetail = (key: string, value: string) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  const letterText = `
Dear ${details.agentName},

RE: Offer for ${details.propertyAddress}

I would like to make a formal offer of £${details.offerAmount} for the above property.

My Position:
- I am a ${details.buyerStatus}.
- My mortgage in principle is already in place.
- I have a deposit of £${details.depositAmount} ready to proceed.

Solicitor Details:
${details.solicitorDetails}

I am keen to move quickly and can instruct my solicitor immediately upon acceptance of the offer. Please let the vendors know that I am highly motivated and proceedable.

I look forward to hearing from you.

Best regards,

${details.buyerName}
  `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letterText);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Offer Letter Generator</h1>
            <p className="text-muted-foreground">Professional templates to help you secure your dream home.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Offer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent">Estate Agent / Seller</Label>
                    <Input id="agent" value={details.agentName} onChange={(e) => updateDetail("agentName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Property Address</Label>
                    <Input id="address" value={details.propertyAddress} onChange={(e) => updateDetail("propertyAddress", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Offer Amount (£)</Label>
                      <Input id="amount" value={details.offerAmount} onChange={(e) => updateDetail("offerAmount", e.target.value)} isNumeric />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deposit">Deposit (£)</Label>
                      <Input id="deposit" value={details.depositAmount} onChange={(e) => updateDetail("depositAmount", e.target.value)} isNumeric />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Your Status</Label>
                    <Input id="status" value={details.buyerStatus} onChange={(e) => updateDetail("buyerStatus", e.target.value)} placeholder="e.g. First-time buyer, No chain" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyer">Your Name</Label>
                    <Input id="buyer" value={details.buyerName} onChange={(e) => updateDetail("buyerName", e.target.value)} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Letter Preview</CardTitle>
                      <CardDescription>This is how your offer will appear.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
                        <Copy className="w-4 h-4" /> Copy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-8 bg-slate-50 dark:bg-slate-900/50 font-serif whitespace-pre-wrap text-sm leading-relaxed">
                  {letterText}
                </CardContent>
                <div className="p-6 border-t bg-muted/30 flex gap-4">
                  <Button className="w-full gap-2">
                    <Mail className="w-4 h-4" /> Email Agent
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" /> Download PDF
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
