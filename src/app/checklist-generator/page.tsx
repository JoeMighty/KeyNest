"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ftbChecklist } from "@/data/checklists";
import { CheckSquare, Download, Printer, ListTodo } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const pdfRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const downloadPDF = async () => {
    if (!pdfRef.current) return;
    toast.promise(new Promise(async (resolve) => {
      const element = pdfRef.current!;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("KeyNest-Checklist.pdf");
      resolve(true);
    }), {
      loading: "Preparing your checklist...",
      success: "Checklist downloaded!",
      error: "Failed to generate PDF",
    });
  };

  const categories = ["Financials", "Search", "Legal", "Completion"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 flex flex-col md:row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">First-Time Buyer Checklist</h1>
              <p className="text-muted-foreground">Track your progress from saving for a deposit to collecting your keys.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadPDF} className="gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>
          </header>

          <div ref={pdfRef} className="space-y-8 bg-background p-4 md:p-8 rounded-xl">
            <div className="hidden pdf-only flex items-center gap-2 mb-8">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
               <span className="font-bold text-xl">KeyNest</span>
            </div>

            {categories.map((cat) => (
              <div key={cat} className="space-y-4">
                <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full" />
                  {cat}
                </h2>
                <div className="grid gap-3">
                  {ftbChecklist.filter(i => i.category === cat).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                        checkedItems.includes(item.id) 
                          ? "bg-primary/5 border-primary/20" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        checkedItems.includes(item.id) ? "bg-primary border-primary" : "border-muted-foreground"
                      }`}>
                        {checkedItems.includes(item.id) && <CheckSquare className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${checkedItems.includes(item.id) ? "line-through opacity-60" : ""}`}>
                          {item.task}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-8">
                <ListTodo className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                <h3 className="font-bold mb-2">Need a custom checklist?</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                  Phase 2 will allow you to add custom items and save your progress to your browser.
                </p>
                <Button variant="outline">Sign up for updates</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
