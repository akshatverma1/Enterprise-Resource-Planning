import {
  Users,
  UserPlus,
  LayoutDashboard,
  Monitor,
  Grid,
  ShieldCheck,
  Receipt,
  UserCheck,
  Building2,
  BarChart3,
  Globe,
  HeadphonesIcon,
} from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Link } from "react-router-dom"

export function FeatureGrid() {
  const features = [
    // {
    //   icon: <Users className="h-8 w-8" />,
    //   title: "Users",
    //   description: "Manage admin people",
    //   href: "/users",
    // },
    // {
    //   icon: <UserPlus className="h-8 w-8" />,
    //   title: "Groups",
    //   description: "Create grouping lists",
    //   href: "#",
    // },
    {
      icon: <LayoutDashboard className="h-8 w-8" />,
      title: "Machine Maintenance",
      description: "Machinery service routine",
      href: "/machine",
    },
    // {
    //   icon: <Monitor className="h-8 w-8" />,
    //   title: "Devices",
    //   description: "Secure data devices",
    //   href: "#",
    // },
    {
      icon: <Grid className="h-8 w-8" />,
      title: "Products",
      description: "Items for sale",
      href: "/product",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Security",
      description: "Configure security logs",
      href: "/security",
    },
    {
      icon: <Receipt className="h-8 w-8" />,
      title: "Challan",
      description: "Generate a formal challan for this specific payment process.",
      href: "/challan",
    },
    // {
    //   icon: <UserCheck className="h-8 w-8" />,
    //   title: "Roles",
    //   description: "Manage admin roles",
    //   href: "#",
    // },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Buildings",
      description: "Manage building rooms",
      href: "/building",
    },
    // {
    //   icon: <BarChart3 className="h-8 w-8" />,
    //   title: "Resources",
    //   description: "Manage our resources",
    //   href: "#",
    // },
    // {
    //   icon: <Globe className="h-8 w-8" />,
    //   title: "Domains",
    //   description: "Manage our domains",
    //   href: "#",
    // },
    {
      icon: <HeadphonesIcon className="h-8 w-8" />,
      title: "Support",
      description: "Talk to tech support",
      href: "/support",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {features.map((feature, index) => (
        <Link to={feature.href} key={index}>
          <Card className="h-full transition-all hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="m-4 rounded-full bg-blue-100 p-3 text-blue-600">{feature.icon}</div>
              <h3 className="mb-1 font-medium">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
