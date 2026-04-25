export function checkEnvVars() {
  const required = ["DATABASE_URL", "NEXTAUTH_SECRET"]
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(`Warning: Missing env vars: ${missing.join(", ")}`)
    return false
  }

  if (!process.env.OPENAI_API_KEY) {
    console.warn("Warning: OPENAI_API_KEY not set - AI features disabled")
  }

  if (!process.env.EMAIL_SERVER) {
    console.warn("Warning: EMAIL_SERVER not set - Email features disabled")
  }

  return true
}

if (process.env.NODE_ENV !== "production") {
  checkEnvVars()
}