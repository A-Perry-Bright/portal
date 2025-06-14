import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  try {
    const session = await getSession()

    if (!session) {
      redirect("/login")
    }

    if (session.user.role === "student") {
      redirect("/dashboard")
    }

    // Allow both admin and system_admin roles
    if (!["admin", "system_admin"].includes(session.user.role)) {
      redirect("/login")
    }

    return <AdminDashboard user={session.user} />
  } catch (error) {
    console.error("Error in admin page:", error)
    redirect("/login")
  }
}