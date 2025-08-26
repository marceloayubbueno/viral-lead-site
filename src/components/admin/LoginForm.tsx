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
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo, {authState.user}!
          </h2>
          <p className="text-gray-600 text-sm">
            Último login: {authState.lastLogin ? new Date(authState.lastLogin).toLocaleString('pt-BR') : 'N/A'}
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          type="button"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Acesso Administrativo
        </h2>
        <p className="text-gray-600">
          Faça login para gerenciar o blog
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite seu usuário"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite sua senha"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Configure as credenciais nas variáveis de ambiente:
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            NEXT_PUBLIC_ADMIN_USERNAME
          </code>
          {' '}e{' '}
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            NEXT_PUBLIC_ADMIN_PASSWORD
          </code>
        </p>
      </div>
    </div>
  );
}
