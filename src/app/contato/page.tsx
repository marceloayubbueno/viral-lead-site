import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contato - Viral Lead',
  description: 'Entre em contato conosco para implementar seu programa de indicações. Suporte especializado em marketing de indicação e automação de vendas.',
  keywords: 'contato, suporte, marketing de indicação, programa de indicações, Viral Lead',
  openGraph: {
    title: 'Contato - Viral Lead',
    description: 'Entre em contato conosco para implementar seu programa de indicações.',
    type: 'website',
  },
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Entre em <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Contato</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pronto para implementar seu programa de indicações? 
            Nossa equipe está aqui para ajudar você a transformar seus clientes em promotores da sua marca.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Email */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-gray-700 hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Email</h3>
            <p className="text-gray-300 mb-4">Para suporte e dúvidas gerais</p>
            <a 
              href="mailto:contato@virallead.com.br" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg transition-colors"
            >
              contato@virallead.com.br
            </a>
          </div>

          {/* Chat */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-gray-700 hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Chat Online</h3>
            <p className="text-gray-300 mb-4">Atendimento em tempo real</p>
            <Link 
              href="/chat" 
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              Iniciar Chat
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white text-center shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-3xl opacity-30 scale-105"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto">
              Teste nossa plataforma gratuitamente e veja como podemos ajudar sua empresa a crescer através de indicações.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://app.virallead.com.br/pages/teste-gratis.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🚀 Teste Grátis
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Perguntas <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Frequentes</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/80 rounded-2xl shadow-lg p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">
                ⏱️ Quanto tempo leva para implementar um programa de indicações?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                A implementação básica leva de 1 a 2 semanas. Para programas mais complexos com integrações avançadas, o prazo pode ser de 4 a 6 semanas.
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-2xl shadow-lg p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">
                🎯 Vocês oferecem suporte durante a implementação?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Sim! Oferecemos suporte completo durante toda a implementação, incluindo treinamento da equipe e acompanhamento dos primeiros meses.
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-2xl shadow-lg p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">
                🆓 Posso testar antes de contratar?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Claro! Oferecemos um teste gratuito sem limite de tempo para você conhecer todas as funcionalidades da plataforma.
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-2xl shadow-lg p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">
                💰 Qual o investimento necessário?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Oferecemos planos flexíveis que se adaptam ao tamanho da sua empresa. Comece grátis e evolua conforme sua necessidade.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-300 text-lg">
            💙 <strong className="text-white">Viral Lead</strong> - Transformando clientes em promotores da sua marca
          </p>
        </div>
      </div>
    </div>
  );
}
