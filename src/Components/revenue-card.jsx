import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { DollarSign } from "lucide-react"

const data = [
  { name: "Jan", value: 2000 },
  { name: "Feb", value: 2200 },
  { name: "Mar", value: 3000 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 3800 },
  { name: "Jun", value: 4200 },
]

export function RevenueCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border-4 border-blue-100 p-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">$4200</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-1">Revenue improved by 27% in 1 week.</div>

        <div className="mt-4 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                            <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "#2563eb" },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Target - 90/100</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-blue-100">
            <div className="h-full w-[90%] rounded-full bg-blue-600"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
