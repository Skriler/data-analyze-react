import type { Control } from 'react-hook-form';
import { Database } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import type { CreateDatasetFormData } from '@shared/dataset';

interface DatasetNameFieldProps {
  control: Control<CreateDatasetFormData>;
}

function DatasetNameField({ control }: DatasetNameFieldProps) {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Database className="h-4 w-4 text-slate-600" />
            Dataset Name
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder="Enter dataset name (e.g., Sales Data Q4 2024)"
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm hover:border-slate-300"
                {...field}
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-200 focus-within:shadow-lg focus-within:shadow-blue-100" />
            </div>
          </FormControl>
          <FormMessage className="text-xs text-red-600" />
        </FormItem>
      )}
    />
  );
}

export { DatasetNameField };
