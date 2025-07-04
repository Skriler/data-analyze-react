import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@libs/utils/cn';
import { SelectScrollUpButton } from './ScrollUpButton';
import { SelectScrollDownButton } from './ScrollDownButton';

const contentClasses = `
  relative
  z-50
  max-h-[--radix-select-content-available-height]
  min-w-[8rem]
  overflow-y-auto
  overflow-x-hidden
  rounded-md
  border
  bg-popover
  text-popover-foreground
  shadow-md
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
  data-[state=closed]:zoom-out-95
  data-[state=open]:zoom-in-95
  data-[side=bottom]:slide-in-from-top-2
  data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2
  data-[side=top]:slide-in-from-bottom-2
  origin-[--radix-select-content-transform-origin]
`;

const popperAdjustClasses = `
  data-[side=bottom]:translate-y-1
  data-[side=left]:-translate-x-1
  data-[side=right]:translate-x-1
  data-[side=top]:-translate-y-1
`;

const viewportClasses = `
  p-1
`;

const viewportPopperAdjustClasses = `
  h-[var(--radix-select-trigger-height)]
  w-full
  min-w-[var(--radix-select-trigger-width)]
`;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        contentClasses,
        position === 'popper' && popperAdjustClasses,
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          viewportClasses,
          position === 'popper' && viewportPopperAdjustClasses
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = 'SelectContent';

export { SelectContent };
