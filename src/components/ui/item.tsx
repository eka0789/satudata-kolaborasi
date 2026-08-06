import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

function Item({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="item"
      className={cn("flex items-start gap-3", className)}
      {...props}
    />
  )
}

function ItemIcon({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="item-icon"
      className={cn("mt-0.5 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-title"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function ItemIndicator({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="item-indicator"
      className={cn("ms-auto shrink-0 self-center text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Item,
  ItemIcon,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemIndicator,
}
