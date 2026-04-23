"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { 
  Search, 
  MapPin, 
  Users, 
  Home, 
  Briefcase, 
  PoundSterling,
  Info,
  Building2,
  Calendar,
  Languages
} from "lucide-react";
import { getNeighborhoodProfile, NeighborhoodProfile } from "@/lib/neighborhood";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const COLORS = ["#2563eb", "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e", "#f97316"];

export default function NeighborhoodProfilePage() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NeighborhoodProfile | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!postcode) return;

    setLoading(true);
    setData(null); // Clear previous results immediately
    try {
      const profile = await getNeighborhoodProfile(postcode);
      if (!profile) {
        toast.error("Could not find data for this postcode.");
      } else {
        setData(profile);
        toast.success("Area intelligence loaded.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching neighborhood data.");
    } finally {
      setLoading(false);
    }
  };

  const ChartSection = ({ title, description, icon: Icon, data: chartData, type = "bar" }: any) => (
    <Card className="shadow-lg border-2 border-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={chartData} layout="vertical" margin={{ left: 30, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80} 
                axisLine={false} 
                tickLine={false} 
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="percentage" 
                fill="#2563eb" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="percentage"
              >
                {chartData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Neighborhood Intelligence</h1>
              <p className="text-muted-foreground text-lg">
                Official demographics, market trends, and economic insights for every UK postcode.
              </p>
            </div>
          </header>

          {/* Professional Unified Search Bar */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="relative group">
              {/* Premium Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-indigo-600/30 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              <Card className="relative border-2 border-primary/10 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background/90 backdrop-blur-2xl">
                <CardContent className="p-2">
                  <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center">
                    <div className="flex-grow flex items-center px-6 gap-4 w-full md:w-auto">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 block mb-0.5 ml-0.5">UK Postcode</Label>
                        <Input 
                          placeholder="SW1A 1AA" 
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                          className="h-10 p-0 border-none bg-transparent text-xl font-bold focus-visible:ring-0 placeholder:text-muted-foreground/30 shadow-none"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      disabled={loading || !postcode}
                      className="w-full md:w-auto h-16 px-10 rounded-[1.8rem] text-lg font-black gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-[0.95] bg-primary text-white"
                    >
                      {loading ? "Analyzing Area..." : "Get Area Insights"}
                      <Search className="w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>


          {data ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Top Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-primary text-white border-none shadow-xl">
                  <CardContent className="p-6">
                    <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-widest mb-1">Local Authority</p>
                    <h2 className="text-2xl font-black">{data.district}</h2>
                    <p className="text-sm opacity-70 mt-1">LSOA: {data.lsoa}</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center">
                      <Home className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Housing Tenure</p>
                      <h3 className="text-xl font-bold">
                        {data.housing[0] ? `${Math.round(data.housing[0].percentage)}% ${data.housing[0].name}` : "Data Pending"}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Employment</p>
                      <h3 className="text-xl font-bold">
                        {data.employment[0] ? `${Math.round(data.employment[0].percentage)}% ${data.employment[0].name}` : "Data Pending"}
                      </h3>
                    </div>

                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/5 bg-emerald-50/50 dark:bg-emerald-900/10">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center">
                      <PoundSterling className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider text-right">Area Income Estimate</p>
                      <h3 className="text-xl font-bold">£{(data as any).income.average.toLocaleString()}</h3>
                      <p className="text-[10px] text-emerald-600 font-bold">Top {(data as any).income.percentile}% in UK</p>
                    </div>

                  </CardContent>
                </Card>
              </div>

              {/* Main Charts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ChartSection 
                  title="Ethnicity" 
                  description="Population breakdown by ethnic group." 
                  icon={Users} 
                  data={data.ethnicity} 
                />
                <ChartSection 
                  title="Age Profile" 
                  description="Age distribution within the neighborhood." 
                  icon={Calendar} 
                  data={data.age} 
                  type="pie"
                />
                <ChartSection 
                  title="Religious Landscape" 
                  description="Dominant religious affiliations." 
                  icon={Languages} 
                  data={data.religion} 
                />
                <ChartSection 
                  title="Main Languages" 
                  description="Primary languages spoken at home." 
                  icon={Languages} 
                  data={(data as any).languages} 
                />
              </div>

              {/* Market Data Insight Card Only */}
              <div className="max-w-3xl">
                <Card className="bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-100 dark:border-amber-900">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-amber-900 dark:text-amber-100">
                      <Info className="w-5 h-5" /> Market Insight
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-amber-800 dark:text-amber-200/80 leading-relaxed">
                      The area around <strong>{data.postcode}</strong> is characterized by a high percentage of <strong>{data.housing[0]?.name} ({Math.round(data.housing[0]?.percentage || 0)}%)</strong>. 
                      Areas with high ownership levels tend to have lower property turnover but more stable long-term prices.
                    </p>
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl">
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-900/60 dark:text-amber-100/60 mb-2">Data Source</p>
                      <p className="text-[11px] leading-relaxed">
                        Demographics: ONS Census 2021 (Official Observations)<br />
                        LSOA: {data.lsoa}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 grayscale mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-[2rem]" />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
