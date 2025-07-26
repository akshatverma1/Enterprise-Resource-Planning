"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { MapPin, Filter } from "lucide-react"

export function SiteMap() {
  const [view, setView] = useState("Map")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          250 Official stores in 21 countries, click the marker to see location details.
        </p>
        <div className="flex items-center gap-2">
          <Button variant={view === "Map" ? "default" : "outline"} size="sm" onClick={() => setView("Map")}>
            Map
          </Button>
          <Button variant={view === "Satellite" ? "default" : "outline"} size="sm" onClick={() => setView("Satellite")}>
            Satellite
          </Button>
        </div>
      </div>

      <div className="relative h-[300px] w-full overflow-hidden rounded-md border bg-muted">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center">
          <div className="absolute right-2 top-2 z-10">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              <span className="sr-only">Expand</span>
            </Button>
          </div>

          <div className="absolute left-1/4 top-1/3">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
          <div className="absolute left-1/2 top-1/4">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
          <div className="absolute right-1/4 top-1/2">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
          <div className="absolute left-1/3 bottom-1/4">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Keyboard shortcuts · Map data ©2023 · Terms of use · Report a map error
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter by city
          </Button>
        </div>
      </div>
    </div>
  )
}
