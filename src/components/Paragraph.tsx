import { PropsWithChildren } from 'react'

export function Paragraph({ children }: PropsWithChildren<unknown>) {
  return <p className="py-2">{children}</p>
}
