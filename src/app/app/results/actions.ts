"use server"

import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getResultsLog() {
  const session = await auth()
  if (!session?.user?.id) return []

  return prisma.resultsLogEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  })
}

export async function addResultLogEntry(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const entryTitle = formData.get("entryTitle") as string
  const date = formData.get("date") as string
  const tool = formData.get("tool") as string
  const score = formData.get("score") as string
  const notes = formData.get("notes") as string

  await prisma.resultsLogEntry.create({
    data: {
      userId: session.user.id,
      entryTitle,
      date: new Date(date),
      tool: tool as any,
      score: score ? parseFloat(score) : null,
      notes,
      status: "SAVED",
    },
  })

  revalidatePath("/app/results")
  return { success: true }
}

export async function deleteResultLogEntry(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  await prisma.resultsLogEntry.delete({
    where: { id, userId: session.user.id },
  })

  revalidatePath("/app/results")
  return { success: true }
}