"use client";
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Results from '@/components/Results'
import ModernPricing from '@/components/ModernPricing'
import ModernFooter from '@/components/ModernFooter'
import ChatBot from '@/components/ChatBot'
import { useState } from 'react'

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <HowItWorks />
      <Results />
      <ModernPricing />
      <ModernFooter />
      {/* ChatBot Flutuante */}
      <div>
        <button
          onClick={() => setShowChat((v) => !v)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={showChat ? 'Fechar chat' : 'Abrir chat'}
        >
          {showChat ? '×' : '💬'}
        </button>
        {showChat && (
          <div style={{
            position: 'fixed',
            bottom: '6.5rem',
            right: '2rem',
            zIndex: 1000,
          }}>
            <ChatBot />
          </div>
        )}
      </div>
    </main>
  )
} 