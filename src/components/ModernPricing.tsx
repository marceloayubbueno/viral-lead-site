'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Star, Zap, ArrowRight } from 'lucide-react'

const ModernPricing = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 to-black text-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Star className="w-4 h-4 mr-2" />
            15 dias de teste sem riscos
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Comece <span className="text-blue-400">hoje mesmo</span><br />
            e veja os resultados
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça os principais recursos que tornam nossa plataforma completa para impulsionar suas indicações, automatizar processos e facilitar o crescimento do seu negócio.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            {/* Glow Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {typeof window !== 'undefined' && window.location.pathname === '/testegratis' ? (
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Teste Grátis 15 dias
                  </div>
                </motion.div>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Acesse a Plataforma Completa</h3>
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-green-400">R$ 0,00</span>
                      <span className="text-gray-400 ml-2">/15 dias</span>
                    </div>
                    <div className="text-green-400 font-semibold">Sem compromisso, sem cartão de crédito</div>
                  </div>
                </div>
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Acesso total à plataforma',
                      'Dashboard completo',
                      'Automação de pagamentos',
                      'Materiais profissionais',
                      'Analytics avançados', 
                      'Suporte prioritário',
                      'Integrações nativas',
                      'Treinamento incluído'
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                      >
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h4 className="text-lg font-bold text-blue-400 mb-2">15 dias de Teste Grátis</h4>
                    <p className="text-gray-300 text-sm">
                      Experimente todos os recursos sem compromisso. Após o período, escolha se deseja continuar.
                    </p>
                  </div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <motion.button
                    onClick={() => {
                      const form = document.getElementById('form-testegratis');
                      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group mb-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Teste Grátis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
                  </motion.button>
                  <p className="text-gray-400 text-sm">
                    ⭐ Sem cartão de crédito necessário • Sem compromisso
                  </p>
                </motion.div>
              </div>
            ) : (
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Principais Recursos</h3>
                  <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                    Tudo o que você precisa para impulsionar suas indicações e automatizar seu crescimento. Confira os principais recursos disponíveis na plataforma:
                  </p>
                </div>

                {/* Features */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Integrações nativas',
                      'Dashboard completo',
                      'Automação de pagamentos',
                      'Materiais profissionais',
                      'Analytics avançados', 
                      'Suporte prioritário',
                      'Integrações nativas',
                      'Treinamento incluído'
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                      >
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <motion.button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (window.location.pathname === '/testegratis') {
                          const form = document.getElementById('form-testegratis');
                          if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                          window.open('https://app.virallead.com.br/pages/teste-gratis.html', '_blank', 'noopener,noreferrer');
                        }
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group mb-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Teste Grátis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
                  </motion.button>
                  
                  <p className="text-gray-400 text-sm">
                    ⭐ Sem cartão de crédito necessário • Cancele a qualquer momento
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Empresas já transformadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">R$ 50M+</div>
              <div className="text-gray-300">Gerados em indicações</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4.9★</div>
              <div className="text-gray-300">Avaliação dos clientes</div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Quick */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h3 className="text-2xl font-bold mb-8">Dúvidas frequentes:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "Preciso ter conhecimento técnico para usar?",
                a: "Não! A plataforma é simples e intuitiva. Em poucos cliques, você configura sua campanha de indicações e acompanha os resultados em tempo real."
              },
              {
                q: "Existe algum contrato ou fidelidade?",
                a: "Não. Você pode cancelar a qualquer momento. Nosso objetivo é oferecer resultados, não prender clientes por contrato."
              },
              {
                q: "Como funciona o software de indicação de clientes?",
                a: "Nosso software permite que seus clientes indiquem amigos e conhecidos para seu negócio. Cada indicação é registrada, e você pode recompensar quem indicou de forma automática e personalizada."
              },
              {
                q: "É seguro?",
                a: "Totalmente. Utilizamos criptografia e seguimos as boas práticas de segurança para garantir a proteção dos seus dados e dos seus clientes."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ModernPricing 