"use server"

import { redirect } from "next/navigation"
import { validateCredentials, createSession, deleteSession } from "@/lib/auth"

export async function login(formData: FormData) {
  try {
    const identifier = formData.get("identifier") as string
    const password = formData.get("password") as string

    console.log("Login attempt:", { identifier, password: password ? "***" : "empty" })

    if (!identifier || !password) {
      return {
        success: false,
        error: "Please provide both identifier and password",
      }
    }

    const user = validateCredentials(identifier, password)
    console.log("User validation result:", user ? "success" : "failed")

    if (!user) {
      return {
        success: false,
        error: "Invalid credentials. Please check your registration number/email and password.",
      }
    }

    await createSession(user)
    console.log("Session created for user:", user.id)

    return {
      success: true,
      user,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function logout() {
  try {
    await deleteSession()
    redirect("/login")
  } catch (error) {
    console.error("Logout error:", error)
    redirect("/login")
  }
}