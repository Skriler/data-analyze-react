import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authStorage } from '@libs/storage/storage';
import { authApi } from '@api/endpoints/auth';
import type {
  AuthResult,
  LoginDto,
  RegisterDto,
  UserInfo,
} from '@api-types/auth';
import type { AuthQueryState } from './types';

const AUTH_QUERY_KEYS = {
  state: ['auth'] as const,
} as const;

/**
 * Utility function to build a consistent `AuthQueryState` object.
 */
const createAuthState = (
  isAuthenticated: boolean,
  isAdmin: boolean = false,
  user: UserInfo | null = null
): AuthQueryState => ({
  isAuthenticated,
  isAdmin,
  user,
});

/**
 * Invalidates queries that are tied to authentication context,
 * e.g., datasets or analysis that depend on user permissions.
 */
const invalidateAuthRelatedQueries = (
  queryClient: ReturnType<typeof useQueryClient>
) => {
  queryClient.invalidateQueries({ queryKey: ['datasets'] });
  queryClient.invalidateQueries({ queryKey: ['analysis'] });
};

/**
 * Login user and store auth state.
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResult, Error, LoginDto>({
    mutationFn: (credentials: LoginDto) => authApi.login(credentials),

    onSuccess: (authResult: AuthResult) => {
      if (!authResult.Success) return;

      authStorage.setAuthData(authResult);

      const authState = createAuthState(true, authStorage.isAdmin(), {
        username: authResult.Username,
        roles: authResult.Roles,
        expiration: authResult.Expiration,
      } as UserInfo);

      queryClient.setQueryData(AUTH_QUERY_KEYS.state, authState);
      invalidateAuthRelatedQueries(queryClient);
    },
  });
};

/**
 * Register a new user account.
 */
export const useRegister = () => {
  return useMutation<void, Error, RegisterDto>({
    mutationFn: (userData: RegisterDto) => authApi.register(userData),

    onSuccess: () => {
      // TODO: Handle successful registration
      console.log('Registration successful');
    },
  });
};

/**
 * Logout currently authenticated user and clear cache.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),

    onSettled: () => {
      authStorage.clearAuth();

      const loggedOutState = createAuthState(false);

      queryClient.setQueryData(AUTH_QUERY_KEYS.state, loggedOutState);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.state });

      invalidateAuthRelatedQueries(queryClient);
    },
  });
};

/**
 * Load current auth state from local storage and cache in React Query.
 */
export const useAuthState = () => {
  return useQuery<AuthQueryState, Error>({
    queryKey: AUTH_QUERY_KEYS.state,

    queryFn: (): AuthQueryState => {
      const isAuthenticated = authStorage.isAuthenticated();
      const isAdmin = authStorage.isAdmin();
      const userResult = authStorage.getUserInfo();

      return createAuthState(
        isAuthenticated,
        isAdmin,
        userResult.success && userResult.data ? userResult.data : null
      );
    },

    staleTime: Infinity,
  });
};
