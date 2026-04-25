"use server"

import { auth } from "@/lib/get-auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { generateAIResponse, prompts } from "@/lib/openai"

export async function getToolOutput(tool: string) {
  const session = await auth()
  if (!session?.user?.id) return null

  return prisma.toolOutput.findUnique({
    where: {
      userId_tool: {
        userId: session.user.id,
        tool: tool as any,
      },
    },
  })
}

export async function saveToolOutput(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const tool = formData.get("tool") as string
  const output = formData.get("output") as string

  await prisma.toolOutput.upsert({
    where: {
      userId_tool: {
        userId: session.user.id,
        tool: tool as any,
      },
    },
    update: { output },
    create: {
      userId: session.user.id,
      tool: tool as any,
      output,
    },
  })

  revalidatePath("/app/tools/" + tool.toLowerCase().replace("_", "-"))
  return { success: true }
}

export async function runAITool(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const tool = formData.get("tool") as string
  const userInput = formData.get("input") as string

  const systemPrompt = prompts[tool as keyof typeof prompts]
  if (!systemPrompt) {
    return { error: "Invalid tool" }
  }

  const aiResponse = await generateAIResponse(systemPrompt, userInput)

  await prisma.toolOutput.upsert({
    where: {
      userId_tool: {
        userId: session.user.id,
        tool: tool as any,
      },
    },
    update: { output: aiResponse },
    create: {
      userId: session.user.id,
      tool: tool as any,
      output: aiResponse,
    },
  })

  revalidatePath("/app/tools/" + tool.toLowerCase().replace("_", "-"))
  return { success: true }
}