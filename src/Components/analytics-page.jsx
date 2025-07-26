"use client"

import { useState } from "react"
import {
  Search,
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Laptop,
  Tablet,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Sidebar } from "./sidebar"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Progress } from "./ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const visitorsData = [
  { name: "Jan", visitors: 4000, pageViews: 2400 },
  { name: "Feb", visitors: 3000, pageViews: 1398 },
  { name: "Mar", visitors: 2000, pageViews: 9800 },
  { name: "Apr", visitors: 2780, pageViews: 3908 },
  { name: "May", visitors: 1890, pageViews: 4800 },
  { name: "Jun", visitors: 2390, pageViews: 3800 },
  { name: "Jul", visitors: 3490, pageViews: 4300 },
  { name: "Aug", visitors: 4000, pageViews: 2400 },
  { name: "Sep", visitors: 3000, pageViews: 1398 },
  { name: "Oct", visitors: 2000, pageViews: 9800 },
  { name: "Nov", visitors: 2780, pageViews: 3908 },
  { name: "Dec", visitors: 3890, pageViews: 4800 },
]

const conversionData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 25 },
  { name: "Fri", value: 32 },
  { name: "Sat", value: 28 },
  { name: "Sun", value: 20 },
]

const deviceData = [
  { name: "Desktop", value: 45, color: "#2563eb" },
  { name: "Mobile", value: 35, color: "#10b981" },
  { name: "Tablet", value: 20, color: "#f59e0b" },
]

const browserData = [
  { name: "Chrome", value: 55, color: "#2563eb" },
  { name: "Safari", value: 25, color: "#10b981" },
  { name: "Firefox", value: 15, color: "#f59e0b" },
  { name: "Edge", value: 5, color: "#6366f1" },
]

const topPages = [
  { page: "/home", views: 12453, conversion: 3.2 },
  { page: "/products", views: 8732, conversion: 2.8 },
  { page: "/blog", views: 6543, conversion: 1.9 },
  { page: "/about", views: 5432, conversion: 1.2 },
  { page: "/contact", views: 4321, conversion: 3.5 },
]

const topReferrers = [
  { source: "Google", visits: 8765, conversion: 3.2 },
  { source: "Facebook", visits: 5432, conversion: 2.1 },
  { source: "Twitter", visits: 4321, conversion: 1.8 },
  { source: "Instagram", visits: 3456, conversion: 2.5 },
  { source: "LinkedIn", visits: 2345, conversion: 3.0 },
]

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("30d")

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
                <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px] pl-8" />
              </div>
              <UserNav />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <div className="flex items-center space-x-2">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,853,293</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                  <span>+12.5%</span>
                  <span className="ml-1 text-muted-foreground">from previous period</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,492,532</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                  <span>+8.2%</span>
                  <span className="ml-1 text-muted-foreground">from previous period</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <div className="flex items-center pt-1 text-xs text-red-600">
                  <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
                  <span>-0.4%</span>
                  <span className="ml-1 text-muted-foreground">from previous period</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 45s</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                  <span>+12.3%</span>
                  <span className="ml-1 text-muted-foreground">from previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visitors & Page Views</CardTitle>
                  <CardDescription>Visitor and page view trends over the selected time period</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={visitorsData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="visitors" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Conversion Rate</CardTitle>
                    <CardDescription>Daily conversion rate over the last week</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={conversionData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" name="Conversion %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Device Distribution</CardTitle>
                    <CardDescription>Visitors by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Laptop className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Desktop</span>
                        <span className="ml-auto text-sm">45%</span>
                      </div>
                      <div className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Mobile</span>
                        <span className="ml-auto text-sm">35%</span>
                      </div>
                      <div className="flex items-center">
                        <Tablet className="mr-2 h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">Tablet</span>
                        <span className="ml-auto text-sm">20%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                    <CardDescription>Most visited pages and their conversion rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Page</TableHead>
                          <TableHead className="text-right">Views</TableHead>
                          <TableHead className="text-right">Conversion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topPages.map((page, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{page.page}</TableCell>
                            <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{page.conversion}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View All Pages
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Referrers</CardTitle>
                    <CardDescription>Traffic sources and their conversion rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead className="text-right">Visits</TableHead>
                          <TableHead className="text-right">Conversion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topReferrers.map((referrer, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{referrer.source}</TableCell>
                            <TableCell className="text-right">{referrer.visits.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{referrer.conversion}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View All Sources
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Overview</CardTitle>
                  <CardDescription>Detailed information about your website visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Browser Distribution</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={browserData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {browserData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Geographic Distribution</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">United States</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">United Kingdom</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Germany</span>
                            <span className="text-sm font-medium">12%</span>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">India</span>
                            <span className="text-sm font-medium">8%</span>
                          </div>
                          <Progress value={8} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Canada</span>
                            <span className="text-sm font-medium">6%</span>
                          </div>
                          <Progress value={6} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Other</span>
                            <span className="text-sm font-medium">14%</span>
                          </div>
                          <Progress value={14} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="behavior" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Behavior</CardTitle>
                  <CardDescription>How users interact with your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">42.3%</div>
                        <div className="flex items-center pt-1 text-xs text-red-600">
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          <span>+2.1%</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pages / Session</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.8</div>
                        <div className="flex items-center pt-1 text-xs text-green-600">
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          <span>+0.4</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Exit Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">28.5%</div>
                        <div className="flex items-center pt-1 text-xs text-green-600">
                          <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
                          <span>-1.2%</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="conversions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Metrics</CardTitle>
                  <CardDescription>Key conversion metrics and goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92,432</div>
                        <div className="flex items-center pt-1 text-xs text-green-600">
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          <span>+8.2%</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$1,245,932</div>
                        <div className="flex items-center pt-1 text-xs text-green-600">
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          <span>+12.5%</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$84.32</div>
                        <div className="flex items-center pt-1 text-xs text-green-600">
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          <span>+3.1%</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Cart Abandonment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">68.7%</div>
                        <div className="flex items-center pt-1 text-xs text-red-600">
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                          <span>+2.4%</span>
                          <span className="ml-1 text-muted-foreground">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
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
