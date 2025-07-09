"use client";
import Header from '@/components/Header'
import HowItWorks from '@/components/HowItWorks'
import Results from '@/components/Results'
import ModernPricing from '@/components/ModernPricing'
import ModernFooter from '@/components/ModernFooter'
import ChatBotForm from '@/components/ChatBotForm'
import { motion } from 'framer-motion'

export default function TesteGratis() {
  return (
    <main className="overflow-hidden">
      <Header />
      {/* Primeira dobra customizada */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-24 min-h-[70vh] flex items-center justify-center">
        {/* Background Elements simplificados */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <motion.div 
            className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto px-4">
          {/* Texto da primeira dobra */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforme clientes em{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">indicadores poderosos</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crie programas de indicação que realmente funcionam. Configure comissões, recrute indicadores e acompanhe o crescimento automático da sua receita com nossa plataforma intuitiva.
            </motion.p>
          </div>
          {/* Formulário do lado direito */}
          <div className="flex-1 w-full max-w-md" id="form-testegratis">
            <ChatBotForm />
          </div>
        </div>
      </section>
      {/* Restante da página igual */}
      <HowItWorks />
      <Results />
      <ModernPricing />
      <ModernFooter />
    </main>
  )
} 