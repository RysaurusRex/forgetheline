import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FREE_GUIDE_CONTENT = `
<h1>10 Mistakes That Kill Your Police Application</h1>

<p>Here are the top 10 mistakes that can derail your law enforcement application before it even starts:</p>

<ol>
<li><strong>Background Check Red Flags</strong> - Credit issues, undisclosed incidents, and past violations that surface during the background investigation.</li>

<li><strong>Social Media Mistakes</strong> - Posts, comments, or photos that paint you in a bad light.</li>

<li><strong>Not Disclosing Everything</strong> - Hiding past drug use, employment gaps, or legal issues.</li>

<li><strong>Poor Interview Answers</strong> - Giving vague answers or "no comment" responses.</li>

<li><strong>Weak References</strong> - Not having solid professional references lined up.</li>

<li><strong>Failing the Written Exam</strong> - Not studying for what should be an easy test.</li>

<li><strong>Polygraph Panic</strong> - Being overly nervous which reads as deception.</li>

<li><strong>Poor Physical Condition</strong> - Not being ready for the academy fitness test.</li>

<li><strong>Not Following Directions</strong> - Missing paperwork, deadlines, or instructions.</li>

<li><strong>Giving Up Too Early</strong> - The process takes months. Persistence matters.</li>
</ol>

<h2>Next Steps</h2>

<p>Want more help? Visit <a href="https://forgetheline.us.com">forgetheline.us.com</a> for:</p>

<ul>
<li>Resume review and optimization</li>
<li>Interview practice with real scenarios</li>
<li>Disqualifier identification before they kill your chances</li>
<li>Strategy planning for your specific goals</li>
</ul>

<p>Happy to help you succeed.</p>

<p>Best,<br/>Forge the Line</p>
`

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    console.log("Sending guide to:", email)

    await resend.emails.send({
      from: "Forge the Line <onboarding@resend.dev>",
      to: email,
      subject: "Your Free Guide: 10 Mistakes That Kill Your Police Application",
      html: FREE_GUIDE_CONTENT,
    })

    console.log("Guide sent to:", email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}