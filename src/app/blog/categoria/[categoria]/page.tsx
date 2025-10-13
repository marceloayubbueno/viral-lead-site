'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ChatBotWrapper from '@/components/ChatBotWrapper';
import { BlogPost } from '../../../../types/blog';
import { getPosts } from '../../../../utils/storage';
import { formatDate } from '../../../../utils/markdown';
import { 
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight
} from 'lucide-react';

// Mapeamento de categorias para configurações
const categoryConfig = {
  'vendas': {
    title: 'VENDAS',
    subtitle: 'Vendas por Indicação',
    icon: '🎯',
    color: 'bg-gradient-to-r from-red-600 to-pink-600',
    description: 'Estratégias e técnicas para aumentar vendas através de indicações de clientes satisfeitos.'
  },
  'crescimento': {
    title: 'CRESCIMENTO',
    subtitle: 'Alavancas de Crescimento',
    icon: '⚡',
    color: 'bg-gradient-to-r from-green-600 to-emerald-600',
    description: 'Como escalar seu negócio usando alavancas de crescimento comprovadas.'
  },
  'recompensas': {
    title: 'RECOMPENSAS',
    subtitle: 'Recompensas e Incentivos',
    icon: '💰',
    color: 'bg-gradient-to-r from-yellow-600 to-orange-600',
    description: 'Como criar programas de recompensas que motivam indicações.'
  },
  'ia-tecnologia': {
    title: 'IA & TECNOLOGIA',
    subtitle: 'Inteligência Artificial e Inovação',
    icon: '🤖',
    color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    description: 'Tendências e aplicações de IA no marketing de indicação.'
  },
  'automacao': {
    title: 'AUTOMAÇÃO',
    subtitle: 'Automação e Ferramentas',
    icon: '⚙️',
    color: 'bg-gradient-to-r from-teal-600 to-cyan-600',
    description: 'Ferramentas e processos para automatizar programas de indicação.'
  },
  'marketing-digital': {
    title: 'MARKETING DIGITAL',
    subtitle: 'Estratégias de Marketing Digital',
    icon: '📈',
    color: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    description: 'Estratégias digitais para maximizar resultados de indicação.'
  },
  'gestao': {
    title: 'GESTÃO',
    subtitle: 'Gestão e Compliance',
    icon: '🛡️',
    color: 'bg-gradient-to-r from-gray-600 to-slate-600',
    description: 'Boas práticas de gestão e compliance em programas de indicação.'
  }
};

export default function CategoriaPage() {
  const params = useParams();
  const categoria = params.categoria as string;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const config = categoryConfig[categoria as keyof typeof categoryConfig];

  // Função para filtrar posts por categoria
  const filterPostsByCategory = (allPosts: BlogPost[], category: string) => {
    const categoryMapping = {
      'vendas': ['Vendas', 'Marketing Digital', 'Indicação de Clientes', 'Marketing de Indicação', 'Referral', 'Marketing Boca a Boca'],
      'crescimento': ['Crescimento', 'Estratégia', 'Alavancas de Crescimento', 'Member Get Member', 'MGM', 'Embaixadores de Marca', 'Promotores', 'Escalabilidade'],
      'recompensas': ['Recompensas', 'Indique e Ganhe', 'Programa de Indicação', 'Incentivos'],
      'ia-tecnologia': ['Tecnologia', 'Inovação', 'Inteligência Artificial', 'IA', 'Automação', 'Tendências 2025', 'Inovação', 'Tecnologia'],
      'automacao': ['Automação', 'Tecnologia', 'Automação', 'Workflows', 'Eficiência', 'Ferramentas', 'Software', 'Plataformas'],
      'marketing-digital': ['Marketing Digital', 'Marketing Digital', 'Estratégias de Vendas', 'Growth Hacking'],
      'gestao': ['Compliance', 'Legal', 'LGPD', 'Privacidade', 'Compliance', 'Legal', 'Proteção de Dados']
    };

    const keywords = categoryMapping[category as keyof typeof categoryMapping] || [];
    
    return allPosts.filter(post => 
      post.categories.some(cat => keywords.includes(cat)) || 
      post.tags.some(tag => keywords.includes(tag))
    );
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const allPosts = await getPosts();
        const publishedPosts = allPosts.filter((post: BlogPost) => post.isPublished);
        
        // Adiciona posts estáticos (mesmo array da página principal)
        const staticPosts: BlogPost[] = [
          // ... (mesmo array de posts estáticos da página principal)
        ];
        
        const allPostsCombined = [...staticPosts, ...publishedPosts];
        const filteredPosts = filterPostsByCategory(allPostsCombined, categoria);
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoria) {
      loadPosts();
    }
  }, [categoria]);

  if (!config) {
    return (
      <main className="overflow-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Categoria não encontrada</h1>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300">
              Voltar ao blog
            </Link>
          </div>
        </div>
        <ModernFooter />
        <ChatBotWrapper />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="overflow-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Carregando posts...</p>
          </div>
        </div>
        <ModernFooter />
        <ChatBotWrapper />
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="container relative">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Início</Link></li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/blog" className="ml-4 text-gray-400 hover:text-white transition-colors duration-200">Blog</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-white font-medium">{config.title}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-2xl ${config.color} flex items-center justify-center mr-6 shadow-lg`}>
                <span className="text-2xl">{config.icon}</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{config.title}</h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">{config.description}</p>
            <div className="text-sm text-gray-400">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} encontrado{posts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Todos os Posts</h2>
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nenhum post encontrado</h3>
              <p className="text-gray-600 text-lg">Não há posts nesta categoria ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="p-6">
                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Descrição */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>

                    {/* Link */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className={`inline-flex items-center px-6 py-3 rounded-xl font-medium text-white ${config.color} hover:opacity-90 transition-all duration-200 group-hover:scale-105`}
                    >
                      Ler Post
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ModernFooter />
      <ChatBotWrapper />
    </main>
  );
}
