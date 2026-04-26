import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, subject } = await req.json()

    if (!name || !email || !message) {
      console.log("Missing fields on server:", { name, email, message })
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const subjectLine = subject || "Question from contact form"

    // Send notification to you
    await resend.emails.send({
      from: "Forge the Line <onboarding@resend.dev>",
      to: "forgetheline@gmail.com",
      subject: `New Contact: ${subject || "Question"} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "General"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Send thank you to the user
    await resend.emails.send({
      from: "Forge the Line <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We received your message and will get back to you within 24-48 hours.</p>
        <p>If you have more questions in the meantime, don't hesitate to reply to this email.</p>
        <p>Best,<br/>Forge the Line</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}