import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, Session } from "./auth"

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // In a real app, you would decrypt and validate the session
    const session = JSON.parse(sessionCookie.value)
    return session
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth()

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/unauthorized")
  }

  return session
}