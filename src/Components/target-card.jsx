import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const data = [
  { name: "Jan", sales: 400, revenue: 240 },
  { name: "Feb", sales: 300, revenue: 180 },
  { name: "Mar", sales: 500, revenue: 300 },
  { name: "Apr", sales: 450, revenue: 270 },
  { name: "May", sales: 470, revenue: 280 },
  { name: "Jun", sales: 600, revenue: 360 },
  { name: "Jul", sales: 550, revenue: 330 },
  { name: "Aug", sales: 680, revenue: 408 },
  { name: "Sep", sales: 700, revenue: 420 },
  { name: "Oct", sales: 750, revenue: 450 },
  { name: "Nov", sales: 800, revenue: 480 },
  { name: "Dec", sales: 900, revenue: 540 },
]

export function TargetCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Target</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                            <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                            <span className="font-bold text-muted-foreground">${payload[1].value}</span>
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
                strokeWidth={2}
                dataKey="sales"
                activeDot={{
                  r: 6,
                  style: { fill: "#2563eb" },
                }}
                style={{
                  stroke: "#2563eb",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "#a3e635" },
                }}
                style={{
                  stroke: "#a3e635",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            Q1 - 25%
          </Button>
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            Q2 - 33%
          </Button>
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            Q3 - 84%
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-red-200 bg-red-100 text-red-700">
            Q4 - 96%
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
