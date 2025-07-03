import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Viral Lead - Plataforma Moderna de Programas de Afiliados',
  description: 'Lance programas de afiliados, indicação e influenciadores em menos de 15 minutos. Construído para empresas SaaS modernas.',
  keywords: 'programa de afiliados, marketing de indicação, marketing de influenciadores, SaaS, plataforma de afiliados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
} 