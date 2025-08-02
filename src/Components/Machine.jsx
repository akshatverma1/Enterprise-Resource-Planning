"use client"

import { useState, useEffect } from "react"
import { Settings, Wrench, Zap, Monitor, Plus, Search, Download, Eye } from "lucide-react"
import Sidebar from "./sidebar"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import Mainnav from "./Main_nav.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

// Machine data
const machines = [
  {
    id: 1,
    name: "Laser Machine 3KW",
    model: "LM-3000",
    serialNumber: "LM3K-2024-001",
    status: "operational",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-02-15",
  },
  {
    id: 2,
    name: "Laser Machine 1KW",
    model: "LM-1000",
    serialNumber: "LM1K-2024-002",
    status: "operational",
    lastMaintenance: "2025-01-10",
    nextMaintenance: "2025-02-10",
  },
]

// Maintenance task templates
const taskTemplates = {
  mechanical: [
    "Lubricate axial axis linear guides",
    "Lubricate all moving mechanical parts",
    "Clean cutting pipes/nozzle air pressure",
    "Check mechanical alignment",
    "Inspect belt tension and condition",
    "Clean and lubricate bearings",
  ],
  electrical: [
    "Inspect all power cables",
    "Verify power supply voltage",
    "Check the voltage stabilizer functionality",
    "Clean circuit boards and electrical panels with air pressure",
    "Consult engineer if any electrical issue is detected",
    "Test emergency stop functionality",
    "Check grounding connections",
  ],
  software: [
    "Check Boiler/CypCut control software functionality",
    "Verify and update all machine drivers",
    "Backup machine parameters",
    "Update firmware if available",
    "Test communication protocols",
    "Verify calibration settings",
  ],
}

// Sample maintenance records
const initialMaintenanceRecords = [
  // Laser Machine 3KW records
  {
    id: 1,
    machineId: 1,
    date: "2025-01-01",
    category: "mechanical",
    task: "Lubricate axial axis linear guides",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 2,
    machineId: 1,
    date: "2025-01-01",
    category: "mechanical",
    task: "Lubricate all moving mechanical parts",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 3,
    machineId: 1,
    date: "2025-01-01",
    category: "mechanical",
    task: "Clean cutting pipes/nozzle air pressure",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 4,
    machineId: 1,
    date: "2025-01-01",
    category: "electrical",
    task: "Inspect all power cables",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 5,
    machineId: 1,
    date: "2025-01-01",
    category: "electrical",
    task: "Verify power supply voltage",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 6,
    machineId: 1,
    date: "2025-01-01",
    category: "electrical",
    task: "Check the voltage stabilizer functionality",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 7,
    machineId: 1,
    date: "2025-01-01",
    category: "electrical",
    task: "Clean circuit boards and electrical panels with air pressure",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 8,
    machineId: 1,
    date: "2025-01-01",
    category: "electrical",
    task: "Consult engineer if any electrical issue is detected",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 9,
    machineId: 1,
    date: "2025-01-01",
    category: "software",
    task: "Check Boiler/CypCut control software functionality",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 10,
    machineId: 1,
    date: "2025-01-01",
    category: "software",
    task: "Verify and update all machine drivers",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },

  // Laser Machine 1KW records
  {
    id: 11,
    machineId: 2,
    date: "2025-01-02",
    category: "mechanical",
    task: "Lubricate axial axis linear guides",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 12,
    machineId: 2,
    date: "2025-01-02",
    category: "mechanical",
    task: "Lubricate all moving mechanical parts",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 13,
    machineId: 2,
    date: "2025-01-02",
    category: "electrical",
    task: "Inspect all power cables",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 14,
    machineId: 2,
    date: "2025-01-02",
    category: "electrical",
    task: "Verify power supply voltage",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },
  {
    id: 15,
    machineId: 2,
    date: "2025-01-02",
    category: "software",
    task: "Check Boiler/CypCut control software functionality",
    status: "done",
    remarks: "Ashish v",
    technician: "Ashish Verma",
  },

  // Pending tasks
  {
    id: 16,
    machineId: 1,
    date: "2025-02-01",
    category: "mechanical",
    task: "Lubricate axial axis linear guides",
    status: "pending",
    remarks: "",
    technician: "",
  },
  {
    id: 17,
    machineId: 1,
    date: "2025-02-01",
    category: "electrical",
    task: "Inspect all power cables",
    status: "pending",
    remarks: "",
    technician: "",
  },
  {
    id: 18,
    machineId: 2,
    date: "2025-02-01",
    category: "mechanical",
    task: "Clean cutting pipes/nozzle air pressure",
    status: "pending",
    remarks: "",
    technician: "",
  },
]

export default function MachineMaintenancePage() {
  const [selectedMachine, setSelectedMachine] = useState(machines[0])
  const [maintenanceRecords, setMaintenanceRecords] = useState(initialMaintenanceRecords)
  const [filteredRecords, setFilteredRecords] = useState(initialMaintenanceRecords)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "mechanical",
    task: "",
    customTask: "",
    status: "pending",
    remarks: "",
    technician: "",
  })

  // Filter records based on selected machine and filters
  useEffect(() => {
    let filtered = maintenanceRecords.filter((record) => record.machineId === selectedMachine.id)

    if (filterStatus !== "all") {
      filtered = filtered.filter((record) => record.status === filterStatus)
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((record) => record.category === filterCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.remarks.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.technician.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredRecords(filtered)
  }, [selectedMachine, maintenanceRecords, filterStatus, filterCategory, searchTerm])

  const getCategoryColor = (category) => {
    switch (category) {
      case "mechanical":
        return "bg-red-100 text-red-800 border-red-200"
      case "electrical":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "software":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "mechanical":
        return <Wrench className="h-4 w-4" />
      case "electrical":
        return <Zap className="h-4 w-4" />
      case "software":
        return <Monitor className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const handleAddTask = () => {
    const taskDescription = newTask.task === "custom" ? newTask.customTask : newTask.task

    const task = {
      id: Date.now(),
      machineId: selectedMachine.id,
      date: newTask.date,
      category: newTask.category,
      task: taskDescription,
      status: newTask.status,
      remarks: newTask.remarks,
      technician: newTask.technician,
    }

    setMaintenanceRecords([...maintenanceRecords, task])
    setNewTask({
      date: new Date().toISOString().split("T")[0],
      category: "mechanical",
      task: "",
      customTask: "",
      status: "pending",
      remarks: "",
      technician: "",
    })
    setIsAddTaskOpen(false)
  }

  const updateTaskStatus = (taskId, status, remarks = "", technician = "") => {
    setMaintenanceRecords((records) =>
      records.map((record) => (record.id === taskId ? { ...record, status, remarks, technician } : record)),
    )
  }

  const getMaintenanceStats = () => {
    const machineRecords = maintenanceRecords.filter((record) => record.machineId === selectedMachine.id)
    const total = machineRecords.length
    const completed = machineRecords.filter((record) => record.status === "done").length
    const pending = machineRecords.filter((record) => record.status === "pending").length
    const overdue = machineRecords.filter((record) => record.status === "overdue").length

    return { total, completed, pending, overdue }
  }

  const stats = getMaintenanceStats()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col overflow-hidden ">
        <br></br>
                <div style={{marginLeft:"1.5rem",marginBottom:"1.5rem"}}>
                <Mainnav></Mainnav>
                </div>
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Machine Maintenance</h1>
              <p className="text-sm text-gray-600">Track and manage machine maintenance schedules</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Maintenance Task</DialogTitle>
                    <DialogDescription>Add a new maintenance task for {selectedMachine.name}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newTask.date}
                          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newTask.category}
                          onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mechanical">Mechanical</SelectItem>
                            <SelectItem value="electrical">Electrical & Electronic</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="task">Task</Label>
                      <Select value={newTask.task} onValueChange={(value) => setNewTask({ ...newTask, task: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a task" />
                        </SelectTrigger>
                        <SelectContent>
                          {taskTemplates[newTask.category]?.map((task, index) => (
                            <SelectItem key={index} value={task}>
                              {task}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Custom Task</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newTask.task === "custom" && (
                      <div>
                        <Label htmlFor="customTask">Custom Task Description</Label>
                        <Input
                          id="customTask"
                          value={newTask.customTask}
                          onChange={(e) => setNewTask({ ...newTask, customTask: e.target.value })}
                          placeholder="Enter custom task description"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newTask.status}
                          onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="technician">Technician</Label>
                        <Input
                          id="technician"
                          value={newTask.technician}
                          onChange={(e) => setNewTask({ ...newTask, technician: e.target.value })}
                          placeholder="Technician name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea
                        id="remarks"
                        value={newTask.remarks}
                        onChange={(e) => setNewTask({ ...newTask, remarks: e.target.value })}
                        placeholder="Additional remarks"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTask}>Add Task</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Machine Selection */}
          <div className="mb-6">
            <Tabs
              value={selectedMachine.id.toString()}
              onValueChange={(value) => setSelectedMachine(machines.find((m) => m.id === Number.parseInt(value)))}
            >
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                {machines.map((machine) => (
                  <TabsTrigger key={machine.id} value={machine.id.toString()}>
                    {machine.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Machine Info & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  {selectedMachine.name}
                </CardTitle>
                <CardDescription>Machine Information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Model:</span>
                    <span className="text-sm font-medium">{selectedMachine.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Serial Number:</span>
                    <span className="text-sm font-medium">{selectedMachine.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {selectedMachine.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Maintenance:</span>
                    <span className="text-sm font-medium">{selectedMachine.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Maintenance:</span>
                    <span className="text-sm font-medium">{selectedMachine.nextMaintenance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-gray-600">All maintenance tasks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-xs text-gray-600">Tasks completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                <p className="text-xs text-gray-600">Tasks pending</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Maintenance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search tasks, remarks, or technician..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="electrical">Electrical & Electronic</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Maintenance Records Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Task Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getCategoryColor(record.category)}>
                            {getCategoryIcon(record.category)}
                            <span className="ml-1 capitalize">{record.category}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={record.task}>
                            {record.task}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>{record.status.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={record.remarks}>
                            {record.remarks}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {record.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTaskStatus(record.id, "done", "Completed", "Ashish v")}
                              >
                                Mark Done
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
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
      </div>
    </div>
  )
}
