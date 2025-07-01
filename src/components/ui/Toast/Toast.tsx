import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/utils/cn';

const baseToastClasses = `
  group
  pointer-events-auto
  relative
  flex
  w-full
  items-center
  justify-between
  overflow-hidden
  rounded-2xl
  border
  p-4
  pr-6
  shadow-2xl
  backdrop-blur-md
  transition-all
  duration-500
  ease-out
  data-[swipe=cancel]:translate-x-0
  data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
  data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
  data-[swipe=move]:transition-none
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[swipe=end]:animate-out
  data-[state=closed]:fade-out-80
  data-[state=closed]:slide-out-to-right-full
  data-[state=open]:slide-in-from-top-full
  data-[state=open]:sm:slide-in-from-bottom-full
  data-[state=open]:zoom-in-95
  data-[state=closed]:zoom-out-95
`;

export const toastVariants = cva(baseToastClasses, {
  variants: {
    variant: {
      default: `
        border-white/20
        bg-white/90
        text-gray-900
        shadow-black/10
        dark:border-gray-800/50
        dark:bg-gray-900/90
        dark:text-white
      `,
      destructive: `
        destructive
        group
        border-red-200/50
        bg-gradient-to-r
        from-red-50/95
        to-pink-50/95
        text-red-900
        shadow-red-500/20
        dark:border-red-800/50
        dark:from-red-950/90
        dark:to-pink-950/90
        dark:text-red-100
      `,
      success: `
        border-green-200/50
        bg-gradient-to-r
        from-green-50/95
        to-emerald-50/95
        text-green-900
        shadow-green-500/20
        dark:border-green-800/50
        dark:from-green-950/90
        dark:to-emerald-950/90
        dark:text-green-100
      `,
      warning: `
        border-amber-200/50
        bg-gradient-to-r
        from-amber-50/95
        to-yellow-50/95
        text-amber-900
        shadow-amber-500/20
        dark:border-amber-800/50
        dark:from-amber-950/90
        dark:to-yellow-950/90
        dark:text-amber-100
      `,
      info: `
        border-blue-200/50
        bg-gradient-to-r
        from-blue-50/95
        to-indigo-50/95
        text-blue-900
        shadow-blue-500/20
        dark:border-blue-800/50
        dark:from-blue-950/90
        dark:to-indigo-950/90
        dark:text-blue-100
      `,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, ...props }, ref) => {
  const computedClassName = React.useMemo(
    () => cn(toastVariants({ variant }), className),
    [variant, className]
  );

  return (
    <ToastPrimitives.Root ref={ref} className={computedClassName} {...props} />
  );
});

Toast.displayName = 'Toast';

export { Toast };
