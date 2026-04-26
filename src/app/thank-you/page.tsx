import Link from "next/link"

export const metadata = {
  title: "Thank You for Your Purchase!",
  description: "Your order is confirmed.",
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <div className="text-6xl mb-6">🎉</div>
        
        <h1 className="text-4xl font-bold mb-4">
          Thank You for Your Purchase!
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Your order is confirmed. Check your email for details.
        </p>

        <div className="bg-muted rounded-xl p-6 mb-8">
          <p className="font-medium mb-2">What's next?</p>
          <ul className="text-left text-sm space-y-2">
            <li>✅ Check your email for receipt</li>
            <li>✅ Set your password when you log in</li>
            <li>✅ Start using your coaching credits</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90"
          >
            Go to Login
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-6 rounded-xl border hover:bg-muted"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}