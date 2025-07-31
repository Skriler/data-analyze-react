import * as React from 'react';
import { cn } from '@libs/utils/cn';

const footerClasses = `
  flex
  flex-col-reverse
  sm:flex-row
  sm:justify-end
  sm:space-x-2
`;

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(footerClasses, className)} {...props} />
));

DialogFooter.displayName = 'DialogFooter';

export { DialogFooter };
