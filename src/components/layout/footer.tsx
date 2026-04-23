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
            <p className="text-sm text-muted-foreground max-w-xs">
              Everything you need to buy your first home in the UK. Speed, clarity, and zero login required.
            </p>
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
