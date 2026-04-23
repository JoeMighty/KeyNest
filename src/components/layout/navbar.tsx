"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, CheckSquare, FileText, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tools", href: "/tools", icon: Calculator },
  { name: "Checklists", href: "/checklist-generator", icon: CheckSquare },
  { name: "Offer Letter", href: "/offer-letter", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl h-16 shadow-sm" 
        : cn("h-24", isHome ? "bg-transparent border-transparent" : "bg-background border-b")
    )}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
              K
            </div>
            <span className={cn(
              "font-bold text-2xl tracking-tighter transition-colors",
              !scrolled && isHome ? "text-white" : "text-foreground"
            )}>
              KeyNest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-all hover:text-primary relative py-2",
                  pathname === item.href 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" 
                    : (!scrolled && isHome ? "text-white/90 hover:text-white" : "text-muted-foreground hover:text-foreground")
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              !scrolled && isHome ? "text-white hover:bg-white/10" : "hover:bg-muted"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[96px] bg-slate-950/95 backdrop-blur-2xl px-6 py-10 space-y-4 z-50 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-4 px-6 py-5 rounded-[2rem] text-lg font-bold transition-all active:scale-95",
                pathname === item.href 
                  ? "bg-primary text-white shadow-2xl shadow-primary/40" 
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              )}
            >
              <item.icon className="w-6 h-6" />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
