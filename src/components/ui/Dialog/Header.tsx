import * as React from 'react';
import { cn } from '@libs/utils/cn';

const headerClasses = `
  flex
  flex-col
  space-y-1.5
  text-center
  sm:text-left
`;

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(headerClasses, className)} {...props} />
));

DialogHeader.displayName = 'DialogHeader';

export { DialogHeader };
