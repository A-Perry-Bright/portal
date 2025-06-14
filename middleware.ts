import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/forgot-password"]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // If user is not authenticated and trying to access protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user is authenticated and trying to access login page
  if (session && pathname === "/login") {
    try {
      const sessionData = JSON.parse(session.value)
      const userRole = sessionData.user.role

      // Redirect based on role
      if (userRole === "student") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } else if (userRole === "admin" || userRole === "system_admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
    } catch (error) {
      // If session is invalid, allow access to login
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (static images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}