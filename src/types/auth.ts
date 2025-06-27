/**
 * DTO used for user login.
 */
export interface LoginDto {
  username: string;
  password: string;
}

/**
 * Result object of a user authentication attempt.
 */
export interface AuthResult {
  success: boolean;
  error: string;
  token: string;
  expiration: string;
  username: string;
  roles: UserRole[];
}
/**
 * DTO used for user registration.
 */
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Contains basic information about an authenticated user.
 */
export interface UserInfo {
  username: string;
  roles: UserRole[];
  expiration: string;
}

/**
 * Enum representing the available user roles.
 */
export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

/**
 * DTO used to request a new access token using a refresh token.
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * DTO used for user logout.
 * Optionally includes a refresh token to revoke on the server.
 */
export interface LogoutRequest {
  refreshToken?: string;
}
