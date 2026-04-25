import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">Forge the Line</Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              Forge the Line ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-2">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Account Information:</strong> Email address, name, and password when you create an account</li>
              <li><strong>Profile Information:</strong> Target roles, agencies, location preferences, and hiring stage</li>
              <li><strong>Content You Submit:</strong> Resume content, interview responses, and tool outputs you save</li>
              <li><strong>Forum Posts and Comments:</strong> Content you post in our community forum</li>
              <li><strong>Usage Data:</strong> How you interact with our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide access to our portal and tools</li>
              <li>Personalize your experience</li>
              <li>Send you important updates about your account</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Information Sharing</h2>
            <p className="text-muted-foreground mb-2">We do NOT sell your personal information. We share information only with:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Service Providers:</strong> Companies that help us operate (e.g., hosting, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights/safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your account data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, email forgetheline@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not intended for anyone under 18. We do not knowingly collect information from minors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy periodically. We will notify you of material changes via email or website notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              Questions? Email us at forgetheline@gmail.com
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