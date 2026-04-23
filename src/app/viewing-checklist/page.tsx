"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckSquare, Download, Info, Plus, Trash2 } from "lucide-react";
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

interface CustomItem {
  id: string;
  category: string;
  task: string;
  description: string;
}

export default function ViewingChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const toggleItem = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addCustomItem = () => {
    if (!newTask.trim()) return;
    const newItem: CustomItem = {
      id: `custom_${Math.random().toString(36).substr(2, 9)}`,
      category: "Personal Checks",
      task: newTask,
      description: newDesc,
    };
    setCustomItems([...customItems, newItem]);
    setNewTask("");
    setNewDesc("");
    toast.success("Custom task added!");
  };

  const removeCustomItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomItems(customItems.filter(i => i.id !== id));
    setCheckedItems(checkedItems.filter(i => i !== id));
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
    doc.text("- House Viewing Checklist", 48, 25);
    
    doc.setDrawColor(230);
    doc.line(20, 35, 190, 35);

    let y = 50;
    
    const allSections = [...viewingChecklistData];
    if (customItems.length > 0) {
      allSections.push({
        category: "Personal Checks",
        items: customItems
      });
    }

    allSections.forEach(section => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(section.category, 20, y);
      y += 8;
      
      section.items.forEach(item => {
        const isChecked = checkedItems.includes(item.id);
        doc.setDrawColor(200);
        doc.rect(20, y - 4, 4, 4); 
        if (isChecked) {
          doc.setDrawColor(37, 99, 235);
          doc.line(20, y - 4, 24, y);
          doc.line(24, y - 4, 20, y);
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(isChecked ? 150 : 0);
        doc.text(item.task, 28, y);
        y += 5;
        
        if (item.description) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          doc.text(item.description, 28, y);
          y += 10;
        } else {
          y += 5;
        }
        
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
      });
      y += 5;
    });
    
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`Generated via KeyNest. No login required.`, 20, 285);
    
    doc.save(`KeyNest_Viewing_Checklist.pdf`);
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
            <Button onClick={downloadPDF} size="lg" className="gap-2 h-14 rounded-2xl px-8 shadow-xl shadow-primary/20 bg-primary text-white hover:bg-primary/90">
              <Download className="w-5 h-5" /> Download PDF
            </Button>
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

            {/* Custom Items Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-purple-500 rounded-full" />
                Personal Checks
              </h2>
              <div className="grid gap-4 mb-6">
                {customItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer group ${
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
                    <div className="flex-grow">
                      <h3 className={`font-bold text-lg mb-1 ${checkedItems.includes(item.id) ? "line-through opacity-60" : ""}`}>
                        {item.task}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => removeCustomItem(item.id, e)}
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Card className="border-dashed border-2 bg-muted/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex-grow space-y-4 w-full">
                      <Input 
                        placeholder="Task name (e.g., Check mobile signal)" 
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="bg-background"
                      />
                      <Input 
                        placeholder="Optional description" 
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <Button onClick={addCustomItem} className="w-full md:w-auto h-10 shrink-0 gap-2">
                      <Plus className="w-4 h-4" /> Add Check
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
