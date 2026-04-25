"use server"

import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getClientProfile() {
  const session = await auth()
  if (!session?.user?.id) return null

  let profile = await prisma.clientProfile.findUnique({
    where: { userId: session.user.id },
  })

  if (!profile) {
    profile = await prisma.clientProfile.create({
      data: { userId: session.user.id },
    })
  }

  return profile
}

export async function updateClientProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const targetRoles = formData.get("targetRoles") as string
  const agencies = formData.get("agencies") as string
  const locationConstraints = formData.get("locationConstraints") as string
  const hiringStage = formData.get("hiringStage") as string
  const timelineTargetDate = formData.get("timelineTargetDate") as string
  const interviewDate = formData.get("interviewDate") as string
  const strengths = formData.get("strengths") as string
  const weakPoints = formData.get("weakPoints") as string
  const riskFlags = formData.get("riskFlags") as string
  const resumeLinkOrNotes = formData.get("resumeLinkOrNotes") as string
  const jobPostingLink = formData.get("jobPostingLink") as string
  const notes = formData.get("notes") as string

  await prisma.clientProfile.upsert({
    where: { userId: session.user.id },
    update: {
      targetRoles,
      agencies,
      locationConstraints,
      hiringStage,
      timelineTargetDate,
      interviewDate: interviewDate || null,
      strengths,
      weakPoints,
      riskFlags,
      resumeLinkOrNotes,
      jobPostingLink,
      notes,
    },
    create: {
      userId: session.user.id,
      targetRoles,
      agencies,
      locationConstraints,
      hiringStage,
      timelineTargetDate,
      interviewDate: interviewDate || null,
      strengths,
      weakPoints,
      riskFlags,
      resumeLinkOrNotes,
      jobPostingLink,
      notes,
    },
  })

  revalidatePath("/app/client-profile")
  return { success: true }
}