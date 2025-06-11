"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, Plus, Save, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockGrades = [
  {
    id: "1",
    courseCode: "CS101",
    courseTitle: "Introduction to Programming",
    department: "Computer Science",
    level: "100 Level",
    semester: "Fall 2024",
    instructor: "Dr. Smith",
    studentsEnrolled: 45,
    gradesUploaded: 45,
  },
  {
    id: "2",
    courseCode: "ENG201",
    courseTitle: "Circuit Analysis",
    department: "Engineering",
    level: "200 Level",
    semester: "Fall 2024",
    instructor: "Prof. Johnson",
    studentsEnrolled: 38,
    gradesUploaded: 35,
  },
]

export function GradeManagement() {
  const [courses, setCourses] = useState(mockGrades)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadFile(file)
      toast({
        title: "File Selected",
        description: `${file.name} is ready for upload`,
        className: "border-university-blue/20 bg-university-blue/5",
      })
    }
  }

  const handleGradeUpload = () => {
    if (!uploadFile || !selectedCourse) {
      toast({
        title: "Missing Information",
        description: "Please select a course and upload file",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Grades Uploaded",
      description: "Student grades have been successfully uploaded and processed",
      className: "border-university-blue/20 bg-university-blue/5",
    })
    setUploadFile(null)
    setSelectedCourse("")
  }

  const handleExportGrades = (courseId: string) => {
    toast({
      title: "Exporting Grades",
      description: "Grade report is being prepared for download",
      className: "border-university-blue/20 bg-university-blue/5",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="university-card bg-white border border-university-gray-200">
          <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
            <CardTitle className="flex items-center gap-2 text-university-blue-dark">
              <div className="p-2 bg-university-blue/10 rounded-lg">
                <Upload className="h-5 w-5 text-university-blue" />
              </div>
              Upload Grades
            </CardTitle>
            <CardDescription className="text-university-gray-600">
              Upload student grades by course and semester
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 bg-white">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-university-gray-700 font-medium">
                Department
              </Label>
              <Select>
                <SelectTrigger className="bg-white border-university-gray-300">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-university-gray-200">
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business Administration</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-university-gray-700 font-medium">
                Level
              </Label>
              <Select>
                <SelectTrigger className="bg-white border-university-gray-300">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-university-gray-200">
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course" className="text-university-gray-700 font-medium">
                Course
              </Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="bg-white border-university-gray-300">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-university-gray-200">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.courseCode} - {course.courseTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-university-gray-700 font-medium">
                Grade File (CSV/Excel)
              </Label>
              <Input
                id="file"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="university-input bg-white"
              />
              {uploadFile && <p className="text-sm text-green-600 font-medium">Selected: {uploadFile.name}</p>}
            </div>

            <Button onClick={handleGradeUpload} className="w-full university-button">
              <Upload className="mr-2 h-4 w-4" />
              Upload Grades
            </Button>
          </CardContent>
        </Card>

        <Card className="university-card bg-white border border-university-gray-200">
          <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
            <CardTitle className="flex items-center gap-2 text-university-blue-dark">
              <div className="p-2 bg-university-blue/10 rounded-lg">
                <Plus className="h-5 w-5 text-university-blue" />
              </div>
              Add New Course
            </CardTitle>
            <CardDescription className="text-university-gray-600">
              Create a new course for grade management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 bg-white">
            <div className="space-y-2">
              <Label htmlFor="courseCode" className="text-university-gray-700 font-medium">
                Course Code
              </Label>
              <Input id="courseCode" placeholder="e.g., CS101" className="university-input bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseTitle" className="text-university-gray-700 font-medium">
                Course Title
              </Label>
              <Input
                id="courseTitle"
                placeholder="e.g., Introduction to Programming"
                className="university-input bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor" className="text-university-gray-700 font-medium">
                Instructor
              </Label>
              <Input id="instructor" placeholder="e.g., Dr. Smith" className="university-input bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits" className="text-university-gray-700 font-medium">
                Credits
              </Label>
              <Input id="credits" type="number" placeholder="3" className="university-input bg-white" />
            </div>

            <Button className="w-full university-button">
              <Save className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
            <div className="p-3 bg-university-blue/10 rounded-xl">
              <GraduationCap className="h-6 w-6 text-university-blue" />
            </div>
            Course Management
          </CardTitle>
          <CardDescription className="text-university-gray-600 text-base">
            Manage existing courses and view grade upload status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-university-gray-200 bg-university-gray-50">
                  <TableHead className="text-university-gray-700 font-semibold">Course Code</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Course Title</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Department</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Level</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Instructor</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Enrolled</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Grades Uploaded</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} className="border-university-gray-200 hover:bg-university-gray-50 bg-white">
                    <TableCell className="font-medium text-university-gray-800">{course.courseCode}</TableCell>
                    <TableCell className="text-university-gray-700">{course.courseTitle}</TableCell>
                    <TableCell className="text-university-gray-700">{course.department}</TableCell>
                    <TableCell className="text-university-gray-700">{course.level}</TableCell>
                    <TableCell className="text-university-gray-700">{course.instructor}</TableCell>
                    <TableCell className="text-university-gray-700 font-medium">{course.studentsEnrolled}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          course.gradesUploaded === course.studentsEnrolled ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {course.gradesUploaded}/{course.studentsEnrolled}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportGrades(course.id)}
                          className="bg-white border-university-gray-300 hover:bg-university-blue/5"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white border-university-gray-300 hover:bg-university-blue/5"
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
