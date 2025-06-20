export const mockStudentData = {
  "REG/2024/001": {
    registrationNumber: "REG/2024/001",
    name: "John Doe",
    email: "john.doe@staustin.edu",
    department: "Computer Science",
    level: "300 Level",
    program: "B.Sc Computer Science",
    cgpa: 3.75,
    creditsEarned: 90,
    feeStatus: "paid",
    totalFees: 2500000,
    paidAmount: 2500000,
    balance: 0,
    phone: "+237123456789",
    address: "123 University Street, Douala, Cameroon",
    emergencyContact: "+237987654321",
    dateOfBirth: "1999-05-15",
    nationality: "Cameroonian",
    paymentHistory: [
      {
        date: "2024-02-15",
        amount: 1250000,
        method: "Bank Transfer",
        reference: "TXN001234567",
        status: "completed",
      },
      {
        date: "2024-01-15",
        amount: 1250000,
        method: "Mobile Money",
        reference: "TXN001234568",
        status: "completed",
      },
    ],
    results: [
      {
        semester: "Fall 2023",
        gpa: 3.8,
        courses: [
          {
            code: "CS301",
            title: "Data Structures and Algorithms",
            credits: 3,
            grade: "A",
            points: 4.0,
          },
          {
            code: "CS302",
            title: "Database Systems",
            credits: 3,
            grade: "A-",
            points: 3.7,
          },
          {
            code: "CS303",
            title: "Software Engineering",
            credits: 3,
            grade: "B+",
            points: 3.3,
          },
          {
            code: "MTH301",
            title: "Discrete Mathematics",
            credits: 3,
            grade: "A",
            points: 4.0,
          },
        ],
      },
      {
        semester: "Spring 2023",
        gpa: 3.7,
        courses: [
          {
            code: "CS201",
            title: "Object-Oriented Programming",
            credits: 3,
            grade: "A",
            points: 4.0,
          },
          {
            code: "CS202",
            title: "Computer Networks",
            credits: 3,
            grade: "B+",
            points: 3.3,
          },
          {
            code: "CS203",
            title: "Operating Systems",
            credits: 3,
            grade: "A-",
            points: 3.7,
          },
          {
            code: "MTH201",
            title: "Linear Algebra",
            credits: 3,
            grade: "B+",
            points: 3.3,
          },
        ],
      },
    ],
  },
}

export const mockAnnouncements = [
  {
    id: "1",
    title: "Mid-Semester Examination Schedule",
    content: "Mid-semester examinations will commence on March 15, 2024. Please check your individual timetables.",
    date: "2024-03-01",
    priority: "high",
  },
  {
    id: "2",
    title: "Library Extended Hours",
    content: "The university library will be open 24/7 during examination period to support student studies.",
    date: "2024-02-28",
    priority: "medium",
  },
  {
    id: "3",
    title: "New Course Registration Opens",
    content: "Registration for next semester courses opens on April 1, 2024. Early registration is encouraged.",
    date: "2024-02-25",
    priority: "high",
  },
  {
    id: "4",
    title: "Campus WiFi Maintenance",
    content: "Campus WiFi will undergo maintenance on March 10, 2024 from 2:00 AM to 6:00 AM.",
    date: "2024-02-20",
    priority: "low",
  },
]
