'use client'

import { ArrowRight, TrendingUp, Users, Zap, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()

  const steps = [
    {
      icon: Target,
      title: 'Configure',
      description: 'Defina comissões e regras em minutos'
    },
    {
      icon: Users,
      title: 'Recrute',
      description: 'Convide indicadores e influenciadores'
    },
    {
      icon: TrendingUp,
      title: 'Escale',
      description: 'Acompanhe crescimento automático'
    }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-24 min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full opacity-10 blur-3xl"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        ></motion.div>
      </div>

      <div className="container relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforme clientes em{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">indicadores poderosos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crie programas de indicação que realmente funcionam. Configure comissões, recrute indicadores e 
            acompanhe o crescimento automático da sua receita com nossa plataforma intuitiva.
          </motion.p>

          {/* Process Steps */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-8">Como funciona em 3 passos simples:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div 
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-blue-400" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="flex items-center justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              onClick={() => router.push('/chat')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Falar com especialista
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
            </motion.button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="relative mx-auto max-w-6xl">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-3xl opacity-30 scale-105"
              animate={{
                scale: [1.05, 1.1, 1.05],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-2 border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl aspect-[16/11] border border-white/20 overflow-hidden shadow-inner">
                {/* Dashboard Mockup */}
                <div className="h-full p-4 relative flex flex-col">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white/60 text-sm">Viral Lead Dashboard</div>
                  </div>
                  
                  {/* Mock Dashboard Content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/15 transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 3 }}
                    >
                      <div className="text-blue-400 text-xl font-bold">
                        <CountUp end={245} duration={2} delay={3.2} />%
                      </div>
                      <div className="text-white/90 text-xs font-medium">Crescimento em Indicações</div>
                    </motion.div>
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/15 transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 3.2 }}
                    >
                      <div className="text-cyan-400 text-xl font-bold">
                        R$ <CountUp end={89750} duration={2} delay={3.4} separator="." />
                      </div>
                      <div className="text-white/90 text-xs font-medium">Receita Este Mês</div>
                    </motion.div>
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/15 transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 3.4 }}
                    >
                      <div className="text-green-400 text-xl font-bold">
                        <CountUp end={1247} duration={2} delay={3.6} />
                      </div>
                      <div className="text-white/90 text-xs font-medium">Indicadores Ativos</div>
                    </motion.div>
                  </div>
                  
                  {/* Charts Section - Fill remaining space */}
                  <div className="flex-1 space-y-3 min-h-0">
                    {/* Bar Chart - Takes more space */}
                  <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                      style={{ height: '45%', minHeight: '140px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.6 }}
                  >
                      <div className="h-full flex flex-col">
                        <div className="flex-1 flex items-end justify-between gap-1">
                          {[65, 45, 78, 52, 89, 67, 73, 81, 58, 92, 76, 85].map((height, i) => (
                        <motion.div
                          key={i}
                              className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm shadow-sm hover:from-cyan-400 hover:to-blue-400 transition-all duration-200"
                          style={{ 
                                width: '7%',
                                height: `${height}%`
                          }}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: `${height}%`, opacity: 1 }}
                          transition={{ 
                            duration: 0.8, 
                            delay: 4 + i * 0.1,
                            ease: "easeOut"
                          }}
                              whileHover={{ scale: 1.05 }}
                        />
                      ))}
                        </div>
                        <div className="text-white/80 text-xs mt-3 text-center font-medium">Performance das Indicações nos Últimos 12 Meses</div>
                    </div>
                  </motion.div>
                  
                    {/* Line Chart - Takes remaining space */}
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                      style={{ height: '40%', minHeight: '120px' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 3.8 }}
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex-1 relative">
                          <svg 
                            className="w-full h-full" 
                            viewBox="0 0 320 70" 
                            preserveAspectRatio="none"
                          >
                            {/* Grid lines */}
                            <defs>
                              <pattern id="grid" width="30" height="12" patternUnits="userSpaceOnUse">
                                <path d="M 30 0 L 0 0 0 12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                              </pattern>
                            </defs>
                            <rect x="20" y="0" width="280" height="60" fill="url(#grid)" />
                            
                            {/* Area fill under line */}
                            <motion.path
                              d="M 30,55 Q 70,35 110,20 T 190,15 T 250,12 T 290,10 L 300,10 L 300,60 L 30,60 Z"
                              fill="url(#areaGradient)"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.4 }}
                              transition={{ 
                                duration: 1.5, 
                                delay: 5.5 
                              }}
                            />
                            
                            {/* Line Chart */}
                            <motion.path
                              d="M 30,55 Q 70,35 110,20 T 190,15 T 250,12 T 290,10"
                              fill="none"
                              stroke="url(#lineGradient)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ 
                                duration: 2, 
                                delay: 4.5,
                                ease: "easeInOut"
                              }}
                            />
                            
                            {/* Gradient definitions */}
                            <defs>
                              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#10b981" />
                              </linearGradient>
                              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                              </linearGradient>
                            </defs>
                            
                            {/* Data points */}
                            {[
                              {x: 30, y: 55}, {x: 70, y: 35}, {x: 110, y: 20}, 
                              {x: 190, y: 15}, {x: 250, y: 12}, {x: 290, y: 10}
                            ].map((point, index) => (
                              <motion.circle
                                key={index}
                                cx={point.x}
                                cy={point.y}
                                r="5"
                                fill="#22d3ee"
                                stroke="#ffffff"
                                strokeWidth="2"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: 4.8 + index * 0.1 
                                }}
                                whileHover={{ scale: 1.5 }}
                              />
                            ))}
                          </svg>
                        </div>
                        <div className="absolute bottom-2 left-0 w-full text-white/80 text-xs text-center font-medium pointer-events-none">Crescimento de Receita por Indicações</div>
                    </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 