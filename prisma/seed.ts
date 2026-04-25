import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  await prisma.toolOutput.deleteMany()
  await prisma.resultsLogEntry.deleteMany()
  await prisma.dashboard.deleteMany()
  await prisma.clientProfile.deleteMany()
  await prisma.clientAccess.deleteMany()
  await prisma.salesCreditTracker.deleteMany()
  await prisma.user.deleteMany()

  const hashedAdminPassword = await hash("admin123", 12)
  const hashedDemoPassword = await hash("demo123", 12)

  const admin = await prisma.user.create({
    data: {
      email: "admin@forgetheline.com",
      name: "Admin",
      password: hashedAdminPassword,
      role: "ADMIN",
    },
  })

  const demoClient = await prisma.user.create({
    data: {
      email: "demo@client.com",
      name: "Demo Client",
      password: hashedDemoPassword,
      role: "CLIENT",
    },
  })

  await prisma.clientProfile.create({
    data: {
      userId: demoClient.id,
      targetRoles: "1811, DEA, FBI",
      agencies: "HSI, DEA, FBI",
      locationConstraints: "East Coast preferred",
      hiringStage: "Applied",
      timelineTargetDate: "Q3 2025",
      strengths: "Leadership, military background",
      weakPoints: "Resume formatting",
      riskFlags: "Minor traffic violations",
      resumeLinkOrNotes: "Google Drive link",
    },
  })

  await prisma.dashboard.create({
    data: {
      userId: demoClient.id,
      currentStatus: "Waiting for written exam results",
      latestOutputs: "Resume analyzed - Score 7/10",
      executionLoop: "- [ ] Review recommendations\n- [ ] Schedule mock interview\n- [ ] Research HSI",
      targetInfo: "Target: DEA 1811\nStage: Written exam passed\nPriority: Interview prep",
      progressChecks: "- [x] Resume reviewed\n- [x] Written exam passed\n- [ ] Interview stories prepared\n- [ ] Disqualifier scan completed",
    },
  })

  await prisma.resultsLogEntry.create({
    data: {
      userId: demoClient.id,
      entryTitle: "Resume Analysis",
      date: new Date("2025-04-01"),
      tool: "RESUME_ANALYZER",
      score: 7.0,
      notes: "Good structure, add more keywords",
    },
  })

  await prisma.resultsLogEntry.create({
    data: {
      userId: demoClient.id,
      entryTitle: "Mock Interview 1",
      date: new Date("2025-04-10"),
      tool: "INTERVIEW_SIMULATOR",
      score: 6.5,
      notes: "Need more specific examples",
    },
  })

  await prisma.salesCreditTracker.create({
    data: {
      name: "Demo Client",
      email: "demo@client.com",
      purchaseTier: "PORTAL_CREDIT_199",
      creditBalanceCents: 19900,
      redeemed: false,
      notes: "VIP client",
    },
  })

  console.log("Seed completed!")
  console.log("Admin: admin@forgetheline.com / admin123")
  console.log("Demo: demo@client.com / demo123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })