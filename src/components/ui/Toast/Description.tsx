import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@libs/utils/cn';

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => {
  const computedClassName = React.useMemo(
    () => cn('text-sm opacity-90', className),
    [className]
  );

  return (
    <ToastPrimitives.Description
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

ToastDescription.displayName = 'ToastDescription';

export { ToastDescription };
