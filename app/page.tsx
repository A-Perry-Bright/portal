import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function HomePage() {
  try {
    const session = await getSession()

    if (session) {
      // Redirect based on user role
      switch (session.user.role) {
        case "student":
          redirect("/dashboard")
        case "admin":
        case "system_admin":
          redirect("/admin")
        default:
          redirect("/login")
      }
    }

    redirect("/login")
  } catch (error) {
    console.error("Error in home page:", error)
    redirect("/login")
  }
}