import { BlogPost, BlogPostFormData } from '../types/blog';

// Gera slug a partir do título
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Calcula tempo de leitura (aproximado)
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Gera ID único para posts
export const generatePostId = (): string => {
  return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Cria novo post a partir dos dados do formulário
export const createPostFromForm = (formData: BlogPostFormData): BlogPost => {
  const now = new Date().toISOString();
  const slug = generateSlug(formData.title);
  const readTime = calculateReadTime(formData.content);
  
  return {
    id: generatePostId(),
    title: formData.title,
    slug,
    description: formData.description,
    content: formData.content,
    author: formData.author,
    publishedAt: now,
    updatedAt: now,
    categories: formData.categories,
    tags: formData.tags,
    coverImage: formData.coverImage,
    isPublished: false,
    readTime
  };
};

// Atualiza post existente
export const updatePostFromForm = (existingPost: BlogPost, formData: BlogPostFormData): BlogPost => {
  const now = new Date().toISOString();
  const readTime = calculateReadTime(formData.content);
  
  return {
    ...existingPost,
    title: formData.title,
    description: formData.description,
    content: formData.content,
    author: formData.author,
    updatedAt: now,
    categories: formData.categories,
    tags: formData.tags,
    coverImage: formData.coverImage,
    readTime
  };
};

// Valida dados do formulário
export const validatePostForm = (formData: BlogPostFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!formData.title.trim()) {
    errors.push('Título é obrigatório');
  }
  
  if (!formData.description.trim()) {
    errors.push('Descrição é obrigatória');
  }
  
  if (!formData.content.trim()) {
    errors.push('Conteúdo é obrigatório');
  }
  
  if (!formData.author.trim()) {
    errors.push('Autor é obrigatório');
  }
  
  if (formData.title.length > 100) {
    errors.push('Título deve ter no máximo 100 caracteres');
  }
  
  if (formData.description.length > 200) {
    errors.push('Descrição deve ter no máximo 200 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Formata data para exibição
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Formata data relativa
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Hoje';
  } else if (diffInDays === 1) {
    return 'Ontem';
  } else if (diffInDays < 7) {
    return `Há ${diffInDays} dias`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Há ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `Há ${months} mês${months > 1 ? 'es' : ''}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `Há ${years} ano${years > 1 ? 's' : ''}`;
  }
};

// Extrai metadados do conteúdo Markdown
export const extractMarkdownMetadata = (content: string): { 
  hasImages: boolean; 
  hasLinks: boolean; 
  wordCount: number;
  paragraphCount: number;
} => {
  const hasImages = /!\[.*?\]\(.*?\)/.test(content);
  const hasLinks = /\[.*?\]\(.*?\)/.test(content);
  const wordCount = content.trim().split(/\s+/).length;
  const paragraphCount = content.split(/\n\s*\n/).filter(p => p.trim()).length;
  
  return {
    hasImages,
    hasLinks,
    wordCount,
    paragraphCount
  };
};
