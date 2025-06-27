import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@libs/utils/cn';

const labelClasses = `
  py-1.5
  pl-8
  pr-2
  text-sm
  font-semibold
`;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(labelClasses, className)}
    {...props}
  />
));

SelectLabel.displayName = 'SelectLabel';

export { SelectLabel };
