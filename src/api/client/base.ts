import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { type RequestConfig, ApiError } from '@api/types';
import { setupInterceptors } from './interceptors';

/**
 * A base HTTP client class wrapping Axios with interceptors and error handling.
 */
export class BaseHttpClient {
  private axiosInstance: AxiosInstance;

  /**
   * Creates a new instance of BaseHttpClient.
   *
   * @param baseURL - Optional base URL for all HTTP requests.
   */
  constructor(baseURL: string = '', apiPrefix: string = '/api') {
    this.axiosInstance = axios.create({
      baseURL: baseURL + apiPrefix,
      timeout: 500000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setupInterceptors(this.axiosInstance);
  }

  /**
   * Sends HTTP request using Axios.
   *
   * @template TResponse - Type of response data.
   * @template TRequest - Type of request payload.
   * @param config - Request configuration.
   * @returns Promise resolving to response data of type TResponse.
   * @throws ApiError on request failure.
   */
  public async request<TResponse = unknown, TRequest = any>(
    config: RequestConfig<TRequest>
  ): Promise<TResponse> {
    const { method, url, data, requireAuth = false, headers, timeout } = config;

    try {
      const axiosConfig: AxiosRequestConfig & { requireAuth?: boolean } = {
        method,
        url,
        data,
        requireAuth,
        headers,
        timeout,
      };

      const response = await this.axiosInstance.request<TResponse>(axiosConfig);
      return response.data;
    } catch (error) {
      // Interceptors already transform AxiosError to ApiError
      if (error instanceof ApiError) {
        throw error;
      }

      // Fallback for unexpected errors
      throw new ApiError(
        0,
        'Network Error',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}

/**
 * Singleton HTTP client instance configured with base API URL.
 */
export const httpClient = new BaseHttpClient(import.meta.env.VITE_API_URL);
