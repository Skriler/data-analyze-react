export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: unknown;
  requireAuth?: boolean;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}
