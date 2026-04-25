import { NextApiHandler } from "next"
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const authHandler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, authOptions)
}

export default authHandler

export const GET = authHandler
export const POST = authHandler