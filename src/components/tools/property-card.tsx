"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Star, MapPin, PoundSterling, Bed, Bath, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Property {
  id: string;
  name: string;
  price: number;
  beds: number;
  baths: number;
  commuteTime: number;
  epc: string;
  rating: number;
}

interface PropertyCardProps {
  property: Property;
  onUpdate: (id: string, updates: Partial<Property>) => void;
  onRemove: (id: string) => void;
}

export function PropertyCard({ property, onUpdate, onRemove }: PropertyCardProps) {
  return (
    <Card className="relative overflow-hidden border-2 border-primary/5 hover:border-primary/20 transition-all shadow-lg group">
      <CardHeader className="bg-primary/5 dark:bg-primary/10 pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-grow">
            <Input 
              value={property.name} 
              onChange={(e) => onUpdate(property.id, { name: e.target.value })}
              className="font-bold text-lg h-9 bg-transparent border-none p-0 focus-visible:ring-0"
              placeholder="Property Nickname"
            />
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Entry {property.id.slice(0, 3)}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(property.id)}
            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Asking Price</Label>
            <div className="relative">
              <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                type="number" 
                value={property.price} 
                onChange={(e) => onUpdate(property.id, { price: Number(e.target.value) })}
                className="pl-9 h-10 font-mono font-bold text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                <Bed className="w-3 h-3" /> Beds
              </Label>
              <Input 
                type="number" 
                value={property.beds} 
                onChange={(e) => onUpdate(property.id, { beds: Number(e.target.value) })}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                <Bath className="w-3 h-3" /> Baths
              </Label>
              <Input 
                type="number" 
                value={property.baths} 
                onChange={(e) => onUpdate(property.id, { baths: Number(e.target.value) })}
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                Commute (min)
              </Label>
              <Input 
                type="number" 
                value={property.commuteTime} 
                onChange={(e) => onUpdate(property.id, { commuteTime: Number(e.target.value) })}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                EPC Rating
              </Label>
              <select 
                value={property.epc} 
                onChange={(e) => onUpdate(property.id, { epc: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-3 block">Gut Feel Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onUpdate(property.id, { rating: star })}
                className="transition-transform active:scale-90"
              >
                <Star 
                  className={cn(
                    "w-6 h-6 transition-colors",
                    star <= property.rating ? "fill-primary text-primary" : "text-muted-foreground/30 hover:text-primary/50"
                  )} 
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
