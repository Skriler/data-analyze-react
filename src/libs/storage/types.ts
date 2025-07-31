/**
 * Enum representing possible authentication-related storage errors.
 */
export enum AuthError {
  STORAGE_UNAVAILABLE = 'STORAGE_UNAVAILABLE',
  INVALID_TOKEN = 'INVALID_TOKEN',
  PARSE_ERROR = 'PARSE_ERROR',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
}

/**
 * Result object returned by authentication storage operations.
 *
 * @template T - Type of the stored/retrieved data.
 */
export type StorageResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: AuthError;
};
