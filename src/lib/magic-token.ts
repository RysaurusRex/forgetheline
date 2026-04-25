import jwt from "jsonwebtoken"

const MAGIC_TOKEN_SECRET = process.env.NEXTAUTH_SECRET || "secret"

export function createResetToken(userId: string): string {
  return jwt.sign({ userId }, MAGIC_TOKEN_SECRET, { expiresIn: "1h" })
}

export async function verifyResetToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, MAGIC_TOKEN_SECRET) as { userId: string }
    return decoded.userId
  } catch {
    return null
  }
}