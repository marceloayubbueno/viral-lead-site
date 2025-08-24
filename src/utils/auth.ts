import { AuthCredentials, AuthState } from '../types/blog';

// Verifica se as credenciais estão configuradas
const getAuthCredentials = (): { username: string; password: string } | null => {
  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  
  if (!username || !password) {
    console.warn('Credenciais de admin não configuradas');
    return null;
  }
  
  return { username, password };
};

// Valida credenciais de login
export const validateCredentials = (credentials: AuthCredentials): boolean => {
  const validCredentials = getAuthCredentials();
  
  if (!validCredentials) {
    return false;
  }
  
  return (
    credentials.username === validCredentials.username &&
    credentials.password === validCredentials.password
  );
};

// Gera token simples para sessão
export const generateSessionToken = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Verifica se usuário está autenticado
export const checkAuthStatus = (): AuthState => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null, lastLogin: null };
  }
  
  const token = localStorage.getItem('admin_token');
  const user = localStorage.getItem('admin_user');
  const lastLogin = localStorage.getItem('admin_last_login');
  
  if (token && user) {
    return {
      isAuthenticated: true,
      user,
      lastLogin: lastLogin || null
    };
  }
  
  return { isAuthenticated: false, user: null, lastLogin: null };
};

// Realiza login
export const performLogin = (credentials: AuthCredentials): AuthState => {
  if (validateCredentials(credentials)) {
    const token = generateSessionToken();
    const timestamp = new Date().toISOString();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', credentials.username);
      localStorage.setItem('admin_last_login', timestamp);
    }
    
    return {
      isAuthenticated: true,
      user: credentials.username,
      lastLogin: timestamp
    };
  }
  
  return { isAuthenticated: false, user: null, lastLogin: null };
};

// Realiza logout
export const performLogout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_last_login');
  }
};

// Middleware de proteção para rotas
export const requireAuth = (): boolean => {
  const authState = checkAuthStatus();
  return authState.isAuthenticated;
};
