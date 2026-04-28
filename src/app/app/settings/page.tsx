import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const clientAccess = await prisma.clientAccess.findUnique({
    where: { userId: session.user.id },
  })

  const statusMap: Record<string, string> = {
    active: "Active",
    trialing: "Trialing",
    past_due: "Past Due",
    canceled: "Canceled",
    unpaid: "Unpaid",
    paused: "Paused",
  }

  const subStatus = clientAccess?.subscriptionStatus
  const displayStatus = subStatus ? statusMap[subStatus] || subStatus : "No active subscription"
  const cancelAtPeriodEnd = clientAccess?.cancelAtPeriodEnd

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Status: </span>
              <span className={`font-medium ${subStatus === "active" ? "text-green-600" : ""}`}>
                {displayStatus}
              </span>
            </div>

            {cancelAtPeriodEnd && (
              <div className="text-sm text-yellow-600">
                Your subscription will cancel at the end of the billing period.
              </div>
            )}

            {clientAccess?.currentPeriodEnd && (
              <div>
                <span className="text-sm text-muted-foreground">Current period ends: </span>
                <span className="text-sm">
                  {new Date(clientAccess.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            )}

            <form action="/api/stripe/create-portal-session" method="POST">
              <input type="hidden" name="userId" value={session.user.id} />
              <Button type="submit" className="w-full">
                Manage Subscription in Stripe
              </Button>
            </form>

            <p className="text-xs text-muted-foreground">
              Opens Stripe Customer Portal where you can cancel, update payment method, or view invoices.
            </p>
          </div>
        </CardContent>
      </Card>

      <Link href="/app/dashboard">
        <Button variant="outline">Back to Dashboard</Button>
      </Link>
    </div>
  )
}
