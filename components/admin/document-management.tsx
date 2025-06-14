"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, FileText, Download, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockDocuments = [
  {
    id: "1",
    title: "Student Handbook 2024",
    category: "General",
    type: "PDF",
    size: "2.1 MB",
    uploadDate: "2024-01-10",
    uploadedBy: "Admin",
    downloads: 245,
  },
  {
    id: "2",
    title: "Academic Calendar",
    category: "Academic",
    type: "PDF",
    size: "320 KB",
    uploadDate: "2024-01-01",
    uploadedBy: "Admin",
    downloads: 189,
  },
  {
    id: "3",
    title: "Fee Structure 2024",
    category: "Financial",
    type: "PDF",
    size: "156 KB",
    uploadDate: "2024-01-05",
    uploadedBy: "Finance Admin",
    downloads: 156,
  },
]

export function DocumentManagement() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const handleDocumentUpload = () => {
    if (!uploadFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Document Uploaded",
      description: "Document has been successfully uploaded and is now available to students",
      className: "border-university-blue/20 bg-university-blue/5",
    })
    setIsUploadDialogOpen(false)
    setUploadFile(null)
  }

  const handleDeleteDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
    toast({
      title: "Document Deleted",
      description: "Document has been removed from the system",
      variant: "destructive",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-university-blue/10 text-university-blue border-university-blue/30"
      case "Financial":
        return "bg-green-100 text-green-800 border-green-300"
      case "General":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-university-gray-100 text-university-gray-700 border-university-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
                <div className="p-3 bg-university-blue/10 rounded-xl">
                  <FileText className="h-6 w-6 text-university-blue" />
                </div>
                Document Management
              </CardTitle>
              <CardDescription className="text-university-gray-600 text-base">
                Upload and manage documents available to students
              </CardDescription>
            </div>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="university-button flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border border-university-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-university-blue-dark">Upload New Document</DialogTitle>
                  <DialogDescription className="text-university-gray-600">
                    Add a new document for students to access
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-university-gray-700 font-medium">
                      Document Title
                    </Label>
                    <Input id="title" placeholder="e.g., Student Handbook 2024" className="university-input bg-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-university-gray-700 font-medium">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-white border-university-gray-300">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-university-gray-200">
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file" className="text-university-gray-700 font-medium">
                      Document File
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="university-input bg-white"
                    />
                    {uploadFile && <p className="text-sm text-green-600 font-medium">Selected: {uploadFile.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-university-gray-700 font-medium">
                      Description (Optional)
                    </Label>
                    <Input
                      id="description"
                      placeholder="Brief description of the document"
                      className="university-input bg-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadDialogOpen(false)}
                    className="bg-white border-university-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleDocumentUpload} className="university-button">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-university-gray-200 bg-university-gray-50">
                  <TableHead className="text-university-gray-700 font-semibold">Document Title</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Category</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Type</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Size</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Upload Date</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Uploaded By</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Downloads</TableHead>
                  <TableHead className="text-university-gray-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow
                    key={document.id}
                    className="border-university-gray-200 hover:bg-university-gray-50 bg-white"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-university-blue/10 rounded">
                          <FileText className="h-4 w-4 text-university-blue" />
                        </div>
                        <span className="font-medium text-university-gray-800">{document.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-university-gray-100 text-university-gray-700 border-university-gray-300"
                      >
                        {document.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-university-gray-700">{document.size}</TableCell>
                    <TableCell className="text-university-gray-700">
                      {document.uploadDate}
                    </TableCell>
                    <TableCell className="text-university-gray-700">{document.uploadedBy}</TableCell>
                    <TableCell className="text-university-gray-700 font-medium">{document.downloads}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-university-blue/10">
                          <Download className="h-4 w-4 text-university-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDocument(document.id)}
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