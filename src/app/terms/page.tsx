import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: April 2024</p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using KeyNest, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. No Financial Advice</h2>
            <p>
              <strong>KeyNest is an illustrative tool only.</strong> The calculators, estimates, and checklists provided on this site are for informational purposes and do not constitute financial, legal, or professional advice.
            </p>
            <p>
              The property market and tax laws (including Stamp Duty) are subject to change. You should always consult with a qualified mortgage advisor, solicitor, or financial professional before making any property purchase decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Accuracy of Information</h2>
            <p>
              While we strive to keep our calculators up to date with the latest UK tax rates and market trends, we cannot guarantee 100% accuracy at all times. Users are responsible for verifying all figures before proceeding with a transaction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
            <p>
              KeyNest and its creators shall not be held liable for any financial losses, missed deadlines, or legal issues resulting from the use of our tools, checklists, or generated documents.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Use of Generated Documents</h2>
            <p>
              Our "Offer Letter Generator" provides templates to assist you. However, the final document is your responsibility. KeyNest does not guarantee that an estate agent or vendor will accept a letter generated through our service.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
