import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ShieldCheck, Zap, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About KeyNest</h1>
            <p className="text-xl text-muted-foreground">
              Empowering the next generation of UK homeowners with the tools they actually need.
            </p>
          </header>

          <div className="grid gap-12">
            <section className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Buying a home in the UK is one of the most complex financial journeys anyone can undertake. Between Stamp Duty, legal fees, and mortgage math, it's easy to feel overwhelmed. 
                  <br /><br />
                  KeyNest was built to bring clarity to the chaos. We provide free, high-quality tools that don't require a login, so you can focus on finding your home, not fighting a spreadsheet.
                </p>
              </div>
              <div className="bg-primary/10 rounded-3xl p-8 flex items-center justify-center">
                <Home className="w-32 h-32 text-primary opacity-20" />
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "Privacy First", desc: "No accounts, no tracking. Your financial data stays in your browser." },
                { icon: Zap, title: "Instant Clarity", desc: "Live updates and breakdown as you type. No submit buttons needed." },
                { icon: Users, title: "Built for You", desc: "Tailored specifically for the UK market and first-time buyer needs." },
              ].map((feature, i) => (
                <Card key={i} className="border-none bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Free. Forever.</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                KeyNest is an independent project. We believe financial planning tools should be accessible to everyone, regardless of where they are in their buying journey.
              </p>
              <div className="flex justify-center gap-4">
                {/* Could add a donation link or similar here if desired */}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
