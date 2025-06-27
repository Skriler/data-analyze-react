import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check } from 'lucide-react';
import { cn } from '@libs/utils/cn';

const itemClasses = `
  relative
  flex
  w-full
  cursor-default
  select-none
  items-center
  rounded-sm
  py-1.5
  pl-8
  pr-2
  text-sm
  outline-none
  focus:bg-accent
  focus:text-accent-foreground
  data-[disabled]:pointer-events-none
  data-[disabled]:opacity-50
`;

const indicatorWrapperClasses = `
  absolute
  left-2
  flex
  h-3.5
  w-3.5
  items-center
  justify-center
`;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(itemClasses, className)}
    {...props}
  >
    <span className={indicatorWrapperClasses}>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = 'SelectItem';

export { SelectItem };
