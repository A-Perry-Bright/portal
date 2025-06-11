"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download, Calendar, Upload, Plus, Trash2, FolderOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Simple hook to detect extra small screens
function useExtraSmallScreen() {
  const [isXs, setIsXs] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXs(window.innerWidth < 480)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return isXs
}

const universityDocuments = [
  {
    id: 1,
    title: "Admission Letter",
    category: "Academic",
    type: "PDF",
    size: "245 KB",
    uploadDate: "2024-01-15",
    description: "Official admission letter for current academic session",
  },
  {
    id: 2,
    title: "Class Timetable - Spring 2024",
    category: "Academic",
    type: "PDF",
    size: "180 KB",
    uploadDate: "2024-02-01",
    description: "Current semester class schedule and venue information",
  },
  {
    id: 3,
    title: "Student Handbook",
    category: "General",
    type: "PDF",
    size: "2.1 MB",
    uploadDate: "2024-01-10",
    description: "Complete guide to university policies and procedures",
  },
  {
    id: 4,
    title: "Fee Structure 2024",
    category: "Financial",
    type: "PDF",
    size: "156 KB",
    uploadDate: "2024-01-05",
    description: "Detailed breakdown of tuition and other fees",
  },
  {
    id: 5,
    title: "Academic Calendar",
    category: "Academic",
    type: "PDF",
    size: "320 KB",
    uploadDate: "2024-01-01",
    description: "Important dates and deadlines for the academic year",
  },
  {
    id: 6,
    title: "Graduation Requirements",
    category: "Academic",
    type: "PDF",
    size: "198 KB",
    uploadDate: "2024-01-20",
    description: "Requirements and procedures for graduation",
  },
]

const mockPersonalDocuments = [
  {
    id: 1,
    title: "Fee Payment Receipt - Fall 2024",
    category: "Financial",
    type: "PDF",
    size: "89 KB",
    uploadDate: "2024-02-15",
    description: "Bank receipt for semester fee payment",
  },
  {
    id: 2,
    title: "Medical Certificate",
    category: "Personal",
    type: "PDF",
    size: "156 KB",
    uploadDate: "2024-01-20",
    description: "Medical fitness certificate for sports activities",
  },
  {
    id: 3,
    title: "Scholarship Application",
    category: "Academic",
    type: "PDF",
    size: "234 KB",
    uploadDate: "2024-01-10",
    description: "Merit scholarship application form",
  },
]

export function DocumentCenter() {
  const [personalDocuments, setPersonalDocuments] = useState(mockPersonalDocuments)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentCategory, setDocumentCategory] = useState("")
  const [documentDescription, setDocumentDescription] = useState("")
  const { toast } = useToast()
  const isXs = useExtraSmallScreen()

  const handleUniversityDownload = (document: (typeof universityDocuments)[0]) => {
    toast({
      title: "Downloading Document",
      description: `${document.title} is being downloaded...`,
      className: "border-university-blue/20 bg-university-blue/5",
    })

    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${document.title} has been downloaded successfully.`,
        className: "border-green-500/20 bg-green-50",
      })
    }, 1500)
  }

  const handlePersonalUpload = () => {
    if (!uploadFile || !documentTitle || !documentCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive",
      })
      return
    }

    const newDocument = {
      id: personalDocuments.length + 1,
      title: documentTitle,
      category: documentCategory,
      type: uploadFile.name.split(".").pop()?.toUpperCase() || "PDF",
      size: `${Math.round(uploadFile.size / 1024)} KB`,
      uploadDate: new Date().toISOString().split("T")[0],
      description: documentDescription || "Personal document",
    }

    setPersonalDocuments([...personalDocuments, newDocument])

    toast({
      title: "Document Uploaded",
      description: "Your document has been uploaded successfully and is now saved in your personal collection.",
      className: "border-university-blue/20 bg-university-blue/5",
    })

    // Reset form
    setIsUploadDialogOpen(false)
    setUploadFile(null)
    setDocumentTitle("")
    setDocumentCategory("")
    setDocumentDescription("")
  }

  const handlePersonalDelete = (documentId: number) => {
    setPersonalDocuments(personalDocuments.filter((doc) => doc.id !== documentId))
    toast({
      title: "Document Deleted",
      description: "Your document has been removed from your personal collection.",
      variant: "destructive",
    })
  }

  const handlePersonalDownload = (document: (typeof personalDocuments)[0]) => {
    toast({
      title: "Downloading Document",
      description: `${document.title} is being downloaded...`,
      className: "border-university-blue/20 bg-university-blue/5",
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
      case "Personal":
        return "bg-orange-100 text-orange-800 border-orange-300"
      default:
        return "bg-university-gray-100 text-university-gray-700 border-university-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      <Card className="university-card bg-white border border-university-gray-200">
        <CardHeader className="bg-university-blue/5 border-b border-university-blue/10">
          <CardTitle className="flex items-center gap-3 text-university-blue-dark text-2xl">
            <div className="p-3 bg-university-blue/10 rounded-xl">
              <FileText className="h-6 w-6 text-university-blue" />
            </div>
            Document Center
          </CardTitle>
          <CardDescription className="text-university-gray-600 text-base">
            Access university documents and manage your personal document collection
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 bg-white">
          <Tabs defaultValue="university" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white border border-university-gray-200 rounded-xl p-1 shadow-university">
              <TabsTrigger
                value="university"
                className="flex items-center justify-center gap-2 text-sm data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="hidden xs:inline">University Documents</span>
                <span className="xs:hidden">University</span>
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="flex items-center justify-center gap-2 text-sm data-[state=active]:bg-university-blue data-[state=active]:text-white rounded-lg transition-all duration-200"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden xs:inline">My Documents</span>
                <span className="xs:hidden">Personal</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="university" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {universityDocuments.map((document) => (
                  <Card
                    key={document.id}
                    className="university-card group hover:scale-105 transition-all duration-300 border border-university-gray-200 bg-white"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-university-blue/10 rounded-lg group-hover:bg-university-blue/20 transition-colors duration-300">
                            <FileText className="h-5 w-5 text-university-blue" />
                          </div>
                          <Badge variant="outline" className={getCategoryColor(document.category)}>
                            {document.category}
                          </Badge>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs bg-university-gray-100 text-university-gray-700 border-university-gray-300"
                        >
                          {document.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-semibold leading-tight text-university-gray-800 group-hover:text-university-blue-dark transition-colors duration-300">
                        {document.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-university-gray-600 mb-4 line-clamp-2">{document.description}</p>

                      <div className="flex items-center justify-between text-sm text-university-gray-500 mb-4 p-3 bg-university-gray-50 rounded-lg">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-university-blue/60" />
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </span>
                        <span className="font-medium text-university-gray-600">{document.size}</span>
                      </div>

                      <Button
                        size="sm"
                        className="w-full university-button text-sm font-semibold h-10"
                        onClick={() => handleUniversityDownload(document)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-university-gray-800">Personal Documents</h3>
                  <p className="text-sm text-university-gray-600">
                    Upload and manage your personal documents like receipts, certificates, etc.
                  </p>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="university-button flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border border-university-gray-200 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-university-blue-dark">Upload Personal Document</DialogTitle>
                      <DialogDescription className="text-university-gray-600">
                        Add a document to your personal collection for safekeeping
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-university-gray-700 font-medium">
                          Document Title *
                        </Label>
                        <Input
                          id="title"
                          value={documentTitle}
                          onChange={(e) => setDocumentTitle(e.target.value)}
                          placeholder="e.g., Fee Payment Receipt"
                          className="university-input bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-university-gray-700 font-medium">
                          Category *
                        </Label>
                        <Select value={documentCategory} onValueChange={setDocumentCategory}>
                          <SelectTrigger className="bg-white border-university-gray-300">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-university-gray-200">
                            <SelectItem value="Financial">Financial</SelectItem>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                            <SelectItem value="Medical">Medical</SelectItem>
                            <SelectItem value="Legal">Legal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file" className="text-university-gray-700 font-medium">
                          Document File *
                        </Label>
                        <Input
                          id="file"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                          className="university-input bg-white"
                        />
                        {uploadFile && (
                          <p className="text-sm text-green-600 font-medium">Selected: {uploadFile.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-university-gray-700 font-medium">
                          Description (Optional)
                        </Label>
                        <Input
                          id="description"
                          value={documentDescription}
                          onChange={(e) => setDocumentDescription(e.target.value)}
                          placeholder="Brief description"
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
                      <Button onClick={handlePersonalUpload} className="university-button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {personalDocuments.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-university-gray-200 bg-university-gray-50">
                        <TableHead className="text-university-gray-700 font-semibold">Document</TableHead>
                        <TableHead className="text-university-gray-700 font-semibold">Category</TableHead>
                        <TableHead className="text-university-gray-700 font-semibold">Type</TableHead>
                        <TableHead className="text-university-gray-700 font-semibold">Size</TableHead>
                        <TableHead className="text-university-gray-700 font-semibold">Upload Date</TableHead>
                        <TableHead className="text-university-gray-700 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {personalDocuments.map((document) => (
                        <TableRow
                          key={document.id}
                          className="border-university-gray-200 hover:bg-university-gray-50 bg-white"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-university-blue/10 rounded">
                                <FileText className="h-4 w-4 text-university-blue" />
                              </div>
                              <div>
                                <span className="font-medium text-university-gray-800">{document.title}</span>
                                <p className="text-xs text-university-gray-600">{document.description}</p>
                              </div>
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
                            {new Date(document.uploadDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePersonalDownload(document)}
                                className="hover:bg-university-blue/10"
                              >
                                <Download className="h-4 w-4 text-university-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePersonalDelete(document.id)}
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
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-university-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-12 w-12 text-university-blue/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-university-gray-800 mb-2">No Personal Documents</h3>
                  <p className="text-university-gray-600 mb-4">
                    Start building your document collection by uploading important files like receipts, certificates,
                    and more.
                  </p>
                  <Button onClick={() => setIsUploadDialogOpen(true)} className="university-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Your First Document
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
