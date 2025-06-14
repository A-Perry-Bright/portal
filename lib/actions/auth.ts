"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { validateCredentials } from "@/lib/auth"
import { deleteSession } from "@/lib/auth-server"
import type { User, Session } from "@/lib/auth"

export async function login(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string
  const password = formData.get("password") as string

  if (!identifier || !password) {
    return {
      success: false,
      error: "Please provide both identifier and password",
    }
  }

  const user = validateCredentials(identifier, password)

  if (!user) {
    return {
      success: false,
      error: "Invalid credentials",
    }
  }

  // Create session directly in the server action context
  const session: Session = {
    user,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  }

  const cookieStore = await cookies()
  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })

  return {
    success: true,
    user,
  }
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}