import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@libs/utils/cn';
import { X } from 'lucide-react';

const toastCloseClasses = `
  absolute
  right-3
  top-3
  rounded-full
  p-1.5
  text-foreground/40
  opacity-0
  transition-all
  duration-300
  hover:text-foreground/80
  hover:bg-black/5
  hover:scale-110
  focus:opacity-100
  focus:outline-none
  focus:ring-2
  focus:ring-ring/30
  focus:ring-offset-1
  group-hover:opacity-100
  dark:hover:bg-white/5
  group-[.destructive]:text-red-500/60
  group-[.destructive]:hover:text-red-600
  group-[.destructive]:hover:bg-red-100/30
  group-[.destructive]:focus:ring-red-400/40
  group-[.success]:text-green-500/60
  group-[.success]:hover:text-green-600
  group-[.success]:hover:bg-green-100/30
  group-[.success]:focus:ring-green-400/40
  group-[.warning]:text-amber-600/60
  group-[.warning]:hover:text-amber-700
  group-[.warning]:hover:bg-amber-100/30
  group-[.warning]:focus:ring-amber-400/40
  group-[.info]:text-blue-500/60
  group-[.info]:hover:text-blue-600
  group-[.info]:hover:bg-blue-100/30
  group-[.info]:focus:ring-blue-400/40
`;

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => {
  const computedClassName = React.useMemo(
    () => cn(toastCloseClasses, className),
    [className]
  );

  return (
    <ToastPrimitives.Close
      ref={ref}
      className={computedClassName}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  );
});

ToastClose.displayName = 'ToastClose';

export { ToastClose };
