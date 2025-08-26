"use client";
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import VideoSection from '@/components/VideoSection'
import HowItWorks from '@/components/HowItWorks'
import Results from '@/components/Results'
import ModernPricing from '@/components/ModernPricing'
import ModernFooter from '@/components/ModernFooter'
import ChatBot from '@/components/ChatBot'
import { useState } from 'react'

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const mobileStyle = typeof window !== 'undefined' && window.innerWidth <= 600
    ? {
        left: 0,
        right: 0,
        width: '100vw',
        margin: 0,
        maxHeight: '65vh',
        height: '65vh',
        overflow: 'hidden',
      }
    : {};
  if (showChat) {
    console.log('Wrapper ChatBot', {
      style: {
        position: 'fixed',
        bottom: '8rem',
        right: '2rem',
        zIndex: 1000,
        width: 'auto',
        ...mobileStyle,
      }
    });
  }

  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <VideoSection />
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
            zIndex: 1100, // Aumentado para garantir que fique acima do chat
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
          <div
            style={{
              position: 'fixed',
              bottom: '8rem',
              right: '2rem',
              zIndex: 1000,
              width: 'auto',
              ...mobileStyle,
            }}
          >
            <ChatBot />
          </div>
        )}
      </div>
    </main>
  )
} 