import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Globe, TrendingUp } from "lucide-react"

const data = [
  { name: "Jan", total: 52 },
  { name: "Feb", total: 72 },
  { name: "Mar", total: 54 },
  { name: "Apr", total: 66 },
  { name: "May", total: 82 },
  { name: "Jun", total: 46 },
]

export function AccountSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <Globe className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-3xl font-bold">$9500</span>
                <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                This dashboard unquestionably the largest visitors in the world with TWO million monthly active users
                and ONE million daily active users.
              </p>
              <Button className="mt-4 bg-transparent" variant="outline">
                Download Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
      <div className="lg:col-span-2">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Visitors</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </div>
    </div>
  )
}
