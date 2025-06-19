import { authStorage } from '@libs/storage/storage';
import { ApiError } from '@api/types';
import {
  HttpStatusCode,
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

/**
 * Adds the Authorization header to the request if authentication is required.
 * Throws an ApiError if the token is missing.
 *
 * @param config - Axios request config.
 * @returns Modified config with Authorization header.
 */
const addAuthHeaders = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const requireAuth = (config as any)?.requireAuth ?? false;

  if (!requireAuth) {
    return config;
  }

  if (authStorage.isTokenExpired()) {
    authStorage.clearAuth();
    throw new ApiError(
      HttpStatusCode.Unauthorized,
      'Token Expired',
      'Authentication token has expired'
    );
  }

  const token = authStorage.getToken();
  if (!token) {
    throw new ApiError(
      HttpStatusCode.Unauthorized,
      'Unauthorized',
      'Authentication token not found'
    );
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

/**
 * Transforms an AxiosError into a custom ApiError object.
 *
 * @param error - Axios error object.
 * @returns ApiError instance with extracted info.
 */
const transformAxiosError = (error: AxiosError): ApiError => {
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
};

/**
 * Clears authentication info on Unauthorized error.
 *
 * @param error - Axios error object.
 */
const handleAuthError = (error: AxiosError): void => {
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    authStorage.clearAuth();
  }
};

/**
 * Sets up request and response interceptors for the given axios instance.
 *
 * @param axiosInstance - Axios instance to attach interceptors.
 */
export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return addAuthHeaders(config);
    },
    (error: AxiosError) => {
      return Promise.reject(transformAxiosError(error));
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      handleAuthError(error);
      return Promise.reject(transformAxiosError(error));
    }
  );
};
