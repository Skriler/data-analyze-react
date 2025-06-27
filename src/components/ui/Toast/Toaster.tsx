import React from 'react';
import { useToast } from '@hooks/toast/useToast';
import { ToastProvider, ToastViewport } from './ToastProvider';
import { Toast } from './Toast';
import { ToastTitle } from './Title';
import { ToastDescription } from './Description';
import { ToastClose } from './Close';
import { CheckCircle2, XCircle, AlertTriangle, Info, Bell } from 'lucide-react';

export interface ToasterProps {
  className?: string;
}

const getToastIcon = (variant?: string) => {
  switch (variant) {
    case 'success':
      return (
        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
      );
    case 'destructive':
      return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    case 'warning':
      return (
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      );
    case 'info':
      return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
  }
};

const Toaster = React.memo<ToasterProps>(({ className }) => {
  const { toasts } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <ToastProvider>
      <ToastViewport className={className}>
        {toasts.map(({ id, title, description, action, variant, ...props }) => (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex-shrink-0 mt-0.5">
                {getToastIcon(variant || 'default')}
              </div>
              <div className="flex-1 grid gap-1 min-w-0">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action && <div className="flex-shrink-0 ml-auto">{action}</div>}
            </div>
            <ToastClose />
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
});

Toaster.displayName = 'Toaster';

export { Toaster };
