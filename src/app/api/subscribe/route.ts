import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      return NextResponse.redirect(new URL("/free-guide?error=email", request.url))
    }

    console.log("NEW LEAD MAGNET SIGNUP:", email)

    return NextResponse.redirect(new URL("/free-guide-success", request.url))
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.redirect(new URL("/free-guide?error=unknown", request.url))
  }
}