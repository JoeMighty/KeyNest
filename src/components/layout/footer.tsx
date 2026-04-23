import Link from "next/link";

const footerLinks = {
  Tools: [
    { name: "Stamp Duty Calculator", href: "/stamp-duty-calculator" },
    { name: "Total Cost Calculator", href: "/total-cost-calculator" },
    { name: "Monthly Cost Calculator", href: "/monthly-cost-calculator" },
    { name: "Offer Calculator", href: "/offer-calculator" },
  ],
  Resources: [
    { name: "First-Time Buyer Checklist", href: "/checklist-generator" },
    { name: "Offer Letter Generator", href: "/offer-letter" },
    { name: "Property Comparison", href: "/compare-properties" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                K
              </div>
              <span className="font-bold text-xl tracking-tight">KeyNest</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Everything you need to buy your first home in the UK. Speed, clarity, and zero login required.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/JoeMighty/KeyNest" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="text-sm font-medium">Open Source</span>
              </a>
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground bg-muted/50 border px-2 py-1 rounded-md">
                v2.1.0
              </span>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KeyNest. All tools are for illustrative purposes only.
          </p>
          <div className="flex gap-4">
            {/* Social links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
