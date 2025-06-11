import { httpClient } from '@api/client/base';
import { HttpMethod } from '@api/types';
import type {
  LoginDto,
  RegisterDto,
  AuthResult,
  RefreshTokenRequest,
  LogoutRequest,
} from '@api-types/auth';

export const authApi = {
  BASE_URL: '/auth',

  /**
   * Authenticate user with credentials.
   *
   * @param credentials - User login data.
   * @returns Authentication result containing tokens and user info.
   */
  async login(credentials: LoginDto): Promise<AuthResult> {
    return await httpClient.request<AuthResult, LoginDto>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/login`,
      data: credentials,
      requireAuth: false,
    });
  },

  /**
   * Register new user account
   *
   * @param userData - New user registration data.
   */
  async register(userData: RegisterDto): Promise<void> {
    await httpClient.request<void, RegisterDto>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/register`,
      data: userData,
      requireAuth: false,
    });
  },

  /**
   * Refresh authentication token
   *
   * @param request - Request containing refresh token.
   * @returns New authentication result.
   */
  async refreshToken(request: RefreshTokenRequest): Promise<AuthResult> {
    return await httpClient.request<AuthResult, RefreshTokenRequest>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/refresh`,
      data: request,
      requireAuth: false,
    });
  },

  /**
   * Logout current user
   *
   * @param request - Optional logout data.
   */
  async logout(request?: LogoutRequest): Promise<void> {
    await httpClient.request<void, LogoutRequest>({
      method: HttpMethod.POST,
      url: `${this.BASE_URL}/logout`,
      data: request,
      requireAuth: true,
    });
  },
};
