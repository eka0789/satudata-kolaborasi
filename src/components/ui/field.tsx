import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Field = FormProvider

type FieldContextValue = {
  name: string
  descriptionId: string
  messageId: string
  errorId: string
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldContext() {
  const context = React.useContext(FieldContext)

  if (!context) {
    throw new Error("useFieldContext must be used within <FieldGroup>")
  }

  return context
}

function FieldGroup({
  className,
  name,
  ...props
}: React.ComponentProps<"div"> & { name: string }) {
  const { formState } = useFormContext()
  const id = React.useId()
  const error = formState.errors[name]

  return (
    <FieldContext.Provider
      value={{
        name,
        descriptionId: `${id}-description`,
        messageId: `${id}-message`,
        errorId: `${id}-error`,
      }}
    >
      <div
        data-slot="field-group"
        className={cn("flex flex-col gap-2", className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { name, descriptionId, errorId } = useFieldContext()
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name })
  const { error } = getFieldState(name, formState)

  return (
    <Label
      data-slot="field-label"
      data-error={!!error}
      htmlFor={name}
      aria-describedby={error ? errorId : descriptionId}
      className={cn("data-[error=true]:text-destructive", className)}
      {...props}
    />
  )
}

function FieldControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  const { name, descriptionId, errorId } = useFieldContext()
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name })
  const { error } = getFieldState(name, formState)

  return (
    <Slot
      data-slot="field-control"
      id={name}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : descriptionId}
      className={cn("data-[error=true]:border-destructive", className)}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { descriptionId } = useFieldContext()

  return (
    <p
      data-slot="field-description"
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { messageId } = useFieldContext()

  return (
    <p
      data-slot="field-message"
      id={messageId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { name, errorId } = useFieldContext()
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name })
  const { error } = getFieldState(name, formState)

  if (!error) {
    return null
  }

  return (
    <p
      data-slot="field-error"
      id={errorId}
      role="alert"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children || String(error?.message ?? "")}
    </p>
  )
}

function FieldErrorIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  const { name } = useFieldContext()
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name })
  const { error } = getFieldState(name, formState)

  if (!error) {
    return null
  }

  return (
    <svg
      data-slot="field-error-icon"
      aria-hidden="true"
      className={cn("size-4 text-destructive", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldMessage,
  FieldError,
  FieldErrorIcon,
  FieldContext,
  useFieldContext,
}
