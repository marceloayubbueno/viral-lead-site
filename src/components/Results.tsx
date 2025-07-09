'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { TrendingUp, Clock, DollarSign, Users, Target, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Results = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const router = useRouter()

  const results = [
    {
      before: 'Antes: Dependia apenas do marketing tradicional',
      after: 'Depois: 40% da receita vem de indicações',
      improvement: '+150%',
      metric: 'crescimento em leads qualificados',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      before: 'Antes: Gastava 8h/semana gerenciando afiliados',
      after: 'Depois: 30 minutos para o programa todo',
      improvement: '94%',
      metric: 'redução no tempo de gestão',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      before: 'Antes: CAC alto e conversão baixa',
      after: 'Depois: Leads mais qualificados por indicação',
      improvement: '65%',
      metric: 'redução no custo de aquisição',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const testimonials = [
    {
      quote: "O que eu fazia em 6 horas, hoje faço em 40 minutos",
      author: "Carlos Silva",
      company: "TechSaaS",
      result: "Aumentou o faturamento em 85%",
      timeframe: "Em 3 meses"
    },
    {
      quote: "Nunca vi nada igual, é só configurar e os resultados aparecem",
      author: "Ana Oliveira", 
      company: "GrowthCorp",
      result: "300 novos clientes via indicação",
      timeframe: "Em 4 meses"
    },
    {
      quote: "Ia contratar alguém, mas o Viral Lead resolveu tudo",
      author: "Miguel Santos",
      company: "StartupBR",
      result: "Economia de R$ 15.000/mês",
      timeframe: "Em equipe"
    }
  ]

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Já sentiu que poderia <span className="text-blue-600">ganhar mais</span><br />
            se conseguisse <span className="text-green-600">entregar mais rápido</span>?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <strong>Se você é empreendedor ou gestor</strong>, sabe a dor que é depender apenas do marketing tradicional... 
            e depois sofrer com leads caros e desqualificados, atrasando vendas e deixando dinheiro na mesa.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div 
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 mb-20 border border-red-100"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              O Viral Lead nasceu da nossa própria frustração:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">😤</div>
                <p className="text-gray-700">Cansados de <strong>perder tempo</strong> com gestão manual de indicações</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💸</div>
                <p className="text-gray-700">Frustrados com <strong>CAC alto</strong> e baixa conversão</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <p className="text-gray-700">Querendo <strong>escalar vendas</strong> sem aumentar equipe</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {results.map((result, index) => {
            const IconComponent = result.icon
            return (
              <motion.div
                key={index}
                className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between min-h-[420px]"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.025 }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${result.color} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50/80 rounded-lg border-l-4 border-red-300">
                    <p className="text-xs text-red-700 font-medium">{result.before}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="p-3 bg-green-50/80 rounded-lg border-l-4 border-green-300">
                    <p className="text-xs text-green-700 font-medium">{result.after}</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className={`text-3xl font-extrabold bg-gradient-to-r ${result.color} bg-clip-text text-transparent drop-shadow-sm`}>
                    {inView && <CountUp end={parseInt(result.improvement)} duration={2} />}%
                  </div>
                  <p className="text-gray-600 text-xs mt-1">{result.metric}</p>
                </div>
                <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                  Ver detalhes
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonials Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Agora você pode:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-blue-600 text-sm">{testimonial.company}</p>
                </div>
                
                <blockquote className="text-gray-700 mb-6 italic text-center">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {testimonial.result}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.timeframe}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits List */}
        <motion.div 
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Transforme seu negócio hoje:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: '⚡', text: 'Configurar em minutos' },
              { icon: '💰', text: 'Reduzir CAC em até 65%' },
              { icon: '📈', text: 'Aumentar conversões' },
              { icon: '⏰', text: 'Economizar 90% do tempo' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <p className="font-semibold text-gray-800">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            onClick={() => {
              if (typeof window !== 'undefined' && window.location.pathname === '/testegratis') {
                const form = document.getElementById('form-testegratis');
                if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                router.push('/chat');
              }
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {typeof window !== 'undefined' && window.location.pathname === '/testegratis' ? 'Começar Meu Teste Agora' : 'Quero Transformar Meu Negócio Agora'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Results 