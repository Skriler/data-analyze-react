import { type UserInfo, type AuthResult, UserRole } from '@api-types/auth';
import { AuthError, type StorageResult } from './types';

export const authStorage = {
  STORAGE_KEYS: {
    TOKEN: 'data_analyze_token',
    USER: 'data_analyze_user',
  } as const,

  // === Error handling ===

  handleStorageError(operation: string, error: unknown): void {
    const message = `Auth storage ${operation} failed`;
    console.error(message, error);
  },

  // === Validation ===

  isValidUserInfo(user: unknown): user is UserInfo {
    return (
      typeof user === 'object' &&
      user !== null &&
      'username' in user &&
      'roles' in user &&
      'expiration' in user &&
      typeof (user as UserInfo).username === 'string' &&
      Array.isArray((user as UserInfo).roles)
    );
  },

  isValidToken(token: unknown): token is string {
    return typeof token === 'string' && token.length > 0;
  },

  // === Token operations ===

  getToken(): StorageResult<string> {
    try {
      const token = localStorage.getItem(this.STORAGE_KEYS.TOKEN);

      if (!token) {
        return {
          success: false,
          error: AuthError.INVALID_TOKEN,
        };
      }

      if (!this.isValidToken(token)) {
        return {
          success: false,
          error: AuthError.INVALID_TOKEN,
        };
      }

      return {
        success: true,
        data: token,
      };
    } catch (error) {
      this.handleStorageError('getToken', error);

      return {
        success: false,
        error: AuthError.STORAGE_UNAVAILABLE,
      };
    }
  },

  setToken(token: string): StorageResult<void> {
    try {
      if (!this.isValidToken(token)) {
        return {
          success: false,
          error: AuthError.INVALID_TOKEN,
        };
      }

      localStorage.setItem(this.STORAGE_KEYS.TOKEN, token);
      return { success: true };
    } catch (error) {
      this.handleStorageError('setToken', error);

      return {
        success: false,
        error: AuthError.STORAGE_UNAVAILABLE,
      };
    }
  },

  // === User info operations ===

  getUserInfo(): StorageResult<UserInfo> {
    try {
      const userInfoStr = localStorage.getItem(this.STORAGE_KEYS.USER);

      if (!userInfoStr) {
        return {
          success: false,
          error: AuthError.INVALID_TOKEN,
        };
      }

      const userInfo = JSON.parse(userInfoStr);

      if (!this.isValidUserInfo(userInfo)) {
        return {
          success: false,
          error: AuthError.PARSE_ERROR,
        };
      }

      return {
        success: true,
        data: userInfo,
      };
    } catch (error) {
      this.handleStorageError('getUserInfo', error);

      return {
        success: false,
        error: AuthError.PARSE_ERROR,
      };
    }
  },

  setUserInfo(user: UserInfo): StorageResult<void> {
    try {
      if (!this.isValidUserInfo(user)) {
        return {
          success: false,
          error: AuthError.PARSE_ERROR,
        };
      }

      localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
      return { success: true };
    } catch (error) {
      this.handleStorageError('setUserInfo', error);

      return {
        success: false,
        error: AuthError.STORAGE_UNAVAILABLE,
      };
    }
  },

  // === Auth data operations ===

  setAuthData(authResult: AuthResult): StorageResult<void> {
    if (!authResult.success) {
      return {
        success: false,
        error: AuthError.INVALID_TOKEN,
      };
    }

    const tokenResult = this.setToken(authResult.token);
    if (!tokenResult.success) {
      return tokenResult;
    }

    const userResult = this.setUserInfo({
      username: authResult.username,
      roles: authResult.roles,
      expiration: authResult.expiration,
    });

    return userResult;
  },

  clearAuth(): StorageResult<void> {
    try {
      localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
      localStorage.removeItem(this.STORAGE_KEYS.USER);

      return { success: true };
    } catch (error) {
      this.handleStorageError('clearAuth', error);

      return {
        success: false,
        error: AuthError.STORAGE_UNAVAILABLE,
      };
    }
  },

  // === Auth state checkss ===

  isTokenExpired(): boolean {
    const userResult = this.getUserInfo();

    if (!userResult.success || !userResult.data?.expiration) {
      return true;
    }

    try {
      const expirationTime = new Date(userResult.data.expiration).getTime();
      const currentTime = Date.now();

      return currentTime >= expirationTime;
    } catch (error) {
      this.handleStorageError('isTokenExpired', error);
      return true;
    }
  },

  isAuthenticated(): boolean {
    const tokenResult = this.getToken();
    return tokenResult.success && !this.isTokenExpired();
  },

  // === Permission checks ===

  hasRole(role: UserRole): boolean {
    const userResult = this.getUserInfo();
    return userResult.success && userResult.data?.roles.includes(role) === true;
  },

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  },
};
