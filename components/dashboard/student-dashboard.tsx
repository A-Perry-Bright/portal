"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  Bell,
  Calendar,
  FileText,
  User,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Activity,
} from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { AcademicResults } from "./academic-results"
import { FeeStatus } from "./fee-status"
import { ProfileSection } from "./profile-section"
import { DocumentCenter } from "./document-center"
import { mockStudentData, mockAnnouncements } from "@/lib/mock-data"

interface UserType {
  id: string
  name: string
  email: string
  role: string
  registrationNumber: string
}

interface StudentDashboardProps {
  user: UserType
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const studentData = mockStudentData[user.registrationNumber] || mockStudentData["REG/2024/001"]

  // Simulate loading states for better UX
  const handleTabChange = (value: string) => {
    if (value !== activeTab) {
      setIsLoading(true)
      setTimeout(() => {
        setActiveTab(value)
        setIsLoading(false)
      }, 150)
    }
  }

  // Mobile-first navigation items
  const navigationItems = [
    { id: "overview", label: "Overview", icon: Activity, color: "text-university-blue" },
    { id: "results", label: "Results", icon: BookOpen, color: "text-university-blue" },
    { id: "fees", label: "Fees", icon: CreditCard, color: "text-university-blue" },
    { id: "documents", label: "Documents", icon: FileText, color: "text-university-blue" },
    { id: "profile", label: "Profile", icon: User, color: "text-university-blue" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader user={user} />

      {/* Mobile-First Layout */}
      <div className="pb-20 lg:pb-8">
        <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl">
          {/* Enhanced Welcome Section */}
          <div className="mb-6 animate-fade-in">
            <div className="relative university-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-lg">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 right-4 w-24 h-24 sm:w-40 sm:h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl opacity-10"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-tight">
                      Welcome back,
                      <br className="sm:hidden" />
                      <span className="text-white/90"> {user.name.split(" ")[0]}!</span>
                    </h1>
                    <p className="text-white/80 text-sm sm:text-lg font-medium">{user.registrationNumber}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="h-4 w-4 text-white/80" />
                      <span className="text-xs sm:text-sm text-white/80 font-medium">CGPA</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-white">{studentData.cgpa}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-center space-x-2 mb-1">
                      <BookOpen className="h-4 w-4 text-white/80" />
                      <span className="text-xs sm:text-sm text-white/80 font-medium">Level</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-white">{studentData.level}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-center space-x-2 mb-1">
                      <CreditCard className="h-4 w-4 text-white/80" />
                      <span className="text-xs sm:text-sm text-white/80 font-medium">Fees</span>
                    </div>
                    <Badge
                      variant={studentData.feeStatus === "paid" ? "default" : "destructive"}
                      className={`${studentData.feeStatus === "paid" ? "bg-green-500/80 hover:bg-green-600/80" : "bg-red-500/80"} text-white border-0 text-xs sm:text-sm`}
                    >
                      {studentData.feeStatus === "paid" ? "Paid" : "Due"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
              {/* Modern Tab Navigation */}
              <div className="relative bg-white rounded-2xl p-2 shadow-university border border-university-gray-200">
                <div className="grid grid-cols-5 gap-2">
                  {navigationItems.map((item) => {
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                          isActive
                            ? "bg-university-blue text-white shadow-lg transform scale-105"
                            : "text-university-gray-600 hover:bg-university-blue/5 hover:text-university-blue-dark"
                        }`}
                      >
                        {/* Background glow effect for active tab */}
                        {isActive && (
                          <div className="absolute inset-0 bg-university-blue rounded-xl opacity-20 blur-sm"></div>
                        )}

                        {/* Icon with smooth scaling */}
                        <item.icon
                          className={`h-4 w-4 transition-all duration-300 relative z-10 ${
                            isActive ? "scale-110" : "group-hover:scale-105"
                          }`}
                        />

                        {/* Label with smooth transitions */}
                        <span
                          className={`relative z-10 transition-all duration-300 text-sm ${
                            isActive ? "font-semibold" : "group-hover:font-medium"
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Subtle indicator dot */}
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-80"></div>
                        )}

                        {/* Hover effect overlay */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-university-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className={`transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}>
                <TabsContent value="overview" className="space-y-8 animate-fade-in">
                  <OverviewContent studentData={studentData} />
                </TabsContent>

                <TabsContent value="results" className="animate-fade-in">
                  <AcademicResults studentData={studentData} />
                </TabsContent>

                <TabsContent value="fees" className="animate-fade-in">
                  <FeeStatus studentData={studentData} />
                </TabsContent>

                <TabsContent value="documents" className="animate-fade-in">
                  <DocumentCenter />
                </TabsContent>

                <TabsContent value="profile" className="animate-fade-in">
                  <ProfileSection user={user} studentData={studentData} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Mobile Content */}
          <div className="lg:hidden">
            <div className={`transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}>
              {activeTab === "overview" && <OverviewContent studentData={studentData} />}
              {activeTab === "results" && <AcademicResults studentData={studentData} />}
              {activeTab === "fees" && <FeeStatus studentData={studentData} />}
              {activeTab === "documents" && <DocumentCenter />}
              {activeTab === "profile" && <ProfileSection user={user} studentData={studentData} />}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation - Modern & Beautiful */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white border-t border-university-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-5 px-2 py-2">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-university-blue text-white shadow-md transform scale-105"
                      : "text-university-gray-600 hover:bg-university-gray-100 active:scale-95"
                  }`}
                >
                  {/* Remove the top bump indicator and replace with a different active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                  )}

                  <item.icon
                    className={`h-6 w-6 mb-1 transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
                  />
                  <span
                    className={`text-xs font-medium transition-all duration-200 ${
                      isActive ? "text-white" : "text-university-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Haptic feedback simulation */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-100 ${
                      isActive ? "bg-white/10" : "bg-transparent"
                    }`}
                  ></div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Extracted Overview Component for better organization
function OverviewContent({ studentData }: { studentData: any }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Modern Stats Cards with Micro-interactions */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer">
          <CardHeader className="relative pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:bg-university-blue/20 transition-colors duration-300 group-hover:scale-110 transform">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-university-blue" />
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <CardTitle className="text-xs sm:text-sm font-semibold text-university-gray-700 leading-tight">
              Current CGPA
            </CardTitle>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-university-blue-dark mb-1">{studentData.cgpa}</div>
            <p className="text-xs sm:text-sm text-university-gray-600 leading-tight">
              {studentData.cgpa >= 3.5 ? "Excellent" : studentData.cgpa >= 3.0 ? "Good" : "Improving"}
            </p>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="h-4 w-4 text-university-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer">
          <CardHeader className="relative pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 sm:p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300 group-hover:scale-110 transform">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <div
                className={`w-2 h-2 rounded-full ${studentData.feeStatus === "paid" ? "bg-green-400" : "bg-red-400"} animate-pulse`}
              ></div>
            </div>
            <CardTitle className="text-xs sm:text-sm font-semibold text-university-gray-700 leading-tight">
              Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent className="relative pt-0">
            <Badge
              variant={studentData.feeStatus === "paid" ? "default" : "destructive"}
              className={`${studentData.feeStatus === "paid" ? "bg-green-500 hover:bg-green-600" : ""} text-xs px-3 py-1 mb-2`}
            >
              {studentData.feeStatus === "paid" ? "Fully Paid" : "Outstanding"}
            </Badge>
            <p className="text-xs sm:text-sm text-university-gray-600">Current semester</p>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer">
          <CardHeader className="relative pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:bg-university-blue/20 transition-colors duration-300 group-hover:scale-110 transform">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-university-blue" />
              </div>
              <div className="w-2 h-2 bg-university-blue rounded-full animate-pulse"></div>
            </div>
            <CardTitle className="text-xs sm:text-sm font-semibold text-university-gray-700 leading-tight">
              Academic Level
            </CardTitle>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-lg sm:text-2xl font-bold text-university-blue-dark mb-1">{studentData.level}</div>
            <p className="text-xs sm:text-sm text-university-gray-600 truncate">{studentData.department}</p>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="h-4 w-4 text-university-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer">
          <CardHeader className="relative pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:bg-university-blue/20 transition-colors duration-300 group-hover:scale-110 transform">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-university-blue" />
              </div>
              <div className="w-2 h-2 bg-university-blue rounded-full animate-pulse"></div>
            </div>
            <CardTitle className="text-xs sm:text-sm font-semibold text-university-gray-700 leading-tight">
              Credits Earned
            </CardTitle>
          </CardHeader>
          <CardContent className="relative pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-university-blue-dark mb-1">
              {studentData.creditsEarned}
            </div>
            <p className="text-xs sm:text-sm text-university-gray-600">Total credits</p>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="h-4 w-4 text-university-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Content Grid */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {/* Announcements with Modern Design */}
        <Card className="group bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500">
          <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-university-blue-dark text-lg sm:text-xl">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-university-blue" />
              </div>
              <span>Recent Announcements</span>
              <Badge
                variant="outline"
                className="ml-auto bg-university-blue/10 text-university-blue border-university-blue/20"
              >
                {mockAnnouncements.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {mockAnnouncements.slice(0, 3).map((announcement, index) => (
              <div
                key={announcement.id}
                className="group/item relative p-4 rounded-xl bg-white border border-university-gray-200 hover:border-university-blue/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-3 h-3 bg-university-blue rounded-full mt-2 group-hover/item:scale-125 transition-transform duration-200"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-university-gray-800 group-hover/item:text-university-blue-dark transition-colors duration-200 leading-tight mb-2">
                      {announcement.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-university-gray-600 leading-relaxed line-clamp-2 mb-3">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-university-gray-400" />
                        <span className="text-xs text-university-gray-500">
                          {announcement.date}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-university-gray-400 group-hover/item:text-university-blue transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full mt-4 border-university-blue/30 text-university-blue hover:bg-university-blue hover:text-white transition-all duration-300"
            >
              View All Announcements
            </Button>
          </CardContent>
        </Card>

        {/* Modern Upcoming Events */}
        <Card className="group bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500">
          <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-university-blue-dark text-lg sm:text-xl">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-university-blue" />
              </div>
              <span>Upcoming Events</span>
              <Badge
                variant="outline"
                className="ml-auto bg-university-blue/10 text-university-blue border-university-blue/20"
              >
                3
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {[
              {
                title: "Mid-Semester Examinations",
                desc: "Prepare for your mid-semester exams",
                date: "March 15-22, 2024",
                color: "university-blue",
              },
              {
                title: "Course Registration",
                desc: "Register for next semester courses",
                date: "April 1-15, 2024",
                color: "university-blue",
              },
              {
                title: "Graduation Ceremony",
                desc: "Annual graduation ceremony",
                date: "June 20, 2024",
                color: "university-blue",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="group/item relative p-4 rounded-xl bg-white border border-university-gray-200 hover:border-university-blue/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-3 h-3 bg-university-blue rounded-full mt-2 group-hover/item:scale-125 transition-transform duration-200"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-university-gray-800 group-hover/item:text-university-blue-dark transition-colors duration-200 leading-tight mb-2">
                      {event.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-university-gray-600 leading-relaxed mb-3">{event.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-university-blue" />
                        <span className="text-xs font-medium text-university-blue">{event.date}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-university-gray-400 group-hover/item:text-university-blue transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full mt-4 border-university-blue/30 text-university-blue hover:bg-university-blue hover:text-white transition-all duration-300"
            >
              View Academic Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}