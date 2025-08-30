"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import { Check, Star, Zap, Users, TrendingUp, Shield, Clock, Gift } from 'lucide-react';

export default function TesteGratisPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    funcionarios: '',
    telefone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="pt-32 pb-24">
          <div className="container">
            <motion.div 
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Teste Grátis Ativado!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Seu acesso de 14 dias foi configurado com sucesso. 
                Verifique seu email para as instruções de acesso.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Próximos passos:</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Verifique sua caixa de entrada</li>
                  <li>• Clique no link de ativação</li>
                  <li>• Acesse a plataforma</li>
                  <li>• Crie seu primeiro programa de afiliados</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        <ModernFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Gift className="w-4 h-4 mr-2" />
                14 dias grátis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Experimente a <span className="text-blue-600">Viral Lead</span> Grátis
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Crie seu primeiro programa de afiliados em menos de 15 minutos. 
                Sem cartão de crédito, sem compromisso. Apenas resultados.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email corporativo *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da empresa *
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    required
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div>
                  <label htmlFor="funcionarios" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de funcionários
                  </label>
                  <select
                    id="funcionarios"
                    name="funcionarios"
                    value={formData.funcionarios}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-1000">201-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Ativando teste grátis...
                    </span>
                  ) : (
                    'Ativar Teste Grátis de 14 Dias'
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Ao ativar, você concorda com nossos{' '}
                  <a href="/privacidade" className="text-blue-600 hover:underline">
                    Termos de Uso
                  </a>{' '}
                  e{' '}
                  <a href="/privacidade" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <ModernFooter />
    </main>
  );
} 