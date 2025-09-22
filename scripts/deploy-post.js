#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Função para converter HTML para Markdown simples
function htmlToMarkdown(html) {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
    })
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
      let counter = 1;
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`) + '\n';
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '') // Remove outras tags HTML
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Limpa espaços extras
    .trim();
}

// Função para gerar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Função para extrair título do HTML
function extractTitle(html) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }
  
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].replace(/<[^>]*>/g, '').trim();
  }
  
  return 'Post sem título';
}

// Função para extrair descrição do HTML
function extractDescription(html) {
  const metaMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
  if (metaMatch) {
    return metaMatch[1].trim();
  }
  
  // Tenta pegar primeiro parágrafo
  const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
  if (pMatch) {
    return pMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 160);
  }
  
  return 'Descrição do post';
}

// Função principal
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('❌ Uso: npm run deploy-post <arquivo.html>', colors.red);
    log('Exemplo: npm run deploy-post post-novo.html', colors.yellow);
    process.exit(1);
  }
  
  const htmlFile = args[0];
  const htmlPath = path.resolve(htmlFile);
  
  // Verificar se arquivo existe
  if (!fs.existsSync(htmlPath)) {
    log(`❌ Arquivo não encontrado: ${htmlFile}`, colors.red);
    process.exit(1);
  }
  
  try {
    log(`\n🚀 Iniciando deploy do post: ${htmlFile}`, colors.bold + colors.blue);
    
    // Ler arquivo HTML
    log('📖 Lendo arquivo HTML...', colors.blue);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Extrair dados
    log('🔍 Extraindo dados do HTML...', colors.blue);
    const title = extractTitle(htmlContent);
    const description = extractDescription(htmlContent);
    const slug = generateSlug(title);
    
    // Converter para Markdown
    log('🔄 Convertendo HTML para Markdown...', colors.blue);
    const markdownContent = htmlToMarkdown(htmlContent);
    
    // Gerar ID único
    const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Criar objeto do post
    const newPost = {
      id,
      title,
      slug,
      description,
      content: markdownContent,
      author: 'Marcelo Ayub',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categories: ['1'], // Marketing Digital por padrão
      tags: [],
      coverImage: '',
      isPublished: true,
      readTime: Math.ceil(markdownContent.split(' ').length / 200) // ~200 palavras por minuto
    };
    
    log(`✅ Post criado:`, colors.green);
    log(`   Título: ${title}`, colors.reset);
    log(`   Slug: ${slug}`, colors.reset);
    log(`   ID: ${id}`, colors.reset);
    log(`   Tamanho: ${markdownContent.length} caracteres`, colors.reset);
    
    // Ler posts.json existente
    const postsJsonPath = path.join(__dirname, '..', 'public', 'posts', 'posts.json');
    let postsData = { posts: [], lastUpdated: '', totalPosts: 0 };
    
    if (fs.existsSync(postsJsonPath)) {
      const existingContent = fs.readFileSync(postsJsonPath, 'utf8');
      postsData = JSON.parse(existingContent);
    }
    
    // Adicionar novo post
    postsData.posts.unshift(newPost); // Adiciona no início
    postsData.lastUpdated = new Date().toISOString();
    postsData.totalPosts = postsData.posts.length;
    
    // Salvar posts.json
    log('💾 Salvando posts.json...', colors.blue);
    fs.writeFileSync(postsJsonPath, JSON.stringify(postsData, null, 2), 'utf8');
    
    // Fazer commit automático
    log('📝 Fazendo commit automático...', colors.blue);
    try {
      execSync('git add public/posts/posts.json', { stdio: 'inherit' });
      execSync(`git commit -m "feat: adiciona post '${title}'"`, { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
      
      log('🎉 Deploy concluído com sucesso!', colors.bold + colors.green);
      log('📡 O post será publicado automaticamente na Vercel', colors.green);
      
    } catch (gitError) {
      log('⚠️ Erro no Git, mas o post foi salvo localmente:', colors.yellow);
      log('   Execute manualmente: git add . && git commit -m "feat: novo post" && git push', colors.yellow);
    }
    
  } catch (error) {
    log(`❌ Erro durante o deploy: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Executar
main();
