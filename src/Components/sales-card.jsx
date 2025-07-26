import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { BarChart3 } from "lucide-react"

const data = [
  { year: "2018", value: 400 },
  { year: "2019", value: 600 },
  { year: "2020", value: 700 },
  { year: "2021", value: 900 },
]

export function SalesCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border-4 border-blue-100 p-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">$9800</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-1">Highest sales growth in last two years.</div>

        <div className="mt-4 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Target - 75/100</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-blue-100">
            <div className="h-full w-[75%] rounded-full bg-blue-600"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
