'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Youtube } from 'lucide-react'

const VideoSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black" ref={ref}>
      <div className="container px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Play className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Demonstração da Plataforma
          </motion.div>
          
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Veja o <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Viral Lead</span> em ação
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Assista a esta demonstração rápida e descubra como nossa plataforma pode transformar 
            seu negócio em apenas alguns minutos de configuração.
          </motion.p>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          className="relative max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Background Glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl md:rounded-3xl blur-3xl opacity-20 scale-105"
            animate={{
              scale: [1.05, 1.1, 1.05],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Video Frame */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-2 border border-white/20 shadow-2xl">
            <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-gray-800">
              {/* YouTube Embed */}
              <iframe
                src="https://www.youtube.com/embed/uZg1vqi4Ajk"
                title="Viral Lead - Demonstração da Plataforma"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Overlay with YouTube Branding */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4">
                <div className="flex items-center space-x-1 md:space-x-2 bg-red-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  <Youtube className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">YouTube</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-8 md:mt-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.p 
            className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Pronto para transformar seu negócio? Agende uma demonstração personalizada 
            e veja como o Viral Lead pode acelerar seu crescimento.
          </motion.p>
          
          <motion.button
            onClick={() => window.open('https://app.virallead.com.br/pages/teste-gratis.html', '_blank', 'noopener,noreferrer')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200 group w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Teste Grátis
            <Play className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform inline" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoSection
