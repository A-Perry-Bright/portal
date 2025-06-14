import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"

export default async function DashboardPage() {
  try {
    const session = await getSession()

    if (!session) {
      redirect("/login")
    }

    if (session.user.role !== "student") {
      redirect("/admin")
    }

    return <StudentDashboard user={session.user} />
  } catch (error) {
    console.error("Error in dashboard page:", error)
    redirect("/login")
  }
}