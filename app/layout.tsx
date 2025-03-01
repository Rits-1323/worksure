import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WorkSure',
  description: 'Bridging the Employer-Contractor Gap',
  generator: 'WorkSure',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
