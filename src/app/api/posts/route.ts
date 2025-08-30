import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost } from '../../../types/blog';

const POSTS_FILE_PATH = path.join(process.cwd(), 'public', 'posts', 'posts.json');

// Função para validar estrutura do BlogPost
function validateBlogPost(post: any): post is BlogPost {
  return (
    typeof post === 'object' &&
    typeof post.id === 'string' &&
    typeof post.title === 'string' &&
    typeof post.slug === 'string' &&
    typeof post.description === 'string' &&
    typeof post.content === 'string' &&
    typeof post.author === 'string' &&
    Array.isArray(post.categories) &&
    Array.isArray(post.tags) &&
    typeof post.isPublished === 'boolean' &&
    typeof post.publishedAt === 'string' &&
    typeof post.readTime === 'number'
  );
}

// Função para validar slug único
function validateUniqueSlugs(posts: BlogPost[]): { isValid: boolean; error?: string } {
  const slugs = posts.map(p => p.slug);
  const uniqueSlugs = new Set(slugs);
  
  if (slugs.length !== uniqueSlugs.size) {
    return { isValid: false, error: 'Slugs duplicados encontrados' };
  }
  
  return { isValid: true };
}

// Função para validar IDs únicos
function validateUniqueIds(posts: BlogPost[]): { isValid: boolean; error?: string } {
  const ids = posts.map(p => p.id);
  const uniqueIds = new Set(ids);
  
  if (ids.length !== uniqueIds.size) {
    return { isValid: false, error: 'IDs duplicados encontrados' };
  }
  
  return { isValid: true };
}

// GET - Buscar todos os posts
export async function GET() {
  try {
    const fileContent = await fs.readFile(POSTS_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Valida estrutura dos dados
    if (!data.posts || !Array.isArray(data.posts)) {
      console.warn('⚠️ Estrutura de dados inválida, retornando array vazio');
      return NextResponse.json({ 
        posts: [], 
        lastUpdated: new Date().toISOString(), 
        totalPosts: 0 
      });
    }
    
    // Ordena posts por data de publicação (mais recentes primeiro)
    const sortedPosts = data.posts.sort((a: BlogPost, b: BlogPost) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    console.log('📁 Posts carregados:', sortedPosts.length);
    return NextResponse.json({
      posts: sortedPosts,
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      totalPosts: sortedPosts.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao ler posts:', error);
    return NextResponse.json({ 
      posts: [], 
      lastUpdated: new Date().toISOString(), 
      totalPosts: 0 
    });
  }
}

// POST - Salvar posts
export async function POST(request: NextRequest) {
  try {
    const { posts } = await request.json();
    
    // Valida se posts é um array
    if (!Array.isArray(posts)) {
      console.error('❌ Posts não é um array');
      return NextResponse.json({ 
        error: 'Posts deve ser um array' 
      }, { status: 400 });
    }

    // Valida cada post individualmente
    for (let i = 0; i < posts.length; i++) {
      if (!validateBlogPost(posts[i])) {
        console.error(`❌ Post ${i} tem estrutura inválida:`, posts[i]);
        return NextResponse.json({ 
          error: `Post ${i} tem estrutura inválida` 
        }, { status: 400 });
      }
    }

    // Valida slugs únicos
    const slugValidation = validateUniqueSlugs(posts);
    if (!slugValidation.isValid) {
      console.error('❌ Slugs duplicados:', slugValidation.error);
      return NextResponse.json({ 
        error: slugValidation.error 
      }, { status: 400 });
    }

    // Valida IDs únicos
    const idValidation = validateUniqueIds(posts);
    if (!idValidation.isValid) {
      console.error('❌ IDs duplicados:', idValidation.error);
      return NextResponse.json({ 
        error: idValidation.error 
      }, { status: 400 });
    }

    // Cria o diretório se não existir
    const dir = path.dirname(POSTS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });

    // Ordena posts por data de publicação
    const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Salva os posts
    const data = {
      posts: sortedPosts,
      lastUpdated: new Date().toISOString(),
      totalPosts: sortedPosts.length
    };

    await fs.writeFile(POSTS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log('✅ Posts salvos com sucesso:', sortedPosts.length);
    return NextResponse.json({ 
      success: true, 
      message: `${sortedPosts.length} posts salvos`,
      totalPosts: sortedPosts.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao salvar posts:', error);
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
