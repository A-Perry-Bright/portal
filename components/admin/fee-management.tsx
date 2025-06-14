"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CreditCard, DollarSign, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockFeeRecords = [
  {
    id: "1",
    registrationNumber: "REG/2024/001",
    studentName: "John Doe",
    department: "Computer Science",
    level: "300 Level",
    totalFees: 2500000,
    paidAmount: 2500000,
    balance: 0,
    status: "paid",
    lastPayment: "2024-02-15",
  },
  {
    id: "2",
    registrationNumber: "REG/2024/002",
    studentName: "Jane Smith",
    department: "Engineering",
    level: "200 Level",
    totalFees: 2750000,
    paidAmount: 1500000,
    balance: 1250000,
    status: "partial",
    lastPayment: "2024-01-20",
  },
  {
    id: "3",
    registrationNumber: "REG/2024/003",
    studentName: "Michael Johnson",
    department: "Business Administration",
    level: "400 Level",
    totalFees: 2250000,
    paidAmount: 2250000,
    balance: 0,
    status: "paid",
    lastPayment: "2024-02-10",
  },
]

export function FeeManagement() {
  const [feeRecords, setFeeRecords] = useState(mockFeeRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const formatXAF = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateFeeStatus = (recordId: string, newStatus: string) => {
    setFeeRecords((prev) =>
      prev.map((record) =>
        record.id === recordId
          ? { ...record, status: newStatus, balance: newStatus === "paid" ? 0 : record.balance }
          : record,
      ),
    )

    toast({
      title: "Fee Status Updated",
      description: `Student fee status has been updated to ${newStatus}`,
      className: "border-university-blue/20 bg-university-blue/5",
    })
  }

  const totalRevenue = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0)
  const totalOutstanding = feeRecords.reduce((sum, record) => sum + record.balance, 0)
  const paidStudents = feeRecords.filter((record) => record.status === "paid").length

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-university-gray-700">Total Revenue</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold text-green-600">{formatXAF(totalRevenue)}</div>
            <p className="text-sm text-university-gray-600 mt-1">Current academic year</p>
          </CardContent>
        </Card>

        <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-university-gray-700">Outstanding Fees</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-300">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold text-red-600">{formatXAF(totalOutstanding)}</div>
            <p className="text-sm text-university-gray-600 mt-1">Pending payments</p>
          </CardContent>
        </Card>

        <Card className="university-card group hover:scale-105 transition-all duration-300 bg-white border border-university-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-university-gray-700">Paid Students</CardTitle>
            <div className="p-2 bg-university-blue/10 rounded-lg group-hover:bg-university-blue/20 transition-colors duration-300">
              <CreditCard className="h-4 w-4 text-university-blue" />
            </div>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-3xl font-bold text-university-blue">{paidStudents}</div>
            <p className="text-sm text-university-gray-600 mt-1">Out of {feeRecords.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
            <div className="p-3 bg-university-blue/10 rounded-xl">
              <CreditCard className="h-6 w-6 text-university-blue" />
            </div>
            Fee Management
          </CardTitle>
          <CardDescription className="text-university-gray-600 text-base">
            Manage student fee payments and status updates
          </CardDescription>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-white border-university-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-university-gray-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-university-gray-200 bg-university-gray-50">
                  <TableHead className="text-university-gray-700 font-semibold">Registration No.</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Student Name</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Department</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Total Fees</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Paid Amount</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Balance</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Status</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Last Payment</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id} className="border-university-gray-200 hover:bg-university-gray-50 bg-white">
                    <TableCell className="font-medium text-university-gray-800">{record.registrationNumber}</TableCell>
                    <TableCell className="text-university-gray-700 font-medium">{record.studentName}</TableCell>
                    <TableCell className="text-university-gray-700">{record.department}</TableCell>
                    <TableCell className="text-university-gray-700 font-medium">
                      {formatXAF(record.totalFees)}
                    </TableCell>
                    <TableCell className="text-university-gray-700 font-medium">
                      {formatXAF(record.paidAmount)}
                    </TableCell>
                    <TableCell className={`font-medium ${record.balance > 0 ? "text-red-600" : "text-green-600"}`}>
                      {formatXAF(record.balance)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          record.status === "paid"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : record.status === "partial"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : "bg-red-100 text-red-800 border-red-300"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-university-gray-700">
                      {record.lastPayment}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {record.status !== "paid" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateFeeStatus(record.id, "paid")}
                            className="bg-white border-university-gray-300 hover:bg-green-50 text-green-700"
                          >
                            Mark Paid
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="hover:bg-university-blue/10">
                          View Details
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