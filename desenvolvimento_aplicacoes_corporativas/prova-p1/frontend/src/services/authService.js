import { http } from "../api/http";

/**
 * Registra um novo usuário.
 * @param {string} email
 * @param {string} password
 * @param {string} role - 'user' ou 'admin'
 * @returns {Promise<any>}
 */
export const register = (email, password, role) => {
  return http.post("/auth/register", { email, password, role });
};
