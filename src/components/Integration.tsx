'use client'

import { CreditCard, Zap, Shield, Globe } from 'lucide-react'

const Integration = () => {
  const integrations = [
    { name: 'Stripe', logo: '💳', description: 'Integração direta com cobrança' },
    { name: 'Paddle', logo: '🏊', description: 'Processamento global de pagamentos' },
    { name: 'Chargebee', logo: '⚡', description: 'Gestão de assinaturas' },
    { name: 'Braintree', logo: '🧠', description: 'Gateway de pagamento PayPal' },
  ]

  return (
    <section id="integration" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Integre Perfeitamente com{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Stripe, Paddle, Recurly</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecte seu sistema de cobrança existente em minutos. Sem configuração complexa necessária.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {integrations.map((integration, index) => (
            <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200">
              <div className="text-4xl mb-4">{integration.logo}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{integration.name}</h3>
              <p className="text-gray-600">{integration.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Configuração em menos de 5 minutos
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Nenhum script necessário</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Nenhum desenvolvedor necessário</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Funciona com qualquer provedor de cobrança</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-primary-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-purple-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Integration 