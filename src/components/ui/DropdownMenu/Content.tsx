import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@libs/utils/cn';

const contentClasses = `
  z-50
  max-h-[var(--radix-dropdown-menu-content-available-height)]
  min-w-[8rem]
  overflow-y-auto
  overflow-x-hidden
  rounded-md
  border
  bg-popover
  p-1
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
  origin-[--radix-dropdown-menu-content-transform-origin]
`;

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(contentClasses, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

export { DropdownMenuContent };
