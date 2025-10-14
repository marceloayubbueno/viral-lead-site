/**
 * Script para gerar sitemap.xml automaticamente
 * Extrai posts do staticPosts e gera XML completo
 */

const fs = require('fs');
const path = require('path');

// Lista de posts (extraída de src/app/blog/page.tsx)
const posts = [
  { slug: 'estrategias-indicacao-clientes-2025', title: 'Estratégias de Indicação de Clientes', date: '2025-01-27' },
  { slug: 'marketing-indicacao-guia-completo-2025', title: 'Marketing de Indicação: Guia Completo', date: '2025-01-27' },
  { slug: 'sistema-indicacoes-guia-completo-2025', title: 'Sistema de Indicações: Guia Completo', date: '2025-01-27' },
  { slug: 'referral-marketing-como-funciona-2025', title: 'Referral Marketing: Como Funciona', date: '2025-01-27' },
  { slug: 'indique-e-ganhe-guia-completo-2025', title: 'Indique e Ganhe: Guia Completo', date: '2025-10-14' },
  { slug: 'marketing-boca-a-boca-guia-completo-2025', title: 'Marketing Boca a Boca: Guia Completo', date: '2025-10-14' },
  { slug: 'member-get-member-mgm-guia-2025', title: 'Member Get Member (MGM): Guia 2025', date: '2025-10-14' },
  { slug: 'alavancas-crescimento-empresarial-2025', title: 'Alavancas de Crescimento Empresarial', date: '2025-10-14' },
  { slug: 'recompensas-programas-indicacao-2025', title: 'Recompensas para Programas de Indicação', date: '2025-10-14' },
  { slug: 'como-pedir-indicacoes-clientes-2025', title: 'Como Pedir Indicações de Clientes', date: '2025-10-14' },
  { slug: 'embaixadores-marca-como-criar-2025', title: 'Embaixadores de Marca: Como Criar', date: '2025-10-14' },
  { slug: 'promotores-engajar-ativar-2025', title: 'Como Engajar e Ativar Promotores', date: '2025-10-14' },
  { slug: 'ia-marketing-indicacao-2025', title: 'IA no Marketing de Indicação', date: '2025-10-14' },
  { slug: 'tendencias-marketing-indicacao-2025', title: 'Tendências do Marketing de Indicação 2025', date: '2025-10-14' },
  { slug: 'ferramentas-marketing-indicacao-top-20-2025', title: 'Top 20 Ferramentas de Marketing de Indicação', date: '2025-10-14' },
  { slug: 'automacao-programas-indicacao-2025', title: 'Automação de Programas de Indicação', date: '2025-10-14' },
  { slug: 'lgpd-marketing-indicacao-guia-2025', title: 'LGPD e Marketing de Indicação: Guia 2025', date: '2025-10-14' }
];

// Categorias
const categories = [
  'vendas',
  'crescimento',
  'recompensas',
  'ia',
  'automacao',
  'marketing-digital',
  'gestao',
  'ferramentas'
];

// Data atual
const currentDate = new Date().toISOString().split('T')[0];

// Gerar XML
function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- ========================================
       PÁGINAS PRINCIPAIS
       ======================================== -->
  
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
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Calculadora -->
  <url>
    <loc>https://virallead.com.br/calculadora</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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
    <priority>0.8</priority>
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
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- ========================================
       PÁGINAS DE CATEGORIAS DO BLOG
       ======================================== -->
`;

  // Adicionar categorias
  categories.forEach(cat => {
    xml += `
  <!-- Categoria: ${cat} -->
  <url>
    <loc>https://virallead.com.br/blog/categoria/${cat}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  xml += `
  <!-- ========================================
       POSTS DO BLOG
       ======================================== -->
`;

  // Adicionar posts
  posts.forEach(post => {
    xml += `
  <!-- Post: ${post.title} -->
  <url>
    <loc>https://virallead.com.br/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  xml += `
</urlset>`;

  return xml;
}

// Salvar arquivo
function saveSitemap() {
  const xml = generateSitemap();
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  
  fs.writeFileSync(outputPath, xml, 'utf-8');
  
  console.log('✅ Sitemap gerado com sucesso!');
  console.log(`📁 Localização: ${outputPath}`);
  console.log(`📊 Estatísticas:`);
  console.log(`   - 7 páginas principais`);
  console.log(`   - ${categories.length} páginas de categorias`);
  console.log(`   - ${posts.length} posts do blog`);
  console.log(`   - TOTAL: ${7 + categories.length + posts.length} URLs`);
  console.log(`📅 Data de atualização: ${currentDate}`);
}

// Executar
saveSitemap();

