import React from 'react';
import { cn } from '@libs/utils/cn';

export interface SpinnerProps {
  size?: number;
  className?: string;
}

export const Spinner = React.memo<SpinnerProps>(({ size = 4, className }) => (
  <div
    className={cn(
      'animate-spin rounded-full border-2 border-current border-t-transparent',
      className
    )}
    style={{
      width: `${size * 0.25}rem`,
      height: `${size * 0.25}rem`,
    }}
    aria-hidden="true"
  />
));

Spinner.displayName = 'Spinner';
