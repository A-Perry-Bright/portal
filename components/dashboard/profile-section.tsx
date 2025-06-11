"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Edit,
  Save,
  X,
  Camera,
  User,
  Phone,
  MapPin,
  Calendar,
  Flag,
  Mail,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserType {
  id: string
  name: string
  email: string
  role: string
  registrationNumber: string
}

interface StudentData {
  department: string
  level: string
  program: string
  phone?: string
  address?: string
  emergencyContact?: string
  dateOfBirth?: string
  nationality?: string
}

interface ProfileSectionProps {
  user: UserType
  studentData: StudentData
}

export function ProfileSection({ user, studentData }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: studentData.phone || "",
    address: studentData.address || "",
    emergencyContact: studentData.emergencyContact || "",
  })
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Profile Updated Successfully",
      description: "Your profile changes have been submitted for admin approval.",
      className: "border-green-500/20 bg-green-50",
    })

    setIsEditing(false)
    setIsLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      phone: studentData.phone || "",
      address: studentData.address || "",
      emergencyContact: studentData.emergencyContact || "",
    })
    setIsEditing(false)
  }

  const profileCompleteness = () => {
    const fields = [user.name, user.email, formData.phone, formData.address, formData.emergencyContact]
    const completed = fields.filter((field) => field && field.trim() !== "").length
    return Math.round((completed / fields.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Modern Profile Header */}
      <Card className="relative overflow-hidden bg-white border border-university-gray-200 shadow-md">
        <CardHeader className="relative p-6 sm:p-8 bg-university-blue/5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Picture Section */}
            <div className="relative group">
              <Avatar className="h-24 w-24 sm:h-32 sm:h-32 border-4 border-white shadow-lg ring-4 ring-university-blue/10">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user.name} />
                <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-university-gradient text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 bg-white border-2 border-university-blue/20 hover:bg-university-blue hover:text-white shadow-md group-hover:scale-110 transition-all duration-300"
              >
                <Camera className="h-4 w-4" />
              </Button>

              {/* Online Status Indicator */}
              <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md animate-pulse"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-university-blue-dark mb-2">{user.name}</h2>
                <p className="text-university-gray-600 font-medium text-lg">{user.registrationNumber}</p>
                <p className="text-university-gray-500 text-sm">{user.email}</p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge className="bg-university-blue/10 text-university-blue border-university-blue/30 px-3 py-1">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {studentData.level} Student
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
                <Badge className="bg-university-blue/10 text-university-blue border-university-blue/30 px-3 py-1">
                  <Award className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>

              {/* Profile Completeness */}
              <div className="bg-white rounded-xl p-4 border border-university-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-university-gray-700">Profile Completeness</span>
                  <span className="text-sm font-bold text-university-blue">{profileCompleteness()}%</span>
                </div>
                <div className="w-full bg-university-gray-200 rounded-full h-2">
                  <div
                    className="bg-university-blue h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${profileCompleteness()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="university-button px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="university-button px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    disabled={isLoading}
                    className="bg-white border-university-gray-300 text-university-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Modern Information Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Academic Information */}
        <Card className="group bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500">
          <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-university-blue-dark text-lg sm:text-xl">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-university-blue" />
              </div>
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {[
              {
                icon: GraduationCap,
                label: "Department",
                value: studentData.department,
                color: "text-university-blue",
              },
              { icon: BookOpen, label: "Program", value: studentData.program, color: "text-university-blue" },
              { icon: Award, label: "Current Level", value: studentData.level, color: "text-university-blue" },
              { icon: Mail, label: "Email Address", value: user.email, color: "text-university-blue" },
            ].map((item, index) => (
              <div
                key={index}
                className="group/item flex items-center gap-4 p-3 sm:p-4 bg-white rounded-xl border border-university-gray-200 hover:border-university-blue/30 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`p-2 rounded-lg bg-university-blue/10 group-hover/item:scale-110 transition-transform duration-200`}
                >
                  <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">{item.label}</p>
                  <p className="font-semibold text-university-gray-800 text-sm sm:text-base truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="group bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500">
          <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6 rounded-t-xl">
            <CardTitle className="flex items-center gap-3 text-university-blue-dark text-lg sm:text-xl">
              <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-university-blue" />
              </div>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Phone Number */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-medium text-university-gray-700 flex items-center gap-2">
                <Phone className="h-4 w-4 text-university-blue" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="university-input bg-white border-university-gray-300 h-12 text-base"
                />
              ) : (
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-university-gray-200">
                  <p className="text-university-gray-800 font-medium">{formData.phone || "Not provided"}</p>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="space-y-3">
              <Label htmlFor="address" className="text-sm font-medium text-university-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-university-blue" />
                Home Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter home address"
                  rows={3}
                  className="university-input bg-white border-university-gray-300 text-base resize-none"
                />
              ) : (
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-university-gray-200">
                  <p className="text-university-gray-800 font-medium leading-relaxed">
                    {formData.address || "Not provided"}
                  </p>
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="space-y-3">
              <Label
                htmlFor="emergency"
                className="text-sm font-medium text-university-gray-700 flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-red-500" />
                Emergency Contact
              </Label>
              {isEditing ? (
                <Input
                  id="emergency"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="Emergency contact number"
                  className="university-input bg-white border-university-gray-300 h-12 text-base"
                />
              ) : (
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-university-gray-200">
                  <p className="text-university-gray-800 font-medium">{formData.emergencyContact || "Not provided"}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information */}
      <Card className="group bg-white border border-university-gray-200 shadow-md hover:shadow-lg transition-all duration-500">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6 rounded-t-xl">
          <CardTitle className="flex items-center gap-3 text-university-blue-dark text-lg sm:text-xl">
            <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-university-blue" />
            </div>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="group/item flex items-center gap-4 p-3 sm:p-4 bg-white rounded-xl border border-university-gray-200 hover:border-university-blue/30 hover:shadow-md transition-all duration-300">
              <div className="p-2 rounded-lg bg-university-blue/10 group-hover/item:scale-110 transition-transform duration-200">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-university-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">Date of Birth</p>
                <p className="font-semibold text-university-gray-800 text-sm sm:text-base">
                  {studentData.dateOfBirth || "Not provided"}
                </p>
              </div>
            </div>

            <div className="group/item flex items-center gap-4 p-3 sm:p-4 bg-white rounded-xl border border-university-gray-200 hover:border-university-blue/30 hover:shadow-md transition-all duration-300">
              <div className="p-2 rounded-lg bg-university-blue/10 group-hover/item:scale-110 transition-transform duration-200">
                <Flag className="h-4 w-4 sm:h-5 sm:w-5 text-university-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">Nationality</p>
                <p className="font-semibold text-university-gray-800 text-sm sm:text-base">
                  {studentData.nationality || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Mode Notice */}
      {isEditing && (
        <Card className="border-2 border-yellow-200 bg-yellow-50 shadow-md">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  Profile changes require admin approval and may take 1-2 business days to process. You will be notified
                  via email once your changes are approved. Make sure all information is accurate before saving.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
