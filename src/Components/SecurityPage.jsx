"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Sidebar from "./sidebar"

const securityAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Multiple failed login attempts",
    description: "User john.doe@company.com has 5 failed login attempts",
    timestamp: "2025-02-01 14:30",
    severity: "medium",
    status: "active",
  },
  {
    id: 2,
    type: "info",
    title: "New device login",
    description: "User logged in from new device (Chrome on Windows)",
    timestamp: "2025-02-01 13:15",
    severity: "low",
    status: "resolved",
  },
  {
    id: 3,
    type: "critical",
    title: "Suspicious activity detected",
    description: "Unusual access pattern detected for admin account",
    timestamp: "2025-02-01 12:00",
    severity: "high",
    status: "investigating",
  },
  {
    id: 4,
    type: "warning",
    title: "Password expiry reminder",
    description: "5 users have passwords expiring in 7 days",
    timestamp: "2025-02-01 10:00",
    severity: "medium",
    status: "active",
  },
]

const accessLogs = [
  {
    id: 1,
    user: "john.doe@company.com",
    action: "Login",
    resource: "Dashboard",
    ip: "192.168.1.100",
    timestamp: "2025-02-01 14:35",
    status: "success",
  },
  {
    id: 2,
    user: "jane.smith@company.com",
    action: "File Access",
    resource: "Machine Settings",
    ip: "192.168.1.101",
    timestamp: "2025-02-01 14:30",
    status: "success",
  },
  {
    id: 3,
    user: "admin@company.com",
    action: "User Creation",
    resource: "User Management",
    ip: "192.168.1.102",
    timestamp: "2025-02-01 14:25",
    status: "success",
  },
  {
    id: 4,
    user: "unknown",
    action: "Login Attempt",
    resource: "Dashboard",
    ip: "203.0.113.1",
    timestamp: "2025-02-01 14:20",
    status: "failed",
  },
  {
    id: 5,
    user: "mike.johnson@company.com",
    action: "Settings Change",
    resource: "Security Settings",
    ip: "192.168.1.103",
    timestamp: "2025-02-01 14:15",
    status: "success",
  },
]

const userPermissions = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    permissions: ["Full Access"],
    lastLogin: "2025-02-01 14:35",
    status: "active",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Operator",
    permissions: ["Machine Control", "View Reports"],
    lastLogin: "2025-02-01 14:30",
    status: "active",
  },
  {
    id: 3,
    user: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Technician",
    permissions: ["Maintenance", "View Logs"],
    lastLogin: "2025-02-01 14:15",
    status: "active",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Viewer",
    permissions: ["View Only"],
    lastLogin: "2025-01-30 16:20",
    status: "inactive",
  },
]

export default function SecurityPage() {
  const [alertFilter, setAlertFilter] = useState("all")
  const [logFilter, setLogFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlerts = securityAlerts.filter((alert) => {
    const matchesFilter = alertFilter === "all" || alert.severity === alertFilter
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filteredLogs = accessLogs.filter((log) => {
    const matchesFilter = logFilter === "all" || log.status === logFilter
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const securityStats = {
    totalAlerts: securityAlerts.length,
    activeAlerts: securityAlerts.filter((a) => a.status === "active").length,
    criticalAlerts: securityAlerts.filter((a) => a.severity === "high").length,
    activeUsers: userPermissions.filter((u) => u.status === "active").length,
  }

  const getAlertBadge = (severity) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Success
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUserStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:pl-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
            <p className="text-gray-600">Monitor and manage system security</p>
          </div>

          {/* Security Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Alerts</p>
                    <p className="text-2xl font-bold">{securityStats.totalAlerts}</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Alerts</p>
                    <p className="text-2xl font-bold text-yellow-600">{securityStats.activeAlerts}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Critical Alerts</p>
                    <p className="text-2xl font-bold text-red-600">{securityStats.criticalAlerts}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-green-600">{securityStats.activeUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
              <TabsTrigger value="logs">Access Logs</TabsTrigger>
              <TabsTrigger value="permissions">User Permissions</TabsTrigger>
              <TabsTrigger value="settings">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={alertFilter} onValueChange={setAlertFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="high">Critical</SelectItem>
                    <SelectItem value="medium">Warning</SelectItem>
                    <SelectItem value="low">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Alerts Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Monitor security events and threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>{getAlertBadge(alert.severity)}</TableCell>
                          <TableCell className="font-medium">{alert.title}</TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate" title={alert.description}>
                              {alert.description}
                            </div>
                          </TableCell>
                          <TableCell>{alert.timestamp}</TableCell>
                          <TableCell>
                            <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
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

            <TabsContent value="logs" className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={logFilter} onValueChange={setLogFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Access Logs Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Access Logs</CardTitle>
                  <CardDescription>Track user access and system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.resource}</TableCell>
                          <TableCell>{log.ip}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{getStatusBadge(log.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              {/* User Permissions Table */}
              <Card>
                <CardHeader>
                  <CardTitle>User Permissions</CardTitle>
                  <CardDescription>Manage user roles and access permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userPermissions.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.user}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.map((permission, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Lock className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password Policy</CardTitle>
                    <CardDescription>Configure password requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Minimum length</span>
                      <Badge>8 characters</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Require uppercase</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Require numbers</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Require special characters</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Password expiry</span>
                      <Badge>90 days</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Management</CardTitle>
                    <CardDescription>Configure session settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Session timeout</span>
                      <Badge>30 minutes</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Max concurrent sessions</span>
                      <Badge>3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Remember me duration</span>
                      <Badge>7 days</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Force logout on password change</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Enhance account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>2FA Status</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Backup codes</span>
                      <Badge>Available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SMS verification</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <Button className="w-full">Configure 2FA</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription>Manage system access</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>IP whitelist</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Failed login attempts</span>
                      <Badge>5 max</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Account lockout duration</span>
                      <Badge>15 minutes</Badge>
                    </div>
                    <Button className="w-full">Manage Access Rules</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
