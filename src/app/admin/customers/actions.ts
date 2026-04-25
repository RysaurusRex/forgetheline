"use server"

import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const SalesSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  purchaseTier: z.enum(["PORTAL_149", "PORTAL_CREDIT_199", "COACHING_ONLY", "OTHER"]),
  creditBalanceCents: z.number().int().min(0),
  notes: z.string().optional(),
})

export async function getSalesCustomers() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return []

  return prisma.salesCreditTracker.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function addSalesCustomer(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const data = SalesSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    purchaseTier: formData.get("purchaseTier"),
    creditBalanceCents: parseInt(formData.get("creditBalanceCents") as string) || 0,
    notes: formData.get("notes"),
  })

  await prisma.salesCreditTracker.create({ data })
  revalidatePath("/admin/customers")
  return { success: true }
}

export async function updateSalesCustomer(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const id = formData.get("id") as string
  const data = SalesSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    purchaseTier: formData.get("purchaseTier"),
    creditBalanceCents: parseInt(formData.get("creditBalanceCents") as string) || 0,
    notes: formData.get("notes"),
  })

  await prisma.salesCreditTracker.update({ where: { id }, data })
  revalidatePath("/admin/customers")
  return { success: true }
}

export async function deleteSalesCustomer(id: string) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  await prisma.salesCreditTracker.delete({ where: { id } })
  revalidatePath("/admin/customers")
  return { success: true }
}