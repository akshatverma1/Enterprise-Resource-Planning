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
  Package,
  FileText,
  Building,
  Wrench,
  Headset,
  CalendarCheck,
  UserCircle,
  Hammer,
  Award,
  Wrench as WrenchIcon
} from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Link } from "react-router-dom"

export function FeatureGrid() {
  const features = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Products",
      description: "",
      href: "product",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Challan",
      description: "",
      href: "/challan",
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Machine Maintenance",
      description: "",
      href: "/machine",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Inventory Management",
      description: "",
      href: "/inventory",
    },
    {
      icon: <CalendarCheck className="h-8 w-8" />,
      title: "Attendance",
      description: "",
      href: "/attendance",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Building",
      description: "",
      href: "/building",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Security",
      description: "",
      href: "/security",
    },
    {
      icon: <Headset className="h-8 w-8" />,
      title: "Support",
      description: "",
      href: "/support",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Devices",
      description: "",
      href: "/devices",
    },
    {
      icon: <UserCircle className="h-8 w-8" />,
      title: "Employees",
      description: "",
      href: "/employee-details",
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Tool Management",
      description: "",
      href: "toolmanagement",
    }
    , {
      icon: <Hammer className="h-8 w-8" />,
      title: "Gauge Management",
      description: "",
      href: "/gauge",
    },
    {
  icon: <Award className="h-8 w-8" />,
  title: "Certificates",
  description: "",
  href: "/certificates",
}



  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {features.map((feature, index) => (
        <Link to={feature.href} key={index}>
          <Card className="h-full transition-all hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div style={{ marginTop: "2rem" }} className="m-4 rounded-full bg-blue-100 p-3 text-blue-600">{feature.icon}</div>
              <h3 className="mb-1 font-medium">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
