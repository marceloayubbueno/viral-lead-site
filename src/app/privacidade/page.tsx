"use client";

import React from 'react';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Política de <span className="text-blue-600">Privacidade</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sua privacidade é importante para nós. Saiba como protegemos e utilizamos suas informações.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Informações que Coletamos</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como quando cria uma conta,
              preenche formulários, ou entra em contato conosco.
            </p>

            <h2>2. Como Usamos suas Informações</h2>
            <p>
              Utilizamos suas informações para fornecer, manter e melhorar nossos serviços,
              comunicar com você e personalizar sua experiência.
            </p>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros,
              exceto conforme descrito nesta política.
            </p>

            <h2>4. Segurança</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas
              para proteger suas informações pessoais.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais.
              Entre em contato conosco para exercer esses direitos.
            </p>

            <h2>6. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política de privacidade periodicamente.
              Notificaremos você sobre mudanças significativas.
            </p>

            <h2>7. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta política de privacidade,
              entre em contato conosco através do chat ou email.
            </p>
          </div>
        </div>
      </section>

      <ModernFooter />
    </main>
  );
} 