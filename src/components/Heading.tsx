import { PropsWithChildren } from 'react'

export function H1({ children }: PropsWithChildren<unknown>) {
  return (
    <h1 className="text-3xl font-bold border-b border-slate-300 mt-6 mb-4 pb-2">
      {children}
    </h1>
  )
}

export function H2({ children }: PropsWithChildren<unknown>) {
  return (
    <h1 className="text-2xl font-bold border-b border-slate-300 mt-6 mb-4 pb-1.5">
      {children}
    </h1>
  )
}

export function H3({ children }: PropsWithChildren<unknown>) {
  return <h1 className="text-xl font-bold mt-6 mb-4">{children}</h1>
}
