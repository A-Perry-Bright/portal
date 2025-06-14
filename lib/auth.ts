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

export function validateCredentials(identifier: string, password: string): User | null {
  const user = mockUsers[identifier as keyof typeof mockUsers]

  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return null
}