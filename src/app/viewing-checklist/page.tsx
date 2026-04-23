"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Download, Home, Info, Leaf, MapPin } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

const viewingChecklistData = [
  {
    category: "Internal Condition",
    items: [
      { id: "v1", task: "Damp & Mould", description: "Look for stains on ceilings, flaky wallpaper, or a musty smell." },
      { id: "v2", task: "Water Pressure", description: "Turn on taps and flush toilets to check the flow." },
      { id: "v3", task: "Cracks in Walls", description: "Small hairline cracks are normal; large diagonal ones are a red flag." },
      { id: "v4", task: "Window Condition", description: "Check for double glazing and any condensation between panes." },
      { id: "v5", task: "Heating System", description: "How old is the boiler? Do the radiators look rusty?" },
    ]
  },
  {
    category: "External & Structural",
    items: [
      { id: "v6", task: "Roof & Gutters", description: "Are there missing tiles? Do the gutters look blocked or leaky?" },
      { id: "v7", task: "Garden & Boundaries", description: "Check the state of fences and look for invasive plants like Japanese Knotweed." },
      { id: "v8", task: "Brickwork & Pointing", description: "Look for crumbling bricks or gaps in the mortar." },
    ]
  },
  {
    category: "The Local Area",
    items: [
      { id: "v9", task: "Parking", description: "Is there enough space? Are there permit restrictions?" },
      { id: "v10", task: "Street Lighting", description: "Does the area feel safe? Visit at night if possible." },
      { id: "v11", task: "Noise Levels", description: "Listen for nearby traffic, trains, or noisy businesses." },
    ]
  }
];

export default function ViewingChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isEco, setIsEco] = useState(false);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
    doc.text("House Viewing Checklist", 20, 38);

    let y = 55;
    viewingChecklistData.forEach(section => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(section.category, 20, y);
      y += 8;
      
      section.items.forEach(item => {
        const isChecked = checkedItems.includes(item.id);
        doc.rect(20, y - 4, 4, 4); // Checkbox
        if (isChecked) {
          doc.line(20, y - 4, 24, y);
          doc.line(24, y - 4, 20, y);
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(item.task, 28, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(item.description, 28, y);
        y += 10;
        
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
      y += 5;
    });
    
    doc.save(`KeyNest_Viewing_Checklist_${ecoMode ? 'eco' : 'full'}.pdf`);
    toast.success("Checklist Downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 flex flex-col md:row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">House Viewing Checklist</h1>
              <p className="text-muted-foreground text-lg">Don't let excitement cloud your judgment. Bring this list to every viewing.</p>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl border">
              <Button variant={!isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(false)} className="rounded-lg h-10 px-4">Standard</Button>
              <Button variant={isEco ? "secondary" : "ghost"} size="sm" onClick={() => setIsEco(true)} className="rounded-lg h-10 px-4 text-green-600 gap-2"><Leaf className="w-3 h-3" /> Eco</Button>
              <div className="w-px h-4 bg-border mx-1" />
              <Button onClick={() => downloadPDF(isEco)} className="gap-2 h-10 rounded-lg px-6 shadow-lg shadow-primary/10 bg-primary text-white hover:bg-primary/90"><Download className="w-4 h-4" /> Download</Button>
            </div>
          </header>

          <div className="space-y-12">
            {viewingChecklistData.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  {section.category}
                </h2>
                <div className="grid gap-4">
                  {section.items.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                        checkedItems.includes(item.id) 
                          ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                          : "border-border hover:border-primary/40 bg-card hover:shadow-xl"
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

          <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:row items-center gap-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
               <Info className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Pro Tip: Visit twice</h3>
              <p className="text-slate-400">
                Always visit a property at least twice. Once during the day to see the condition, and once in the evening to check for noise, parking issues, and the general vibe of the street.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
