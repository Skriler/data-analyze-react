import { TOAST_CONFIG } from '@api-types/toast';

/**
 * Toast timeout manager for automatic toast removal.
 * Singleton pattern for global timeout management.
 */
export class ToastTimeoutManager {
  private static instance: ToastTimeoutManager;
  private timeouts = new Map<string, number>();

  private constructor() {}

  public static getInstance(): ToastTimeoutManager {
    if (!ToastTimeoutManager.instance) {
      ToastTimeoutManager.instance = new ToastTimeoutManager();
    }

    return ToastTimeoutManager.instance;
  }

  /**
   * Add toast to removal queue.
   *
   * @param toastId - Toast ID
   * @param onRemove - Removal callback
   * @param delay - Delay in ms (default from config)
   */
  public addToRemovalQueue = (
    toastId: string,
    onRemove: () => void,
    delay: number = TOAST_CONFIG.REMOVE_DELAY
  ): void => {
    // Prevent duplicate timeouts
    if (this.timeouts.has(toastId)) {
      return;
    }

    const timeout = window.setTimeout(() => {
      this.timeouts.delete(toastId);
      onRemove();
    }, delay);

    this.timeouts.set(toastId, timeout);
  };

  /**
   * Clear timeout for specific toast.
   *
   * @param toastId - Toast ID
   */
  public clearTimeout = (toastId: string): void => {
    const timeout = this.timeouts.get(toastId);
    if (timeout) {
      window.clearTimeout(timeout);
      this.timeouts.delete(toastId);
    }
  };

  /**
   * Clear all active timeouts.
   */
  public clearAllTimeouts = (): void => {
    this.timeouts.forEach(timeout => window.clearTimeout(timeout));
    this.timeouts.clear();
  };

  /**
   * Check if toast has active timeout.
   *
   * @param toastId - Toast ID
   */
  public hasTimeout = (toastId: string): boolean => {
    return this.timeouts.has(toastId);
  };

  /**
   * Get count of active timeouts.
   */
  public getActiveTimeoutsCount = (): number => {
    return this.timeouts.size;
  };

  /**
   * Get all active toast IDs with timeouts.
   */
  public getActiveToastIds = (): string[] => {
    return Array.from(this.timeouts.keys());
  };
}

/**
 * Export singleton instance.
 */
export const toastTimeoutManager = ToastTimeoutManager.getInstance();
