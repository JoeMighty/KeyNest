"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ftbChecklist } from "@/data/checklists";
import { CheckSquare, Download, ListTodo, Leaf } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isEco, setIsEco] = useState(false);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const downloadPDF = (ecoMode: boolean = false) => {
    const doc = new jsPDF();
    
    // Minimal Header Branding
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("KeyNest", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("First-Time Buyer Checklist", 20, 32);
    
    if (ecoMode) {
      doc.setTextColor(34, 197, 94);
      doc.setFontSize(8);
      doc.text("Eco-friendly Edition", 20, 36);
    }

    const categories = ["Financials", "Search", "Legal", "Completion"];
    let y = 50;

    categories.forEach(cat => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(cat, 20, y);
      y += 8;
      
      const items = ftbChecklist.filter(i => i.category === cat);
      items.forEach(item => {
        const isChecked = checkedItems.includes(item.id);
        
        // Draw Minimal Checkbox
        doc.setDrawColor(200);
        doc.rect(20, y - 4, 4, 4);
        if (isChecked) {
          doc.setDrawColor(0, 0, 0);
          doc.line(20, y - 4, 24, y);
          doc.line(24, y - 4, 20, y);
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(isChecked ? 150 : 0);
        doc.text(item.task, 28, y);
        y += 5;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(item.description, 28, y);
        y += 10;
        
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
      });
      y += 5;
    });
    
    // Minimal Footer
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`Generated via KeyNest. No login required.`, 20, 285);
    
    doc.save(`KeyNest_Checklist.pdf`);
    toast.success("Checklist Downloaded!");
  };

  const categories = ["Financials", "Search", "Legal", "Completion"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 flex flex-col md:row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">First-Time Buyer Checklist</h1>
              <p className="text-muted-foreground text-lg">Track your progress from saving for a deposit to collecting your keys.</p>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl border">
              <Button variant={!isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(false)} className="rounded-lg h-10 px-4">Standard</Button>
              <Button variant={isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(true)} className="rounded-lg h-10 px-4 text-green-600 gap-2"><Leaf className="w-3 h-3" /> Eco</Button>
              <div className="w-px h-4 bg-border mx-1" />
              <Button onClick={() => downloadPDF(isEco)} className="gap-2 h-10 rounded-lg px-6 shadow-lg shadow-primary/10 bg-primary text-white hover:bg-primary/90"><Download className="w-4 h-4" /> Download</Button>
            </div>
          </header>

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  {cat}
                </h2>
                <div className="grid gap-4">
                  {ftbChecklist.filter(i => i.category === cat).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                        checkedItems.includes(item.id) 
                          ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                          : "border-border hover:border-primary/40 bg-card"
                      }`}
                    >
                      <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                        checkedItems.includes(item.id) ? "bg-primary border-primary" : "border-muted-foreground/30"
                      }`}>
                        {checkedItems.includes(item.id) && <CheckSquare className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg mb-1 ${checkedItems.includes(item.id) ? "line-through opacity-60" : ""}`}>
                          {item.task}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-muted/30 border-dashed border-2">
              <CardContent className="p-12">
                <ListTodo className="w-16 h-16 mx-auto mb-6 text-primary opacity-30" />
                <h3 className="text-2xl font-bold mb-4">Need a custom checklist?</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                  Phase 3 will allow you to add custom items and save your progress to your browser.
                </p>
                <Button variant="outline" size="lg" className="rounded-xl px-10">Sign up for updates</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
