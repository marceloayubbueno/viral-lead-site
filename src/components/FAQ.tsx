'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is Viral Lead only for SaaS businesses?",
      answer: "No, it's not. Viral Lead works for any business except eCommerce. Try it for free and see how it works for YOUR business!"
    },
    {
      question: "Can you make payouts directly from the Stripe account?",
      answer: "Yes, we integrate directly with Stripe and can handle automated payouts through our platform, making it seamless for you to pay your affiliates."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Absolutely! You can set your own custom domain (with SSL encryption support) for both the affiliate dashboard and sign up pages."
    },
    {
      question: "What's the affiliate cookie life?",
      answer: "Our default cookie life is 30 days, but this can be customized based on your business needs and requirements."
    },
    {
      question: "Will affiliate marketing work for my business?",
      answer: "Affiliate marketing works well for businesses with digital products, recurring subscriptions, and high customer lifetime value. We offer a free trial so you can test if it's right for your business."
    },
    {
      question: "How long are your contracts?",
      answer: "We offer flexible monthly plans with no long-term contracts. You can cancel anytime without penalties or fees."
    },
    {
      question: "Are you GDPR compliant?",
      answer: "Yes, we are fully GDPR compliant and take data privacy seriously. All data is encrypted and handled according to European data protection standards."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These are the questions we often receive.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see the answer you need?
            </h3>
            <p className="text-gray-600 mb-6">
              That's ok. Just drop a message and we will get back to you ASAP.
            </p>
            <button className="btn-primary">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ 