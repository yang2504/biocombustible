/**
 * axiosClient — Adaptador de infraestructura HTTP
 * Instancia base de Axios con interceptors JWT.
 */

import axios from 'axios';
import { TokenStorage } from '../storage/TokenStorage';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request: adjunta el token JWT en cada petición
axiosClient.interceptors.request.use(
  (config) => {
    const token = TokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: maneja errores 401 (sesión expirada)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si la URL que falló es la del login, no redireccionamos
    const isLoginEndpoint = error.config?.url?.includes('/login');
    
    if (error.response?.status === 401 && !isLoginEndpoint) {
      TokenStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
