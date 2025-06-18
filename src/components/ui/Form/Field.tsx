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
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  const { name, control, render, ...rest } = props;

  const contextValue: FormFieldContextValue<TFieldValues, TName> = { name };

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller name={name} control={control} render={render} {...rest} />
    </FormFieldContext.Provider>
  );
};

export { FormField };
