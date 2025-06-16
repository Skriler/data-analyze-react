import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@libs/utils/cn';

const toastViewportClasses = `
  fixed
  top-0
  z-[100]
  flex
  max-h-screen
  w-full
  flex-col-reverse
  p-4
  sm:bottom-0
  sm:right-0
  sm:top-auto
  sm:flex-col
  md:max-w-[420px]
`;

export interface ToastProviderProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Provider> {
  children: React.ReactNode;
}

const ToastProvider = React.memo<ToastProviderProps>(
  ({ children, ...props }) => (
    <ToastPrimitives.Provider {...props}>{children}</ToastPrimitives.Provider>
  )
);

ToastProvider.displayName = 'ToastProvider';

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {}

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => {
  const computedClassName = React.useMemo(
    () => cn(toastViewportClasses, className),
    [className]
  );

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export { ToastProvider, ToastViewport };
