import type { ReactElement, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { toastVariants } from '@components/Ui/Toast';

// === Toast configuration constants ===
export const TOAST_CONFIG = {
  LIMIT: 3,
  REMOVE_DELAY: 5000,
  DEFAULT_DURATION: 4000,
} as const;

export const TOAST_ACTION_TYPES = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

/**
 * Toast variant type.
 */
export type ToastVariant = VariantProps<typeof toastVariants>['variant'];

/**
 * Toast action element interface.
 */
export interface ToastActionElement extends ReactElement {
  altText?: string;
}

/**
 * Base toast properties.
 */
export interface BaseToastProps {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  variant?: ToastVariant;
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Properties for creating a toast (excluding auto-generated fields).
 */
export type CreateToastProps = Omit<
  BaseToastProps,
  'id' | 'open' | 'onOpenChange'
>;

/**
 * Toast state interface.
 */
export interface ToastState {
  toasts: BaseToastProps[];
}

/**
 * Toast action types for reducer.
 */
export type ToastActionType = keyof typeof TOAST_ACTION_TYPES;

/**
 * Reducer actions.
 */
export type ToastAction =
  | {
      type: 'ADD_TOAST';
      toast: BaseToastProps;
    }
  | {
      type: 'UPDATE_TOAST';
      toast: Partial<BaseToastProps> & { id: string };
    }
  | {
      type: 'DISMISS_TOAST';
      toastId?: string;
    }
  | {
      type: 'REMOVE_TOAST';
      toastId?: string;
    };

/**
 * Return value when creating a toast.
 */
export interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: Partial<BaseToastProps>) => void;
}

/**
 * useToast hook return interface.
 */
export interface UseToastReturn extends ToastState {
  toast: (props: CreateToastProps) => ToastReturn;
  dismiss: (toastId?: string) => void;
  dismissAll: () => void;
}
