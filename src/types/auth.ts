/**
 * DTO used for user login.
 */
export interface LoginDto {
  Username: string;
  Password: string;
}

/**
 * Result object of a user authentication attempt.
 */
export interface AuthResult {
  Success: boolean;
  Error: string;
  Token: string;
  Expiration: string;
  Username: string;
  Roles: UserRole[];
}

/**
 * DTO used for user registration.
 */
export interface RegisterDto {
  Username: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  FirstName?: string;
  LastName?: string;
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
