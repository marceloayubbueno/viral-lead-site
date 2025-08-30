import { NextResponse } from 'next/server';

// Função para gerar sitemap básico (sem posts)
function generateBasicSitemap(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage - Prioridade Máxima -->
  <url>
    <loc>https://virallead.com.br/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog Principal -->
  <url>
    <loc>https://virallead.com.br/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Calculadora -->
  <url>
    <loc>https://virallead.com.br/calculadora</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Apresentação -->
  <url>
    <loc>https://virallead.com.br/apresentacao</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Teste Grátis -->
  <url>
    <loc>https://virallead.com.br/testegratis</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Chat -->
  <url>
    <loc>https://virallead.com.br/chat</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Privacidade -->
  <url>
    <loc>https://virallead.com.br/privacidade</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
}

// Função para gerar sitemap completo com posts
async function generateFullSitemap(): Promise<string> {
  try {
    // Tenta buscar posts da API
    const response = await fetch('https://virallead.com.br/api/posts');
    if (!response.ok) {
      console.warn('⚠️ API posts não disponível, retornando sitemap básico');
      return generateBasicSitemap();
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    if (posts.length === 0) {
      console.log('📁 Nenhum post encontrado, retornando sitemap básico');
      return generateBasicSitemap();
    }
    
    // Gera sitemap básico primeiro
    let sitemap = generateBasicSitemap();
    
    // Remove a tag de fechamento para adicionar posts
    sitemap = sitemap.replace('</urlset>', '');
    
    // Adiciona posts do blog dinamicamente
    posts.forEach((post: any) => {
      if (post.isPublished) {
        const postDate = new Date(post.publishedAt).toISOString().split('T')[0];
        const imageTag = post.coverImage ? `
    <image:image>
      <image:loc>${post.coverImage}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.description}</image:caption>
    </image:image>` : '';
        
        sitemap += `
  
  <!-- Post: ${post.title} -->
  <url>
    <loc>https://virallead.com.br/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <news:news>
      <news:publication>
        <news:name>Viral Lead Blog</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${post.publishedAt}</news:publication_date>
      <news:title>${post.title}</news:title>
      <news:keywords>${[...post.categories, ...post.tags].join(', ')}</news:keywords>
    </news:news>${imageTag}
  </url>`;
      }
    });
    
    // Fecha o sitemap
    sitemap += `
</urlset>`;
    
    console.log('✅ Sitemap completo gerado com', posts.length, 'posts');
    return sitemap;
    
  } catch (error) {
    console.warn('⚠️ Erro ao gerar sitemap completo, retornando básico:', error);
    return generateBasicSitemap();
  }
}

export async function GET() {
  try {
    // Sempre tenta gerar sitemap completo primeiro
    const sitemap = await generateFullSitemap();
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache por 1 hora
      },
    });
    
  } catch (error) {
    console.error('❌ Erro crítico ao gerar sitemap:', error);
    
    // Em caso de erro crítico, retorna sitemap básico
    const fallbackSitemap = generateBasicSitemap();
    
    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
