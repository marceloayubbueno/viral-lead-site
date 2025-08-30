import { BlogPost, BlogPostFormData, BlogCategory, BlogTag } from '../types/blog';

// Função para ler posts de arquivos JSON
const readPostsFromFile = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/posts/posts.json');
    if (!response.ok) {
      console.log('📁 Arquivo posts.json não encontrado, retornando array vazio');
      return [];
    }
    const data = await response.json();
    console.log('📁 Posts carregados do arquivo:', data.posts?.length || 0);
    return data.posts || [];
  } catch (error) {
    console.error('❌ Erro ao carregar posts do arquivo:', error);
    return [];
  }
};

// Função para salvar posts em arquivo JSON
const savePostsToFile = async (posts: BlogPost[]): Promise<boolean> => {
  try {
    // Em produção, isso seria feito via API
    // Por enquanto, vamos simular salvamento
    console.log('💾 Salvando posts no arquivo (simulado):', posts.length);
    
    // Aqui implementaríamos a lógica real de salvamento
    // Por enquanto, apenas log para demonstração
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar posts no arquivo:', error);
    return false;
  }
};

// Utilitários para posts
export const getPosts = async (): Promise<BlogPost[]> => {
  return await readPostsFromFile();
};

export const savePost = async (post: BlogPost): Promise<void> => {
  try {
    // Salvar no arquivo
    const posts = await getPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
      console.log('🔄 Post atualizado:', post.title, 'ID:', post.id);
    } else {
      posts.push(post);
      console.log('✅ Novo post criado:', post.title, 'ID:', post.id);
    }
    
    // Salvar no arquivo
    await savePostsToFile(posts);
  } catch (error) {
    console.error('❌ Erro ao salvar post:', error);
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const posts = await getPosts();
    const filteredPosts = posts.filter(p => p.id !== postId);
    
    // Salvar no arquivo
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
  // Por enquanto, retorna array vazio
  // Em produção, seria lido de arquivo JSON
  return [];
};

export const saveCategory = (category: BlogCategory): void => {
  // Por enquanto, não faz nada
  // Em produção, salvaria em arquivo JSON
  console.log('💾 Categoria salva (simulado):', category.name);
};

// Utilitários para tags
export const getTags = (): BlogTag[] => {
  // Por enquanto, retorna array vazio
  // Em produção, seria lido de arquivo JSON
  return [];
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
