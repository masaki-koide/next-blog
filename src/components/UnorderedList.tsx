import { PropsWithChildren } from 'react'

export function UnorderedList({ children }: PropsWithChildren<unknown>) {
  return <ul className="my-4">{children}</ul>
}
