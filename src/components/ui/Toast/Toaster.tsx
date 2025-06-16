import React from 'react';
import { useToast } from '@hooks/toast/useToast';
import { ToastProvider, ToastViewport } from './ToastProvider';
import { Toast } from './Toast';
import { ToastTitle } from './Title';
import { ToastDescription } from './Description';
import { ToastClose } from './Close';

export interface ToasterProps {
  className?: string;
}

const Toaster = React.memo<ToasterProps>(({ className }) => {
  const { toasts } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <ToastProvider>
      <ToastViewport className={className}>
        {toasts.map(({ id, title, description, action, ...props }) => (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
});

Toaster.displayName = 'Toaster';

export { Toaster };
