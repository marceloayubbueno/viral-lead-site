import { BlogPost, BlogPostFormData, BlogCategory, BlogTag } from '../types/blog';

// Chaves para localStorage
const STORAGE_KEYS = {
  POSTS: 'blog_posts',
  CATEGORIES: 'blog_categories',
  TAGS: 'blog_tags',
  SETTINGS: 'blog_settings'
};

// Utilitários para posts
export const getPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
    const parsedPosts = posts ? JSON.parse(posts) : [];
    console.log('📚 Posts carregados do localStorage:', parsedPosts.length);
    console.log('📋 Posts:', parsedPosts.map((p: BlogPost) => ({ id: p.id, title: p.title, isPublished: p.isPublished })));
    return parsedPosts;
  } catch (error) {
    console.error('❌ Erro ao carregar posts:', error);
    return [];
  }
};

export const savePost = (post: BlogPost): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const posts = getPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
      console.log('🔄 Post atualizado:', post.title, 'ID:', post.id);
    } else {
      posts.push(post);
      console.log('✅ Novo post criado:', post.title, 'ID:', post.id);
    }
    
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    console.log('💾 Posts salvos no localStorage:', posts.length);
  } catch (error) {
    console.error('❌ Erro ao salvar post:', error);
  }
};

export const deletePost = (postId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const posts = getPosts();
    const filteredPosts = posts.filter(p => p.id !== postId);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filteredPosts));
  } catch (error) {
    console.error('Erro ao deletar post:', error);
  }
};

export const getPostById = (postId: string): BlogPost | null => {
  console.log('🔍 getPostById chamado com ID:', postId);
  const posts = getPosts();
  console.log('🔍 Total de posts disponíveis:', posts.length);
  
  const foundPost = posts.find(p => p.id === postId);
  console.log('🔍 Post encontrado:', foundPost ? foundPost.title : 'NÃO ENCONTRADO');
  
  return foundPost || null;
};

export const getPostBySlug = (slug: string): BlogPost | null => {
  const posts = getPosts();
  return posts.find(p => p.slug === slug) || null;
};

// Utilitários para categorias
export const getCategories = (): BlogCategory[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return categories ? JSON.parse(categories) : [];
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    return [];
  }
};

export const saveCategory = (category: BlogCategory): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const categories = getCategories();
    const existingIndex = categories.findIndex(c => c.id === category.id);
    
    if (existingIndex >= 0) {
      categories[existingIndex] = category;
    } else {
      categories.push(category);
    }
    
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Erro ao salvar categoria:', error);
  }
};

// Utilitários para tags
export const getTags = (): BlogTag[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const tags = localStorage.getItem(STORAGE_KEYS.TAGS);
    return tags ? JSON.parse(tags) : [];
  } catch (error) {
    console.error('Erro ao carregar tags:', error);
    return [];
  }
};

export const saveTag = (tag: BlogTag): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const tags = getTags();
    const existingIndex = tags.findIndex(t => t.id === tag.id);
    
    if (existingIndex >= 0) {
      tags[existingIndex] = tag;
    } else {
      tags.push(tag);
    }
    
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(tags));
  } catch (error) {
    console.error('Erro ao salvar tag:', error);
  }
};

// Utilitários gerais
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;
  
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

export const exportData = (): string => {
  const data = {
    posts: getPosts(),
    categories: getCategories(),
    tags: getTags(),
    exportedAt: new Date().toISOString()
  };
  
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.posts) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(data.posts));
    }
    
    if (data.categories) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
    }
    
    if (data.tags) {
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(data.tags));
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    return false;
  }
};

// Inicialização com dados padrão
export const initializeDefaultData = (): void => {
  if (typeof window === 'undefined') return;
  
  // Verifica se já tem dados
  if (getPosts().length > 0) return;
  
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
