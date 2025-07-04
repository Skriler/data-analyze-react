import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@libs/utils/cn';

const subContentClasses = `
  z-50
  min-w-[8rem]
  overflow-hidden
  rounded-md
  border
  bg-popover
  p-1
  text-popover-foreground
  shadow-lg
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

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(subContentClasses, className)}
      {...props}
    />
  );
});

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

export { DropdownMenuSubContent };
