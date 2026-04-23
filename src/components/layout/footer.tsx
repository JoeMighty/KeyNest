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
                <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
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
