"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  BarChart3,
  Users,
  LayoutDashboard,
  Mail,
  FileText,
  ShoppingCart,
  MessageSquare,
  FileImage,
  Calendar,
  Settings,
  HelpCircle,
} from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetContent } from "./ui/sheet"

export default function Sidebar({ className, open, onOpenChange }) {
  const [selected, setSelected] = useState("dashboard")

  const navItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      badge: null,
      path: "/",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      badge: null,
      path: "/analytics",
    },
    {
      id: "users",
      name: "Users",
      icon: <Users className="h-5 w-5" />,
      badge: null,
      path: "/users",
    },
    {
      id: "inbox",
      name: "Inbox",
      icon: <Mail className="h-5 w-5" />,
      badge: 5,
      path: "/inbox",
    },
    {
      id: "file-manager",
      name: "File Manager",
      icon: <FileText className="h-5 w-5" />,
      badge: null,
      path: "/files",
    },
    {
      id: "point-of-sale",
      name: "Point of Sale",
      icon: <ShoppingCart className="h-5 w-5" />,
      badge: null,
      path: "/pos",
    },
    {
      id: "chat",
      name: "Chat",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: null,
      path: "/chat",
    },
    {
      id: "post",
      name: "Post",
      icon: <FileImage className="h-5 w-5" />,
      badge: null,
      path: "/post",
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      badge: null,
      path: "/calendar",
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      badge: null,
      path: "/settings",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-0 w-[240px]">
          <MobileSidebar navItems={navItems} selected={selected} setSelected={setSelected} />
        </SheetContent>
      </Sheet>
      <aside className={cn("fixed hidden h-screen w-[240px] border-r bg-blue-700 text-white lg:block", className)}>
        <DesktopSidebar navItems={navItems} selected={selected} setSelected={setSelected} />
      </aside>
    </>
  )
}

function MobileSidebar({ navItems, selected, setSelected }) {
  return (
    <div className="h-full bg-blue-700 text-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="text-xl">Rubick</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-56px)]">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight">Navigation</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setSelected(item.id)}
                className={cn(
                  "w-full justify-start",
                  selected === item.id ? "bg-blue-800 text-white" : "hover:bg-blue-800 hover:text-white",
                )}
              >
                <Link to={item.path} className="flex items-center w-full">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

function DesktopSidebar({ navItems, selected, setSelected }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-blue-600 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="text-xl">Rubick</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight">Navigation</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setSelected(item.id)}
                className={cn(
                  "w-full justify-start text-white",
                  selected === item.id ? "bg-blue-800" : "hover:bg-blue-800",
                )}
              >
                <Link to={item.path} className="flex items-center w-full">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button variant="outline" size="sm" className="w-full text-white border-white hover:bg-blue-800 bg-transparent">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </div>
    </div>
  )
}
