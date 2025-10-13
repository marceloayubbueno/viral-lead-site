'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ChatBotWrapper from '@/components/ChatBotWrapper';
import BlogCategorySection from '@/components/BlogCategorySection';
import { BlogPost } from '../../types/blog';
import { getPosts } from '../../utils/storage';
import { formatDate } from '../../utils/markdown';
import { 
  Newspaper, 
  Target, 
  TrendingUp, 
  Gift, 
  Bot, 
  Settings, 
  BarChart3, 
  Shield
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para categorizar posts
  const categorizePosts = (allPosts: BlogPost[]) => {
    const categories = {
      vendas: allPosts.filter(post => 
        post.categories.some(cat => 
          ['Vendas', 'Marketing Digital'].includes(cat)
        ) || 
        post.tags.some(tag => 
          ['Indicação de Clientes', 'Marketing de Indicação', 'Referral', 'Vendas', 'Marketing Boca a Boca'].includes(tag)
        )
      ),
      
      crescimento: allPosts.filter(post => 
        post.categories.some(cat => 
          ['Crescimento', 'Estratégia'].includes(cat)
        ) || 
        post.tags.some(tag => 
          ['Alavancas de Crescimento', 'Member Get Member', 'MGM', 'Embaixadores de Marca', 'Promotores', 'Escalabilidade'].includes(tag)
        )
      ),
      
      recompensas: allPosts.filter(post => 
        post.tags.some(tag => 
          ['Recompensas', 'Indique e Ganhe', 'Programa de Indicação', 'Incentivos'].includes(tag)
        )
      ),
      
      ia: allPosts.filter(post => 
        post.categories.some(cat => 
          ['Tecnologia', 'Inovação'].includes(cat)
        ) || 
        post.tags.some(tag => 
          ['Inteligência Artificial', 'IA', 'Automação', 'Tendências 2025', 'Inovação', 'Tecnologia'].includes(tag)
        )
      ),
      
      automacao: allPosts.filter(post => 
        post.categories.some(cat => 
          ['Automação', 'Tecnologia'].includes(cat)
        ) || 
        post.tags.some(tag => 
          ['Automação', 'Workflows', 'Eficiência', 'Ferramentas', 'Software', 'Plataformas'].includes(tag)
        )
      ),
      
      marketingDigital: allPosts.filter(post => 
        post.categories.some(cat => 
          ['Marketing Digital'].includes(cat)
        ) || 
        post.tags.some(tag => 
          ['Marketing Digital', 'Estratégias de Vendas', 'Growth Hacking'].includes(tag)
        )
      ),
      
      gestao: allPosts.filter(post => 
        post.categories.some(cat => 
          ['Compliance', 'Legal'].includes(cat)
        ) || 
        post.tags.some(tag => 
          ['LGPD', 'Privacidade', 'Compliance', 'Legal', 'Proteção de Dados'].includes(tag)
        )
      )
    };

    return categories;
  };

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
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Categorizar posts
  const categorizedPosts = categorizePosts(posts);
  const recentPosts = posts.slice(0, 6); // Últimos 6 posts

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

      {/* Posts Mais Recentes */}
      <BlogCategorySection
        title="Posts Mais Recentes"
        subtitle="Últimos conteúdos publicados no blog Viral Lead"
        posts={recentPosts}
        icon={Newspaper}
        color="bg-gradient-to-r from-blue-600 to-cyan-600"
        maxPosts={3}
      />

      {/* Vendas & Indicações */}
      <BlogCategorySection
        title="VENDAS"
        subtitle="Vendas por Indicação"
        posts={categorizedPosts.vendas}
        icon={Target}
        color="bg-gradient-to-r from-red-600 to-pink-600"
        maxPosts={3}
      />

      {/* Crescimento & Escala */}
      <BlogCategorySection
        title="CRESCIMENTO"
        subtitle="Alavancas de Crescimento"
        posts={categorizedPosts.crescimento}
        icon={TrendingUp}
        color="bg-gradient-to-r from-green-600 to-emerald-600"
        maxPosts={3}
      />

      {/* Recompensas & Incentivos */}
      <BlogCategorySection
        title="RECOMPENSAS"
        subtitle="Recompensas e Incentivos"
        posts={categorizedPosts.recompensas}
        icon={Gift}
        color="bg-gradient-to-r from-yellow-600 to-orange-600"
        maxPosts={3}
      />

      {/* IA & Tecnologia */}
      <BlogCategorySection
        title="IA & TECNOLOGIA"
        subtitle="Inteligência Artificial e Inovação"
        posts={categorizedPosts.ia}
        icon={Bot}
        color="bg-gradient-to-r from-purple-600 to-indigo-600"
        maxPosts={3}
      />

      {/* Automação & Ferramentas */}
      <BlogCategorySection
        title="AUTOMAÇÃO"
        subtitle="Automação e Ferramentas"
        posts={categorizedPosts.automacao}
        icon={Settings}
        color="bg-gradient-to-r from-teal-600 to-cyan-600"
        maxPosts={3}
      />

      {/* Marketing Digital */}
      <BlogCategorySection
        title="MARKETING DIGITAL"
        subtitle="Estratégias de Marketing Digital"
        posts={categorizedPosts.marketingDigital}
        icon={BarChart3}
        color="bg-gradient-to-r from-indigo-600 to-purple-600"
        maxPosts={3}
      />

      {/* Gestão & Compliance */}
      <BlogCategorySection
        title="GESTÃO"
        subtitle="Gestão e Compliance"
        posts={categorizedPosts.gestao}
        icon={Shield}
        color="bg-gradient-to-r from-gray-600 to-slate-600"
        maxPosts={3}
      />

      <ModernFooter />
      <ChatBotWrapper />
    </main>
  );
}
