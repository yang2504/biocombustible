/**
 * LoginUseCase — Capa de aplicación
 * Orquesta el flujo de login:
 *   1. Llama al repositorio de auth con las credenciales
 *   2. Guarda el token en TokenStorage
 *   3. Retorna el token para que el contexto actualice el estado
 */

import { TokenStorage } from '../../infrastructure/storage/TokenStorage';
import { AuthApiRepository } from '../../infrastructure/api/AuthApiRepository';

export const LoginUseCase = {
  /**
   * @param {string} correoElectronico
   * @param {string} password
   * @returns {Promise<{ access_token: string }>}
   * @throws {Error} Si las credenciales son incorrectas
   */
  async execute(correoElectronico, password) {
    const data = await AuthApiRepository.login(correoElectronico, password);

    if (!data?.access_token) {
      throw new Error('Respuesta inesperada del servidor');
    }

    TokenStorage.save(data.access_token);
    return data;
  },
};
