'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Users, TrendingUp, ArrowRight, Zap, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'

const HowItWorks = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const router = useRouter()

  const steps = [
    {
      number: '01',
      title: 'Configure',
      subtitle: 'Defina as regras do seu programa',
      description: 'Configure comissões, metas e critérios de indicação em poucos cliques. Nossa interface intuitiva torna a configuração simples e rápida.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      features: ['Comissões flexíveis', 'Metas personalizadas', 'Critérios de qualificação']
    },
    {
      number: '02',
      title: 'Recrute',
      subtitle: 'Convide seus melhores clientes',
      description: 'Transforme clientes satisfeitos em indicadores poderosos. Envie convites automatizados e forneça materiais de apoio profissionais.',
      icon: Users,
      color: 'from-cyan-500 to-blue-500',
      features: ['Convites automatizados', 'Materiais prontos', 'Dashboard exclusivo']
    },
    {
      number: '03',
      title: 'Escale',
      subtitle: 'Acompanhe o crescimento automático',
      description: 'Monitore performance em tempo real, pague comissões automaticamente e veja sua receita crescer através de indicações qualificadas.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      features: ['Analytics em tempo real', 'Pagamentos automáticos', 'Crescimento exponencial']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4 mr-2" />
            Veja como é fácil usar o Viral Lead
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Em apenas <span className="text-blue-600">3 passos simples</span>,<br />
            você transforma clientes em indicadores
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma foi desenvolvida para ser <strong>intuitiva e poderosa</strong>. 
            Configure seu programa de indicações em minutos e comece a ver resultados hoje mesmo.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                {/* Content */}
                <div className={`${isEven ? 'lg:pr-8' : 'lg:pl-8 lg:order-2'}`}>
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                  >
                    <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mr-4">
                      {step.number}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </motion.div>
                  
                  <motion.h4 
                    className="text-xl text-blue-600 font-semibold mb-4"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                  >
                    {step.subtitle}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-lg text-gray-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                  >
                    {step.description}
                  </motion.p>
                  
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 + 0.8 }}
                  >
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.3 + 1 + featureIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Visual */}
                <div className={`${isEven ? 'lg:pl-8' : 'lg:pr-8 lg:order-1'}`}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Background Gradient */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-3xl opacity-20`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Card */}
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                      <div className="text-center">
                        <motion.div 
                          className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <div className="space-y-4">
                          <div className="h-3 bg-gray-100 rounded-full">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${(index + 1) * 33}%` } : {}}
                              transition={{ duration: 1, delay: index * 0.3 + 1 }}
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="h-8 bg-gray-100 rounded"
                                initial={{ opacity: 0.3 }}
                                animate={inView ? { opacity: i <= index * 2 ? 1 : 0.3 } : {}}
                                transition={{ duration: 0.3, delay: index * 0.3 + 1.2 + i * 0.1 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={() => {
              if (typeof window !== 'undefined' && window.location.pathname === '/testegratis') {
                const form = document.getElementById('form-testegratis');
                if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                router.push('/chat');
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {typeof window !== 'undefined' && window.location.pathname === '/testegratis' ? 'Começar Meu Teste Agora' : 'Começar Meu Programa Agora'}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks 