import React from 'react';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
      <Header />
      <section className="flex-1 flex justify-center items-center py-16 px-4">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Política de Privacidade</h1>
          <p className="mb-4 text-lg text-gray-200">
            Sua privacidade é importante para nós. Esta página explica como coletamos, usamos e protegemos suas informações ao utilizar nosso site.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2 text-white">1. Uso de Cookies</h2>
          <p className="mb-4 text-gray-200">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdos e anúncios. Cookies são pequenos arquivos armazenados no seu dispositivo.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2 text-white">2. Dados Coletados</h2>
          <p className="mb-4 text-gray-200">
            Podemos coletar informações como: endereço IP, localização aproximada, páginas visitadas, tempo de navegação, cliques e interações. Não coletamos dados sensíveis ou pessoais sem seu consentimento explícito.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2 text-white">3. Finalidade do Tratamento</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-200">
            <li>Melhorar a navegação e experiência do usuário.</li>
            <li>Realizar análises estatísticas e de performance.</li>
            <li>Personalizar conteúdos e ofertas.</li>
            <li>Mensurar resultados de campanhas de marketing.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-2 text-white">4. Consentimento</h2>
          <p className="mb-4 text-gray-200">
            O uso de cookies para fins de análise e marketing só ocorre após seu consentimento, solicitado ao acessar o site. Você pode aceitar ou recusar a qualquer momento pelo banner de cookies.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2 text-white">5. Direitos do Usuário</h2>
          <ul className="list-disc pl-6 mb-4 text-gray-200">
            <li>Solicitar informações sobre seus dados coletados.</li>
            <li>Revogar ou alterar seu consentimento a qualquer momento.</li>
            <li>Solicitar a exclusão dos seus dados, conforme a legislação vigente.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-2 text-white">6. Contato</h2>
          <p className="mb-4 text-gray-200">
            Em caso de dúvidas sobre esta política ou sobre seus dados, entre em contato pelo e-mail: <a href="mailto:contato@virallead.com.br" className="text-cyan-400 underline">contato@virallead.com.br</a>
          </p>
          <div className="mt-8 text-sm text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</div>
        </div>
      </section>
      <ModernFooter />
    </main>
  );
} 