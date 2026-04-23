import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: April 2024</p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. No Account Required</h2>
            <p>
              KeyNest is designed to be a "local-first" application. We do not require you to create an account, provide an email address, or log in to use any of our calculators, checklists, or document generators.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Your Data Stays With You</h2>
            <p>
              All information you enter into our tools—including property prices, deposit amounts, savings goals, and address details—is stored exclusively in your browser's local storage or processed in-memory. 
            </p>
            <p>
              <strong>We do not transmit your financial or personal data to our servers.</strong> This means we cannot see, access, or sell your property search details.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Local Storage</h2>
            <p>
              We use your browser's "LocalStorage" to help you save your progress (e.g., your Property Comparison list). This data never leaves your device. You can clear this data at any time by clearing your browser's cache or using the "Clear All" buttons within our tools.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. PDF Generation</h2>
            <p>
              When you generate a PDF report (e.g., an Offer Letter or Stamp Duty breakdown), the document is generated entirely within your browser using JavaScript. No data is sent to a server for processing or document generation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Analytics</h2>
            <p>
              We may use privacy-preserving analytics (like Plausible or simple Vercel analytics) to track high-level site usage, such as which tools are most popular. We do not track individual users or capture any data entered into the tools.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
