import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-4">
      {/* Background with university gradient */}
      <div className="absolute inset-0 university-gradient"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* University Header */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-white p-3 rounded-2xl shadow-university-xl">
                <Image
                  src="/images/sabuist-logo.png"
                  alt="St. Austin's University Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">St. Austin's University</h1>
          <p className="text-white/90 text-sm font-medium drop-shadow">International Bilingual University Institute</p>
          <p className="text-white/80 text-xs drop-shadow">of Science and Technology</p>
        </div>

        {/* Reset Password Card */}
        <Card className="university-card backdrop-blur-sm bg-white/95 border-0 shadow-university-xl animate-fade-in">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-xl font-bold text-university-blue-dark">Reset Password</CardTitle>
            <CardDescription className="text-university-gray-600 text-sm">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <ForgotPasswordForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-4 animate-fade-in">
          <Link
            href="/login"
            className="text-white/90 text-sm hover:text-white transition-colors duration-200 hover:underline drop-shadow"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}