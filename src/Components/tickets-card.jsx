import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const data = [
  { name: "New", value: 30, color: "#2563eb" },
  { name: "In Progress", value: 40, color: "#f59e0b" },
  { name: "Completed", value: 30, color: "#10b981" },
]

export function TicketsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="font-bold">{payload[0].name}</span>
                          <span>{payload[0].value}%</span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col items-center mt-2">
            <div className="text-3xl font-bold">333</div>
            <div className="text-sm text-green-600">21% higher than last month</div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 w-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
