import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function Anchor({
  children,
  href,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href}>
      <a
        className="text-blue-400 hover:border-b hover:border-blue-400"
        href={href}
        title={String(children)}
      >
        {children}
      </a>
    </Link>
  )
}
