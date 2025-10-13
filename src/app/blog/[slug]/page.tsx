'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ShareButton from '@/components/ShareButton';
import ChatBotWrapper from '@/components/ChatBotWrapper';
import MarkdownWithCTA from '@/components/MarkdownWithCTA';
import { BlogPost } from '../../../types/blog';
import { getPostBySlug } from '../../../utils/storage';
import { formatDate, formatRelativeDate } from '../../../utils/markdown';
import Head from 'next/head';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (params.slug) {
        try {
          setIsLoading(true);
          const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
          const foundPost = await getPostBySlug(slug);
          
          if (foundPost && foundPost.isPublished) {
            setPost(foundPost);
          } else {
            setError('Post não encontrado ou não publicado');
          }
        } catch (error) {
          console.error('Erro ao carregar post:', error);
          setError('Erro ao carregar post');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPost();
  }, [params.slug]);

  if (isLoading) {
    return (
      <main className="overflow-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Carregando post...</p>
          </div>
        </div>
        <ModernFooter />
        <ChatBotWrapper />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="overflow-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center pt-32">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {error || 'Post não encontrado'}
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              O post que você está procurando não existe ou não foi publicado ainda.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              ← Voltar ao Blog
            </Link>
          </div>
        </div>
        <ModernFooter />
        <ChatBotWrapper />
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog Viral Lead</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://virallead.com.br/blog/${post.slug}`} />
        <meta property="og:image" content={post.coverImage || '/images/logo-branca.svg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.coverImage || '/images/logo-branca.svg'} />
      </Head>
      
      <main className="overflow-hidden">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-32 pb-24">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full opacity-20 blur-3xl"
            ></div>
            <div 
              className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-full opacity-30 blur-3xl"
            ></div>
          </div>

          <div className="container relative">
            {/* Breadcrumb */}
            <nav 
              className="flex mb-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link
                      href="/blog"
                      className="ml-4 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Blog
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-white font-medium truncate max-w-xs">
                      {post.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Header do Post */}
            <div 
              className="text-center max-w-4xl mx-auto"
            >
              {/* Categorias */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {post.categories.map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Título */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Descrição */}
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {post.description}
              </p>

              {/* Meta Informações */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Por {post.author}
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {post.readTime} min de leitura
                </div>
              </div>

              {/* Data Relativa */}
              <div className="mt-4 text-sm text-gray-500">
                {formatRelativeDate(post.publishedAt)}
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo Principal */}
        <section className="bg-gray-900 py-24">
          <div className="px-4 sm:px-6 lg:px-8">
            <div 
              className="w-full"
            >
              {/* Imagem de Capa */}
              {post.coverImage && (
                <div className="mb-12 rounded-2xl overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Conteúdo do Post */}
              <article className="bg-gray-800 rounded-2xl p-8 border border-gray-700 w-full">
                <MarkdownWithCTA 
                  content={post.content} 
                  postTitle={post.title}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compartilhamento */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Compartilhar</h3>
                  <div className="flex space-x-4">
                    <ShareButton 
                      title={post.title}
                      description={post.description}
                      url={`https://virallead.com.br/blog/${post.slug}`}
                    />
                  </div>
                </div>
              </article>

              {/* CTA Final */}
              <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pronto para Transformar sua Empresa?
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Implemente um programa de indicações que realmente funciona e veja seus clientes se tornarem seus melhores vendedores.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/testegratis"
                      className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 group"
                    >
                      Começar Teste Grátis
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/chat"
                      className="inline-flex items-center px-8 py-4 border border-blue-500/50 text-lg font-medium rounded-xl text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all duration-200 group"
                    >
                      Agendar Consultoria
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Navegação */}
              <div className="mt-8 flex justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 group"
                >
                  ← Ver Todos os Posts
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ModernFooter />
        <ChatBotWrapper />
      </main>
    </>
  );
}
