import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function ButtonGroup({
  className,
  orientation = "horizontal",
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  size?: VariantProps<typeof buttonVariants>["size"]
  variant?: VariantProps<typeof buttonVariants>["variant"]
}) {
  // size/variant are accepted for API compatibility with Button but the group
  // container itself has no variant styling; suppress the unused-vars lint.
  void size;
  void variant;
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex items-center rounded-md border border-input bg-background shadow-sm",
        orientation === "horizontal"
          ? "flex-row divide-x divide-input"
          : "flex-col divide-y divide-input",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupItem({
  className,
  size = "default",
  variant = "ghost",
  ...props
}: React.ComponentProps<"button"> & {
  size?: VariantProps<typeof buttonVariants>["size"]
  variant?: VariantProps<typeof buttonVariants>["variant"]
}) {
  return (
    <button
      data-slot="button-group-item"
      className={cn(
        buttonVariants({ size, variant }),
        "rounded-none border-0 bg-transparent shadow-none",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupItem }
