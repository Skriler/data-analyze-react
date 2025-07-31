import type { AxiosRequestConfig } from 'axios';

/**
 * Supported HTTP methods.
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * Request configuration extending AxiosRequestConfig.
 *
 * @template T - Type of request body data.
 */
export interface RequestConfig<T = unknown> extends AxiosRequestConfig {
  method: HttpMethod;
  url: string;
  data?: T;
  requireAuth?: boolean;
}
