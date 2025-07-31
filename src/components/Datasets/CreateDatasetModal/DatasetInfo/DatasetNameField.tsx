import type { Control } from 'react-hook-form';
import { AlertCircle, Database } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import type { CreateDatasetFormData } from '@shared/dataset';

interface DatasetNameFieldProps {
  control: Control<CreateDatasetFormData>;
}

const DatasetNameField: React.FC<DatasetNameFieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="name"
    render={({ field, fieldState: { error } }) => (
      <FormItem className="space-y-3">
        <FormLabel className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Database className="h-4 w-4 text-slate-600" />
          Dataset Name
        </FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              placeholder="Enter dataset name (e.g., Sales Data Q4 2024)"
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-sm placeholder:text-slate-400 transition-all duration-200 shadow-sm hover:border-slate-300 ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              }`}
              {...field}
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-200 focus-within:shadow-lg focus-within:shadow-blue-100" />
          </div>
        </FormControl>
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-xs">
            <AlertCircle className="h-3 w-3" />
            <span>{error.message}</span>
          </div>
        )}
      </FormItem>
    )}
  />
);

export { DatasetNameField };
