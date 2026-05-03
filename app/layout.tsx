import type { Metadata } from 'next'
import { Bangers, Nunito } from 'next/font/google'
import './globals.css'

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PokéSnap — Your Pokémon Avatar Generator',
  description: 'Enter your Twitter handle, pick your favorite Pokémon, and let AI create your hilariously bad MS Paint fusion avatar!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bangers.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  )
}
