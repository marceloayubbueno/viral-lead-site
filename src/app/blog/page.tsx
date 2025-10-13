'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ChatBotWrapper from '@/components/ChatBotWrapper';
import { BlogPost } from '../../types/blog';
import { getPosts } from '../../utils/storage';
import { formatDate } from '../../utils/markdown';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        // Carrega posts publicados
        const allPosts = await getPosts();
        const publishedPosts = allPosts.filter((post: BlogPost) => post.isPublished);
        
        // Adiciona posts estáticos
        const staticPosts: BlogPost[] = [
          {
            id: "post_indique_e_ganhe_guia_completo_2025",
            title: "Indique e Ganhe: Guia Completo 2025",
            slug: "indique-e-ganhe-guia-completo-2025",
            description: "Descubra como criar um programa indique e ganhe que realmente funciona. Guia completo com estratégias, exemplos e ROI comprovado para empresários.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Vendas"],
            tags: ["Indique e Ganhe", "Programa de Indicação", "Marketing de Indicação", "Vendas", "Crescimento"],
            coverImage: "",
            isPublished: true,
            readTime: 12
          },
          {
            id: "post_marketing_boca_a_boca_guia_completo_2025",
            title: "Marketing Boca a Boca: Como Funciona na Prática 2025",
            slug: "marketing-boca-a-boca-guia-completo-2025",
            description: "Descubra como o marketing boca a boca pode multiplicar suas vendas. Guia completo com metodologia, casos reais e estratégias comprovadas para empresários.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Vendas"],
            tags: ["Marketing Boca a Boca", "Word of Mouth", "Indicações", "Crescimento", "Estratégia"],
            coverImage: "",
            isPublished: true,
            readTime: 14
          },
          {
            id: "post_member_get_member_mgm_guia_2025",
            title: "Member Get Member (MGM): Estratégia Definitiva 2025",
            slug: "member-get-member-mgm-guia-2025",
            description: "Descubra como implementar a estratégia MGM que transforma membros em recrutadores ativos. Guia completo com metodologia, casos reais e ROI comprovado.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Crescimento"],
            tags: ["Member Get Member", "MGM", "Crescimento", "Indicações", "Estratégia"],
            coverImage: "",
            isPublished: true,
            readTime: 15
          },
          {
            id: "post_alavancas_crescimento_empresarial_2025",
            title: "Alavancas de Crescimento Empresarial: Guia Completo 2025",
            slug: "alavancas-crescimento-empresarial-2025",
            description: "Descubra as alavancas de crescimento que multiplicam resultados. Guia completo com framework, casos reais e estratégias para escalar sua empresa.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Crescimento", "Estratégia"],
            tags: ["Alavancas de Crescimento", "Growth Hacking", "Estratégia", "Escalabilidade", "ROI"],
            coverImage: "",
            isPublished: true,
            readTime: 16
          },
          {
            id: "post_recompensas_programas_indicacao_2025",
            title: "Recompensas em Programas de Indicação: Guia Definitivo 2025",
            slug: "recompensas-programas-indicacao-2025",
            description: "Descubra como definir recompensas que realmente motivam indicações. Guia completo com tipos, cálculos, exemplos e estratégias comprovadas.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Estratégia"],
            tags: ["Recompensas", "Programa de Indicação", "Incentivos", "ROI", "Estratégia"],
            coverImage: "",
            isPublished: true,
            readTime: 13
          },
          {
            id: "post_como_pedir_indicacoes_clientes_2025",
            title: "Como Pedir Indicações aos Clientes: Guia Prático 2025",
            slug: "como-pedir-indicacoes-clientes-2025",
            description: "Descubra como pedir indicações sem ser invasivo. Guia completo com scripts, timing perfeito e técnicas comprovadas para aumentar indicações em 200%.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Vendas", "Relacionamento"],
            tags: ["Indicações", "Scripts de Vendas", "Relacionamento", "Conversão", "Técnicas"],
            coverImage: "",
            isPublished: true,
            readTime: 14
          },
          {
            id: "post_embaixadores_marca_como_criar_2025",
            title: "Embaixadores de Marca: Como Criar Programa Eficaz 2025",
            slug: "embaixadores-marca-como-criar-2025",
            description: "Descubra como criar programa de embaixadores que multiplica vendas. Guia completo com seleção, ativação, engajamento e casos reais de sucesso.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Relacionamento"],
            tags: ["Embaixadores de Marca", "Brand Ambassadors", "Comunidade", "Engajamento", "Advocacy"],
            coverImage: "",
            isPublished: true,
            readTime: 15
          },
          {
            id: "post_promotores_engajar_ativar_2025",
            title: "Promotores: Como Engajar e Ativar para Vendas 2025",
            slug: "promotores-engajar-ativar-2025",
            description: "Descubra como identificar, engajar e ativar promotores que multiplicam suas vendas. Guia completo com metodologia NPS, estratégias e casos reais.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "NPS"],
            tags: ["Promotores", "NPS", "Engajamento", "Advocacy", "Indicações"],
            coverImage: "",
            isPublished: true,
            readTime: 13
          },
          {
            id: "post_ia_marketing_indicacao_2025",
            title: "IA para Marketing de Indicação: Guia Completo 2025",
            slug: "ia-marketing-indicacao-2025",
            description: "Descubra como usar Inteligência Artificial para multiplicar indicações. Guia completo com aplicações práticas, ferramentas e casos de sucesso.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Tecnologia", "Inovação"],
            tags: ["Inteligência Artificial", "IA", "Automação", "Inovação", "Tecnologia"],
            coverImage: "",
            isPublished: true,
            readTime: 14
          },
          {
            id: "post_tendencias_marketing_indicacao_2025",
            title: "Tendências de Marketing de Indicação 2025",
            slug: "tendencias-marketing-indicacao-2025",
            description: "Descubra as 10 principais tendências de marketing de indicação para 2025. Guia completo com previsões, dados e estratégias para se manter à frente.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Tendências", "Inovação"],
            tags: ["Tendências 2025", "Inovação", "Futuro", "Marketing Digital", "Estratégia"],
            coverImage: "",
            isPublished: true,
            readTime: 13
          },
          {
            id: "post_ferramentas_marketing_indicacao_top_20_2025",
            title: "Ferramentas de Marketing de Indicação: Top 20 em 2025",
            slug: "ferramentas-marketing-indicacao-top-20-2025",
            description: "Descubra as 20 melhores ferramentas de marketing de indicação. Comparativo completo com preços, recursos, prós e contras para escolher a ideal.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Ferramentas", "Tecnologia"],
            tags: ["Ferramentas", "Software", "Plataformas", "Tecnologia", "Comparativo"],
            coverImage: "",
            isPublished: true,
            readTime: 16
          },
          {
            id: "post_automacao_programas_indicacao_2025",
            title: "Automação em Programas de Indicação: Guia Completo 2025",
            slug: "automacao-programas-indicacao-2025",
            description: "Descubra como automatizar seu programa de indicação e escalar sem aumentar equipe. Guia completo com workflows, ferramentas e casos de sucesso.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Automação", "Tecnologia"],
            tags: ["Automação", "Workflows", "Eficiência", "Escalabilidade", "Tecnologia"],
            coverImage: "",
            isPublished: true,
            readTime: 14
          },
          {
            id: "post_lgpd_marketing_indicacao_guia_2025",
            title: "LGPD e Marketing de Indicação: Guia Prático 2025",
            slug: "lgpd-marketing-indicacao-guia-2025",
            description: "Descubra como fazer marketing de indicação em compliance com LGPD. Guia completo com boas práticas, templates e checklist de conformidade.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Compliance", "Legal"],
            tags: ["LGPD", "Privacidade", "Compliance", "Legal", "Proteção de Dados"],
            coverImage: "",
            isPublished: true,
            readTime: 14
          },
          {
            id: "post_estrategias_indicacao_clientes_2025",
            title: "Estratégias de Indicação de Clientes: Guia Definitivo 2025",
            slug: "estrategias-indicacao-clientes-2025",
            description: "Descubra as melhores estratégias de indicação de clientes que estão revolucionando o marketing digital. Guia completo com casos reais e ROI de 8:1.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Estratégias de Vendas"],
            tags: ["Indicação de Clientes", "Marketing Digital", "Estratégias de Vendas", "Crescimento Empresarial", "ROI"],
            coverImage: "",
            isPublished: true,
            readTime: 12
          },
          {
            id: "post_marketing_indicacao_guia_completo_2025",
            title: "Marketing de Indicação: Guia Completo 2025",
            slug: "marketing-indicacao-guia-completo-2025",
            description: "Descubra como implementar marketing de indicação que gera 3x mais vendas. Guia prático com casos reais, ROI de 5:1 e estratégias comprovadas.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Vendas"],
            tags: ["Marketing de Indicação", "Referral", "Vendas", "Crescimento", "ROI"],
            coverImage: "",
            isPublished: true,
            readTime: 10
          },
          {
            id: "post_sistema_indicacoes_guia_completo_2025",
            title: "Sistema de Indicações: Guia Completo 2025",
            slug: "sistema-indicacoes-guia-completo-2025",
            description: "Aprenda como criar um sistema de indicações que transforma clientes em vendedores. Guia prático com ferramentas, métricas e casos reais de sucesso.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Vendas"],
            tags: ["Sistema de Indicações", "Referral", "Vendas", "Crescimento", "ROI"],
            coverImage: "",
            isPublished: true,
            readTime: 8
          },
          {
            id: "post_referral_marketing_como_funciona_2025",
            title: "Referral Marketing: Como Funciona na Prática 2025",
            slug: "referral-marketing-como-funciona-2025",
            description: "Entenda como o referral marketing funciona na prática e como implementar em sua empresa. Estratégias comprovadas para transformar clientes em vendedores.",
            content: "",
            author: "Marcelo Ayub",
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            categories: ["Marketing Digital", "Vendas"],
            tags: ["Referral Marketing", "Indicações", "Vendas", "Crescimento", "ROI"],
            coverImage: "",
            isPublished: true,
            readTime: 9
          }
        ];
        
        // Combina posts dinâmicos com posts estáticos
        const allPostsCombined = [...staticPosts, ...publishedPosts];
        setPosts(allPostsCombined);
        setFilteredPosts(allPostsCombined);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

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
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </div>

        <div className="container relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Headline */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Blog{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Viral Lead</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Conteúdo exclusivo sobre marketing digital, tecnologia e estratégias de negócio. 
              Aprenda com especialistas e descubra como transformar clientes em indicadores poderosos.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="bg-gray-900 py-24">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {posts.length === 0 ? 'Nenhum post publicado ainda' : 'Nenhum post encontrado'}
              </h3>
              <p className="text-gray-400 text-lg">
                {posts.length === 0 
                  ? 'Os posts aparecerão aqui assim que forem publicados.' 
                  : 'Tente ajustar os filtros de busca.'
                }
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article 
                  key={post.id} 
                  className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition-all duration-300 group border border-gray-700 hover:border-blue-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Imagem de Capa */}
                  {post.coverImage && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="p-6">
                    {/* Categorias */}
                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map(category => (
                          <span
                            key={category}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Título */}
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Descrição */}
                    <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>

                    {/* Meta Informações */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>Por {post.author}</span>
                        <span>•</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <span className="text-blue-400 font-medium">{post.readTime} min</span>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Botão Ler Mais */}
                    <div className="mt-6">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 group"
                      >
                        Ler mais
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
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
