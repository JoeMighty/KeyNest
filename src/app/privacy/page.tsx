import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg text-foreground font-medium">
              At KeyNest, we believe your financial data belongs to you. That's why we built our platform to be as private as possible.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. No Personal Data Collection</h2>
              <p>
                We do not collect, store, or share any personal information. We do not require you to create an account, provide an email address, or input your name to use our tools.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Local Processing</h2>
              <p>
                All calculations performed on our calculators (Stamp Duty, Total Cost, Monthly Budget, etc.) happen locally in your web browser. This data is not sent to our servers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Browser Storage</h2>
              <p>
                If you choose to use our "Save" features, the data is stored in your browser's Local Storage. This data never leaves your device and you can clear it at any time by clearing your browser cache.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Third-Party Services</h2>
              <p>
                We use Vercel for hosting and potentially simple, anonymous analytics (like Vercel Analytics) to understand which tools are popular. These services do not collect personally identifiable information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Contact</h2>
              <p>
                If you have questions about this policy, please contact us via our GitHub repository.
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
