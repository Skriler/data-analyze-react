import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@libs/utils/cn';

const itemClasses = `
  relative
  flex
  cursor-default
  select-none
  items-center
  gap-2
  rounded-sm
  px-2
  py-1.5
  text-sm
  outline-none
  transition-colors
  focus:bg-accent
  focus:text-accent-foreground
  data-[disabled]:pointer-events-none
  data-[disabled]:opacity-50
  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0
`;

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
}

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(itemClasses, inset && 'pl-8', className)}
      {...props}
    />
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

export { DropdownMenuItem };
