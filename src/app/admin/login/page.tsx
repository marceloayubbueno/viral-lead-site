'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthState } from '../../../types/blog';
import { checkAuthStatus } from '../../../utils/auth';
import LoginForm from '../../../components/admin/LoginForm';

export default function AdminLoginPage() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    lastLogin: null
  });
  const router = useRouter();

  useEffect(() => {
    // Verifica se já está autenticado
    const currentAuth = checkAuthStatus();
    setAuthState(currentAuth);
    
    if (currentAuth.isAuthenticated) {
      // Redireciona para o editor se já estiver logado
      router.push('/admin/editor');
    }
  }, [router]);

  const handleLoginSuccess = (newAuthState: AuthState) => {
    setAuthState(newAuthState);
    // Redireciona para o editor após login bem-sucedido
    router.push('/admin/editor');
  };

  if (authState.isAuthenticated) {
    return (
      <div 
        className="min-h-screen admin-dark admin-bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold admin-text-primary mb-2">
              Redirecionando...
            </h2>
            <p className="admin-text-secondary">
              Você já está logado. Redirecionando para o editor.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen admin-dark admin-bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0f172a' }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold admin-text-primary mb-2">
            Painel Administrativo
          </h1>
          <p className="admin-text-secondary">
            Acesse o sistema de gerenciamento do blog
          </p>
        </div>

        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <div className="text-center">
          <p className="text-xs admin-text-muted">
            Sistema de blog integrado ao site principal
          </p>
        </div>
      </div>
    </div>
  );
}
