/**
 * LogoutUseCase — Capa de aplicación
 * Limpia el token y el usuario del almacenamiento local.
 */

import { TokenStorage } from '../../infrastructure/storage/TokenStorage';

export const LogoutUseCase = {
  execute() {
    TokenStorage.clear();
  },
};
