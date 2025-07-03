'use client'

import { TrendingUp, Users, DollarSign } from 'lucide-react'

const CaseStudies = () => {
  const caseStudies = [
    {
      company: "Submagic",
      description: "Submagic scaled to €1.6M with Viral Lead",
      quote: "Viral Lead has been great, been loving the new update - much more cleaner and the new way of coupon codes is a game changer. Tracking is great and shows all numbers that needs to be seen!",
      author: "David Zitoun",
      position: "Co-founder of Submagic",
      metrics: [
        { label: "Receita Total", value: "€1,635,717", icon: DollarSign },
        { label: "Por Mês", value: "€85,000+", icon: TrendingUp },
        { label: "Promotores", value: "9,000+", icon: Users }
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      company: "CustomGPT", 
      description: "How CustomGPT scaled to over $1M with Viral Lead",
      quote: "Customer service has been excellent, and the platform itself is very sleek and intuitive. For a growing affiliate program, it's perfect!",
      author: "Ethan Housen",
      position: "Marketing and Partnership Manager at CustomGPT",
      metrics: [
        { label: "Receita Total", value: "Mais de $1M", icon: DollarSign },
        { label: "Clientes Pagantes", value: "1,400", icon: TrendingUp },
        { label: "Promotores", value: "5K+", icon: Users }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      company: "neuroflash",
      description: "How neuroflash gained 8000 new users",
      quote: "It's been gotten a lot easier since the launch of V2 for sure! Honestly, our work with FirstPromoter currently is very low since we have everything set up.",
      author: "Julia Schlocker",
      position: "Product Ops Manager at neuroflash",
      metrics: [
        { label: "Novos Usuários", value: "8,000", icon: Users },
        { label: "Novos Clientes/Mês", value: "100", icon: TrendingUp },
        { label: "Promotores/Mês", value: "30+", icon: DollarSign }
      ],
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resultados Reais de <span className="gradient-text">Clientes Reais</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como nossos clientes estão escalando seus negócios com programas de afiliados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group">
              <div className={`h-2 bg-gradient-to-r ${study.color}`}></div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.company}</h3>
                  <p className="text-gray-600 font-medium">{study.description}</p>
                </div>

                <blockquote className="text-gray-700 mb-6 italic">
                  "{study.quote}"
                </blockquote>

                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${study.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                    {study.company.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{study.author}</div>
                    <div className="text-sm text-gray-600">{study.position}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {study.metrics.map((metric, metricIndex) => {
                    const IconComponent = metric.icon
                    return (
                      <div key={metricIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
                          <span className="text-gray-700">{metric.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{metric.value}</span>
                      </div>
                    )
                  })}
                </div>

                <button className={`w-full mt-6 bg-gradient-to-r ${study.color} text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 group-hover:scale-105`}>
                  Ler Caso Completo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary text-lg px-8 py-4">
            Ver Todos os Casos de Sucesso
          </button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies 