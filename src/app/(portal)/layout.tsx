import { auth } from "@/lib/get-auth"
import { redirect } from "next/navigation"
import { PortalNav } from "@/components/portal-nav"

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PortalNav />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  )
}