'use client';

import { useState, useEffect } from 'react';
import { AuthCredentials, AuthState } from '../../types/blog';
import { performLogin, checkAuthStatus, performLogout } from '../../utils/auth';

interface LoginFormProps {
  onLoginSuccess: (authState: AuthState) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    lastLogin: null
  });

  useEffect(() => {
    // Verifica se já está autenticado ao carregar
    const currentAuth = checkAuthStatus();
    setAuthState(currentAuth);
    
    if (currentAuth.isAuthenticated) {
      onLoginSuccess(currentAuth);
    }
  }, [onLoginSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null); // Limpa erro ao digitar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = performLogin(credentials);
      
      if (result.isAuthenticated) {
        setAuthState(result);
        onLoginSuccess(result);
      } else {
        setError('Credenciais inválidas. Verifique usuário e senha.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    performLogout();
    const newAuthState = { isAuthenticated: false, user: null, lastLogin: null };
    setAuthState(newAuthState);
    setCredentials({ username: '', password: '' });
  };

  if (authState.isAuthenticated) {
    return (
      <div className="card-admin p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold admin-text-primary mb-2">
            Bem-vindo, {authState.user}!
          </h2>
          <p className="admin-text-secondary text-sm">
            Último login: {authState.lastLogin ? new Date(authState.lastLogin).toLocaleString('pt-BR') : 'N/A'}
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full btn-admin-primary"
          type="button"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="card-admin p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold admin-text-primary mb-2">
          Acesso Administrativo
        </h2>
        <p className="admin-text-secondary">
          Faça login para gerenciar o blog
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium admin-text-primary mb-1">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
            className="input-admin"
            placeholder="Digite seu usuário"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium admin-text-primary mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            className="input-admin"
            placeholder="Digite sua senha"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-admin-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs admin-text-muted">
          Configure as credenciais nas variáveis de ambiente:
          <br />
          <code className="bg-gray-700 px-2 py-1 rounded text-xs admin-text-secondary">
            NEXT_PUBLIC_ADMIN_USERNAME
          </code>
          {' '}e{' '}
          <code className="bg-gray-700 px-2 py-1 rounded text-xs admin-text-secondary">
            NEXT_PUBLIC_ADMIN_PASSWORD
          </code>
        </p>
      </div>
    </div>
  );
}
