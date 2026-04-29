import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Forge the Line" className="h-10 w-auto" />
            <span className="text-xl font-bold">Forge the Line</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Forge the Line, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Use License</h2>
            <p className="text-muted-foreground mb-2">
              Permission is granted to use our portal and tools for your personal, non-commercial use only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-muted-foreground mt-2">
              You may NOT:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Copy or modify the materials</li>
              <li>Use for any commercial purposes</li>
              <li>Transfer materials to another person</li>
              <li>Attempt to reverse engineer any software</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Account Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate information</li>
              <li>You must be at least 18 years old</li>
              <li>One account per person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">User Content</h2>
            <p className="text-muted-foreground">
              You retain ownership of content you submit. However, by posting, you grant us license to use, display, and distribute your content within our service.
            </p>
            <p className="text-muted-foreground mt-2">
              You agree not to post content that is illegal, offensive, or violates others' rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Payment and Refunds</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All sales are final unless required by law</li>
              <li>Subscriptions can be cancelled anytime</li>
              <li>Access continues until end of billing period</li>
              <li>Refunds handled case-by-case</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              Our service is provided "as is." We make no warranties, express or implied, about the accuracy or reliability of our tools or content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              We shall not be liable for any damages arising from use of our service. Your sole remedy is to stop using the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Termination</h2>
            <p className="text-muted-foreground">
              We may terminate your access if you violate these terms. Forum posts and account data may be deleted at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
            <p className="text-muted-foreground">
              These terms are governed by Texas law. Any disputes will be resolved in Texas courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              Questions? Email forgetheline@gmail.com
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 Forge the Line
        </div>
      </footer>
    </div>
  )
}