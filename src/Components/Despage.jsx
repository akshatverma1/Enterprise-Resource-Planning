"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Sidebar from "./sidebar"
import Mainnav from "./Main_nav"
import {
  Monitor,
  Smartphone,
  Camera,
  Wifi,
  Battery,
  Cpu,
  HardDrive,
  Network,
  Plus,
  Search,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Edit,
  Power,
  Signal,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
} from "lucide-react"

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)

  // Devices data
  const [devices] = useState([
    {
      id: "DEV001",
      name: "Industrial Controller #1",
      category: "Industrial Controller",
      type: "PLC",
      ipAddress: "192.168.1.100",
      macAddress: "00:1B:44:11:3A:B7",
      status: "Online",
      location: "Factory Floor A",
      lastSeen: "2024-01-16 15:30:25",
      uptime: "45 days",
      cpuUsage: 23,
      memoryUsage: 67,
      networkTraffic: 1.2,
      batteryLevel: null,
      signalStrength: 95,
      firmware: "v2.1.4",
    },
    {
      id: "DEV002",
      name: "Security Camera - Entrance",
      category: "Security Camera",
      type: "IP Camera",
      ipAddress: "192.168.1.101",
      macAddress: "00:1B:44:11:3A:B8",
      status: "Online",
      location: "Main Entrance",
      lastSeen: "2024-01-16 15:29:45",
      uptime: "12 days",
      cpuUsage: 45,
      memoryUsage: 78,
      networkTraffic: 5.8,
      batteryLevel: null,
      signalStrength: 88,
      firmware: "v1.8.2",
    },
    {
      id: "DEV003",
      name: "Temperature Sensor #1",
      category: "IoT Sensor",
      type: "Environmental",
      ipAddress: "192.168.1.102",
      macAddress: "00:1B:44:11:3A:B9",
      status: "Online",
      location: "Warehouse Zone A",
      lastSeen: "2024-01-16 15:28:10",
      uptime: "89 days",
      cpuUsage: 12,
      memoryUsage: 34,
      networkTraffic: 0.3,
      batteryLevel: 87,
      signalStrength: 72,
      firmware: "v3.2.1",
    },
    {
      id: "DEV004",
      name: "Access Control Panel",
      category: "Access Control",
      type: "Card Reader",
      ipAddress: "192.168.1.103",
      macAddress: "00:1B:44:11:3A:BA",
      status: "Offline",
      location: "Office Building - Floor 2",
      lastSeen: "2024-01-16 14:15:30",
      uptime: "0 days",
      cpuUsage: 0,
      memoryUsage: 0,
      networkTraffic: 0,
      batteryLevel: null,
      signalStrength: 0,
      firmware: "v1.5.3",
    },
    {
      id: "DEV005",
      name: "Wireless Router - Zone B",
      category: "Network Equipment",
      type: "Router",
      ipAddress: "192.168.1.1",
      macAddress: "00:1B:44:11:3A:BB",
      status: "Online",
      location: "IT Room",
      lastSeen: "2024-01-16 15:30:00",
      uptime: "156 days",
      cpuUsage: 18,
      memoryUsage: 52,
      networkTraffic: 15.6,
      batteryLevel: null,
      signalStrength: 100,
      firmware: "v4.1.8",
    },
    {
      id: "DEV006",
      name: "Mobile Tablet - Inspector",
      category: "Mobile Device",
      type: "Tablet",
      ipAddress: "192.168.1.104",
      macAddress: "00:1B:44:11:3A:BC",
      status: "Warning",
      location: "Quality Control",
      lastSeen: "2024-01-16 15:25:15",
      uptime: "3 days",
      cpuUsage: 67,
      memoryUsage: 89,
      networkTraffic: 2.1,
      batteryLevel: 23,
      signalStrength: 65,
      firmware: "v10.2.1",
    },
  ])

  // Network monitoring data
  const [networkStats] = useState({
    totalBandwidth: 1000, // Mbps
    usedBandwidth: 156.8,
    connectedDevices: devices.length,
    onlineDevices: devices.filter((d) => d.status === "Online").length,
    offlineDevices: devices.filter((d) => d.status === "Offline").length,
    warningDevices: devices.filter((d) => d.status === "Warning").length,
    avgUptime: "67 days",
    totalDataTransfer: "2.4 TB",
  })

  // Calculate device metrics
  const totalDevices = devices.length
  const onlineDevices = devices.filter((device) => device.status === "Online").length
  const offlineDevices = devices.filter((device) => device.status === "Offline").length
  const warningDevices = devices.filter((device) => device.status === "Warning").length
  const batteryDevices = devices.filter((device) => device.batteryLevel !== null)
  const lowBatteryDevices = batteryDevices.filter((device) => device.batteryLevel < 30).length

  // Filter devices
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.includes(searchTerm) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || device.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || device.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-500"
      case "Warning":
        return "bg-yellow-500"
      case "Offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDeviceIcon = (category) => {
    switch (category) {
      case "Industrial Controller":
        return <Cpu className="h-4 w-4" />
      case "Security Camera":
        return <Camera className="h-4 w-4" />
      case "IoT Sensor":
        return <Activity className="h-4 w-4" />
      case "Access Control":
        return <Settings className="h-4 w-4" />
      case "Network Equipment":
        return <Wifi className="h-4 w-4" />
      case "Mobile Device":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getBatteryColor = (level) => {
    if (level >= 60) return "text-green-500"
    if (level >= 30) return "text-yellow-500"
    return "text-red-500"
  }

  const getSignalColor = (strength) => {
    if (strength >= 80) return "text-green-500"
    if (strength >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  const categories = ["all", ...new Set(devices.map((device) => device.category))]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <div className="flex-1">
         <br></br>
                                <div style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
                                    <Mainnav></Mainnav>
                                </div>
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Device Management</h1>
            <p className="text-gray-600">Monitor and manage connected devices and network infrastructure</p>
          </div>

          {/* Device Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDevices}</div>
                <p className="text-xs text-muted-foreground">Connected devices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{onlineDevices}</div>
                <p className="text-xs text-muted-foreground">Active devices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offline</CardTitle>
                <Power className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{offlineDevices}</div>
                <p className="text-xs text-muted-foreground">Disconnected</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{warningDevices}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Battery</CardTitle>
                <Battery className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{lowBatteryDevices}</div>
                <p className="text-xs text-muted-foreground">Battery devices</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="devices" className="space-y-4">
            <TabsList>
              <TabsTrigger value="devices">Device Inventory</TabsTrigger>
              <TabsTrigger value="network">Network Monitoring</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            {/* Device Inventory Tab */}
            <TabsContent value="devices" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Device Inventory</CardTitle>
                      <CardDescription>Manage all connected devices and systems</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Device
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add New Device</DialogTitle>
                            <DialogDescription>Register a new device to the network</DialogDescription>
                          </DialogHeader>
                          <AddDeviceForm />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Scan Network
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search devices, IP, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Warning">Warning</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Devices Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Signal</TableHead>
                          <TableHead>Battery</TableHead>
                          <TableHead>Uptime</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDevices.map((device) => (
                          <TableRow key={device.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {getDeviceIcon(device.category)}
                                <div>
                                  <div className="font-medium">{device.name}</div>
                                  <div className="text-sm text-gray-500">{device.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{device.category}</Badge>
                            </TableCell>
                            <TableCell className="font-mono">{device.ipAddress}</TableCell>
                            <TableCell>{device.location}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(device.status)} text-white`}>{device.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className={`flex items-center gap-2 ${getSignalColor(device.signalStrength)}`}>
                                <Signal className="h-4 w-4" />
                                {device.signalStrength}%
                              </div>
                            </TableCell>
                            <TableCell>
                              {device.batteryLevel !== null ? (
                                <div className={`flex items-center gap-2 ${getBatteryColor(device.batteryLevel)}`}>
                                  <Battery className="h-4 w-4" />
                                  {device.batteryLevel}%
                                </div>
                              ) : (
                                <span className="text-gray-400">N/A</span>
                              )}
                            </TableCell>
                            <TableCell>{device.uptime}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
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
            </TabsContent>

            {/* Network Monitoring Tab */}
            <TabsContent value="network" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Network Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      Network Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Bandwidth</span>
                      <span className="font-medium">{networkStats.totalBandwidth} Mbps</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Used Bandwidth</span>
                      <span className="font-medium">{networkStats.usedBandwidth} Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(networkStats.usedBandwidth / networkStats.totalBandwidth) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Connected Devices</span>
                      <span className="font-medium">{networkStats.connectedDevices}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Uptime</span>
                      <span className="font-medium">{networkStats.avgUptime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Transfer (24h)</span>
                      <span className="font-medium">{networkStats.totalDataTransfer}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Device Status Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Device Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Online</span>
                      </div>
                      <span className="font-medium">{networkStats.onlineDevices}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Warning</span>
                      </div>
                      <span className="font-medium">{networkStats.warningDevices}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Offline</span>
                      </div>
                      <span className="font-medium">{networkStats.offlineDevices}</span>
                    </div>

                    {/* Visual representation */}
                    <div className="mt-4">
                      <div className="flex w-full h-4 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500"
                          style={{ width: `${(networkStats.onlineDevices / networkStats.connectedDevices) * 100}%` }}
                        ></div>
                        <div
                          className="bg-yellow-500"
                          style={{ width: `${(networkStats.warningDevices / networkStats.connectedDevices) * 100}%` }}
                        ></div>
                        <div
                          className="bg-red-500"
                          style={{ width: `${(networkStats.offlineDevices / networkStats.connectedDevices) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Network Traffic Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Network Traffic</CardTitle>
                  <CardDescription>Monitor bandwidth usage by device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Traffic (Mbps)</TableHead>
                          <TableHead>CPU Usage</TableHead>
                          <TableHead>Memory Usage</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devices
                          .filter((d) => d.status === "Online")
                          .map((device) => (
                            <TableRow key={device.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getDeviceIcon(device.category)}
                                  {device.name}
                                </div>
                              </TableCell>
                              <TableCell className="font-mono">{device.ipAddress}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Network className="h-4 w-4 text-blue-500" />
                                  {device.networkTraffic}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${device.cpuUsage > 80 ? "bg-red-500" : device.cpuUsage > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                                      style={{ width: `${device.cpuUsage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm">{device.cpuUsage}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${device.memoryUsage > 80 ? "bg-red-500" : device.memoryUsage > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                                      style={{ width: `${device.memoryUsage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm">{device.memoryUsage}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getStatusColor(device.status)} text-white`}>{device.status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Average CPU Usage</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Average Memory Usage</span>
                        <span className="font-medium">58%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Network Utilization</span>
                        <span className="font-medium">16%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "16%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Storage Usage */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HardDrive className="h-5 w-5" />
                      Storage Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">System Storage</span>
                        <span className="font-medium">245 GB / 500 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "49%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Log Storage</span>
                        <span className="font-medium">89 GB / 200 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "44%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Backup Storage</span>
                        <span className="font-medium">156 GB / 300 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "52%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Alerts</CardTitle>
                  <CardDescription>Devices requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devices
                      .filter((d) => d.cpuUsage > 60 || d.memoryUsage > 80 || (d.batteryLevel && d.batteryLevel < 30))
                      .map((device) => (
                        <div
                          key={device.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50"
                        >
                          <div className="flex items-center gap-4">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <div>
                              <div className="font-medium">{device.name}</div>
                              <div className="text-sm text-gray-500">
                                {device.cpuUsage > 60 && `High CPU usage: ${device.cpuUsage}%`}
                                {device.memoryUsage > 80 && ` | High memory usage: ${device.memoryUsage}%`}
                                {device.batteryLevel &&
                                  device.batteryLevel < 30 &&
                                  ` | Low battery: ${device.batteryLevel}%`}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                              Performance Issue
                            </Badge>
                            <Button size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Optimize
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Add Device Form Component
function AddDeviceForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    ipAddress: "",
    macAddress: "",
    location: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("New device:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="deviceName">Device Name</Label>
          <Input
            id="deviceName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="deviceType">Device Type</Label>
          <Input
            id="deviceType"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Industrial Controller">Industrial Controller</SelectItem>
            <SelectItem value="Security Camera">Security Camera</SelectItem>
            <SelectItem value="IoT Sensor">IoT Sensor</SelectItem>
            <SelectItem value="Access Control">Access Control</SelectItem>
            <SelectItem value="Network Equipment">Network Equipment</SelectItem>
            <SelectItem value="Mobile Device">Mobile Device</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ipAddress">IP Address</Label>
          <Input
            id="ipAddress"
            value={formData.ipAddress}
            onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
            placeholder="192.168.1.100"
            required
          />
        </div>
        <div>
          <Label htmlFor="macAddress">MAC Address</Label>
          <Input
            id="macAddress"
            value={formData.macAddress}
            onChange={(e) => setFormData({ ...formData, macAddress: e.target.value })}
            placeholder="00:1B:44:11:3A:B7"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., Factory Floor A"
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">Add Device</Button>
      </div>
    </form>
  )
}
