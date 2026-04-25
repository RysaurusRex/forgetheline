import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendMagicLinkEmail(email: string, resetUrl: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || "Forge the Line <forgetheline@gmail.com>",
    to: email,
    subject: "Your Forge the Line Login Link",
    html: `
      <h1>Forge the Line - Login Link</h1>
      <p>Click the button below to log in to your account:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 6px;">
        Log In
      </a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}