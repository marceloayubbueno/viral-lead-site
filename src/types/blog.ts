export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  categories: string[];
  tags: string[];
  coverImage: string;
  isPublished: boolean;
  readTime: number;
}

export interface BlogPostFormData {
  title: string;
  description: string;
  content: string;
  author: string;
  categories: string[];
  tags: string[];
  coverImage: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  categories: string[];
  tags: string[];
  coverImage: string;
  readTime: number;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  lastLogin: string | null;
}

export interface ImageUploadResult {
  dataUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface EditorState {
  currentPost: BlogPost | null;
  isEditing: boolean;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  isPublishing: boolean;
}
