"use client"

import { useState } from "react"
import Mainnav from "./Main_nav"
import {
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  Search,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  UserCheck,
  UserX,
  Timer,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

// Mock data for employees
const employees = [
  {
    id: 1,
    name: "Rajesh Kumar",
    employeeId: "EMP001",
    department: "Production",
    position: "Senior Technician",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@company.com",
    shift: "Morning (9:00 AM - 6:00 PM)",
    status: "Present",
    checkIn: "09:15 AM",
    checkOut: "06:30 PM",
    workingHours: "9h 15m",
    overtime: "0h 30m",
    location: "Main Factory",
    attendanceRate: 95.5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    employeeId: "EMP002",
    department: "Quality Control",
    position: "QC Inspector",
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
    phone: "+91 98765 43211",
    email: "priya.sharma@company.com",
    shift: "Morning (9:00 AM - 6:00 PM)",
    status: "Present",
    checkIn: "08:45 AM",
    checkOut: "06:00 PM",
    workingHours: "9h 15m",
    overtime: "0h 0m",
    location: "QC Lab",
    attendanceRate: 98.2,
  },
  {
    id: 3,
    name: "Amit Singh",
    employeeId: "EMP003",
    department: "Maintenance",
    position: "Maintenance Engineer",
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    phone: "+91 98765 43212",
    email: "amit.singh@company.com",
    shift: "Night (10:00 PM - 7:00 AM)",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    workingHours: "0h 0m",
    overtime: "0h 0m",
    location: "Maintenance Shop",
    attendanceRate: 87.3,
  },
  {
    id: 4,
    name: "Sunita Patel",
    employeeId: "EMP004",
    department: "Administration",
    position: "HR Executive",
    avatar: "/placeholder.svg?height=40&width=40&text=SP",
    phone: "+91 98765 43213",
    email: "sunita.patel@company.com",
    shift: "Morning (9:00 AM - 6:00 PM)",
    status: "Late",
    checkIn: "09:45 AM",
    checkOut: "-",
    workingHours: "8h 30m",
    overtime: "0h 0m",
    location: "Admin Office",
    attendanceRate: 92.1,
  },
  {
    id: 5,
    name: "Vikram Gupta",
    employeeId: "EMP005",
    department: "Production",
    position: "Machine Operator",
    avatar: "/placeholder.svg?height=40&width=40&text=VG",
    phone: "+91 98765 43214",
    email: "vikram.gupta@company.com",
    shift: "Evening (2:00 PM - 11:00 PM)",
    status: "Present",
    checkIn: "01:55 PM",
    checkOut: "-",
    workingHours: "6h 30m",
    overtime: "0h 0m",
    location: "Production Floor A",
    attendanceRate: 94.7,
  },
  {
    id: 6,
    name: "Meera Joshi",
    employeeId: "EMP006",
    department: "Accounts",
    position: "Accountant",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    phone: "+91 98765 43215",
    email: "meera.joshi@company.com",
    shift: "Morning (9:00 AM - 6:00 PM)",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:15 PM",
    workingHours: "9h 15m",
    overtime: "0h 15m",
    location: "Accounts Office",
    attendanceRate: 96.8,
  },
]

// Mock attendance history data
const attendanceHistory = [
  { date: "2024-01-15", present: 45, absent: 3, late: 2, total: 50 },
  { date: "2024-01-14", present: 47, absent: 2, late: 1, total: 50 },
  { date: "2024-01-13", present: 46, absent: 2, late: 2, total: 50 },
  { date: "2024-01-12", present: 48, absent: 1, late: 1, total: 50 },
  { date: "2024-01-11", present: 44, absent: 4, late: 2, total: 50 },
]

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || employee.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Present
          </Badge>
        )
      case "Absent":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Absent
          </Badge>
        )
      case "Late":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Late
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalEmployees = employees.length
  const presentEmployees = employees.filter((emp) => emp.status === "Present").length
  const absentEmployees = employees.filter((emp) => emp.status === "Absent").length
  const lateEmployees = employees.filter((emp) => emp.status === "Late").length
  const attendanceRate = (((presentEmployees + lateEmployees) / totalEmployees) * 100).toFixed(1)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div style={{ marginLeft: "0.15rem", marginBottom: "1.5rem" }}>
                                          <Mainnav></Mainnav>
                                      </div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employee Attendance</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Mark Employee Attendance</DialogTitle>
                <DialogDescription>Manually mark attendance for an employee</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">
                    Employee
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.employeeId}>
                          {emp.name} ({emp.employeeId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="half-day">Half Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="checkin" className="text-right">
                    Check In
                  </Label>
                  <Input id="checkin" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" placeholder="Add any notes..." className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Attendance</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentEmployees}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              {attendanceRate}% attendance rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentEmployees}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              {((absentEmployees / totalEmployees) * 100).toFixed(1)}% absent rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Timer className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lateEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {((lateEmployees / totalEmployees) * 100).toFixed(1)}% late rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Attendance</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter employees by department, status, or search</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Quality Control">Quality Control</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="Accounts">Accounts</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Employee Attendance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Attendance - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
              <CardDescription>
                Showing {filteredEmployees.length} of {totalEmployees} employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Working Hours</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={employee.avatar || "/placeholder.svg"}
                            alt={employee.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.department}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{employee.shift}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell className="font-medium">{employee.checkIn}</TableCell>
                      <TableCell className="font-medium">{employee.checkOut}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.workingHours}</div>
                          {employee.overtime !== "0h 0m" && (
                            <div className="text-sm text-blue-600">OT: {employee.overtime}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{employee.location}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Attendance
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              View History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Historical attendance data for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Employees</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.total}</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{record.present}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{record.absent}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-600 font-medium">{record.late}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {(((record.present + record.late) / record.total) * 100).toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Generate monthly attendance reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Month</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">January 2024</SelectItem>
                        <SelectItem value="02">February 2024</SelectItem>
                        <SelectItem value="03">March 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="quality">Quality Control</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employee Summary</CardTitle>
                <CardDescription>Individual employee attendance summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.employeeId}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>From Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>To Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <Button className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  View Summary
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Settings</CardTitle>
                <CardDescription>Configure attendance tracking settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Working Hours</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" defaultValue="09:00" />
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div>
                  <Label>Late Arrival Threshold (minutes)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
                <div>
                  <Label>Overtime Calculation</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shift Management</CardTitle>
                <CardDescription>Manage employee shifts and schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Morning Shift (9:00 AM - 6:00 PM)</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Evening Shift (2:00 PM - 11:00 PM)</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Night Shift (10:00 PM - 7:00 AM)</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Shift
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
