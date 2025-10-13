"use client";

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Results from '@/components/Results'
import ModernPricing from '@/components/ModernPricing'
import ModernFooter from '@/components/ModernFooter'
import ChatBotWrapper from '@/components/ChatBotWrapper'

export default function Home() {

  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <HowItWorks />
      <Results />
      <ModernPricing />
      <ModernFooter />
      <ChatBotWrapper />
    </main>
  )
} 