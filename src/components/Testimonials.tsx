'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const testimonials = [
    {
      quote: "Viral Lead has proven time and again that it is the ideal platform for our affiliate program. It is intuitive, simple, and the customer service always replies immediately whenever we need help!",
      author: "Florian Muller",
      position: "Affiliate Manager at Minea.com",
      initials: "FM",
      gradient: "from-blue-500 to-purple-600",
      rating: 5
    },
    {
      quote: "We've been using Viral Lead for over 5 years. It has helped us bring in hundreds of thousands of dollars of additional revenue, while being managed by just a single person.",
      author: "John O'Nolan",
      position: "Founder & CEO at Ghost.org",
      initials: "JO",
      gradient: "from-green-500 to-teal-600",
      rating: 5
    },
    {
      quote: "I've been a user of Viral Lead since 2019 and it's one of the easiest to learn, use and implement tool in the market. Viral Lead has a very customer-friendly team, working round the clock so that our business does not suffer.",
      author: "Shubham Sood",
      position: "Affiliate Program Lead at SaaS Labs - JustCall",
      initials: "SS",
      gradient: "from-orange-500 to-red-600",
      rating: 5
    }
  ]

  const companies = [
    { name: 'ClickUp', letter: 'C', color: 'text-purple-600' },
    { name: 'Ghost', letter: 'G', color: 'text-gray-800' },
    { name: 'Demio', letter: 'D', color: 'text-blue-600' },
    { name: 'JustCall', letter: 'J', color: 'text-green-600' },
    { name: 'Passion.io', letter: 'P', color: 'text-red-600' },
    { name: 'Quaderno', letter: 'Q', color: 'text-indigo-600' }
  ]

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container">
        {/* Companies Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Confiado por milhares de empresas SaaS
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`w-8 h-8 ${company.color} bg-gray-100 rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-white group-hover:shadow-md transition-all`}>
                  {company.letter}
                </div>
                <span className="font-semibold text-lg">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Seu negócio está em <span className="gradient-text">boas mãos</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 relative hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="absolute top-6 right-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                >
                  <Quote className="w-8 h-8 text-blue-300" />
                </motion.div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {testimonial.initials}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Success Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Por que os clientes nos escolhem
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Nossa equipe dedicada de Customer Success está lá para você quando mais precisa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '7+', label: 'Anos no Mercado', desc: 'Estável e previsível' },
              { value: '50+', label: 'Opções de Personalização', desc: 'Portal altamente customizável' },
              { value: '18', label: 'Pontos de Dados', desc: 'Relatórios poderosos' },
              { value: '24/7', label: 'Suporte', desc: 'Recursos nativos de email' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">{item.value}</div>
                <div className="text-gray-700">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials 