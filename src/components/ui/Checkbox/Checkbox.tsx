import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@libs/utils/cn';

const checkboxClasses = `
  peer
  h-4
  w-4
  shrink-0
  rounded-sm
  border
  border-primary
  ring-offset-background
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  disabled:cursor-not-allowed
  disabled:opacity-50
  data-[state=checked]:bg-primary
  data-[state=checked]:text-primary-foreground
`;

const checkboxIndicatorClasses = `
  flex
  items-center
  justify-center
  text-current
`;

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxClasses, className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn(checkboxIndicatorClasses)}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';

export { Checkbox };
