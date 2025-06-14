"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface StudentData {
  feeStatus: string
  totalFees: number
  paidAmount: number
  balance: number
  paymentHistory: Array<{
    date: string
    amount: number
    method: string
    reference: string
    status: string
  }>
}

interface FeeStatusProps {
  studentData: StudentData
}

export function FeeStatus({ studentData }: FeeStatusProps) {
  const paymentPercentage = (studentData.paidAmount / studentData.totalFees) * 100

  const formatXAF = (amount: number) => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
            <div className="p-3 bg-university-blue/10 rounded-xl">
              <CreditCard className="h-6 w-6 text-university-blue" />
            </div>
            Fee Status Overview
          </CardTitle>
          <CardDescription className="text-university-gray-600 text-base">
            Current semester fee information and payment history
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 bg-white">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-6 border border-university-gray-200 rounded-xl bg-white shadow-university">
                <h3 className="font-semibold mb-4 text-university-gray-800 text-lg">Payment Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-university-gray-50 rounded-lg">
                    <span className="text-university-gray-600 font-medium">Total Fees:</span>
                    <span className="font-bold text-university-gray-800 text-lg">
                      {formatXAF(studentData.totalFees)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-university-gray-600 font-medium">Amount Paid:</span>
                    <span className="font-bold text-green-600 text-lg">{formatXAF(studentData.paidAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-university-gray-600 font-medium">Outstanding Balance:</span>
                    <span
                      className={`font-bold text-lg ${studentData.balance > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {formatXAF(studentData.balance)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-university-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-university-gray-600 font-medium">Status:</span>
                      <Badge
                        variant={studentData.feeStatus === "paid" ? "default" : "destructive"}
                        className={`${studentData.feeStatus === "paid" ? "bg-green-500 hover:bg-green-600" : ""} px-3 py-1`}
                      >
                        {studentData.feeStatus === "paid" ? "Fully Paid" : "Outstanding"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-university-gray-200 rounded-xl bg-white shadow-university">
                <h3 className="font-semibold mb-4 text-university-gray-800 text-lg">Payment Progress</h3>
                <div className="space-y-3">
                  <div className="w-full bg-university-gray-200 rounded-full h-4">
                    <div
                      className="bg-university-blue h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${paymentPercentage}%` }}
                    >
                      {paymentPercentage > 20 && (
                        <span className="text-xs text-white font-medium">{paymentPercentage.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-university-gray-600 font-medium">
                    {paymentPercentage.toFixed(1)}% completed
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {studentData.balance > 0 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    You have an outstanding balance of {formatXAF(studentData.balance)}. Please clear your fees to
                    access all academic services.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button
                  className="w-full university-button h-12 text-base font-semibold"
                  disabled={studentData.balance === 0}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Make Payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 border-university-gray-300 text-university-gray-700 hover:bg-university-blue/5 bg-white text-base font-medium"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Receipt
                </Button>
              </div>

              {studentData.feeStatus === "paid" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 font-semibold">Payment Complete</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    All fees have been paid. You have full access to academic services.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-gray-50 border-b border-university-gray-200">
          <CardTitle className="text-university-blue-dark">Payment History</CardTitle>
          <CardDescription className="text-university-gray-600">Record of all fee payments made</CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-university-gray-200 bg-university-gray-50">
                  <TableHead className="text-university-gray-700 font-semibold">Date</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Amount</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Method</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Reference</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.paymentHistory.map((payment, index) => (
                  <TableRow key={index} className="border-university-gray-200 hover:bg-university-gray-50 bg-white">
                    <TableCell className="text-university-gray-700 font-medium">
                      {payment.date}
                    </TableCell>
                    <TableCell className="text-university-gray-700 font-semibold">
                      {formatXAF(payment.amount)}
                    </TableCell>
                    <TableCell className="text-university-gray-700">{payment.method}</TableCell>
                    <TableCell className="font-mono text-sm text-university-gray-600">{payment.reference}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${payment.status === "completed" ? "bg-green-100 text-green-800 border-green-300" : "bg-yellow-100 text-yellow-800 border-yellow-300"}`}
                      >
                        {payment.status}
                      </Badge>
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