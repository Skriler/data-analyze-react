import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { type RequestConfig, ApiError } from '../types';
import { addAuthHeaders, handleAuthError } from './interceptors';

/**
 * A base HTTP client wrapper around Axios, providing
 * default configuration, interceptors, and unified error handling.
 */
export class BaseHttpClient {
  private axiosInstance: AxiosInstance;

  /**
   * Creates a new instance of BaseHttpClient.
   * @param baseURL - Optional base URL for all HTTP requests.
   */
  constructor(baseURL: string = '') {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors for authentication
   * and error transformation.
   */
  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      config => {
        try {
          const headers = config.headers || {};
          const requireAuth = (config as any).requireAuth || false;

          addAuthHeaders(headers as Record<string, string>, requireAuth);
          config.headers = headers;
        } catch (error) {
          return Promise.reject(error);
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status) {
          try {
            handleAuthError(error.response.status);
          } catch (authError) {
            return Promise.reject(authError);
          }
        }

        // Transform AxiosError to ApiError
        const apiError = this.transformAxiosError(error);
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Executes an HTTP request using the provided configuration.
   * @param config - Custom request configuration.
   * @returns A promise that resolves with the response data.
   */
  async request<T = unknown>(config: RequestConfig): Promise<T> {
    const { method, url, data, requireAuth = false } = config;

    try {
      const axiosConfig: AxiosRequestConfig & { requireAuth?: boolean } = {
        method,
        url,
        data,
        requireAuth,
      };

      const response = await this.axiosInstance.request<T>(axiosConfig);
      return this.parseSuccessResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw this.transformAxiosError(error);
      }

      throw new ApiError(
        0,
        'Network Error',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  /**
   * Parses a successful Axios response.
   * Returns JSON data if content type is JSON, otherwise null.
   * @param response - Axios response object.
   * @returns Parsed response data or null.
   */
  private async parseSuccessResponse<T>(
    response: AxiosResponse<T>
  ): Promise<T> {
    const contentType = response.headers['content-type'];

    if (contentType?.includes('application/json')) {
      return response.data;
    }

    // Для других типов контента возвращаем null
    return null as T;
  }

  /**
   * Parses an error response to extract a human-readable message.
   * @param response - Axios response object containing error data.
   * @returns Parsed error message string.
   */
  private async parseErrorResponse(response: AxiosResponse): Promise<string> {
    try {
      const contentType = response.headers['content-type'];

      if (contentType?.includes('application/json')) {
        const errorData = response.data;
        return errorData.message || errorData.error || response.statusText;
      }

      return response.data || response.statusText;
    } catch {
      return response.statusText;
    }
  }

  /**
   * Transforms an AxiosError into a custom ApiError object.
   * @param error - Axios error object.
   * @returns Transformed ApiError.
   */
  private transformAxiosError(error: AxiosError): ApiError {
    const status = error.response?.status || 0;
    const statusText = error.response?.statusText || 'Network Error';

    let message = error.message || 'Unknown error';

    if (error.response?.data) {
      const errorData = error.response.data as any;

      if (typeof errorData === 'object') {
        message = errorData.message || errorData.error || statusText;
      } else if (typeof errorData === 'string') {
        message = errorData;
      }
    }

    return new ApiError(status, statusText, message);
  }
}

export const httpClient = new BaseHttpClient();
