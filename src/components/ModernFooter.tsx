'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ModernFooter = () => {
  const router = useRouter()

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container">
        {/* CTA Final */}
        <motion.div 
          className="text-center mb-16 pb-16 border-b border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar<br />
            <span className="text-blue-400">clientes em indicadores</span>?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já estão crescendo com programas de indicação inteligentes.
          </p>
          
          <motion.button
            onClick={() => router.push('/chat')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Agora
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline" />
          </motion.button>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg mr-3"></div>
              <span className="text-2xl font-bold">Viral Lead</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A plataforma mais intuitiva para criar e gerenciar programas de indicação que realmente convertem.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
              <span>contato@viralead.com.br</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                <span>+55 (11) 9999-0000</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              {[
                'Como Funciona',
                'Preços',
                'Integrações',
                'Recursos',
                'API'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              {[
                'Central de Ajuda',
                'Contato',
                'Treinamentos',
                'Blog',
                'Status'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Viral Lead. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              LGPD
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default ModernFooter 