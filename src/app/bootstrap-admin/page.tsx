import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function BootstrapAdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const adminCount = await prisma.user.count({
    where: { role: "ADMIN" }
  })

  if (adminCount > 0 && session.user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>An admin already exists. Contact the existing admin to get admin access.</p>
      </div>
    )
  }

  async function makeAdmin() {
    "use server"
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return

    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "ADMIN" },
    })

    redirect("/admin")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Bootstrap Admin</h1>
      <p className="mb-4">
        No admin users exist. Click below to make <strong>{session.user.email}</strong> an admin.
      </p>
      <form action={makeAdmin}>
        <Button type="submit" className="w-full">Make Me Admin</Button>
      </form>
      <Link href="/" className="block mt-4 text-sm text-center text-muted-foreground">
        Cancel
      </Link>
    </div>
  )
}
