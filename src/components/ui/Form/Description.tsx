import * as React from 'react';
import { cn } from '@libs/utils/cn';
import { useFormField } from './useFormField';

const descriptionClasses = `
  text-sm
  text-muted-foreground
`;

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(descriptionClasses, className)}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';

export { FormDescription };
