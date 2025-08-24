'use client';

import { useState, useEffect } from 'react';
import { BlogPostFormData, BlogCategory, BlogTag } from '../../types/blog';
import { getCategories, getTags } from '../../utils/storage';
import ImageUpload from './ImageUpload';

interface PostFormProps {
  initialData?: Partial<BlogPostFormData>;
  onSubmit: (data: BlogPostFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export default function PostForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isSubmitting = false,
  className = ''
}: PostFormProps) {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    description: '',
    content: '',
    author: '',
    categories: [],
    tags: [],
    coverImage: '',
    ...initialData
  });

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Carrega categorias e tags disponíveis
    setCategories(getCategories());
    setTags(getTags());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageSelect = (imageResult: { dataUrl: string }) => {
    setFormData(prev => ({
      ...prev,
      coverImage: imageResult.dataUrl
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter(id => id !== categoryId)
    }));
  };

  const handleTagChange = (tagId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tags: checked
        ? [...prev.tags, tagId]
        : prev.tags.filter(id => id !== tagId)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Autor é obrigatório';
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'Selecione pelo menos uma categoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Cabeçalho */}
      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Informações do Post
        </h3>
        <p className="text-sm text-gray-300">
          Configure as informações básicas do seu post
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção: Informações Básicas */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white border-l-4 border-blue-500 pl-3">
            Informações Básicas
          </h4>
          
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
              Título do Post *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : ''
              }`}
              placeholder="Digite o título do post"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
              Descrição *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Digite uma descrição resumida do post"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Autor */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-white mb-1">
              Autor *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.author ? 'border-red-500' : ''
              }`}
              placeholder="Digite o nome do autor"
              disabled={isSubmitting}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-400">{errors.author}</p>
            )}
          </div>
        </div>

        {/* Seção: Categorização */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-white border-l-4 border-purple-500 pl-3">
            Categorização
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categorias */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Categorias *
              </label>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category.id)}
                      onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                      className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-800 w-4 h-4"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-300">{category.name}</span>
                  </label>
                ))}
              </div>
              {errors.categories && (
                <p className="mt-1 text-sm text-red-400">{errors.categories}</p>
              )}
              {categories.length === 0 && (
                <p className="text-xs text-gray-400">
                  Nenhuma categoria disponível. Configure categorias primeiro.
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tags
              </label>
              <div className="space-y-2">
                {tags.map(tag => (
                  <label key={tag.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag.id)}
                      onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                      className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-800 w-4 h-4"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-300">{tag.name}</span>
                  </label>
                ))}
              </div>
              {tags.length === 0 && (
                <p className="text-xs text-gray-400">
                  Nenhuma tag disponível. Configure tags primeiro.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Metadados'}
          </button>
        </div>
      </form>
    </div>
  );
}
