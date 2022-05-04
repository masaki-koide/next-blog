import { PropsWithChildren } from 'react'

export function ListItem({ children }: PropsWithChildren<unknown>) {
  return <li className="list-disc list-inside">{children}</li>
}
