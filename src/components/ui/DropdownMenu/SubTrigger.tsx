import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { cn } from '@libs/utils/cn';

const subTriggerClasses = `
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
  focus:bg-accent
  data-[state=open]:bg-accent
  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0
`;

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.SubTrigger
  > {
  inset?: boolean;
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(subTriggerClasses, inset && 'pl-8', className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export { DropdownMenuSubTrigger };
