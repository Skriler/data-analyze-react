import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { cn } from '@libs/utils/cn';

const checkboxItemClasses = `
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

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(checkboxItemClasses, className)}
      checked={checked}
      {...props}
    >
      <span className={itemIndicatorWrapperClasses}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export { DropdownMenuCheckboxItem };
