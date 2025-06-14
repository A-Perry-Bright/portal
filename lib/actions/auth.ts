"use server"

import { redirect } from "next/navigation"
import { validateCredentials, createSession, deleteSession } from "@/lib/auth"

interface LoginResult {
  success: boolean
  error?: string
  user?: any
}

export async function login(formData: FormData): Promise<LoginResult> {
  try {
    const identifier = formData.get("identifier") as string
    const password = formData.get("password") as string

    // Validate input
    if (!identifier || !password) {
      return {
        success: false,
        error: "Please provide both identifier and password",
      }
    }

    if (identifier.trim().length === 0 || password.trim().length === 0) {
      return {
        success: false,
        error: "Please provide valid credentials",
      }
    }

    // Validate credentials
    const user = validateCredentials(identifier.trim(), password)

    if (!user) {
      return {
        success: false,
        error: "Invalid credentials. Please check your registration number/email and password.",
      }
    }

    // Create session
    await createSession(user)

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
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    redirect("/login")
  }
}