import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** 배경 변형 */
  variant?: "white" | "muted" | "primary"
  /** 수직 padding 크기 */
  size?: "sm" | "md" | "lg" | "xl"
  /** 최대 너비 컨테이너 포함 여부 */
  contained?: boolean
}

const sizeClasses = {
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
}

const variantClasses = {
  white:   "bg-white",
  muted:   "bg-neutral-50",
  primary: "bg-primary-50",
}

export function Section({
  className,
  variant = "white",
  size = "md",
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {contained ? (
        <div className="max-w-5xl mx-auto px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}

export function SectionHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-10 text-center", className)} {...props} />
}

export function SectionTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight", className)}
      {...props}
    />
  )
}

export function SectionDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-3 text-base text-neutral-500 max-w-2xl mx-auto", className)} {...props} />
  )
}
