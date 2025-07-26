import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

export function IssuesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Server down</h4>
            <p className="text-xs text-muted-foreground">Main server is not responding</p>
          </div>
          <Badge className="bg-red-500 hover:bg-red-600">High</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Slow database queries</h4>
            <p className="text-xs text-muted-foreground">Database performance issues</p>
          </div>
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">UI inconsistencies</h4>
            <p className="text-xs text-muted-foreground">Button styles are inconsistent</p>
          </div>
          <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
