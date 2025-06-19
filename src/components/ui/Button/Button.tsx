import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@libs/utils/cn';
import { Spinner } from '@components/Ui/Spinner';

const baseButtonClasses = `
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  rounded-md
  text-sm
  font-medium
  ring-offset-background
  transition-colors
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0
`;

const buttonVariants = cva(baseButtonClasses, {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const getSpinnerSize = (size?: string | null): 'sm' | 'md' | 'lg' => {
  const sizes: Record<string, 'sm' | 'md' | 'lg'> = {
    sm: 'sm',
    lg: 'lg',
    icon: 'md',
  };

  return sizes[size ?? ''] ?? 'md';
};

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant,
        size,
        asChild = false,
        loading,
        disabled,
        children,
        ...props
      },
      ref
    ) => {
      const Comp = asChild ? Slot : 'button';

      const computedClassName = React.useMemo(
        () => cn(buttonVariants({ variant, size, className })),
        [variant, size, className]
      );

      const isDisabled = React.useMemo(
        () => disabled || loading,
        [disabled, loading]
      );

      const spinnerSize = React.useMemo(() => getSpinnerSize(size), [size]);

      return (
        <Comp
          className={computedClassName}
          ref={ref}
          disabled={isDisabled}
          aria-busy={loading}
          {...props}
        >
          {loading ? (
            <>
              <Spinner size={spinnerSize} />
              {children}
            </>
          ) : (
            children
          )}
        </Comp>
      );
    }
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };
