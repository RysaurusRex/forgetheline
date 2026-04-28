import { auth } from "@/lib/get-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Users, LayoutDashboard } from "lucide-react"

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/customer-support", label: "Customer Support", icon: Users },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/app/home")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold">Forge the Line - Admin</span>
          </div>
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="w-48 border-r bg-muted/30 p-4">
          <div className="space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </div>
  )
}