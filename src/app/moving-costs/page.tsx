"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Download, Truck, Box, Trash2, PlusCircle, Leaf, Mail, Key } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface MovingCost {
  id: string;
  name: string;
  amount: number;
}

const defaultMovingCosts: MovingCost[] = [
  { id: "m1", name: "Removals Team", amount: 1200 },
  { id: "m2", name: "Packing Materials", amount: 150 },
  { id: "m3", name: "Mail Redirection", amount: 65 },
  { id: "m4", name: "Professional Cleaning", amount: 250 },
  { id: "m5", name: "Storage (if needed)", amount: 0 },
];

export default function MovingCostsPage() {
  const [costs, setCosts] = useState<MovingCost[]>(defaultMovingCosts);
  const [isEco, setIsEco] = useState(false);

  const total = useMemo(() => {
    return costs.reduce((acc, curr) => acc + curr.amount, 0);
  }, [costs]);

  const addCost = () => {
    const newCost: MovingCost = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Item",
      amount: 0
    };
    setCosts([...costs, newCost]);
  };

  const removeCost = (id: string) => {
    setCosts(costs.filter(c => c.id !== id));
  };

  const updateCost = (id: string, field: "name" | "amount", value: any) => {
    setCosts(costs.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

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
    doc.text("Moving Cost Estimator Breakdown", 20, 38);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Moving Budget: ${formatCurrency(total)}`, 20, 55);
    
    let y = 70;
    doc.setFontSize(12);
    doc.text("Expenses", 20, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    costs.forEach(cost => {
      doc.text(cost.name, 25, y);
      doc.text(formatCurrency(cost.amount), 150, y, { align: "right" });
      y += 7;
    });
    
    doc.save(`KeyNest_Moving_Costs_${ecoMode ? 'eco' : 'full'}.pdf`);
    toast.success("Budget Downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Moving Cost Estimator</h1>
            <p className="text-muted-foreground">Budget for the final step. From removals to mail redirection, track every penny of your move.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <Card className="border-primary/20 shadow-xl shadow-primary/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Moving Budget</CardTitle>
                    <CardDescription>Customize your expenses below</CardDescription>
                  </div>
                  <Button onClick={addCost} className="gap-2 rounded-xl">
                    <PlusCircle className="w-4 h-4" /> Add Item
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {costs.map((cost) => (
                    <div key={cost.id} className="flex gap-3 items-end animate-in fade-in slide-in-from-left-2 duration-300">
                      <div className="flex-grow space-y-2">
                        <Input 
                          placeholder="Item name" 
                          value={cost.name} 
                          onChange={(e) => updateCost(cost.id, "name", e.target.value)}
                          className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary"
                        />
                      </div>
                      <div className="w-36 space-y-2 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">£</span>
                        <Input 
                          type="number" 
                          value={cost.amount} 
                          onChange={(e) => updateCost(cost.id, "amount", Number(e.target.value))}
                          className="pl-8 h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary font-mono font-bold"
                          isNumeric
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeCost(cost.id)} className="text-destructive h-12 w-12 hover:bg-destructive/10 rounded-xl">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-slate-900 text-white overflow-hidden shadow-2xl border-none">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Total Moving Budget</h3>
                  </div>
                  <h2 className="text-5xl font-bold font-mono mb-8">{formatCurrency(total)}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/5 p-4 rounded-xl">
                      <Box className="w-5 h-5 text-primary" />
                      <span>{costs.length} individual items tracked</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/5 p-4 rounded-xl">
                      <Mail className="w-5 h-5 text-primary" />
                      <span>Don't forget mail redirection!</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-center">
                  <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-white/10">
                    <Button variant={!isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(false)} className="rounded-lg h-10 px-4">Standard</Button>
                    <Button variant={isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(true)} className="rounded-lg h-10 px-4 text-green-400 gap-2"><Leaf className="w-3 h-3" /> Eco</Button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <Button onClick={() => downloadPDF(isEco)} className="gap-2 h-10 rounded-lg px-6 bg-primary text-white hover:bg-primary/90"><Download className="w-4 h-4" /> Download</Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 flex gap-4">
                  <Key className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Unlock Phase 3</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Once you move in, you'll need our **Snagging Checklist** and **Home Setup** tools, coming soon in Phase 3.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
