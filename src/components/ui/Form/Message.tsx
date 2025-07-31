import * as React from 'react';
import { cn } from '@libs/utils/cn';
import { useFormField } from '@hooks/features/ui/useFormField';

const messageClasses = `
  text-sm
  font-medium
  text-destructive
`;

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(messageClasses, className)}
      {...props}
    >
      {body}
    </p>
  );
});

FormMessage.displayName = 'FormMessage';

export { FormMessage };
