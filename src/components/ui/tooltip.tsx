import * as React from "react"

type TooltipProps = {
  children: React.ReactNode
}

export function TooltipProvider({ children }: TooltipProps) {
  return <>{children}</>
}

export function Tooltip({ children }: TooltipProps) {
  return <div className="relative inline-block group">{children}</div>
}

export function TooltipTrigger({ children }: TooltipProps) {
  return <div>{children}</div>
}

export function TooltipContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded shadow-md whitespace-nowrap">
      {children}
    </div>
  )
}