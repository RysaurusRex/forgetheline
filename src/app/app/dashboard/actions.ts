"use server"

import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getDashboard() {
  const session = await auth()
  if (!session?.user?.id) return null

  let dashboard = await prisma.dashboard.findUnique({
    where: { userId: session.user.id },
  })

  if (!dashboard) {
    dashboard = await prisma.dashboard.create({
      data: { userId: session.user.id },
    })
  }

  return dashboard
}

export async function updateDashboard(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const currentStatus = formData.get("currentStatus") as string
  const latestOutputs = formData.get("latestOutputs") as string
  const executionLoop = formData.get("executionLoop") as string
  const targetInfo = formData.get("targetInfo") as string
  const progressChecks = formData.get("progressChecks") as string

  await prisma.dashboard.upsert({
    where: { userId: session.user.id },
    update: {
      currentStatus,
      latestOutputs,
      executionLoop,
      targetInfo,
      progressChecks,
    },
    create: {
      userId: session.user.id,
      currentStatus,
      latestOutputs,
      executionLoop,
      targetInfo,
      progressChecks,
    },
  })

  revalidatePath("/app/dashboard")
  return { success: true }
}