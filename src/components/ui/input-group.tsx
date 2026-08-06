import * as React from "react"

import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function InputGroupLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="input-group-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

function InputGroupControl({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-control"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function InputGroupIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-icon"
      className={cn(
        "pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function InputGroupDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="input-group-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupLabel,
  InputGroupControl,
  InputGroupIcon,
  InputGroupDescription,
}
