let toastCounter = 0;

/**
 * Generate unique toast ID using internal counter.
 * Uses overflow protection for long-running applications.
 */
export const generateToastId = (): string => {
  toastCounter = (toastCounter + 1) % Number.MAX_SAFE_INTEGER;
  return `toast-${toastCounter}`;
};

/**
 * Create safe callback with error handling.
 *
 * @param callback - Original callback
 * @param errorHandler - Error handler (optional)
 */
export const createSafeCallback = (
  callback: () => void,
  errorHandler?: (error: Error) => void
) => {
  return () => {
    try {
      callback();
    } catch (error) {
      console.error('Toast callback error:', error);
      errorHandler?.(error as Error);
    }
  };
};
