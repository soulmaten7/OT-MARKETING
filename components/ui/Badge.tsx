import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "primary" | "success" | "warning" | "error" | "neutral"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-50 text-primary-600 border-primary-200",
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-orange-50 text-orange-700 border-orange-200",
  error:   "bg-red-50 text-red-600 border-red-200",
  neutral: "bg-neutral-100 text-neutral-600 border-neutral-200",
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}
