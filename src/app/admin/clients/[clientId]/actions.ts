"use server"

import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"

export async function getAllClients() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return []

  return prisma.user.findMany({
    where: { role: "CLIENT" },
    include: {
      clientProfile: true,
      dashboard: true,
      resultsLog: { orderBy: { date: "desc" } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getClientById(id: string) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return null

  return prisma.user.findUnique({
    where: { id, role: "CLIENT" },
    include: {
      clientProfile: true,
      dashboard: true,
      resultsLog: { orderBy: { date: "desc" } },
    },
  })
}