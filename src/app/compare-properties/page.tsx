"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Property, PropertyCard } from "@/components/tools/property-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRightLeft, LayoutGrid, Download, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import jsPDF from "jspdf";

const STORAGE_KEY = "keynest_property_comparison";

export default function ComparePropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProperties(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved properties");
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    }
  }, [properties, mounted]);

  const addProperty = () => {
    if (properties.length >= 4) {
      toast.error("You can compare up to 4 properties at a time.");
      return;
    }
    const newProperty: Property = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Property ${properties.length + 1}`,
      price: 350000,
      beds: 3,
      baths: 2,
      commuteTime: 30,
      epc: "C",
      rating: 3,
    };
    setProperties([...properties, newProperty]);
    toast.success("Property added!");
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
    toast.info("Property removed");
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all properties?")) {
      setProperties([]);
    }
  };

  const downloadComparison = () => {
    const doc = new jsPDF("l", "mm", "a4");
    
    // Minimal Branded Header
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("KeyNest", 20, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("- Property Comparison Report", 48, 25);
    
    doc.setDrawColor(230);
    doc.line(20, 35, 277, 35);

    let x = 20;
    let y = 60;
    
    // Table Headers
    doc.setFillColor(248, 250, 255);
    doc.rect(20, y - 7, 257, 10, "F");
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("FEATURE", x + 5, y);
    
    properties.forEach((p, i) => {
      doc.text(p.name.toUpperCase(), x + 70 + (i * 45), y);
    });
    
    const rows = [
      { label: "Asking Price", key: "price", format: (v: any) => formatCurrency(v) },
      { label: "Bedrooms", key: "beds", format: (v: any) => `${v} Beds` },
      { label: "Bathrooms", key: "baths", format: (v: any) => `${v} Baths` },
      { label: "Commute Time", key: "commuteTime", format: (v: any) => `${v} min` },
      { label: "EPC Rating", key: "epc", format: (v: any) => v },
      { label: "Gut Feel Rating", key: "rating", format: (v: any) => `${v}/5 Stars` },
    ];
    
    rows.forEach((row, idx) => {
      y += 12;
      if (idx % 2 === 0) {
        doc.setFillColor(252, 252, 252);
        doc.rect(20, y - 7, 257, 12, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(row.label, x + 5, y);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      properties.forEach((p, i) => {
        doc.text(row.format((p as any)[row.key]), x + 70 + (i * 45), y);
      });
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated via KeyNest. No login required.`, 20, 200);
    
    doc.save(`KeyNest_Comparison.pdf`);
    toast.success(`PDF Downloaded!`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 flex flex-col md:row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">Compare Properties</h1>
              <p className="text-muted-foreground text-lg">Make an informed decision by comparing your top choices side-by-side.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={addProperty} className="gap-2 h-14 rounded-xl px-6 shadow-lg shadow-primary/20">
                <PlusCircle className="w-5 h-5" /> Add Property
              </Button>
              {properties.length > 0 && (
                <Button onClick={downloadComparison} className="gap-2 h-14 rounded-xl px-6 shadow-lg shadow-primary/10" variant="outline">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              )}
              {properties.length > 0 && (
                <Button variant="ghost" onClick={clearAll} className="text-destructive gap-2 h-14 rounded-xl">
                  <Trash2 className="w-4 h-4" /> Clear All
                </Button>
              )}
            </div>
          </header>

          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-primary/5 rounded-3xl border-2 border-dashed border-primary/20">
              <ArrowRightLeft className="w-16 h-16 text-primary/30 mb-6" />
              <h3 className="text-2xl font-bold mb-2">No properties yet</h3>
              <p className="text-muted-foreground max-w-sm mb-8">
                Start adding properties to see how they stack up against each other.
              </p>
              <Button onClick={addProperty} size="lg" className="rounded-2xl px-10">
                Add Your First Property
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onUpdate={updateProperty}
                  onRemove={removeProperty}
                />
              ))}
              
              {properties.length < 4 && (
                <button 
                  onClick={addProperty}
                  className="flex flex-col items-center justify-center gap-4 h-full min-h-[400px] border-2 border-dashed border-muted-foreground/20 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Add Another Property</span>
                </button>
              )}
            </div>
          )}

          {/* Value Comparison Summary */}
          {properties.length > 1 && (
            <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary" /> Key Findings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Best Value (Lowest Price)</p>
                  <p className="text-2xl font-bold">{properties.reduce((prev, curr) => prev.price < curr.price ? prev : curr).name}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Top Rated (Gut Feel)</p>
                  <p className="text-2xl font-bold">{properties.reduce((prev, curr) => prev.rating > curr.rating ? prev : curr).name}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Best Commute</p>
                  <p className="text-2xl font-bold">{properties.reduce((prev, curr) => prev.commuteTime < curr.commuteTime ? prev : curr).name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
