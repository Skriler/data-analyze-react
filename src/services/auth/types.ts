export enum AuthError {
  STORAGE_UNAVAILABLE = 'STORAGE_UNAVAILABLE',
  INVALID_TOKEN = 'INVALID_TOKEN',
  PARSE_ERROR = 'PARSE_ERROR',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
}

export type StorageResult<T> = {
  success: boolean;
  data?: T;
  error?: AuthError;
};
