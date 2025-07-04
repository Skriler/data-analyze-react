import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@libs/utils/cn';

const overlayClasses = `
  fixed
  inset-0
  z-50
  bg-black/20
  backdrop-blur-sm
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
`;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(overlayClasses, className)}
    {...props}
  />
));

DialogOverlay.displayName = 'DialogOverlay';

export { DialogOverlay };
