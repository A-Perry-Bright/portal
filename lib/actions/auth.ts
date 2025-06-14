"use server"

import { redirect } from "next/navigation"
import { validateCredentials } from "@/lib/auth"
import { createSession, deleteSession } from "@/lib/auth-server"

export async function login(formData: FormData) {
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

  await createSession(user)

  return {
    success: true,
    user,
  }
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}