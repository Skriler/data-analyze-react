import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronUp } from 'lucide-react';
import { cn } from '@libs/utils/cn';

const buttonClasses = `
  flex
  cursor-default
  items-center
  justify-center
  py-1
`;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(buttonClasses, className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = 'SelectScrollUpButton';

export { SelectScrollUpButton };
