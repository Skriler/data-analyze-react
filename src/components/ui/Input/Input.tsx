import React from 'react';
import { cn } from '@libs/utils/cn';

const inputClasses = `
  flex
  h-10
  w-full
  rounded-md
  border
  border-input
  bg-background
  px-3
  py-2
  text-base
  ring-offset-background
  file:border-0
  file:bg-transparent
  file:text-sm
  file:font-medium
  file:text-foreground
  placeholder:text-muted-foreground
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  disabled:cursor-not-allowed
  disabled:opacity-50
  md:text-sm
`;

const modalInputClasses = `
  h-12
  bg-gray-50
  border-gray-200
  focus:border-blue-500
  focus:ring-blue-500
  focus:ring-1
  rounded-lg
`;

export interface InputProps extends React.ComponentProps<'input'> {
  variant?: 'default' | 'modal';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = variant === 'modal' ? modalInputClasses : '';

    return (
      <input
        className={cn(inputClasses, variantClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
