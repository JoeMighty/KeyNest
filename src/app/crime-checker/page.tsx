"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  Search, 
  MapPin, 
  Info, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  History,
  ShieldCheck
} from "lucide-react";
import { getCoordsFromPostcode, getCrimes, groupCrimesByCategory, CrimeData, PostcodeResult } from "@/lib/crime";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Dynamically import the map to avoid SSR issues with Leaflet
const CrimeMap = dynamic(() => import("@/components/tools/crime-map"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted animate-pulse rounded-2xl flex items-center justify-center">Loading Interactive Map...</div>
});

export default function CrimeChecker() {
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState(500);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    location: PostcodeResult;
    crimes: CrimeData[];
    summary: { name: string; count: number }[];
  } | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!postcode) return;

    setLoading(true);
    try {
      const location = await getCoordsFromPostcode(postcode);
      if (!location) {
        toast.error("Invalid postcode. Please check and try again.");
        return;
      }

      const crimes = await getCrimes(location.latitude, location.longitude);
      
      // Filter crimes by the selected radius (if they have coordinates)
      // The API returns crimes in a roughly 1-mile grid, so we filter locally for precision.
      const filteredCrimes = crimes.filter(crime => {
        const dLat = parseFloat(crime.location.latitude) - location.latitude;
        const dLng = parseFloat(crime.location.longitude) - location.longitude;
        // Approximation: 1 degree ~ 111km
        const distance = Math.sqrt(dLat * dLat + dLng * dLng) * 111000;
        return distance <= radius;
      });

      const summary = groupCrimesByCategory(filteredCrimes);
      
      setResults({ location, crimes: filteredCrimes, summary });
      toast.success(`Found ${filteredCrimes.length} incidents within ${radius}m.`);
    } catch (error) {
      toast.error("Could not fetch crime data. The police API might be down.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Neighborhood Crime Checker</h1>
              <p className="text-muted-foreground text-lg">
                Enter a postcode to see official crime statistics for that area. Transparency is the first step to choosing the right home.
              </p>
            </div>
          </header>

          {/* Professional Search Bar */}
          <div className="mb-12">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              <Card className="relative border-2 border-primary/10 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background/80 backdrop-blur-xl">
                <CardContent className="p-2">
                  <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-2">
                    {/* Postcode Input */}
                    <div className="flex-grow flex items-center px-6 gap-4 min-w-0 w-full lg:w-auto">
                      <MapPin className="w-6 h-6 text-primary shrink-0" />
                      <div className="flex-grow">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block mb-0.5 ml-0.5">Postcode</Label>
                        <Input 
                          placeholder="SW1A 1AA" 
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                          className="h-10 p-0 border-none bg-transparent text-xl font-bold focus-visible:ring-0 placeholder:text-muted-foreground/30 shadow-none"
                        />
                      </div>
                    </div>

                    {/* Vertical Divider (Desktop) */}
                    <div className="hidden lg:block w-px h-12 bg-muted/50" />

                    {/* Radius Control */}
                    <div className="w-full lg:w-64 px-6 py-2">
                      <div className="flex justify-between items-center mb-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Search Area</Label>
                        <span className="text-xs font-black font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">{radius}m</span>
                      </div>
                      <Slider 
                        value={[radius]} 
                        onValueChange={([v]) => setRadius(v)}
                        min={250}
                        max={2000}
                        step={250}
                        className="py-1 cursor-pointer"
                      />
                    </div>

                    {/* Search Button */}
                    <Button 
                      type="submit"
                      disabled={loading || !postcode}
                      className="w-full lg:w-auto h-16 lg:h-16 px-10 rounded-[1.8rem] text-lg font-black gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary text-white"
                    >
                      {loading ? "Searching..." : "Check Safety"}
                      <Search className="w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>


          {results ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stats & Breakdown */}
                <div className="lg:col-span-5 space-y-6">
                  <Card className="bg-primary text-white border-none shadow-xl">
                    <CardContent className="p-8">
                      <p className="text-primary-foreground/80 text-sm font-medium mb-1 uppercase tracking-wider">Total Reports (Last Month)</p>
                      <h2 className="text-6xl font-black font-mono">{results.crimes.length}</h2>
                      <div className="mt-6 flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/10">
                        <TrendingUp className="w-4 h-4" />
                        <p className="text-sm">In {results.location.admin_district}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <History className="w-5 h-5 text-primary" /> Incident Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {results.summary.length > 0 ? (
                        results.summary.map((item) => (
                          <div key={item.name} className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{item.name}</span>
                              <span className="font-mono text-muted-foreground">{item.count}</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary/60 transition-all duration-1000" 
                                style={{ width: `${(item.count / results.crimes.length) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">No specific incidents recorded in the search radius.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Map Section */}
                <div className="lg:col-span-7 space-y-6">
                  <Card className="overflow-hidden border-2 shadow-lg">
                    <CrimeMap 
                      lat={results.location.latitude} 
                      lng={results.location.longitude} 
                      crimes={results.crimes}
                      radius={radius}
                    />
                    <CardContent className="p-4 bg-muted/20 border-t flex items-center justify-between">
                      <p className="text-xs text-muted-foreground italic">
                        * Markers represent anonymised approximate locations provided by the police.
                      </p>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-[10px]">{radius}m Radius</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl flex gap-4">
                    <Info className="w-6 h-6 text-blue-600 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-blue-900 dark:text-blue-100">About this data</h4>
                      <p className="text-sm text-blue-800/80 dark:text-blue-100/80 leading-relaxed">
                        Data is sourced directly from data.police.uk and covers the most recent reported month. Note that "incident" doesn't always mean a conviction, and crime density is naturally higher in city centers and transport hubs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale mt-12">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-dashed border-2">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse mb-2" />
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted animate-pulse rounded-xl" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Educational Footer */}
          <div className="mt-20 border-t pt-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Safety Tips for Home Buyers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-bold">Visit at Different Times</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">A neighborhood can feel very different on a Tuesday morning compared to a Friday night. Visit at least 3 times.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="font-bold">Check Street Lighting</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Well-lit streets are a major deterrent for anti-social behavior. Check the condition of lamp posts near the property.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold">Look for Security Signs</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Active Neighborhood Watch signs or many properties with alarms/CCTV are often good indicators of a community-focused area.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
