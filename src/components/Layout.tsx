import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { SNS_ICONS, TITLE } from '../constants'

export function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <header className="h-16 border-b border-slate-300 bg-white">
        <div className="h-full max-w-screen-laptop mx-auto px-8 py-4 text-2xl font-bold tracking-widest drop-shadow">
          <Link href="/">
            <a href="/" title={TITLE}>
              {TITLE}
            </a>
          </Link>
        </div>
      </header>
      <main className="max-w-screen-laptop mx-auto px-8 py-8">{children}</main>
      <footer className="flex justify-center py-16">
        {Object.keys(SNS_ICONS).map((key, index) => (
          <span
            className={`hover:opacity-50 ${index !== 0 ? 'ml-8' : ''}`}
            key={key}
          >
            <Link href={SNS_ICONS[key].url}>
              <a
                href={SNS_ICONS[key].url}
                rel="noopener noreferrer"
                target="_blank"
                title={key}
              >
                {SNS_ICONS[key].icon({ width: 24, height: 24 })}
              </a>
            </Link>
          </span>
        ))}
      </footer>
    </>
  )
}
