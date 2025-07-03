'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Users } from 'lucide-react'
import CountUp from 'react-countup'
import { useRouter } from 'next/navigation'

const ROICalculator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [affiliatePercentage, setAffiliatePercentage] = useState(20)
  const [commission, setCommission] = useState(10)
  const router = useRouter()

  // Cálculos
  const currentAffiliateRevenue = (monthlyRevenue * affiliatePercentage) / 100
  const newAffiliateRevenue = currentAffiliateRevenue * 2.5 // 150% de aumento médio
  const monthlySavings = newAffiliateRevenue * 0.15 // 15% de economia em gestão
  const yearlyROI = (newAffiliateRevenue - currentAffiliateRevenue) * 12
  const platformCost = 599 * 12 // Custo anual da plataforma

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calcule o <span className="gradient-text">ROI do seu Programa</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra quanto você pode economizar e ganhar com um programa de indicações otimizado
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Calculator Inputs */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Seus Dados</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Receita Mensal Atual
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="5000"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>R$ 10k</span>
                      <span className="font-bold text-blue-600">
                        R$ {(monthlyRevenue / 1000).toFixed(0)}k
                      </span>
                      <span>R$ 500k</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    % Atual de Receita por Indicações
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={affiliatePercentage}
                      onChange={(e) => setAffiliatePercentage(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>0%</span>
                      <span className="font-bold text-blue-600">{affiliatePercentage}%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Comissão Média (%)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={commission}
                      onChange={(e) => setCommission(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>5%</span>
                      <span className="font-bold text-blue-600">{commission}%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold">Seu Potencial</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80">Receita Atual por Indicações</span>
                    <DollarSign className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="text-2xl font-bold">
                    R$ <CountUp end={currentAffiliateRevenue} duration={1} separator="." />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80">Com Viral Lead (+150%)</span>
                    <TrendingUp className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="text-2xl font-bold">
                    R$ <CountUp end={newAffiliateRevenue} duration={1} separator="." />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80">Economia Mensal em Gestão</span>
                    <Users className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="text-2xl font-bold">
                    R$ <CountUp end={monthlySavings} duration={1} separator="." />
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="text-center">
                    <div className="text-sm text-white/80 mb-2">ROI Anual Estimado</div>
                    <div className="text-4xl font-bold mb-2">
                      R$ <CountUp end={yearlyROI - platformCost} duration={2} separator="." />
                    </div>
                    <div className="text-sm text-white/80">
                      Retorno de {Math.round(((yearlyROI - platformCost) / platformCost) * 100)}% sobre investimento
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => router.push('/chat')}
                className="w-full mt-6 bg-white text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Começar Meu Programa Agora
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  )
}

export default ROICalculator 