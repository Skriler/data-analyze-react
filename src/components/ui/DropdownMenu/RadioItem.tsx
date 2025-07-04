import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Circle } from 'lucide-react';
import { cn } from '@libs/utils/cn';

const radioItemClasses = `
  relative
  flex
  cursor-default
  select-none
  items-center
  rounded-sm
  py-1.5
  pl-8
  pr-2
  text-sm
  outline-none
  transition-colors
  focus:bg-accent
  focus:text-accent-foreground
  data-[disabled]:pointer-events-none
  data-[disabled]:opacity-50
`;

const itemIndicatorWrapperClasses = `
  absolute
  left-2
  flex
  h-3.5
  w-3.5
  items-center
  justify-center
`;

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(radioItemClasses, className)}
      {...props}
    >
      <span className={itemIndicatorWrapperClasses}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export { DropdownMenuRadioItem };
