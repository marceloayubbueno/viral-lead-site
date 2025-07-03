'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg"></div>
              <span className="ml-2 text-xl font-bold text-white">Viral Lead</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-gray-300 hover:text-white font-medium">
                Recursos
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700">
                <Link href="#features" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</Link>
                <Link href="#features" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Relatórios</Link>
                <Link href="#features" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Materiais</Link>
                <Link href="#features" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Emails</Link>
              </div>
            </div>
            <Link href="#integration" className="text-gray-300 hover:text-white font-medium">Integração</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white font-medium">Preços</Link>
            <Link href="#case-studies" className="text-gray-300 hover:text-white font-medium">Casos de Sucesso</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white font-medium">Entrar</Link>
            <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">Começar</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
              <Link href="#features" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Recursos</Link>
              <Link href="#integration" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Integração</Link>
              <Link href="#pricing" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Preços</Link>
              <Link href="#case-studies" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Casos de Sucesso</Link>
              <div className="pt-4 border-t border-gray-700">
                <Link href="/login" className="block px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Entrar</Link>
                <Link href="/signup" className="block px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md mt-2">Começar</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 