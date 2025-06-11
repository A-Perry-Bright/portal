"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, GraduationCap, CreditCard, FileText, Settings, BarChart3, UserPlus, Upload } from "lucide-react"
import { DashboardHeader } from "../dashboard/dashboard-header"
import { StudentManagement } from "./student-management"
import { GradeManagement } from "./grade-management"
import { FeeManagement } from "./fee-management"
import { DocumentManagement } from "./document-management"
import { SystemSettings } from "./system-settings"

interface User {
  id: string
  name: string
  email: string
  role: string
  registrationNumber?: string
}

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalStudents: 1247,
    activeStudents: 1198,
    pendingFees: 49,
    totalRevenue: 1228390000, // XAF
    newEnrollments: 156,
    graduatingStudents: 89,
  }

  const formatXAF = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-university-gray-50">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="university-gradient rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-white/90 text-lg">
                {user.role === "system_admin" ? "System Administrator" : "Administrator"} Dashboard
              </p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">{stats.totalStudents} Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">{formatXAF(stats.totalRevenue)} Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span className="font-medium">{stats.newEnrollments} New Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-university-gray-200 rounded-xl p-1 shadow-university">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="flex items-center gap-2 data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Students</span>
            </TabsTrigger>
            <TabsTrigger
              value="grades"
              className="flex items-center gap-2 data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Grades</span>
            </TabsTrigger>
            <TabsTrigger
              value="fees"
              className="flex items-center gap-2 data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Fees</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center gap-2 data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-university-gray-700">Total Students</CardTitle>
                  <div className="p-2 bg-university-blue/10 rounded-lg group-hover:bg-university-blue/20 transition-colors duration-300">
                    <Users className="h-4 w-4 text-university-blue" />
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-3xl font-bold text-university-blue-dark">
                    {stats.totalStudents.toLocaleString()}
                  </div>
                  <p className="text-sm text-university-gray-600 mt-1">+{stats.newEnrollments} new this semester</p>
                </CardContent>
              </Card>

              <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-university-gray-700">Active Students</CardTitle>
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-3xl font-bold text-green-600">{stats.activeStudents.toLocaleString()}</div>
                  <p className="text-sm text-university-gray-600 mt-1">
                    {((stats.activeStudents / stats.totalStudents) * 100).toFixed(1)}% active rate
                  </p>
                </CardContent>
              </Card>

              <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-university-gray-700">Pending Fees</CardTitle>
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-300">
                    <CreditCard className="h-4 w-4 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-3xl font-bold text-red-600">{stats.pendingFees}</div>
                  <p className="text-sm text-university-gray-600 mt-1">Students with outstanding fees</p>
                </CardContent>
              </Card>

              <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-university-gray-700">Total Revenue</CardTitle>
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-university-blue-dark">{formatXAF(stats.totalRevenue)}</div>
                  <p className="text-sm text-university-gray-600 mt-1">Current academic year</p>
                </CardContent>
              </Card>

              <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-university-gray-700">New Enrollments</CardTitle>
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors duration-300">
                    <UserPlus className="h-4 w-4 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-3xl font-bold text-orange-600">{stats.newEnrollments}</div>
                  <p className="text-sm text-university-gray-600 mt-1">This semester</p>
                </CardContent>
              </Card>

              <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-university-gray-700">Graduating Students</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-3xl font-bold text-blue-600">{stats.graduatingStudents}</div>
                  <p className="text-sm text-university-gray-600 mt-1">Expected this year</p>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Recent Activities */}
              <Card className="university-card bg-white border border-university-gray-200">
                <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
                  <CardTitle className="flex items-center gap-3 text-university-blue-dark">
                    <div className="p-2 bg-university-blue/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-university-blue" />
                    </div>
                    Recent Activities
                  </CardTitle>
                  <CardDescription className="text-university-gray-600">
                    Latest system activities and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6 bg-white">
                  <div className="flex items-center space-x-4 p-3 hover:bg-university-gray-50 rounded-lg transition-colors duration-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-university-gray-800">New student registration</p>
                      <p className="text-xs text-university-gray-600">John Doe - Computer Science</p>
                    </div>
                    <span className="text-xs text-university-gray-500">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 hover:bg-university-gray-50 rounded-lg transition-colors duration-200">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-university-gray-800">Grade uploaded</p>
                      <p className="text-xs text-university-gray-600">CS101 - Data Structures</p>
                    </div>
                    <span className="text-xs text-university-gray-500">15 min ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 hover:bg-university-gray-50 rounded-lg transition-colors duration-200">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-university-gray-800">Fee payment received</p>
                      <p className="text-xs text-university-gray-600">REG/2024/001 - {formatXAF(1250000)}</p>
                    </div>
                    <span className="text-xs text-university-gray-500">1 hour ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="university-card bg-white border border-university-gray-200">
                <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
                  <CardTitle className="flex items-center gap-3 text-university-blue-dark">
                    <div className="p-2 bg-university-blue/10 rounded-lg">
                      <Settings className="h-5 w-5 text-university-blue" />
                    </div>
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-university-gray-600">
                    Frequently used administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 hover:bg-university-blue/5 cursor-pointer transition-colors duration-200 border border-university-gray-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-university-gray-800">Add Student</span>
                      </div>
                    </Card>
                    <Card className="p-4 hover:bg-university-blue/5 cursor-pointer transition-colors duration-200 border border-university-gray-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Upload className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-university-gray-800">Upload Grades</span>
                      </div>
                    </Card>
                    <Card className="p-4 hover:bg-university-blue/5 cursor-pointer transition-colors duration-200 border border-university-gray-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <CreditCard className="h-4 w-4 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium text-university-gray-800">Update Fees</span>
                      </div>
                    </Card>
                    <Card className="p-4 hover:bg-university-blue/5 cursor-pointer transition-colors duration-200 border border-university-gray-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FileText className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-university-gray-800">Add Document</span>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="animate-fade-in">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="grades" className="animate-fade-in">
            <GradeManagement />
          </TabsContent>

          <TabsContent value="fees" className="animate-fade-in">
            <FeeManagement />
          </TabsContent>

          <TabsContent value="documents" className="animate-fade-in">
            <DocumentManagement />
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
