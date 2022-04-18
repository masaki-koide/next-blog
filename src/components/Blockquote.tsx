import { PropsWithChildren } from 'react'

export function Blockquote({ children }: PropsWithChildren<unknown>) {
  return (
    <blockquote className="pl-4 border-l-4 border-slate-200">
      {children}
    </blockquote>
  )
}
