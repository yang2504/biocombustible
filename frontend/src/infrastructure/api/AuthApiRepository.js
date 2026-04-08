/**
 * AuthApiRepository — Adaptador de infraestructura
 * Implementa el puerto IAuthRepository llamando al backend Django.
 *
 * Endpoint: POST /api/login/
 * Body: { correoElectronico, password }
 * Response: { access_token, token_type }
 */

import axiosClient from './axiosClient';

export const AuthApiRepository = {
  /**
   * @param {string} correoElectronico
   * @param {string} password
   * @returns {Promise<{ access_token: string, token_type: string }>}
   */
  async login(correoElectronico, password) {
    const response = await axiosClient.post('/login/', {
      correoElectronico,
      password,
    });
    return response.data;
  },
};
