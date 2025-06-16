import * as React from 'react';
import { cn } from '@libs/utils/cn';

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = React.createContext<FormItemContextValue | null>(
  null
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  const contextValue = React.useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={contextValue}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = 'FormItem';

export { FormItem };
