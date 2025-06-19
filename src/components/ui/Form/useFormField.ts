import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldContext } from './Field';
import { FormItemContext } from './Item';

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext)
    throw new Error('useFormField must be used within a FormFieldContext');
  if (!itemContext)
    throw new Error('useFormField must be used within a FormItemContext');

  const fieldState = React.useMemo(
    () => getFieldState(fieldContext.name, formState),
    [fieldContext.name, formState, getFieldState]
  );

  const { id } = itemContext;

  return React.useMemo(
    () => ({
      id,
      name: fieldContext.name,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
      ...fieldState,
    }),
    [id, fieldContext.name, fieldState]
  );
};

export { useFormField };
