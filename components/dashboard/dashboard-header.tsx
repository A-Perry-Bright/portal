"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { logout } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Dynamically import Image with SSR disabled to prevent hydration mismatch
const Image = dynamic(() => import("next/image"), { 
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-university-blue/10 rounded animate-pulse" />
  )
})

interface UserProps {
  id: string
  name: string
  email: string
  role: string
  registrationNumber?: string
}

interface DashboardHeaderProps {
  user: UserProps
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // Ensure client-side rendering for interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        className: "border-university-blue/20 bg-university-blue/5",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="bg-white border-b border-university-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* University Logo and Branding */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="relative flex-shrink-0">
                <Image
                  src="/images/sabuist-logo.png"
                  alt="St. Austin's University Logo"
                  width={48}
                  height={48}
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  priority={false}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl font-bold text-university-blue-dark truncate">
                  <span className="hidden sm:inline">St. Austin's University</span>
                  <span className="sm:hidden">St. Austin's</span>
                </h1>
                <p className="text-xs text-university-gray-600 font-medium truncate">
                  {user.role === "student" ? (
                    <>
                      <span className="hidden sm:inline">Student Portal System</span>
                      <span className="sm:hidden">Student Portal</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Administrative Portal</span>
                      <span className="sm:hidden">Admin Portal</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Notifications */}
            {isClient && (
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-university-blue/10 transition-colors duration-200"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-university-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium shadow-sm">
                  3
                </span>
              </Button>
            )}

            {/* User Menu */}
            {isClient && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-university-blue/10 transition-colors duration-200"
                  >
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-university-blue/20">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback className="bg-university-gradient text-white font-semibold text-xs sm:text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-72 sm:w-80 p-2 bg-white border border-university-gray-200 shadow-lg mr-2 sm:mr-0"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal p-3 sm:p-4 bg-university-blue/5 rounded-lg mb-2 border border-university-blue/10">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-university-blue/20 flex-shrink-0">
                        <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                        <AvatarFallback className="bg-university-gradient text-white font-semibold text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-university-blue-dark truncate">{user.name}</p>
                        <p className="text-xs text-university-gray-600 truncate">{user.email}</p>
                        {user.registrationNumber && (
                          <p className="text-xs text-university-gray-500 font-medium mt-1 truncate">
                            {user.registrationNumber}
                          </p>
                        )}
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-university-blue/10 text-university-blue border border-university-blue/20">
                            {user.role === "student"
                              ? "Student"
                              : user.role === "admin"
                                ? "Administrator"
                                : "System Admin"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-university-gray-200" />

                  <DropdownMenuItem className="cursor-pointer p-3 bg-white hover:bg-university-blue/5 focus:bg-university-blue/5 rounded-md transition-colors duration-200 data-[highlighted]:bg-university-blue/5">
                    <User className="mr-3 h-4 w-4 text-university-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-university-gray-700 font-medium block truncate">Profile Settings</span>
                      <p className="text-xs text-university-gray-500 truncate">Manage your account</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer p-3 bg-white hover:bg-university-blue/5 focus:bg-university-blue/5 rounded-md transition-colors duration-200 data-[highlighted]:bg-university-blue/5">
                    <Settings className="mr-3 h-4 w-4 text-university-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-university-gray-700 font-medium block truncate">Preferences</span>
                      <p className="text-xs text-university-gray-500 truncate">Customize your experience</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-university-gray-200" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer p-3 bg-white hover:bg-red-50 focus:bg-red-50 rounded-md transition-colors duration-200 data-[highlighted]:bg-red-50"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-red-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-red-600 block truncate">Sign out</span>
                      <p className="text-xs text-red-500 truncate">End your current session</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}