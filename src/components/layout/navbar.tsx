"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, CheckSquare, FileText, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tools", href: "/tools", icon: Calculator },
  { name: "Checklists", href: "/checklist-generator", icon: CheckSquare },
  { name: "Offer Letter", href: "/offer-letter", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                !scrolled && isHome ? "text-white hover:bg-white/10" : "hover:bg-muted"
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          
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
        <div className="md:hidden border-t bg-background dark:bg-slate-900 px-4 py-4 space-y-2 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all",
                pathname === item.href 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "hover:bg-muted text-slate-600 dark:text-slate-400"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
