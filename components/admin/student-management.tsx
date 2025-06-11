"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus, Edit, Trash2, Eye, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockStudents = [
  {
    id: "1",
    registrationNumber: "REG/2024/001",
    name: "John Doe",
    email: "john.doe@staustin.edu",
    department: "Computer Science",
    level: "300 Level",
    program: "B.Sc Computer Science",
    status: "active",
    feeStatus: "paid",
    cgpa: 3.75,
    enrollmentDate: "2024-01-15",
  },
  {
    id: "2",
    registrationNumber: "REG/2024/002",
    name: "Jane Smith",
    email: "jane.smith@staustin.edu",
    department: "Engineering",
    level: "200 Level",
    program: "B.Eng Electrical Engineering",
    status: "active",
    feeStatus: "pending",
    cgpa: 3.42,
    enrollmentDate: "2024-01-16",
  },
  {
    id: "3",
    registrationNumber: "REG/2024/003",
    name: "Michael Johnson",
    email: "michael.johnson@staustin.edu",
    department: "Business Administration",
    level: "400 Level",
    program: "B.Sc Business Administration",
    status: "active",
    feeStatus: "paid",
    cgpa: 3.89,
    enrollmentDate: "2024-01-17",
  },
  {
    id: "4",
    registrationNumber: "REG/2024/004",
    name: "Sarah Williams",
    email: "sarah.williams@staustin.edu",
    department: "Medicine",
    level: "100 Level",
    program: "MBBS Medicine",
    status: "active",
    feeStatus: "paid",
    cgpa: 4.0,
    enrollmentDate: "2024-01-18",
  },
]

export function StudentManagement() {
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const departments = ["all", ...Array.from(new Set(students.map((s) => s.department)))]

  const handleAddStudent = () => {
    toast({
      title: "Student Added",
      description: "New student has been successfully added to the system.",
      className: "border-university-blue/20 bg-university-blue/5",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditStudent = (studentId: string) => {
    toast({
      title: "Edit Student",
      description: "Student edit functionality would be implemented here.",
      className: "border-university-blue/20 bg-university-blue/5",
    })
  }

  const handleDeleteStudent = (studentId: string) => {
    toast({
      title: "Student Deleted",
      description: "Student has been removed from the system.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
                <div className="p-3 bg-university-blue/10 rounded-xl">
                  <Users className="h-6 w-6 text-university-blue" />
                </div>
                Student Management
              </CardTitle>
              <CardDescription className="text-university-gray-600 text-base">
                Manage student records, enrollment, and academic information
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="university-button flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white border border-university-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-university-blue-dark">Add New Student</DialogTitle>
                  <DialogDescription className="text-university-gray-600">
                    Enter the student's information to create a new record
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-university-gray-700 font-medium">
                        Full Name
                      </Label>
                      <Input id="name" placeholder="Enter full name" className="university-input bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-university-gray-700 font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@staustin.edu"
                        className="university-input bg-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program" className="text-university-gray-700 font-medium">
                      Program
                    </Label>
                    <Input
                      id="program"
                      placeholder="e.g., B.Sc Computer Science"
                      className="university-input bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="bg-white border-university-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddStudent} className="university-button">
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-university-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 university-input bg-white"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48 bg-white border-university-gray-300">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-university-gray-200">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-university-gray-200 bg-university-gray-50">
                  <TableHead className="text-university-gray-700 font-semibold">Registration No.</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Name</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Department</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Level</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Fee Status</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">CGPA</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Status</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="border-university-gray-200 hover:bg-university-gray-50 bg-white"
                  >
                    <TableCell className="font-medium text-university-gray-800">{student.registrationNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-university-gray-800">{student.name}</p>
                        <p className="text-sm text-university-gray-600">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-university-gray-700">{student.department}</TableCell>
                    <TableCell className="text-university-gray-700">{student.level}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.feeStatus === "paid"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-red-100 text-red-800 border-red-300"
                        }
                      >
                        {student.feeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-university-gray-700 font-medium">{student.cgpa}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.status === "active"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-university-blue/10">
                          <Eye className="h-4 w-4 text-university-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStudent(student.id)}
                          className="hover:bg-university-blue/10"
                        >
                          <Edit className="h-4 w-4 text-university-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                          className="hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
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
