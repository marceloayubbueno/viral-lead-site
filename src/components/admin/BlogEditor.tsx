'use client';

import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost, BlogPostFormData, EditorState } from '../../types/blog';
import { createPostFromForm, updatePostFromForm, validatePostForm } from '../../utils/markdown';
import { savePost, getPostById } from '../../utils/storage';
import PostForm from './PostForm';
import { initializeDefaultData } from '../../utils/storage';
import ImageUpload from './ImageUpload';

interface BlogEditorProps {
  postId?: string;
  onSave?: (post: BlogPost) => void;
  onCancel?: () => void;
  className?: string;
}

export default function BlogEditor({ postId, onSave, onCancel, className = '' }: BlogEditorProps) {
  const [editorState, setEditorState] = useState<EditorState>({
    currentPost: null,
    isEditing: false,
    hasUnsavedChanges: false,
    isSaving: false,
    isPublishing: false
  });

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    description: '',
    content: '',
    author: '',
    categories: [],
    tags: [],
    coverImage: ''
  });

  const [currentStep, setCurrentStep] = useState<'title' | 'content'>('title');

  useEffect(() => {
    // Inicializa dados padrão (categorias e tags)
    initializeDefaultData();

    // Se editando post existente, carrega dados
    if (postId) {
      const existingPost = getPostById(postId);
      if (existingPost) {
        setEditorState(prev => ({
          ...prev,
          currentPost: existingPost,
          isEditing: true
        }));
        
        setFormData({
          title: existingPost.title,
          description: existingPost.description,
          content: existingPost.content,
          author: existingPost.author,
          categories: existingPost.categories,
          tags: existingPost.tags,
          coverImage: existingPost.coverImage
        });
        
        setCurrentStep('content'); // Vai direto para o conteúdo se editando
      }
    }
  }, [postId]);

  const handleFormDataChange = useCallback((newFormData: BlogPostFormData) => {
    setFormData(newFormData);
    setEditorState(prev => ({
      ...prev,
      hasUnsavedChanges: true
    }));
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    setEditorState(prev => ({
      ...prev,
      hasUnsavedChanges: true
    }));
  }, []);

  const handleSave = async (isPublishing: boolean = false) => {
    // Valida formulário
    const validation = validatePostForm(formData);
    if (!validation.isValid) {
      alert(`Erro de validação: ${validation.errors.join(', ')}`);
      return;
    }

    setEditorState(prev => ({
      ...prev,
      isSaving: true,
      isPublishing
    }));

    try {
      let post: BlogPost;

      if (editorState.isEditing && editorState.currentPost) {
        // Atualiza post existente
        post = updatePostFromForm(editorState.currentPost, formData);
      } else {
        // Cria novo post
        post = createPostFromForm(formData);
      }

      // Define status de publicação
      if (isPublishing) {
        post.isPublished = true;
      }

      // Salva no storage
      savePost(post);

      // Atualiza estado
      setEditorState(prev => ({
        ...prev,
        currentPost: post,
        hasUnsavedChanges: false,
        isSaving: false,
        isPublishing: false
      }));

      // Notifica componente pai
      if (onSave) {
        onSave(post);
      }

      // Mostra mensagem de sucesso
      alert(isPublishing ? 'Post publicado com sucesso!' : 'Post salvo com sucesso!');

    } catch (error) {
      console.error('Erro ao salvar post:', error);
      alert('Erro ao salvar post. Tente novamente.');
    } finally {
      setEditorState(prev => ({
        ...prev,
        isSaving: false,
        isPublishing: false
      }));
    }
  };

  const handlePublish = () => {
    if (confirm('Tem certeza que deseja publicar este post?')) {
      handleSave(true);
    }
  };

  const handleCancel = () => {
    if (editorState.hasUnsavedChanges) {
      if (confirm('Tem alterações não salvas. Deseja realmente cancelar?')) {
        if (onCancel) {
          onCancel();
        }
      }
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  };

  // RENDERIZAÇÃO SIMPLES E INTUITIVA
  const renderTitleStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📝 Passo 1: Título e Metadados</h2>
        <p className="text-gray-300">Comece criando o título e informações básicas do post</p>
      </div>
      
      <PostForm
        initialData={formData}
        onSubmit={handleFormDataChange}
        onCancel={() => setCurrentStep('title')}
        isSubmitting={editorState.isSaving}
      />
      
      <div className="flex justify-center">
        <button
          onClick={() => setCurrentStep('content')}
          disabled={!formData.title.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          Continuar para Conteúdo →
        </button>
      </div>
    </div>
  );

  const renderContentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">✍️ Passo 2: Conteúdo do Post</h2>
        <p className="text-gray-300">Escreva o conteúdo principal do seu post</p>
      </div>
      
      {/* Imagem de Capa */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-white border-l-4 border-orange-500 pl-3">
          Imagem de Capa
        </h4>
        
        <ImageUpload
          onImageSelect={(imageResult) => {
            setFormData(prev => ({
              ...prev,
              coverImage: imageResult.dataUrl
            }));
          }}
          currentImage={formData.coverImage}
        />
      </div>
      
      {/* Conteúdo do Post */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-white">
            Conteúdo do Post
          </label>
          <div className="text-xs text-gray-400">
            {formData.content.length} caracteres
          </div>
        </div>
        
        <textarea
          value={formData.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full h-96 p-4 border border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-800 text-white placeholder-gray-400"
          placeholder="Digite o conteúdo do post aqui..."
          disabled={editorState.isSaving}
        />
        
        <div className="text-xs text-gray-400 space-y-1">
          <p>• Use **texto** para <strong className="text-white">negrito</strong></p>
          <p>• Use *texto* para <em className="text-white">itálico</em></p>
          <p>• Use # para títulos</p>
          <p>• Use - ou * para listas</p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('title')}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
        >
          ← Voltar ao Título
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={() => handleSave(false)}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            disabled={editorState.isSaving}
          >
            {editorState.isSaving ? 'Salvando...' : 'Salvar Rascunho'}
          </button>
          
          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            disabled={editorState.isSaving || editorState.isPublishing}
          >
            {editorState.isPublishing ? 'Publicando...' : 'Publicar Post'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-gray-900 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-700 px-6 py-4 bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {editorState.isEditing ? 'Editar Post' : 'Novo Post'}
            </h2>
            <p className="text-sm text-gray-300">
              {editorState.hasUnsavedChanges ? 'Tem alterações não salvas' : 'Tudo salvo'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              disabled={editorState.isSaving}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-center space-x-8">
          <div className={`flex items-center space-x-2 ${currentStep === 'title' ? 'text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'title' ? 'bg-blue-600' : 'bg-gray-600'}`}>
              1
            </div>
            <span className="font-medium">Título</span>
          </div>
          
          <div className={`flex items-center space-x-2 ${currentStep === 'content' ? 'text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'content' ? 'bg-blue-600' : 'bg-gray-600'}`}>
              2
            </div>
            <span className="font-medium">Conteúdo</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gray-900">
        {currentStep === 'title' && renderTitleStep()}
        {currentStep === 'content' && renderContentStep()}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 px-6 py-4 bg-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div>
            <span className="font-medium">Status:</span>
            {editorState.currentPost?.isPublished ? (
              <span className="ml-2 text-green-400">Publicado</span>
            ) : (
              <span className="ml-2 text-yellow-400">Rascunho</span>
            )}
          </div>
          
          <div>
            <span className="font-medium">Última atualização:</span>
            <span className="ml-2">
              {editorState.currentPost?.updatedAt 
                ? new Date(editorState.currentPost.updatedAt).toLocaleString('pt-BR')
                : 'Nunca'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
