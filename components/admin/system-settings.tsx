"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Save, Bell, Shield, Database, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    universityName: "St. Austin's Bilingual University Institute of Science and Technology",
    academicYear: "2024/2025",
    currentSemester: "Fall 2024",
    enableNotifications: true,
    enableTwoFactor: false,
    maintenanceMode: false,
    maxFileSize: "10",
    sessionTimeout: "30",
    defaultLanguage: "english",
  })

  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully",
      className: "border-university-blue/20 bg-university-blue/5",
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
            <div className="p-3 bg-university-blue/10 rounded-xl">
              <Settings className="h-6 w-6 text-university-blue" />
            </div>
            System Settings
          </CardTitle>
          <CardDescription className="text-university-gray-600 text-base">
            Configure system-wide settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-8 bg-white">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-university-gray-800 flex items-center gap-2">
              <Settings className="h-5 w-5 text-university-blue" />
              General Settings
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="universityName" className="text-university-gray-700 font-medium">
                  University Name
                </Label>
                <Input
                  id="universityName"
                  value={settings.universityName}
                  onChange={(e) => handleSettingChange("universityName", e.target.value)}
                  className="university-input bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicYear" className="text-university-gray-700 font-medium">
                  Academic Year
                </Label>
                <Input
                  id="academicYear"
                  value={settings.academicYear}
                  onChange={(e) => handleSettingChange("academicYear", e.target.value)}
                  className="university-input bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSemester" className="text-university-gray-700 font-medium">
                  Current Semester
                </Label>
                <Select
                  value={settings.currentSemester}
                  onValueChange={(value) => handleSettingChange("currentSemester", value)}
                >
                  <SelectTrigger className="bg-white border-university-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-university-gray-200">
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultLanguage" className="text-university-gray-700 font-medium">
                  Default Language
                </Label>
                <Select
                  value={settings.defaultLanguage}
                  onValueChange={(value) => handleSettingChange("defaultLanguage", value)}
                >
                  <SelectTrigger className="bg-white border-university-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-university-gray-200">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="bg-university-gray-200" />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-university-gray-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-university-blue" />
              Security Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-university-gray-50 rounded-lg border border-university-gray-200">
                <div className="space-y-1">
                  <Label className="text-university-gray-800 font-medium">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-university-gray-600">Require 2FA for all admin accounts</p>
                </div>
                <Switch
                  checked={settings.enableTwoFactor}
                  onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-university-gray-700 font-medium">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                    className="university-input bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxFileSize" className="text-university-gray-700 font-medium">
                    Max File Upload Size (MB)
                  </Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                    className="university-input bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-university-gray-200" />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-university-gray-800 flex items-center gap-2">
              <Bell className="h-5 w-5 text-university-blue" />
              Notification Settings
            </h3>

            <div className="flex items-center justify-between p-4 bg-university-gray-50 rounded-lg border border-university-gray-200">
              <div className="space-y-1">
                <Label className="text-university-gray-800 font-medium">Enable System Notifications</Label>
                <p className="text-sm text-university-gray-600">Send notifications for important system events</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
              />
            </div>
          </div>

          <Separator className="bg-university-gray-200" />

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-university-gray-800 flex items-center gap-2">
              <Database className="h-5 w-5 text-university-blue" />
              System Maintenance
            </h3>

            <div className="flex items-center justify-between p-4 bg-university-gray-50 rounded-lg border border-university-gray-200">
              <div className="space-y-1">
                <Label className="text-university-gray-800 font-medium">Maintenance Mode</Label>
                <p className="text-sm text-university-gray-600">Enable maintenance mode to restrict access</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Button
                variant="outline"
                className="h-12 bg-white border-university-gray-300 text-university-gray-700 hover:bg-university-blue/5"
              >
                <Database className="mr-2 h-4 w-4" />
                Backup Database
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-white border-university-gray-300 text-university-gray-700 hover:bg-university-blue/5"
              >
                <Settings className="mr-2 h-4 w-4" />
                Clear System Cache
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-white border-university-gray-300 text-university-gray-700 hover:bg-university-blue/5"
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate System Report
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button onClick={handleSaveSettings} className="university-button flex items-center gap-2 px-8">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
