import { NextResponse } from 'next/server';
import { getPosts } from '../../../utils/storage';

export async function GET() {
  try {
    // Obtém todos os posts publicados
    const posts = getPosts().filter(post => post.isPublished);
    
    // Data atual para lastmod
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Constrói o XML do sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
  </url>`;

    // Adiciona posts do blog dinamicamente com informações detalhadas
    posts.forEach(post => {
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
    });

    sitemap += `
</urlset>`;

    // Retorna o sitemap com headers corretos
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache por 1 hora
      },
    });

  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    
    // Em caso de erro, retorna sitemap básico
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://virallead.com.br/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
