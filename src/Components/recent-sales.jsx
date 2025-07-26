import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>JT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Travolta</p>
          <p className="text-sm text-muted-foreground">12 April 2022</p>
        </div>
        <div className="ml-auto font-medium text-green-500">+$522</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Angelina Jolie</p>
          <p className="text-sm text-muted-foreground">25 October 2020</p>
        </div>
        <div className="ml-auto font-medium text-green-500">+$681</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Kevin Spacey</p>
          <p className="text-sm text-muted-foreground">24 August 2021</p>
        </div>
        <div className="ml-auto font-medium text-green-500">+$570</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>LD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Leonardo DiCaprio</p>
          <p className="text-sm text-muted-foreground">07:00 PM</p>
        </div>
        <div className="ml-auto font-medium text-green-500">+$291</div>
      </div>
    </div>
  )
}
