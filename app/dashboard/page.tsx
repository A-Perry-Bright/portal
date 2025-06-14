import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "student") {
    redirect("/admin")
  }

  return <StudentDashboard user={session.user} />
}