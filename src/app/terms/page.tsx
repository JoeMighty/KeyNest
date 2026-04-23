import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using KeyNest, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-4 font-bold text-amber-600 dark:text-amber-400 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200">Financial Disclaimer</h2>
              <p>
                The calculators and tools provided by KeyNest are for illustrative purposes only. They do not constitute financial advice. Mortgage rates, taxes, and legal fees vary significantly based on individual circumstances and the specific region within the UK. 
              </p>
              <p>
                Always consult with a qualified mortgage advisor and solicitor before making any financial commitments.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Use of Tools</h2>
              <p>
                KeyNest provides tools for personal, non-commercial use. While we strive for 100% accuracy, we cannot guarantee that calculations will match the final figures provided by lenders or HMRC.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Modifications</h2>
              <p>
                We reserve the right to modify or discontinue any part of the service at any time. We also periodically update calculator logic to reflect changes in UK tax laws (e.g. Stamp Duty threshold changes).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Limitation of Liability</h2>
              <p>
                KeyNest shall not be liable for any financial losses or decisions made based on the outputs of our calculators. Use of the tools is at your own risk.
              </p>
            </section>

            <p className="pt-8 text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
