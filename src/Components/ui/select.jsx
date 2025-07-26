"use client"

import { forwardRef, useState, createContext, useContext } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const SelectContext = createContext()

const Select = ({ children, defaultValue, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue)

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    setIsOpen(false)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, handleValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useContext(SelectContext)

  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder }) => {
  const { selectedValue } = useContext(SelectContext)
  return <span>{selectedValue || placeholder}</span>
}

const SelectContent = forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen } = useContext(SelectContext)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = forwardRef(({ className, children, value, ...props }, ref) => {
  const { handleValueChange } = useContext(SelectContext)

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      onClick={() => handleValueChange(value)}
      {...props}
    >
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
