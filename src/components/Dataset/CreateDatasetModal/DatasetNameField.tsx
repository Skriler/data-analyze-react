import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import type { CreateDatasetFormData } from '@hooks/datasets/schemas';

interface DatasetNameFieldProps {
  control: Control<CreateDatasetFormData>;
}

function DatasetNameField({ control }: DatasetNameFieldProps) {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dataset Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter dataset name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { DatasetNameField };
