import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <header className="h-16 border-b border-slate-300 bg-white">
        <div className="h-full max-w-screen-laptop mx-auto px-8 py-4 text-2xl font-bold tracking-widest drop-shadow">
          <Link href="/">MARKEY.DEV</Link>
        </div>
      </header>
      <main className="max-w-screen-laptop mx-auto px-8 py-8">{children}</main>
    </>
  )
}
