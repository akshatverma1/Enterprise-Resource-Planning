import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { FileText } from "lucide-react"

export function ReportsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-blue-100 p-2 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">Daily Report</h4>
            <p className="text-xs text-muted-foreground">Generated 2 hours ago</p>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600">97.5%</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-blue-100 p-2 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">Weekly Report</h4>
            <p className="text-xs text-muted-foreground">Generated yesterday</p>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600">92.3%</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-blue-100 p-2 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">Monthly Report</h4>
            <p className="text-xs text-muted-foreground">Generated last week</p>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600">89.7%</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
