"use client"

import { useState } from "react"
import { Building, Thermometer, Droplets, Wind, Plus, Search, Settings, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Mainnav from "./Main_nav"
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
import Sidebar from "./sidebar"

const buildingData = {
  floors: [
    { id: 1, name: "Ground Floor", rooms: 12, area: "2500 sq ft", occupancy: 85, status: "operational" },
    { id: 2, name: "First Floor", rooms: 10, area: "2200 sq ft", occupancy: 92, status: "operational" },
    { id: 3, name: "Second Floor", rooms: 8, area: "1800 sq ft", occupancy: 67, status: "maintenance" },
    { id: 4, name: "Basement", rooms: 6, area: "1500 sq ft", occupancy: 45, status: "operational" },
  ],
  rooms: [
    {
      id: 1,
      name: "Production Hall A",
      floor: "Ground Floor",
      area: "800 sq ft",
      capacity: 50,
      current: 42,
      temperature: 22,
      humidity: 45,
      status: "occupied",
    },
    {
      id: 2,
      name: "Production Hall B",
      floor: "Ground Floor",
      area: "800 sq ft",
      capacity: 50,
      current: 38,
      temperature: 23,
      humidity: 48,
      status: "occupied",
    },
    {
      id: 3,
      name: "Office Suite 1",
      floor: "First Floor",
      area: "400 sq ft",
      capacity: 20,
      current: 18,
      temperature: 21,
      humidity: 42,
      status: "occupied",
    },
    {
      id: 4,
      name: "Conference Room",
      floor: "First Floor",
      area: "200 sq ft",
      capacity: 12,
      current: 0,
      temperature: 20,
      humidity: 40,
      status: "available",
    },
    {
      id: 5,
      name: "Storage Room",
      floor: "Basement",
      area: "300 sq ft",
      capacity: 5,
      current: 2,
      temperature: 18,
      humidity: 55,
      status: "occupied",
    },
    {
      id: 6,
      name: "Server Room",
      floor: "Basement",
      area: "150 sq ft",
      capacity: 3,
      current: 1,
      temperature: 16,
      humidity: 35,
      status: "restricted",
    },
  ],
  systems: [
    {
      id: 1,
      name: "HVAC System A",
      type: "Climate Control",
      status: "operational",
      lastMaintenance: "2025-01-15",
      nextMaintenance: "2025-04-15",
    },
    {
      id: 2,
      name: "Fire Safety System",
      type: "Safety",
      status: "operational",
      lastMaintenance: "2025-01-20",
      nextMaintenance: "2025-07-20",
    },
    {
      id: 3,
      name: "Security System",
      type: "Security",
      status: "operational",
      lastMaintenance: "2025-01-10",
      nextMaintenance: "2025-04-10",
    },
    {
      id: 4,
      name: "Electrical Panel B",
      type: "Power",
      status: "maintenance",
      lastMaintenance: "2025-01-25",
      nextMaintenance: "2025-02-25",
    },
    {
      id: 5,
      name: "Water Supply System",
      type: "Utilities",
      status: "operational",
      lastMaintenance: "2025-01-18",
      nextMaintenance: "2025-04-18",
    },
  ],
}

const maintenanceRequests = [
  {
    id: 1,
    title: "AC unit not cooling properly",
    room: "Production Hall A",
    priority: "high",
    status: "open",
    created: "2025-02-01",
    assignee: "John Doe",
  },
  {
    id: 2,
    title: "Light fixture replacement",
    room: "Office Suite 1",
    priority: "medium",
    status: "in-progress",
    created: "2025-01-30",
    assignee: "Jane Smith",
  },
  {
    id: 3,
    title: "Door lock malfunction",
    room: "Conference Room",
    priority: "high",
    status: "open",
    created: "2025-01-29",
    assignee: "Mike Johnson",
  },
  {
    id: 4,
    title: "Water leak in ceiling",
    room: "Storage Room",
    priority: "critical",
    status: "resolved",
    created: "2025-01-28",
    assignee: "Sarah Wilson",
  },
]

export default function BuildingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [floorFilter, setFloorFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    title: "",
    room: "",
    priority: "medium",
    description: "",
  })

  const filteredRooms = buildingData.rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFloor = floorFilter === "all" || room.floor === floorFilter
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesFloor && matchesStatus
  })

  const buildingStats = {
    totalRooms: buildingData.rooms.length,
    occupiedRooms: buildingData.rooms.filter((r) => r.status === "occupied").length,
    availableRooms: buildingData.rooms.filter((r) => r.status === "available").length,
    maintenanceRequests: maintenanceRequests.filter((r) => r.status !== "resolved").length,
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Operational
          </Badge>
        )
      case "maintenance":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Settings className="w-3 h-3 mr-1" />
            Maintenance
          </Badge>
        )
      case "occupied":
        return <Badge className="bg-blue-100 text-blue-800">Occupied</Badge>
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "restricted":
        return <Badge className="bg-red-100 text-red-800">Restricted</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <div className="flex-1">
        <br></br>
                        <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
                            <Mainnav></Mainnav>
                        </div>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Building Management</h1>
            <p className="text-gray-600">Monitor and manage building facilities and systems</p>
          </div>

          {/* Building Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Rooms</p>
                    <p className="text-2xl font-bold">{buildingStats.totalRooms}</p>
                  </div>
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Occupied</p>
                    <p className="text-2xl font-bold text-blue-600">{buildingStats.occupiedRooms}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-green-600">{buildingStats.availableRooms}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Maintenance Requests</p>
                    <p className="text-2xl font-bold text-orange-600">{buildingStats.maintenanceRequests}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Floor Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Floor Overview</CardTitle>
                  <CardDescription>Building floor status and occupancy</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Floor</TableHead>
                        <TableHead>Rooms</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Occupancy</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buildingData.floors.map((floor) => (
                        <TableRow key={floor.id}>
                          <TableCell className="font-medium">{floor.name}</TableCell>
                          <TableCell>{floor.rooms}</TableCell>
                          <TableCell>{floor.area}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${floor.occupancy}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{floor.occupancy}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(floor.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Environmental Monitoring */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Average Temperature</p>
                        <p className="text-2xl font-bold">21°C</p>
                      </div>
                      <Thermometer className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Average Humidity</p>
                        <p className="text-2xl font-bold">44%</p>
                      </div>
                      <Droplets className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Air Quality</p>
                        <p className="text-2xl font-bold">Good</p>
                      </div>
                      <Wind className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search rooms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={floorFilter} onValueChange={setFloorFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    <SelectItem value="Ground Floor">Ground Floor</SelectItem>
                    <SelectItem value="First Floor">First Floor</SelectItem>
                    <SelectItem value="Second Floor">Second Floor</SelectItem>
                    <SelectItem value="Basement">Basement</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rooms Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Management</CardTitle>
                  <CardDescription>Monitor room occupancy and environmental conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room Name</TableHead>
                        <TableHead>Floor</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Occupancy</TableHead>
                        <TableHead>Temperature</TableHead>
                        <TableHead>Humidity</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell className="font-medium">{room.name}</TableCell>
                          <TableCell>{room.floor}</TableCell>
                          <TableCell>{room.area}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {room.current}/{room.capacity}
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(room.current / room.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{room.temperature}°C</TableCell>
                          <TableCell>{room.humidity}%</TableCell>
                          <TableCell>{getStatusBadge(room.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="systems" className="space-y-6">
              {/* Building Systems */}
              <Card>
                <CardHeader>
                  <CardTitle>Building Systems</CardTitle>
                  <CardDescription>Monitor critical building systems and infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>System Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Maintenance</TableHead>
                        <TableHead>Next Maintenance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buildingData.systems.map((system) => (
                        <TableRow key={system.id}>
                          <TableCell className="font-medium">{system.name}</TableCell>
                          <TableCell>{system.type}</TableCell>
                          <TableCell>{getStatusBadge(system.status)}</TableCell>
                          <TableCell>{system.lastMaintenance}</TableCell>
                          <TableCell>{system.nextMaintenance}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4 mr-1" />
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              {/* Controls */}
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <Input placeholder="Search maintenance requests..." />
                </div>
                <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
                  <DialogTrigger asChild>
                    <Button className="ml-4">
                      <Plus className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Maintenance Request</DialogTitle>
                      <DialogDescription>Submit a new maintenance request for building facilities</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newRequest.title}
                          onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                          placeholder="Brief description of the issue"
                        />
                      </div>
                      <div>
                        <Label htmlFor="room">Room/Location</Label>
                        <Select
                          value={newRequest.room}
                          onValueChange={(value) => setNewRequest({ ...newRequest, room: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select room" />
                          </SelectTrigger>
                          <SelectContent>
                            {buildingData.rooms.map((room) => (
                              <SelectItem key={room.id} value={room.name}>
                                {room.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newRequest.priority}
                          onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newRequest.description}
                          onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                          placeholder="Detailed description of the maintenance issue..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setIsNewRequestOpen(false)}
                        disabled={!newRequest.title || !newRequest.room}
                      >
                        Submit Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Maintenance Requests Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>Track and manage building maintenance requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Room/Location</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.room}</TableCell>
                          <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                          <TableCell>
                            <Badge variant={request.status === "resolved" ? "default" : "secondary"}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.created}</TableCell>
                          <TableCell>{request.assignee}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
