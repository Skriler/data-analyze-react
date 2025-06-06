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
  Roles: string[];
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
