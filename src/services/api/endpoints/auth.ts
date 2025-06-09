import type { AxiosResponse } from 'axios';
import { apiClient, publicApiClient } from '../client/client';
import type { LoginDto, RegisterDto, AuthResult } from '@api-types/auth';

export const authApi = {
  /**
   * Authenticate user with credentials
   */
  async login(credentials: LoginDto): Promise<AuthResult> {
    const response: AxiosResponse<AuthResult> = await publicApiClient.post(
      '/api/auth/login',
      credentials
    );

    return response.data;
  },

  /**
   * Register new user account
   */
  async register(userData: RegisterDto): Promise<void> {
    await publicApiClient.post('/api/auth/register', userData);
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<AuthResult> {
    const response: AxiosResponse<AuthResult> =
      await publicApiClient.post('/api/auth/refresh');

    return response.data;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
  },
};
