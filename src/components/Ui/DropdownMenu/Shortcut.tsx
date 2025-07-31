import React from 'react';
import { cn } from '@libs/utils/cn';

const shortcutClasses = `
  ml-auto
  text-xs
  tracking-widest
  opacity-60
`;

const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span ref={ref} className={cn(shortcutClasses, className)} {...props} />
  );
});

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export { DropdownMenuShortcut };
