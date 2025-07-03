'use client'

import { Check, Star } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      subtitle: "up to $5,000/month revenue from affiliates",
      price: "$49",
      period: "per month",
      popular: false,
      features: [
        "Unlimited website visitors",
        "Maximum 1000 affiliates",
        "Maximum 2 campaigns",
        "Personalized referral links",
        "Link and coupon tracking",
        "Any type of monetary rewards and commissions",
        "Brandable affiliate dashboard",
        "Email marketing automation",
        "Quick mass PayPal and Wise bulk payouts",
        "W-9/W-8BEN tax form collection",
        "Unlimited team members",
        "Self-referral and ad traffic detection",
        "Broadcast emails",
        "Multi-tiered commissions",
        "Stripe historical import",
        "Custom signup fields",
        "Webhooks, Zapier, Make and Albato integrations",
        "Auto-create coupons in Stripe"
      ]
    },
    {
      name: "Business",
      subtitle: "up to $15,000/month revenue from affiliates",
      price: "$99",
      period: "per month",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "Unlimited affiliates",
        "Unlimited campaigns",
        "Your own domain for the affiliate dashboard",
        "Manage multiple websites (2 different domains)",
        "One-click direct PayPal payouts",
        "3rd tier commission",
        "Invoicing for EU companies",
        "Embed affiliate dashboard inside your own website"
      ]
    },
    {
      name: "Enterprise",
      subtitle: "above $15,000/month revenue from affiliates",
      price: "$149",
      period: "per month",
      popular: false,
      features: [
        "Everything in Business, plus:",
        "Custom CSS and Javascript",
        "Non-monetary rewards",
        "Powered by link removed from affiliate dashboard and emails",
        "Manage multiple websites (3 different domains)",
        "Post-back URL",
        "Managed Auto Payouts"
      ]
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple pricing that <span className="gradient-text">grows with you</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your affiliate program. All plans include our core features.
          </p>
          
          {/* Plan Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-8">
            <button className="px-6 py-2 rounded-md bg-white shadow-sm font-medium text-gray-900">
              Monthly plans
            </button>
            <button className="px-6 py-2 rounded-md font-medium text-gray-600 hover:text-gray-900">
              Yearly plans
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl border-2 p-8 ${plan.popular ? 'border-primary-500 shadow-xl scale-105' : 'border-gray-200 shadow-lg'} hover:shadow-xl transition-all duration-200`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Starting at</span>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className={`text-gray-700 ${feature.includes('Everything in') ? 'font-semibold' : ''}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:shadow-lg' 
                  : plan.name === 'Enterprise'
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.name === 'Enterprise' ? "Let's talk" : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            *all revenue generated each month by your affiliate/referral program (including new and recurring sales)
          </p>
          <button className="text-primary-600 hover:text-primary-700 font-semibold underline">
            Interested in a more detailed comparison of plan features?
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing 