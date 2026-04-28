"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clientAccess, setClientAccess] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/client-access?userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          setClientAccess(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [session])

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const subStatus = clientAccess?.subscriptionStatus
  const displayStatus = subStatus ? 
    (subStatus === "active" ? "Active" : 
     subStatus === "canceled" ? "Canceled" : 
     subStatus) : "No active subscription"

  const handleManageSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user?.id }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Failed to create portal session:", error)
    }
  }

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

            {clientAccess?.cancelAtPeriodEnd && (
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

            {clientAccess?.stripeCustomerId ? (
              <Button onClick={handleManageSubscription} className="w-full">
                Manage Subscription in Stripe
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                No Stripe customer found. Contact support if you believe this is an error.
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Customers can also cancel, update payment method, or view invoices on their Stripe Customer Portal.
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
