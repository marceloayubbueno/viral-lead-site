import { BlogPost, BlogPostFormData, BlogCategory, BlogTag } from '../types/blog';

// Função para ler posts de arquivos JSON
const readPostsFromFile = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      console.log('📁 API posts não encontrada, retornando array vazio');
      return [];
    }
    const data = await response.json();
    console.log('📁 Posts carregados da API:', data.posts?.length || 0);
    return data.posts || [];
  } catch (error) {
    console.error('❌ Erro ao carregar posts da API:', error);
    return [];
  }
};

// Função para salvar posts em arquivo JSON
const savePostsToFile = async (posts: BlogPost[]): Promise<boolean> => {
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posts }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('💾 Posts salvos via API:', result.message);
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar posts via API:', error);
    return false;
  }
};

// Utilitários para posts
export const getPosts = async (): Promise<BlogPost[]> => {
  return await readPostsFromFile();
};

export const savePost = async (post: BlogPost): Promise<void> => {
  try {
    const posts = await getPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
      console.log('🔄 Post atualizado:', post.title, 'ID:', post.id);
    } else {
      posts.push(post);
      console.log('✅ Novo post criado:', post.title, 'ID:', post.id);
    }
    
    // Salvar via API
    await savePostsToFile(posts);
  } catch (error) {
    console.error('❌ Erro ao salvar post:', error);
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const posts = await getPosts();
    const filteredPosts = posts.filter(p => p.id !== postId);
    
    // Salvar via API
    await savePostsToFile(filteredPosts);
  } catch (error) {
    console.error('Erro ao deletar post:', error);
  }
};

export const getPostById = async (postId: string): Promise<BlogPost | null> => {
  console.log('🔍 getPostById chamado com ID:', postId);
  const posts = await getPosts();
  console.log('🔍 Total de posts disponíveis:', posts.length);
  
  const foundPost = posts.find(p => p.id === postId);
  console.log('🔍 Post encontrado:', foundPost ? foundPost.title : 'NÃO ENCONTRADO');
  
  return foundPost || null;
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug) || null;
};

// Utilitários para categorias
export const getCategories = (): BlogCategory[] => {
  // Retorna categorias padrão para o editor funcionar
  return [
    { id: '1', name: 'Marketing Digital', slug: 'marketing-digital', description: 'Estratégias de marketing digital' },
    { id: '2', name: 'Afiliados', slug: 'afiliados', description: 'Programas de afiliados' },
    { id: '3', name: 'SaaS', slug: 'saas', description: 'Software as a Service' },
    { id: '4', name: 'Estratégia', slug: 'estrategia', description: 'Estratégias de negócio' },
    { id: '5', name: 'Tecnologia', slug: 'tecnologia', description: 'Tecnologia e inovação' }
  ];
};

export const saveCategory = (category: BlogCategory): void => {
  // Por enquanto, não faz nada
  // Em produção, salvaria em arquivo JSON
  console.log('💾 Categoria salva (simulado):', category.name);
};

// Utilitários para tags
export const getTags = (): BlogTag[] => {
  // Retorna tags padrão para o editor funcionar
  return [
    { id: '1', name: 'Estratégia', slug: 'estrategia', color: '#3B82F6' },
    { id: '2', name: 'Conversão', slug: 'conversao', color: '#10B981' },
    { id: '3', name: 'Growth', slug: 'growth', color: '#F59E0B' },
    { id: '4', name: 'Marketing', slug: 'marketing', color: '#8B5CF6' },
    { id: '5', name: 'Vendas', slug: 'vendas', color: '#EF4444' },
    { id: '6', name: 'Automação', slug: 'automacao', color: '#06B6D4' }
  ];
};

export const saveTag = (tag: BlogTag): void => {
  // Por enquanto, não faz nada
  // Em produção, salvaria em arquivo JSON
  console.log('💾 Tag salva (simulado):', tag.name);
};

// Utilitários gerais
export const clearAllData = (): void => {
  // Por enquanto, não faz nada
  // Em produção, limparia arquivos JSON
  console.log('🗑️ Dados limpos (simulado)');
};

export const exportData = async (): Promise<string> => {
  const data = {
    posts: await getPosts(),
    categories: getCategories(),
    tags: getTags(),
    exportedAt: new Date().toISOString()
  };
  
  return JSON.stringify(data, null, 2);
};

export const importData = async (jsonData: string): Promise<boolean> => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.posts) {
      // Salvar posts importados
      for (const post of data.posts) {
        await savePost(post);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    return false;
  }
};

// Inicialização com dados padrão
export const initializeDefaultData = async (): Promise<void> => {
  // Verifica se já tem dados
  const posts = await getPosts();
  if (posts.length > 0) return;
  
  // Categorias padrão
  const defaultCategories: BlogCategory[] = [
    { id: '1', name: 'Marketing Digital', slug: 'marketing-digital', description: 'Estratégias de marketing digital' },
    { id: '2', name: 'Afiliados', slug: 'afiliados', description: 'Programas de afiliados' },
    { id: '3', name: 'SaaS', slug: 'saas', description: 'Software as a Service' }
  ];
  
  // Tags padrão
  const defaultTags: BlogTag[] = [
    { id: '1', name: 'Estratégia', slug: 'estrategia', color: '#3B82F6' },
    { id: '2', name: 'Conversão', slug: 'conversao', color: '#10B981' },
    { id: '3', name: 'Growth', slug: 'growth', color: '#F59E0B' }
  ];
  
  defaultCategories.forEach(cat => saveCategory(cat));
  defaultTags.forEach(tag => saveTag(tag));
};
