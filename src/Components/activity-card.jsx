import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function ActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Sophie Michiels</h4>
            <p className="text-xs text-muted-foreground">Updated profile information</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>LD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Leonardo DiCaprio</h4>
            <p className="text-xs text-muted-foreground">Has joined the team</p>
            <p className="text-xs text-muted-foreground">5 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Al Pacino</h4>
            <p className="text-xs text-muted-foreground">Added new photos</p>
            <p className="text-xs text-muted-foreground">12 hours ago</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
