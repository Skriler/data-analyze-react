import React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext =
  React.createContext<FormFieldContextValue | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const contextValue = React.useMemo(
    () => ({ name: props.name }),
    [props.name]
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export { FormField };
