import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '@libs/utils/cn';

const toastActionClasses = `
  inline-flex
  h-8
  shrink-0
  items-center
  justify-center
  rounded-lg
  border
  border-transparent
  bg-white/50
  px-3
  text-sm
  font-medium
  backdrop-blur-sm
  transition-all
  duration-200
  hover:bg-white/70
  hover:scale-105
  hover:shadow-lg
  focus:outline-none
  focus:ring-2
  focus:ring-ring/30
  focus:ring-offset-2
  active:scale-95
  disabled:pointer-events-none
  disabled:opacity-50
  dark:bg-black/20
  dark:hover:bg-black/30
  group-[.destructive]:bg-red-100/50
  group-[.destructive]:text-red-700
  group-[.destructive]:hover:bg-red-100/70
  group-[.destructive]:focus:ring-red-400/40
  group-[.success]:bg-green-100/50
  group-[.success]:text-green-700
  group-[.success]:hover:bg-green-100/70
  group-[.success]:focus:ring-green-400/40
  group-[.warning]:bg-amber-100/50
  group-[.warning]:text-amber-700
  group-[.warning]:hover:bg-amber-100/70
  group-[.warning]:focus:ring-amber-400/40
  group-[.info]:bg-blue-100/50
  group-[.info]:text-blue-700
  group-[.info]:hover:bg-blue-100/70
  group-[.info]:focus:ring-blue-400/40
`;

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => {
  const computedClassName = React.useMemo(
    () => cn(toastActionClasses, className),
    [className]
  );

  return (
    <ToastPrimitives.Action
      ref={ref}
      className={computedClassName}
      {...props}
    />
  );
});

ToastAction.displayName = 'ToastAction';

export { ToastAction };
