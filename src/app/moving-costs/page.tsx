"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Download, PlusCircle, Trash2, Truck } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface MovingItem {
  id: string;
  name: string;
  amount: number;
}

const defaultItems: MovingItem[] = [
  { id: "1", name: "Removal Company", amount: 800 },
  { id: "2", name: "Packing Materials", amount: 100 },
  { id: "3", name: "End of Tenancy Clean", amount: 150 },
  { id: "4", name: "Mail Redirection", amount: 70 },
  { id: "5", name: "New Home Essentials", amount: 200 },
];

export default function MovingCostsPage() {
  const [items, setItems] = useState<MovingItem[]>(defaultItems);

  const total = useMemo(() => items.reduce((acc, curr) => acc + curr.amount, 0), [items]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), name: "New Item", amount: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, updates: Partial<MovingItem>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Minimal Branded Header
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("KeyNest", 20, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("- Moving Cost Estimate", 48, 25);
    
    doc.setDrawColor(230);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Moving Budget: ${formatCurrency(total)}`, 20, 50);

    let y = 65;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    items.forEach(item => {
      doc.text(item.name, 20, y);
      doc.text(formatCurrency(item.amount), 150, y, { align: "right" });
      y += 8;
      
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`KeyNest_Moving_Costs.pdf`);
    toast.success("Download started!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 flex flex-col items-center justify-center gap-6 text-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3">Moving Cost Estimator</h1>
              <p className="text-muted-foreground text-lg">Budget for the final push. Don't let hidden moving costs catch you by surprise.</p>
            </div>
            <Button onClick={downloadPDF} size="lg" className="gap-2 h-14 rounded-2xl px-8 shadow-xl shadow-primary/20 bg-primary text-white hover:bg-primary/90">
              <Download className="w-5 h-5" /> Download PDF
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <Card className="rounded-[2rem] border-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Cost Breakdown</CardTitle>
                  <Button variant="ghost" size="icon" onClick={addItem} className="text-primary hover:bg-primary/10">
                    <PlusCircle className="w-6 h-6" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center group">
                      <div className="flex-grow">
                        <Input 
                          value={item.name} 
                          onChange={(e) => updateItem(item.id, { name: e.target.value })}
                          className="font-medium bg-muted/30 border-none h-12 rounded-xl focus:bg-background transition-all"
                        />
                      </div>
                      <div className="w-32 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">£</span>
                        <Input 
                          type="number" 
                          value={item.amount} 
                          onChange={(e) => updateItem(item.id, { amount: Number(e.target.value) })}
                          className="pl-7 font-mono h-12 rounded-xl bg-muted/30 border-none focus:bg-background transition-all"
                          isNumeric
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-dashed border-2 h-14 rounded-2xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                    onClick={addItem}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Custom Cost
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card className="bg-slate-900 text-white rounded-[2rem] p-8 border-none sticky top-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Total Budget</h3>
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Moving Day essentials</p>
                  </div>
                </div>
                
                <div className="text-5xl font-black font-mono mb-8 tracking-tighter">
                  {formatCurrency(total)}
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                   <p className="text-sm text-slate-400 italic">
                     "Don't forget to include the cost of furnishing your new home!"
                   </p>
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
