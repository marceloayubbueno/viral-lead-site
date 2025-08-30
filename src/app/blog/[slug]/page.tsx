import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ShareButton from '@/components/ShareButton';
import MotionWrapper from '@/components/MotionWrapper';
import { BlogPost } from '../../../types/blog';
import { getPostBySlug } from '../../../utils/storage';
import { formatDate, formatRelativeDate } from '../../../utils/markdown';

// Função para gerar meta tags dinâmicas para cada post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post || !post.isPublished) {
    return {
      title: 'Post não encontrado | Blog Viral Lead',
      description: 'O post que você está procurando não existe ou não foi publicado ainda.',
    };
  }

  const postUrl = `https://virallead.com.br/blog/${post.slug}`;
  const postImage = post.coverImage || '/images/logo-branca.svg';

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.categories, ...post.tags, 'blog', 'marketing digital', 'viral lead'].join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: 'Viral Lead',
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [postImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

// Componente principal do post
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post || !post.isPublished) {
    notFound();
  }

  return (
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
              <div className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Usa as mesmas classes CSS compartilhadas
                    table: ({node, ...props}) => (
                      <div className="table-wrapper">
                        <table {...props} />
                      </div>
                    ),
                    th: ({node, ...props}) => (
                      <th {...props} />
                    ),
                    td: ({node, ...props}) => (
                      <td {...props} />
                    ),
                    h1: ({node, ...props}) => (
                      <h1 {...props} />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 {...props} />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 {...props} />
                    ),
                    ul: ({node, ...props}) => (
                      <ul {...props} />
                    ),
                    ol: ({node, ...props}) => (
                      <ol {...props} />
                    ),
                    li: ({node, ...props}) => (
                      <li {...props} />
                    ),
                    p: ({node, ...props}) => (
                      <p {...props} />
                    ),
                    strong: ({node, ...props}) => (
                      <strong {...props} />
                    ),
                    a: ({node, ...props}) => (
                      <a {...props} />
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

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

            {/* Navegação */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 group"
              >
                ← Ver Todos os Posts
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ModernFooter />
    </main>
  );
}
