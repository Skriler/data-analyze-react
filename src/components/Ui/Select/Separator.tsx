import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@libs/utils/cn';

const separatorClasses = `
  -mx-1
  my-1
  h-px
  bg-muted
`;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(separatorClasses, className)}
    {...props}
  />
));

SelectSeparator.displayName = 'SelectSeparator';

export { SelectSeparator };
