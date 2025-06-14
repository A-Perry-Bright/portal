"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, User, Lock } from "lucide-react"
import { login } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

function SubmitButton() {
  const { pending } = useFormStatus()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-university-gray-700 font-medium text-sm">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray-400 h-4 w-4" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            disabled={pending}
            className="pl-10 pr-11 h-11 university-input focus-university border-university-gray-300 bg-white text-sm"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-university-gray-100 text-university-gray-500 hover:text-university-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            disabled={pending}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full h-11 university-button text-sm font-semibold" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, { success: false, error: "" })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (state.success && state.user) {
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to your dashboard...",
        className: "border-university-blue/20 bg-university-blue/5",
      })

      // Small delay to show the toast, then redirect
      setTimeout(() => {
        switch (state.user?.role) {
          case "student":
            router.push("/dashboard")
            break
          case "admin":
          case "system_admin":
            router.push("/admin")
            break
          default:
            router.push("/dashboard")
        }
      }, 1000)
    }
  }, [state, router, toast])

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50 animate-fade-in">
          <AlertDescription className="text-red-800">{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="identifier" className="text-university-gray-700 font-medium text-sm">
            Registration Number / Email
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray-400 h-4 w-4" />
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="REG/2024/001 or admin@staustin.edu"
              required
              className="pl-10 h-11 university-input focus-university border-university-gray-300 bg-white text-sm"
            />
          </div>
        </div>

        <SubmitButton />
      </div>

      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-university-blue hover:text-university-blue-dark font-medium text-sm transition-colors duration-200 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Demo credentials info */}
      <div className="mt-5 p-3 bg-university-blue/5 rounded-lg border border-university-blue/10">
        <p className="text-xs text-university-gray-600 font-medium mb-2">Demo Credentials:</p>
        <div className="text-xs text-university-gray-500 space-y-1">
          <p>
            <span className="font-medium">Student:</span> REG/2024/001 / password123
          </p>
          <p>
            <span className="font-medium">Admin:</span> admin@staustin.edu / admin123
          </p>
          <p>
            <span className="font-medium">System Admin:</span> sysadmin@staustin.edu / sysadmin123
          </p>
        </div>
      </div>
    </form>
  )
}