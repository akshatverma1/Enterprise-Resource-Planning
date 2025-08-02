"use client"

import { useState } from "react"
import { Plus, Search, MessageCircle, Phone, Mail, Clock, CheckCircle, AlertTriangle } from "lucide-react"
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

const supportTickets = [
  {
    id: "TK-001",
    title: "Laser machine not starting",
    category: "Technical",
    priority: "high",
    status: "open",
    assignee: "John Doe",
    created: "2025-02-01",
    updated: "2025-02-01",
  },
  {
    id: "TK-002",
    title: "Software license renewal",
    category: "Licensing",
    priority: "medium",
    status: "in-progress",
    assignee: "Jane Smith",
    created: "2025-01-30",
    updated: "2025-02-01",
  },
  {
    id: "TK-003",
    title: "User access permissions",
    category: "Account",
    priority: "low",
    status: "resolved",
    assignee: "Mike Johnson",
    created: "2025-01-28",
    updated: "2025-01-31",
  },
  {
    id: "TK-004",
    title: "Billing inquiry",
    category: "Billing",
    priority: "medium",
    status: "open",
    assignee: "Sarah Wilson",
    created: "2025-01-29",
    updated: "2025-01-30",
  },
  {
    id: "TK-005",
    title: "Machine calibration issue",
    category: "Technical",
    priority: "high",
    status: "in-progress",
    assignee: "John Doe",
    created: "2025-01-27",
    updated: "2025-02-01",
  },
]

const faqItems = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions sent to your email.",
  },
  {
    question: "How to calibrate the laser machine?",
    answer:
      "Go to Machine Settings > Calibration and follow the step-by-step calibration wizard. Ensure the machine is properly warmed up before starting.",
  },
  {
    question: "What are the maintenance schedules?",
    answer:
      "Regular maintenance should be performed monthly for mechanical parts, weekly for electrical checks, and daily for software updates.",
  },
  {
    question: "How to contact technical support?",
    answer:
      "You can reach our technical support team via phone at +1-800-SUPPORT, email at support@company.com, or through the support ticket system.",
  },
  {
    question: "How to backup machine settings?",
    answer:
      "Navigate to System > Backup & Restore, select the settings you want to backup, and click 'Create Backup'. Store the backup file in a secure location.",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "technical",
    priority: "medium",
    description: "",
  })

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const ticketStats = {
    total: supportTickets.length,
    open: supportTickets.filter((t) => t.status === "open").length,
    inProgress: supportTickets.filter((t) => t.status === "in-progress").length,
    resolved: supportTickets.filter((t) => t.status === "resolved").length,
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
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
            <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600">Get help and manage support tickets</p>
          </div>

          <Tabs defaultValue="tickets" className="space-y-6">
            <TabsList>
              <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Tickets</p>
                        <p className="text-2xl font-bold">{ticketStats.total}</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Open</p>
                        <p className="text-2xl font-bold text-blue-600">{ticketStats.open}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-yellow-600">{ticketStats.inProgress}</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Resolved</p>
                        <p className="text-2xl font-bold text-green-600">{ticketStats.resolved}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Support Ticket</DialogTitle>
                      <DialogDescription>Describe your issue and we'll help you resolve it</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newTicket.title}
                          onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                          placeholder="Brief description of the issue"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newTicket.category}
                          onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="account">Account</SelectItem>
                            <SelectItem value="licensing">Licensing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newTicket.priority}
                          onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newTicket.description}
                          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                          placeholder="Detailed description of the issue..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setIsNewTicketOpen(false)}
                        disabled={!newTicket.title || !newTicket.description}
                      >
                        Create Ticket
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Tickets Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>Manage and track your support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate" title={ticket.title}>
                              {ticket.title}
                            </div>
                          </TableCell>
                          <TableCell>{ticket.category}</TableCell>
                          <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                          <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                          <TableCell>{ticket.assignee}</TableCell>
                          <TableCell>{ticket.created}</TableCell>
                          <TableCell>{ticket.updated}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
                    <p className="font-semibold">+1-800-SUPPORT</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-4">Send us an email anytime</p>
                    <p className="font-semibold">support@company.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                    <p className="text-gray-600 mb-4">Chat with our support team</p>
                    <Button className="w-full">Start Chat</Button>
                    <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
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
