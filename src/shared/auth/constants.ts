export const AUTH_MESSAGES = {
  LOGIN: {
    SUCCESS_TITLE: 'Welcome back!',
    SUCCESS_DESCRIPTION: (username: string) =>
      `Successfully logged in as ${username}.`,
    ERROR_TITLE: 'Login failed',
    ERROR_DESCRIPTION: 'Invalid credentials.',
  },
  REGISTER: {
    SUCCESS_TITLE: 'Registration successful!',
    SUCCESS_DESCRIPTION: 'Your account has been created. You can now log in.',
    ERROR_TITLE: 'Registration failed',
    ERROR_DESCRIPTION: 'An error occurred while creating your account.',
  },
} as const;
