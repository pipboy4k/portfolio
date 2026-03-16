import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Portfolio — Product Designer',
  description: 'Product designer portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#0a0a0a]`} suppressHydrationWarning>
        <div className="max-w-[720px] mx-auto px-6">
          {children}
        </div>
      </body>
    </html>
  )
}
