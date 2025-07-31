import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@libs/utils/cn';

const titleClasses = `
  text-lg
  font-semibold
  leading-none
  tracking-tight
`;

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(titleClasses, className)}
    {...props}
  />
));

DialogTitle.displayName = 'DialogTitle';

export { DialogTitle };
