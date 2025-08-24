'use client';

import { useState, useRef } from 'react';
import { ImageUploadResult } from '../../types/blog';

interface ImageUploadProps {
  onImageSelect: (result: ImageUploadResult) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({ onImageSelect, currentImage, className = '' }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Formato de arquivo não suportado. Use JPG, PNG, GIF ou WebP.');
      return false;
    }

    if (file.size > maxSize) {
      setError('Arquivo muito grande. Máximo 5MB.');
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      
      const result: ImageUploadResult = {
        dataUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      };

      onImageSelect(result);
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError('Erro ao processar arquivo. Tente novamente.');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageSelect({
      dataUrl: '',
      fileName: '',
      fileSize: 0,
      mimeType: ''
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-white">
        Imagem de Capa
      </label>

      {/* Preview da imagem atual */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Imagem de capa"
            className="w-full h-48 object-cover rounded-lg border border-gray-600"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
            title="Remover imagem"
          >
            ×
          </button>
        </div>
      )}

      {/* Área de upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-900/20'
            : 'border-gray-600 hover:border-gray-500'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />

        <div className="space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-300">Processando...</span>
            </div>
          ) : (
            <>
              <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              
              <div className="text-sm text-gray-300">
                <span className="font-medium text-blue-400 hover:text-blue-300">
                  Clique para selecionar
                </span>
                {' '}ou arraste e solte
              </div>
              
              <p className="text-xs text-gray-400">
                PNG, JPG, GIF ou WebP até 5MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Informações técnicas */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>• Imagens são convertidas para base64 (temporariamente)</p>
        <p>• Recomendado: 1200x630px para melhor visualização</p>
        <p>• Formatos suportados: JPG, PNG, GIF, WebP</p>
      </div>
    </div>
  );
}
