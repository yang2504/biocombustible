/**
 * AuthContext — Estado global de autenticación
 * Provee: { isAuthenticated, token, login, logout, loading }
 */

import { createContext, useContext, useReducer, useEffect } from 'react';
import { TokenStorage } from '../../infrastructure/storage/TokenStorage';
import { LoginUseCase } from '../../application/auth/LoginUseCase';
import { LogoutUseCase } from '../../application/auth/LogoutUseCase';

// ── Estado inicial ──────────────────────────────────────────────────────────
const initialState = {
  isAuthenticated: false,
  token: null,
  loading: true,   // true mientras se verifica el token guardado
  error: null,
};

// ── Reducer ─────────────────────────────────────────────────────────────────
function authReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        error: null,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload.message,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Al montar: verificar si hay token guardado
  useEffect(() => {
    const token = TokenStorage.get();
    dispatch({ type: 'INIT', payload: { token } });
  }, []);

  const login = async (correoElectronico, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await LoginUseCase.execute(correoElectronico, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token: data.access_token } });
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        'Error al iniciar sesión';
      dispatch({ type: 'LOGIN_ERROR', payload: { message } });
      return { success: false, message };
    }
  };

  const logout = () => {
    LogoutUseCase.execute();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook conveniente ─────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
