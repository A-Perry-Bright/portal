import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin" | "system_admin"
  registrationNumber?: string
}

export interface Session {
  user: User
  expires: string
}

// Mock user database
const mockUsers = {
  "REG/2024/001": {
    id: "1",
    name: "John Doe",
    email: "john.doe@staustin.edu",
    role: "student" as const,
    registrationNumber: "REG/2024/001",
    password: "password123",
  },
  "admin@staustin.edu": {
    id: "2",
    name: "Admin User",
    email: "admin@staustin.edu",
    role: "admin" as const,
    password: "admin123",
  },
  "sysadmin@staustin.edu": {
    id: "3",
    name: "System Administrator",
    email: "sysadmin@staustin.edu",
    role: "system_admin" as const,
    password: "sysadmin123",
  },
}

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

export async function createSession(user: User) {
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

  return session
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export function validateCredentials(identifier: string, password: string): User | null {
  const user = mockUsers[identifier as keyof typeof mockUsers]

  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return null
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
