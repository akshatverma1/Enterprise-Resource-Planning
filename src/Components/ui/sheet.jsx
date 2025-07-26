"use client"

import { forwardRef, createContext, useContext } from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const SheetContext = createContext()

const Sheet = ({ children, open, onOpenChange }) => {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
}

const SheetContent = forwardRef(({ side = "right", className, children, ...props }, ref) => {
  const { open, onOpenChange } = useContext(SheetContext)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
          side === "top" && "inset-x-0 top-0 border-b",
          side === "bottom" && "inset-x-0 bottom-0 border-t",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetContent }
