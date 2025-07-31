import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@libs/utils/cn';

const labelClasses = `
  px-2
  py-1.5
  text-sm
  font-semibold
`;

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(labelClasses, inset && 'pl-8', className)}
      {...props}
    />
  );
});

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export { DropdownMenuLabel };
