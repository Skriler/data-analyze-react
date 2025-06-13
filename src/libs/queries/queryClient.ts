import { ApiError } from '@api/types';
import { QueryClient } from '@tanstack/react-query';

/**
 * Retry decision function used by React Query.
 *
 * Determines whether a request should be retried based on the error and number of previous attempts.
 *
 * @param maxRetries - Maximum number of retry attempts allowed.
 * @returns A function compatible with React Query retry option.
 */
const shouldRetry = (maxRetries: number) => {
  return (failureCount: number, error: unknown): boolean => {
    if (error instanceof ApiError && error.status >= 400) {
      return false; // Do not retry for HTTP errors 400+
    }

    return failureCount < maxRetries;
  };
};

/**
 * Configured React Query client with sensible defaults.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      gcTime: 30 * 60 * 1000, // Cache retained in memory for 30 minutes

      refetchOnWindowFocus: false, // Do not refetch when window gains focus
      refetchOnReconnect: true, // Refetch on network reconnect
      refetchOnMount: true, // Refetch when component mounts

      retry: shouldRetry(3), // Up to 3 retry attempts for queries
      // Exponential backoff delay: 1s, 2s, 4s, capped at 30s
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },

    mutations: {
      retry: shouldRetry(1), // Only 1 retry allowed for mutations
      retryDelay: 1000, // Fixed 1 second delay for mutation retries
    },
  },
});
