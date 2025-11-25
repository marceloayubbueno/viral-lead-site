'use client'

import Link from 'next/link'
import { Heart, Linkedin, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Pricing", href: "#pricing" },
        { name: "Changelog", href: "/changelog" }
      ]
    },
    {
      title: "Case studies",
      links: [
        { name: "Submagic", href: "/case-studies/submagic" },
        { name: "CustomGPT", href: "/case-studies/customgpt" },
        { name: "Neuroflash", href: "/case-studies/neuroflash" },
        { name: "Passion.io", href: "/case-studies/passion" },
        { name: "See All", href: "/case-studies" }
      ]
    },
    {
      title: "Billing providers integrations",
      links: [
        { name: "Stripe", href: "/integrations/stripe" },
        { name: "Chargebee", href: "/integrations/chargebee" },
        { name: "Paddle", href: "/integrations/paddle" }
      ]
    },
    {
      title: "Platform integrations",
      links: [
        { name: "Zapier", href: "/integrations/zapier" },
        { name: "Make", href: "/integrations/make" },
        { name: "Albato", href: "/integrations/albato" },
        { name: "All integrations", href: "/integrations" }
      ]
    },
    {
      title: "Compare us",
      links: [
        { name: "Overview", href: "/compare" },
        { name: "Rewardful Alternative", href: "/compare/rewardful" },
        { name: "LeadDyno Alternative", href: "/compare/leaddyno" },
        { name: "Tapfiliate Alternative", href: "/compare/tapfiliate" },
        { name: "Partnerstack Alternative", href: "/compare/partnerstack" },
        { name: "Tolt Alternative", href: "/compare/tolt" },
        { name: "Reditus Alternative", href: "/compare/reditus" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "API", href: "/api" },
        { name: "Help", href: "/help" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Jobs", href: "/jobs" }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container">
        {/* CTA Section */}
        <div className="py-16 text-center border-b border-gray-800">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Launch Affiliate, Influencer & Referral Programs in under 15 minutes. 
            Start building a program that delivers results.
          </p>
          <Link 
            href="https://app.virallead.com.br/pages/teste-gratis.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4 inline-block"
          >
            Começar Teste Grátis
          </Link>
        </div>

        {/* Links Section */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-2 fill-current" />
              <span className="text-gray-400">in Transylvania</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              Copyright © 2016-2025 Igil Webs SRL. All Rights Reserved.{' '}
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              {' and '}
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 