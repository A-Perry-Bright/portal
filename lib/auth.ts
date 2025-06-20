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

// Mock user database with the requested admin account
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
  "perry-bright@st-austin.edu.cm": {
    id: "4",
    name: "Perry Bright",
    email: "perry-bright@st-austin.edu.cm",
    role: "admin" as const,
    password: "password123",
  },
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return null
    }

    // In a real app, you would decrypt and validate the session
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      await deleteSession()
      return null
    }
    
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export function createSession(user: User): Session {
  try {
    const session: Session = {
      user,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }

    return session
  } catch (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("session")
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}

export function validateCredentials(identifier: string, password: string): User | null {
  try {
    if (!identifier || !password) {
      return null
    }

    // Normalize identifier to lowercase for case-insensitive lookup
    const normalizedIdentifier = identifier.toLowerCase()
    
    // Find user by registration number or email
    const user = Object.values(mockUsers).find(u => 
      u.registrationNumber?.toLowerCase() === normalizedIdentifier || 
      u.email.toLowerCase() === normalizedIdentifier
    )

    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    }

    return null
  } catch (error) {
    console.error("Error validating credentials:", error)
    return null
  }
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
    redirect("/login")
  }

  return session
}