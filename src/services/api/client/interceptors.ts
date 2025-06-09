import { authStorage } from '@services/auth/storage';
import { ApiError, HttpStatusCode } from '../types';

/**
 * Adds the Authorization header to the request if authentication is required.
 * Throws an ApiError if the token is missing.
 *
 * @param headers - The headers object to modify.
 * @param requireAuth - Whether authentication is required for the request.
 */
export const addAuthHeaders = (
  headers: Record<string, string>,
  requireAuth: boolean
) => {
  if (!requireAuth) return;

  const token = authStorage.getToken();

  if (!token) {
    throw new ApiError(
      HttpStatusCode.UNAUTHORIZED,
      'Unauthorized',
      'Authentication token not found'
    );
  }

  headers.Authorization = `Bearer ${token}`;
};

/**
 * Handles authentication errors by clearing stored credentials.
 * Throws an ApiError if the status code is 401 (unauthorized).
 *
 * @param status - The HTTP status code from the failed request.
 */
export const handleAuthError = (status: number) => {
  if (status !== HttpStatusCode.UNAUTHORIZED) return;

  authStorage.clearAuth();
  throw new ApiError(
    HttpStatusCode.UNAUTHORIZED,
    'Unauthorized',
    'Authentication required'
  );
};
