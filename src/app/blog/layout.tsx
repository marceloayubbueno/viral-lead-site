import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Blog Viral Lead',
    default: 'Blog Viral Lead - Marketing Digital e Tecnologia',
  },
  description: 'Conteúdo exclusivo sobre marketing digital, tecnologia e estratégias de negócio. Aprenda com especialistas e descubra como transformar clientes em indicadores poderosos.',
  keywords: 'blog, marketing digital, tecnologia, estratégias de negócio, viral lead, afiliados',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://virallead.com.br/blog',
    siteName: 'Viral Lead',
    title: 'Blog Viral Lead - Marketing Digital e Tecnologia',
    description: 'Conteúdo exclusivo sobre marketing digital, tecnologia e estratégias de negócio.',
    images: [
      {
        url: '/images/logo-branca.svg',
        width: 1200,
        height: 630,
        alt: 'Blog Viral Lead',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Viral Lead - Marketing Digital e Tecnologia',
    description: 'Conteúdo exclusivo sobre marketing digital, tecnologia e estratégias de negócio.',
    images: ['/images/logo-branca.svg'],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
