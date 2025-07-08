import type { Metadata } from 'next'
import './globals.css'
import PixelAndConsentProvider from '../components/PixelAndConsentProvider';

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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3LD18W31KC"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3LD18W31KC');
          `,
        }} />
        {/* Meta Pixel será controlado por componente client-side */}
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-white">
          {children}
        </div>
        <PixelAndConsentProvider />
      </body>
    </html>
  )
} 