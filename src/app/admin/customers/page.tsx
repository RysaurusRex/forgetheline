"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getSalesCustomers, addSalesCustomer, deleteSalesCustomer } from "./actions"

interface SalesCustomer {
  id: string
  name: string
  email: string
  purchaseTier: string
  creditBalanceCents: number
  redeemed: boolean
  dateRedeemed: string | null
  notes: string | null
  createdAt: string
}

const tiers = [
  { value: "PORTAL_149", label: "Portal ($149)" },
  { value: "PORTAL_CREDIT_199", label: "Portal + Credit ($199)" },
  { value: "COACHING_ONLY", label: "Coaching Only" },
  { value: "OTHER", label: "Other" },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<SalesCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    purchaseTier: "PORTAL_149",
    creditBalanceCents: "14900",
    notes: "",
  })

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    const data = await getSalesCustomers()
    setCustomers(data as SalesCustomer[])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    formData.set("name", newCustomer.name)
    formData.set("email", newCustomer.email)
    formData.set("purchaseTier", newCustomer.purchaseTier)
    formData.set("creditBalanceCents", newCustomer.creditBalanceCents)
    formData.set("notes", newCustomer.notes)
    
    await addSalesCustomer(formData)
    setNewCustomer({
      name: "",
      email: "",
      purchaseTier: "PORTAL_149",
      creditBalanceCents: "14900",
      notes: "",
    })
    setShowForm(false)
    await loadCustomers()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this customer?")) {
      await deleteSalesCustomer(id)
      await loadCustomers()
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Portal Sales & Credit Tracker</h1>

      <div className="mb-6">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Customer"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">New Customer</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="Customer name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="customer@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Purchase Tier</label>
              <select
                value={newCustomer.purchaseTier}
                onChange={(e) => {
                  const tier = e.target.value
                  setNewCustomer({ 
                    ...newCustomer, 
                    purchaseTier: tier,
                    creditBalanceCents: tier === "PORTAL_CREDIT_199" ? "19900" : 
                                tier === "PORTAL_149" ? "14900" : "0"
                  })
                }}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              >
                {tiers.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Credit Balance (cents)</label>
              <Input
                type="number"
                value={newCustomer.creditBalanceCents}
                onChange={(e) => setNewCustomer({ ...newCustomer, creditBalanceCents: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={newCustomer.notes}
              onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={2}
            />
          </div>
          
          <div className="mt-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Customer"}
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Tier</th>
                <th className="px-4 py-3 text-left font-medium">Credit</th>
                <th className="px-4 py-3 text-left font-medium">Redeemed</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.purchaseTier}</td>
                  <td className="px-4 py-3">${(customer.creditBalanceCents / 100).toFixed(2)}</td>
                  <td className="px-4 py-3">{customer.redeemed ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    {customer.dateRedeemed 
                      ? new Date(customer.dateRedeemed).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(customer.id)}
                      className="text-destructive"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {customers.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No customers yet.
          </div>
        )}
      </div>
    </div>
  )
}