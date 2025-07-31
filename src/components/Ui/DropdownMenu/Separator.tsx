import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@libs/utils/cn';

const separatorClasses = `
  -mx-1
  my-1
  h-px
  bg-muted
`;

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(separatorClasses, className)}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export { DropdownMenuSeparator };
