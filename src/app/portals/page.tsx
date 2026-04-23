"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const portals = [
  {
    name: "Rightmove",
    url: "https://www.rightmove.co.uk",
    description: "The UK's largest and most popular property portal. If a house is for sale, it's almost certainly listed here.",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Zoopla",
    url: "https://www.zoopla.co.uk",
    description: "Great for comprehensive house price estimates, historical sold prices, and a massive inventory of homes.",
    color: "from-purple-600 to-indigo-800",
  },
  {
    name: "OnTheMarket",
    url: "https://www.onthemarket.com",
    description: "Many estate agents list their properties here 24 hours or more before they appear on Rightmove or Zoopla.",
    color: "from-red-500 to-red-700",
  },
  {
    name: "PrimeLocation",
    url: "https://www.primelocation.com",
    description: "Focused primarily on the middle and upper tiers of the property market. Great for premium homes.",
    color: "from-slate-700 to-slate-900",
  },
  {
    name: "Jitty",
    url: "https://jitty.com",
    description: "A modern, AI-powered property search engine that reads floorplans and lets you search for highly specific features.",
    color: "from-emerald-500 to-teal-700",
  },
  {
    name: "Purplebricks",
    url: "https://www.purplebricks.co.uk",
    description: "The UK's leading online estate agent. You can sometimes find properties here listed directly by the sellers.",
    color: "from-purple-500 to-fuchsia-700",
  },
  {
    name: "Home.co.uk",
    url: "https://www.home.co.uk",
    description: "A comprehensive property search engine with extensive market data, average asking prices, and time-on-market metrics.",
    color: "from-sky-500 to-sky-700",
  },
  {
    name: "PropertyPal",
    url: "https://www.propertypal.com",
    description: "The number one property portal for Northern Ireland, featuring almost every home for sale in the region.",
    color: "from-rose-500 to-rose-700",
  },
  {
    name: "Auction House",
    url: "https://www.auctionhouse.co.uk",
    description: "The UK's largest property auction company. Ideal for finding renovation projects or below-market-value homes.",
    color: "from-orange-500 to-orange-700",
  },
];

export default function PortalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 flex flex-col items-center justify-center gap-6 text-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Portals</h1>
              <p className="text-muted-foreground text-lg">
                Your starting point for finding the perfect home. Browse the UK's top property directories and search engines.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => (
              <Card key={portal.name} className="overflow-hidden hover:shadow-xl transition-all border-2 border-primary/5 hover:border-primary/20 flex flex-col h-full group">
                <div className={`h-24 bg-gradient-to-br ${portal.color} p-6 flex items-center justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <h2 className="text-2xl font-black text-white relative z-10 tracking-tight">{portal.name}</h2>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-2 shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`https://logo.clearbit.com/${new URL(portal.url).hostname}`} 
                      alt={`${portal.name} logo`} 
                      className="w-full h-full object-contain rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-xs font-bold text-slate-400">Logo</span>';
                      }}
                    />
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                    {portal.description}
                  </p>
                  
                  <Button asChild className="w-full gap-2 rounded-xl group/btn" variant="outline">
                    <a href={portal.url} target="_blank" rel="noopener noreferrer">
                      Visit {portal.name} 
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 text-center">
            <h3 className="text-xl font-bold mb-2">Pro Tip for Buyers</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just rely on the portals. Register directly with local estate agents in your target area. The best houses are often sold to registered buyers before they ever make it onto Rightmove!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
