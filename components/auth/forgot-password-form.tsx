"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
        className: "border-university-blue/20 bg-university-blue/5",
      })
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center py-2">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Mail className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-university-gray-800">Check your email</h3>
          <p className="text-sm text-university-gray-600 mt-1">We've sent a password reset link to {email}</p>
        </div>
        <Alert className="border-university-blue/20 bg-university-blue/5">
          <AlertDescription className="text-university-gray-700">
            If you don't see the email, check your spam folder or contact IT support.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-university-gray-700 font-medium text-sm">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="h-11 university-input focus-university border-university-gray-300 bg-white text-sm"
        />
      </div>

      <Button type="submit" className="w-full h-11 university-button text-sm font-semibold" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Reset Link
      </Button>
    </form>
  )
}
