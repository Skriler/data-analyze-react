import { useState, useEffect, useCallback, useMemo } from 'react';
import { generateToastId } from '@libs/toast';
import { toastReducer, handleToastDismissal } from './reducer';
import type {
  ToastState,
  ToastAction,
  CreateToastProps,
  ToastReturn,
  BaseToastProps,
  UseToastReturn,
} from '@api-types/toast';

/**
 * Global state management.
 */
const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

const dispatch = (action: ToastAction): void => {
  memoryState = toastReducer(memoryState, action);
  listeners.forEach(listener => listener(memoryState));
};

/**
 * Create and manage a toast
 *
 * @param props - Toast creation properties
 * @returns Toast management object
 */
const createToast = (props: CreateToastProps): ToastReturn => {
  const id = generateToastId();

  const update = useCallback(
    (updatedProps: Partial<BaseToastProps>) => {
      dispatch({
        type: 'UPDATE_TOAST',
        toast: { ...updatedProps, id },
      });
    },
    [id]
  );

  const dismiss = useCallback(() => {
    handleToastDismissal(id, memoryState, dispatch);
  }, [id]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        dismiss();
      }
    },
    [dismiss]
  );

  const toast: BaseToastProps = {
    ...props,
    id,
    open: true,
    onOpenChange,
  };

  dispatch({
    type: 'ADD_TOAST',
    toast,
  });

  return { id, dismiss, update };
};

/**
 * Toast hook for managing toast state and actions
 *
 * @returns Toast state and management functions
 */
export const useToast = (): UseToastReturn => {
  const [state, setState] = useState<ToastState>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const toast = useCallback((props: CreateToastProps) => {
    return createToast(props);
  }, []);

  const dismiss = useCallback(
    (toastId?: string) => {
      handleToastDismissal(toastId, state, dispatch);
    },
    [state]
  );

  const dismissAll = useCallback(() => {
    dismiss();
  }, [dismiss]);

  const actions = useMemo(
    () => ({
      toast,
      dismiss,
      dismissAll,
    }),
    [toast, dismiss, dismissAll]
  );

  return {
    ...state,
    ...actions,
  };
};

/**
 * Standalone toast function for imperative usage
 */
export const toast = createToast;
