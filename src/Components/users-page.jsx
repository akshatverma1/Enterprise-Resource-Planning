"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  UserPlus,
  Mail,
  UserCog,
  Shield,
  UserX,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Sidebar } from "./sidebar"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"

const users = [
  {
    id: "u1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Active",
    lastActive: "Now",
    joined: "2 years ago",
  },
  {
    id: "u2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Developer",
    status: "Active",
    lastActive: "1 hour ago",
    joined: "1 year ago",
  },
  {
    id: "u3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Marketing",
    status: "Offline",
    lastActive: "3 hours ago",
    joined: "7 months ago",
  },
  {
    id: "u4",
    name: "William Kim",
    email: "william.kim@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Support",
    status: "Active",
    lastActive: "Just now",
    joined: "2 months ago",
  },
  {
    id: "u5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Manager",
    status: "In Meeting",
    lastActive: "30 minutes ago",
    joined: "1 year ago",
  },
  {
    id: "u6",
    name: "Ethan Johnson",
    email: "ethan.johnson@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Designer",
    status: "Active",
    lastActive: "5 minutes ago",
    joined: "6 months ago",
  },
  {
    id: "u7",
    name: "Ava Williams",
    email: "ava.williams@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Developer",
    status: "Offline",
    lastActive: "Yesterday",
    joined: "3 months ago",
  },
  {
    id: "u8",
    name: "Lucas Brown",
    email: "lucas.brown@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Content",
    status: "Active",
    lastActive: "Now",
    joined: "1 month ago",
  },
]

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex-1">
        <div className="border-b bg-white">
          <div className="flex h-16 items-center px-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </button>
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search users..." className="w-[200px] lg:w-[300px] pl-8" />
              </div>
              <UserNav />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <div className="flex items-center space-x-2">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,853</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+4.3% from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Signups</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">+22.4% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permissions</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6 Roles</div>
                <p className="text-xs text-muted-foreground">Last updated 2 days ago</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="blocked">Blocked</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Show all roles</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Admin only</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Show inactive</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Newest first</DropdownMenuItem>
                    <DropdownMenuItem>Oldest first</DropdownMenuItem>
                    <DropdownMenuItem>A-Z</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">
                          <div className="flex items-center gap-1">
                            User
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                  {user.name.split(" ")[1].charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === "Active"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : user.status === "Offline"
                                    ? "bg-gray-500 hover:bg-gray-600"
                                    : "bg-yellow-500 hover:bg-yellow-600"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit user</DropdownMenuItem>
                                <DropdownMenuItem>Change role</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Suspend user</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>
                    Showing {users.filter((u) => u.status === "Active").length} active users out of {users.length} total
                    users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {users
                      .filter((user) => user.status === "Active")
                      .map((user) => (
                        <div key={user.id} className="flex items-center justify-between space-x-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                                {user.name.split(" ")[1].charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500 hover:bg-green-600">{user.status}</Badge>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inactive Users</CardTitle>
                  <CardDescription>
                    Showing {users.filter((u) => u.status === "Offline").length} inactive users out of {users.length}{" "}
                    total users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {users
                      .filter((user) => user.status === "Offline")
                      .map((user) => (
                        <div key={user.id} className="flex items-center justify-between space-x-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                                {user.name.split(" ")[1].charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gray-500 hover:bg-gray-600">{user.status}</Badge>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="blocked" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blocked Users</CardTitle>
                  <CardDescription>There are currently no blocked users.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-[400px] items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <UserX className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No blocked users</h3>
                    <p className="mt-2 text-sm text-muted-foreground">When you block users, they will appear here.</p>
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
