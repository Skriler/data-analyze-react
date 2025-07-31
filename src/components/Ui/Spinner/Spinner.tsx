import React from 'react';
import { cn } from '@libs/utils/cn';

const baseSpinnerClasses = `
  animate-spin
  rounded-full
  border-2
  border-t-transparent
`;

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  colorClass?: string;
}

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: `
    h-4
    w-4
  `,
  md: `
    h-8
    w-8
  `,
  lg: `
    h-12
    w-12
  `,
};

export const Spinner = React.memo<SpinnerProps>(
  ({ size = 'md', className, colorClass = 'border-current' }) => (
    <div
      className={cn(baseSpinnerClasses, colorClass, sizeMap[size], className)}
      aria-hidden="true"
    />
  )
);

Spinner.displayName = 'Spinner';
