import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@libs/utils/cn';
import { useFormField } from './useFormField';

const labelClasses = `
  text-sm
  font-medium
  leading-none
  peer-disabled:cursor-not-allowed
  peer-disabled:opacity-70
`;

const modalLabelClasses = `
  text-gray-700
  font-medium
  text-base
`;

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  variant?: 'default' | 'modal';
}

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, variant = 'default', ...props }, ref) => {
  const { error, formItemId } = useFormField();

  const variantClasses = variant === 'modal' ? modalLabelClasses : '';

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelClasses,
        variantClasses,
        error && 'text-destructive',
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
});

FormLabel.displayName = 'FormLabel';

export { FormLabel };
