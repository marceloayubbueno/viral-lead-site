'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, AuthState } from '../../../types/blog';
import { checkAuthStatus, performLogout } from '../../../utils/auth';
import { getPosts, deletePost } from '../../../utils/storage';
import BlogEditor from '../../../components/admin/BlogEditor';
import { formatDate, formatRelativeDate } from '../../../utils/markdown';

export default function AdminEditorPage() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    lastLogin: null
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'drafts'>('all');
  const router = useRouter();

  useEffect(() => {
    // Verifica autenticação
    const currentAuth = checkAuthStatus();
    setAuthState(currentAuth);
    
    if (!currentAuth.isAuthenticated) {
      // Redireciona para login se não estiver autenticado
      router.push('/admin/login');
      return;
    }

    // Carrega posts
    loadPosts();
  }, [router]);

  const loadPosts = () => {
    const allPosts = getPosts();
    setPosts(allPosts);
  };

  const handleLogout = () => {
    performLogout();
    setAuthState({ isAuthenticated: false, user: null, lastLogin: null });
    router.push('/admin/login');
  };

  const handleCreateNew = () => {
    setSelectedPost(null);
    setIsCreatingNew(true);
  };

  const handleEditPost = (post: BlogPost) => {
    console.log('🔄 Editando post:', post.title, 'ID:', post.id);
    setSelectedPost(post);
    setIsCreatingNew(false);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.')) {
      deletePost(postId);
      loadPosts();
      
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
        setIsCreatingNew(false);
      }
    }
  };

  const handleSavePost = (post: BlogPost) => {
    loadPosts();
    
    if (isCreatingNew) {
      setIsCreatingNew(false);
    }
  };

  const handleCancel = () => {
    setSelectedPost(null);
    setIsCreatingNew(false);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setIsCreatingNew(false);
  };

  // Filtra posts baseado na busca e status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.isPublished) ||
                         (filterStatus === 'drafts' && !post.isPublished);
    
    return matchesSearch && matchesStatus;
  });

  // Se não estiver autenticado, mostra loading
  if (!authState.isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se está editando ou criando, mostra o editor
  if (selectedPost || isCreatingNew) {
    return (
      <div 
        className="min-h-screen"
        style={{ backgroundColor: '#0f172a' }}
      >
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToList}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  ← Voltar à Lista
                </button>
                <h1 className="text-xl font-semibold text-white">
                  {isCreatingNew ? 'Criar Novo Post' : 'Editar Post'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Logado como: {authState.user}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogEditor
            postId={selectedPost?.id}
            onSave={handleSavePost}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  // Lista de posts
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: '#0f172a' }}
    >
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-white">
              Gerenciador de Blog
            </h1>
            
                          <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Logado como: {authState.user}
                </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{ backgroundColor: '#0f172a' }}
      >
        {/* Controles */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Posts do Blog
            </h2>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              + Novo Post
            </button>
          </div>

          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'drafts')}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Posts</option>
              <option value="published">Publicados</option>
              <option value="drafts">Rascunhos</option>
            </select>
          </div>
        </div>

        {/* Lista de Posts */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {posts.length === 0 
                  ? 'Nenhum post criado ainda. Crie seu primeiro post!' 
                  : 'Nenhum post encontrado com os filtros atuais.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {filteredPosts.map(post => (
                <div key={post.id} className="p-6 hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {post.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.isPublished 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {post.isPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-3">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Por: {post.author}</span>
                        <span>•</span>
                        <span>{formatDate(post.updatedAt)}</span>
                        <span>•</span>
                        <span>{post.readTime} min de leitura</span>
                        {post.categories.length > 0 && (
                          <>
                            <span>•</span>
                            <span>Categorias: {post.categories.length}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-2">Total de Posts</h3>
            <p className="text-3xl font-bold text-blue-400">{posts.length}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-2">Publicados</h3>
            <p className="text-3xl font-bold text-green-400">
              {posts.filter(p => p.isPublished).length}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-2">Rascunhos</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {posts.filter(p => !p.isPublished).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
