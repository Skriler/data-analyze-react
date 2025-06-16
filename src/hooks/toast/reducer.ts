import { createSafeCallback, toastTimeoutManager } from '@libs/toast';
import {
  TOAST_CONFIG,
  type ToastAction,
  type ToastState,
} from '@api-types/toast';

/**
 * Add toast to removal queue.
 *
 * @param toastId - Toast ID
 * @param dispatch - Dispatch function
 */
const addToRemovalQueue = (
  toastId: string,
  dispatch: (action: ToastAction) => void
): void => {
  const safeRemove = createSafeCallback(() => {
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    });
  });

  toastTimeoutManager.addToRemovalQueue(toastId, safeRemove);
};

/**
 * Toast state reducer.
 * Manages all state changes through actions.
 */
export const toastReducer = (
  state: ToastState,
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST': {
      const { toast } = action;

      // Check if toast with this ID already exists
      const existingToast = state.toasts.find(t => t.id === toast.id);
      if (existingToast) {
        console.warn(`Toast with ID ${toast.id} already exists`);
        return state;
      }

      // Add new toast to beginning and slice to limit
      const newToasts = [toast, ...state.toasts].slice(0, TOAST_CONFIG.LIMIT);

      return {
        ...state,
        toasts: newToasts,
      };
    }

    case 'UPDATE_TOAST': {
      const { toast: updatedToast } = action;

      return {
        ...state,
        toasts: state.toasts.map(toast =>
          toast.id === updatedToast.id ? { ...toast, ...updatedToast } : toast
        ),
      };
    }

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      return {
        ...state,
        toasts: state.toasts.map(toast =>
          toast.id === toastId || !toastId ? { ...toast, open: false } : toast
        ),
      };
    }

    case 'REMOVE_TOAST': {
      const { toastId } = action;

      // If no ID specified, remove all toasts
      if (!toastId) {
        // Clear all timeouts
        toastTimeoutManager.clearAllTimeouts();
        return {
          ...state,
          toasts: [],
        };
      }

      // Remove specific toast and its timeout
      toastTimeoutManager.clearTimeout(toastId);

      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== toastId),
      };
    }

    default:
      console.warn('Unknown toast action type:', (action as any).type);
      return state;
  }
};

/**
 * Handle toast dismissal with timeout management.
 *
 * @param toastId - Toast ID for dismissal (if not specified, dismiss all)
 * @param state - Current state
 * @param dispatch - Dispatch function
 */
export const handleToastDismissal = (
  toastId: string | undefined,
  state: ToastState,
  dispatch: (action: ToastAction) => void
): void => {
  // Add to removal queue
  if (toastId) {
    addToRemovalQueue(toastId, dispatch);
  } else {
    // If no ID specified, add all toasts to removal queue
    state.toasts.forEach(toast => {
      addToRemovalQueue(toast.id, dispatch);
    });
  }

  // Immediately mark as closed
  dispatch({
    type: 'DISMISS_TOAST',
    toastId,
  });
};

/**
 * Force remove toast without dismissal animation.
 *
 * @param toastId - Toast ID
 * @param dispatch - Dispatch function
 */
export const forceRemoveToast = (
  toastId: string,
  dispatch: (action: ToastAction) => void
): void => {
  dispatch({
    type: 'REMOVE_TOAST',
    toastId,
  });
};
