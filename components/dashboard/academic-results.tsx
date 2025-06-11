"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Lock, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StudentData {
  feeStatus: string
  cgpa: number
  results: Array<{
    semester: string
    courses: Array<{
      code: string
      title: string
      credits: number
      grade: string
      points: number
    }>
    gpa: number
  }>
}

interface AcademicResultsProps {
  studentData: StudentData
}

export function AcademicResults({ studentData }: AcademicResultsProps) {
  const [selectedSemester, setSelectedSemester] = useState(0)
  const { toast } = useToast()

  const canViewResults = studentData.feeStatus === "paid"

  const handleExportPDF = () => {
    if (!canViewResults) {
      toast({
        title: "Access Denied",
        description: "Please clear your fees to access academic results.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Exporting Results",
      description: "Your academic results are being prepared for download.",
      className: "border-university-blue/20 bg-university-blue/5",
    })

    // Simulate PDF generation
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: "Your academic results have been downloaded successfully.",
        className: "border-green-500/20 bg-green-50",
      })
    }, 2000)
  }

  if (!canViewResults) {
    return (
      <Card className="university-card">
        <CardHeader className="bg-red-50 border-b border-red-100 p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-red-700 text-lg sm:text-xl">
            <div className="p-2 sm:p-3 bg-red-100 rounded-xl">
              <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
            <span className="leading-tight">Academic Results - Access Restricted</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <Alert className="border-red-200 bg-red-50">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
            <AlertDescription className="text-red-800 text-sm sm:text-base leading-relaxed">
              Your academic results are currently unavailable. Please ensure your school fees are paid to access your
              results. Contact the finance office for assistance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-university-blue-dark text-xl sm:text-2xl">
                <div className="p-2 sm:p-3 bg-university-blue/10 rounded-xl">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-university-blue" />
                </div>
                Academic Results
              </CardTitle>
              <CardDescription className="text-university-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
                View your semester results and overall academic performance
              </CardDescription>
            </div>
            <Button onClick={handleExportPDF} className="university-button w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-8 bg-white">
          {/* Academic Summary Section - Mobile optimized */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white border border-university-blue/20 rounded-xl shadow-university">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="p-3 sm:p-4 bg-university-blue/5 rounded-lg">
                <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">Current CGPA</p>
                <p className="text-2xl sm:text-3xl font-bold text-university-blue">{studentData.cgpa}</p>
              </div>
              <div className="p-3 sm:p-4 bg-university-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">Total Semesters</p>
                <p className="text-2xl sm:text-3xl font-bold text-university-gray-800">{studentData.results.length}</p>
              </div>
              <div className="p-3 sm:p-4 bg-university-gray-50 rounded-lg col-span-2 lg:col-span-1">
                <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">Classification</p>
                <p className="text-sm sm:text-lg font-semibold text-university-gray-800 leading-tight">
                  {studentData.cgpa >= 3.5
                    ? "First Class"
                    : studentData.cgpa >= 3.0
                      ? "Second Class Upper"
                      : studentData.cgpa >= 2.5
                        ? "Second Class Lower"
                        : "Third Class"}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-green-50 rounded-lg col-span-2 lg:col-span-1">
                <p className="text-xs sm:text-sm text-university-gray-600 font-medium mb-1">Status</p>
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 mt-1">
                  Active
                </Badge>
              </div>
            </div>
          </div>

          {/* Semester Selection - Mobile optimized */}
          <div className="space-y-4 sm:space-y-6">
            <div className="w-full">
              <ScrollArea className="w-full">
                <div className="flex gap-2 sm:gap-3 pb-2">
                  {studentData.results.map((result, index) => (
                    <Button
                      key={index}
                      variant={selectedSemester === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSemester(index)}
                      className={
                        selectedSemester === index
                          ? "university-button whitespace-nowrap"
                          : "border-university-gray-300 text-university-gray-700 hover:bg-university-blue/5 bg-white whitespace-nowrap"
                      }
                    >
                      {result.semester}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Selected Semester Results - Mobile optimized */}
            {studentData.results[selectedSemester] && (
              <Card className="university-card bg-white border border-university-gray-200">
                <CardHeader className="bg-university-blue/5 border-b border-university-blue/10 p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-university-blue-dark">
                    {studentData.results[selectedSemester].semester} Results
                  </CardTitle>
                  <CardDescription className="text-university-gray-600 text-sm sm:text-base">
                    GPA:{" "}
                    <span className="font-semibold text-university-blue">
                      {studentData.results[selectedSemester].gpa}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 sm:p-6 bg-white">
                  {/* Mobile: Card layout, Desktop: Table layout */}
                  <div className="block sm:hidden">
                    <div className="space-y-3 p-4">
                      {studentData.results[selectedSemester].courses.map((course, index) => (
                        <div key={index} className="bg-university-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-university-gray-800 text-sm leading-tight">
                                {course.code}
                              </h4>
                              <p className="text-xs text-university-gray-600 mt-1 leading-relaxed">{course.title}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                course.grade === "A"
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : course.grade === "B"
                                    ? "bg-blue-100 text-blue-800 border-blue-300"
                                    : course.grade === "C"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                      : "bg-red-100 text-red-800 border-red-300"
                              }
                            >
                              {course.grade}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-university-gray-600">
                            <span>Credits: {course.credits}</span>
                            <span>Points: {course.points}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop: Table layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-university-gray-200 bg-university-gray-50">
                          <TableHead className="text-university-gray-700 font-semibold">Course Code</TableHead>
                          <TableHead className="text-university-gray-700 font-semibold">Course Title</TableHead>
                          <TableHead className="text-center text-university-gray-700 font-semibold">Credits</TableHead>
                          <TableHead className="text-center text-university-gray-700 font-semibold">Grade</TableHead>
                          <TableHead className="text-center text-university-gray-700 font-semibold">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentData.results[selectedSemester].courses.map((course, index) => (
                          <TableRow
                            key={index}
                            className="border-university-gray-200 hover:bg-university-gray-50 bg-white"
                          >
                            <TableCell className="font-medium text-university-gray-800">{course.code}</TableCell>
                            <TableCell className="text-university-gray-700">{course.title}</TableCell>
                            <TableCell className="text-center text-university-gray-700">{course.credits}</TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant="outline"
                                className={
                                  course.grade === "A"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : course.grade === "B"
                                      ? "bg-blue-100 text-blue-800 border-blue-300"
                                      : course.grade === "C"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                        : "bg-red-100 text-red-800 border-red-300"
                                }
                              >
                                {course.grade}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center text-university-gray-700 font-medium">
                              {course.points}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
