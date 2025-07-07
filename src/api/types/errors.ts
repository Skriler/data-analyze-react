/**
 * Custom error class to represent API errors.
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
    public data?: any
  ) {
    super(message || `${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}
