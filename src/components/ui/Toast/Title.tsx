import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@libs/utils/cn';

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => {
  const computedClassName = React.useMemo(
    () => cn('text-sm font-semibold leading-none tracking-tight', className),
    [className]
  );

  return (
    <ToastPrimitives.Title ref={ref} className={computedClassName} {...props} />
  );
});

ToastTitle.displayName = 'ToastTitle';

export { ToastTitle };
