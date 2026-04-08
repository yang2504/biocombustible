/**
 * TokenStorage — Adaptador de infraestructura
 * Encapsula el acceso a localStorage para el JWT.
 */

const TOKEN_KEY = 'oiltrace_access_token';
const USER_KEY = 'oiltrace_user';

export const TokenStorage = {
  save(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get() {
    return localStorage.getItem(TOKEN_KEY);
  },

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  },

  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  clear() {
    this.remove();
    this.removeUser();
  },
};
