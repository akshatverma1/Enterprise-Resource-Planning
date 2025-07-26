"use client"

import { forwardRef, useState, createContext, useContext } from "react"
import { cn } from "../../lib/utils"

const DropdownMenuContext = createContext()

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = forwardRef(({ className, children, asChild, ...props }, ref) => {
  const { setIsOpen } = useContext(DropdownMenuContext)

  if (asChild) {
    return <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>
  }

  return (
    <button ref={ref} className={cn("", className)} onClick={() => setIsOpen((prev) => !prev)} {...props}>
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = forwardRef(({ className, align = "center", children, ...props }, ref) => {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      <div
        ref={ref}
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          align === "end" ? "right-0" : align === "start" ? "left-0" : "left-1/2 -translate-x-1/2",
          "top-full mt-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = forwardRef(({ className, children, ...props }, ref) => {
  const { setIsOpen } = useContext(DropdownMenuContext)

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      onClick={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = forwardRef(({ className, children, checked, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <div className="h-2 w-2 rounded-sm bg-current" />}
      </span>
      {children}
    </div>
  )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuLabel = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({ className, ...props }) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuGroup = ({ children }) => {
  return <div>{children}</div>
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
}
