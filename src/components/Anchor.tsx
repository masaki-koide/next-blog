import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function Anchor({
  children,
  href,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href}>
      {/* eslint-disable-next-line react/jsx-no-target-blank -- 条件分岐で_blankとnorefererをセットにしている */}
      <a
        className="text-blue-400 hover:border-b hover:border-blue-400"
        href={href}
        rel={href.startsWith('/') ? '' : 'noopener noreferrer'}
        target={href.startsWith('/') ? '_self' : '_blank'}
        title={String(children)}
      >
        {children}
      </a>
    </Link>
  )
}
