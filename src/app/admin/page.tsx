import { auth } from "@/lib/get-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

async function getCounts() {
  const [totalClients, totalSales, activeAccess] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.salesCreditTracker.count(),
    prisma.clientAccess.count({ where: { status: "ACTIVE" } }),
  ])
  return { totalClients, totalSales, activeAccess }
}

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    redirect("/app/home")
  }

  const counts = await getCounts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">Total Clients</h2>
          <p className="mt-2 text-3xl font-bold">{counts.totalClients}</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">Sales Records</h2>
          <p className="mt-2 text-3xl font-bold">{counts.totalSales}</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-sm font-medium text-muted-foreground">Active Access</h2>
          <p className="mt-2 text-3xl font-bold">{counts.activeAccess}</p>
        </div>
      </div>
    </div>
  )
}