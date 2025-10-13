# 📝 Guia para Criar Novos Posts de Blog

## 🤖 **PROMPT ESTRUTURADO PARA IA**

### **📋 PROMPT ÚNICO COMPLETO:**
```
TRANSFORME O TEXTO ABAIXO EM UM POST DE BLOG ÚNICO SEGUINDO EXATAMENTE ESTAS REGRAS:

**REQUISITOS OBRIGATÓRIOS:**
1. **100% ÚNICO**: Nenhuma frase idêntica ao original
2. **Linguagem**: Simples e clara para empresários
3. **Estrutura**: MESCLADA (texto corrido + tópicos)
4. **SEO**: Otimizado para ranking em IA
5. **Exemplos**: Casos reais únicos (não copie do original)
6. **Foco**: B2B conforme solicitado

**TÉCNICAS DE TRANSFORMAÇÃO:**
- Mude TODAS as frases do original
- Use sinônimos e estruturas diferentes
- Crie exemplos únicos de empresários reais
- Mantenha o tema mas mude a abordagem
- Foque em benefícios diferentes
- Use linguagem mais simples

**ESTRUTURA OBRIGATÓRIA:**
- **Introdução**: Texto corrido com problema diferente
- **Seções**: Misture texto corrido com tópicos
- **Exemplos**: Casos reais únicos (João, Maria, Carlos, etc.)
- **Conclusão**: Texto corrido com call-to-action único

**ESTRUTURA TÉCNICA:**
- **Título**: [TEMA] + "Guia Completo 2025" + "| Viral Lead"
- **Slug**: título-em-minúsculas-com-hífens
- **Descrição**: Máximo 160 caracteres, foco em benefícios
- **Categorias**: ["Marketing Digital", "Vendas"] ou similares
- **Tags**: 5 tags relevantes
- **Tempo de Leitura**: Calcular baseado no conteúdo

**EXEMPLO DE TRANSFORMAÇÃO:**
ORIGINAL: "Member Get Member é uma estratégia..."
TRANSFORMADO: "Programas de indicação funcionam quando..."

**CRIE O ARQUIVO:** `src/app/blog/[slug]/page.tsx`
**ADICIONE O CARD:** Em `src/app/blog/page.tsx`

**RESULTADO ESPERADO:**
- Texto 100% único e original
- Mesmo tema, abordagem completamente diferente
- Linguagem simples para empresários
- Estrutura mesclada (texto corrido + tópicos)
- Exemplos únicos de casos reais
- SEO otimizado para IA

**TEXTO PARA TRANSFORMAR:**
[COLE O TEXTO AQUI]
```

---

## 🎯 **Objetivo**
Este documento serve como guia para a IA gerar novos posts de blog seguindo o padrão estabelecido no sistema.

---

## 🚀 **PASSO A PASSO COMPLETO**

### **1. Criar Nova Página do Post**
- **Localização**: `src/app/blog/[slug]/page.tsx`
- **Exemplo**: `src/app/blog/meu-novo-post/page.tsx`

### **2. Estrutura da Página**
```typescript
'use client';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import ModernFooter from '@/components/ModernFooter';
import ShareButton from '@/components/ShareButton';
import { formatDate } from '../../../utils/markdown';
import Head from 'next/head';

export default function MeuNovoPostPage() {
  const post = {
    title: "TÍTULO DO POST",
    slug: "slug-do-post",
    description: "Descrição do post para SEO",
    content: `# Título do Post

Conteúdo em Markdown aqui...

## Subtítulo

- Lista de itens
- Mais itens

### Sub-subtítulo

Parágrafo com texto.

[Link para site](https://virallead.com.br)`,
    author: "Marcelo Ayub",
    publishedAt: new Date().toISOString(),
    categories: ["Categoria Principal"],
    tags: ["tag1", "tag2", "tag3"],
    coverImage: "",
    readTime: 3 // Calcular baseado no conteúdo
  };

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
            </div>
          </div>
        </section>

        {/* Conteúdo Principal */}
        <section className="bg-gray-900 py-24">
          <div className="px-4 sm:px-6 lg:px-8">
            <div 
              className="w-full"
            >
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
    </>
  );
}
```

### **3. Adicionar Card na Página de Blog**
- **Arquivo**: `src/app/blog/page.tsx`
- **Localização**: Dentro do `useEffect`, adicionar o novo post ao array

```typescript
// Adiciona novo post estático
const novoPost: BlogPost = {
  id: "post_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
  title: "TÍTULO DO POST",
  slug: "slug-do-post",
  description: "Descrição do post para SEO",
  content: "",
  author: "Marcelo Ayub",
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categories: ["Categoria Principal"],
  tags: ["tag1", "tag2", "tag3"],
  coverImage: "",
  isPublished: true,
  readTime: 3
};

// Combina posts dinâmicos com post estático
const allPostsCombined = [novoPost, ...publishedPosts];
```

---

## 📋 **CAMPOS OBRIGATÓRIOS**

### **Metadados do Post:**
- **title**: Título do post (aparece no card e na página)
- **slug**: URL amigável (ex: "meu-novo-post")
- **description**: Descrição para SEO (máximo 160 caracteres)
- **content**: Conteúdo em Markdown
- **author**: Sempre "Marcelo Ayub"
- **publishedAt**: Data atual em ISO
- **categories**: Array com categorias (ex: ["Marketing Digital"])
- **tags**: Array com tags (ex: ["SEO", "Blog"])
- **readTime**: Tempo estimado de leitura em minutos

---

## 🎨 **FORMATAÇÃO DO CONTEÚDO**

### **Markdown Suportado:**
- **Títulos**: `#`, `##`, `###`
- **Listas**: `- item` ou `1. item`
- **Links**: `[texto](url)`
- **Negrito**: `**texto**`
- **Itálico**: `*texto*`
- **Código**: `` `código` ``

### **Exemplo de Conteúdo:**
```markdown
# Título Principal

Introdução do post...

## Subtítulo

- Item da lista
- Outro item

### Sub-subtítulo

Parágrafo com texto normal.

[Link para site](https://virallead.com.br)
```

---

## 🚀 **PROCESSO COMPLETO**

### **Para a IA Criar um Novo Post:**

1. **Definir tema e título**
2. **Gerar slug** (título em minúsculas, espaços por hífens)
3. **Criar descrição** para SEO
4. **Escrever conteúdo** em Markdown
5. **Definir categorias e tags**
6. **Calcular tempo de leitura**
7. **Criar arquivo** `src/app/blog/[slug]/page.tsx`
8. **Adicionar card** em `src/app/blog/page.tsx`
9. **Testar** localmente
10. **Deploy** automático

---

## ✅ **CHECKLIST DE VALIDAÇÃO**

- [ ] Título claro e atrativo
- [ ] Slug único e amigável
- [ ] Descrição otimizada para SEO
- [ ] Conteúdo em Markdown válido
- [ ] Categorias relevantes
- [ ] Tags apropriadas
- [ ] Tempo de leitura calculado
- [ ] Arquivo criado no local correto
- [ ] Card adicionado na página de blog
- [ ] Links funcionando
- [ ] SEO completo

---

## 🎯 **EXEMPLO PRÁTICO**

### **Tema**: "Como Otimizar SEO para Blog"

### **Dados do Post:**
```typescript
{
  title: "Como Otimizar SEO para Blog em 2025",
  slug: "como-otimizar-seo-para-blog-em-2025",
  description: "Guia completo com estratégias práticas para otimizar SEO do seu blog e aumentar o tráfego orgânico.",
  categories: ["SEO", "Marketing Digital"],
  tags: ["SEO", "Blog", "Otimização", "Tráfego"],
  readTime: 5
}
```

### **Arquivo**: `src/app/blog/como-otimizar-seo-para-blog-em-2025/page.tsx`

---

**Status**: ✅ Documento completo para criação de novos posts! 🚀
