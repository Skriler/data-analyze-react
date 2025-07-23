import React from 'react';
import type { Control } from 'react-hook-form';
import { CATEGORICAL_METRICS, type FormData } from '@shared/analysis';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';

interface Props {
  control: Control<FormData>;
}

const CategoricalMetricSelector: React.FC<Props> = ({ control }) => (
  <FormField
    control={control}
    name="categoricalMetric"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-slate-800">
          Categorical Metric
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="h-11 border-2 border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-200">
              <SelectValue placeholder="Select categorical metric" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-white border-slate-200 shadow-lg">
            {CATEGORICAL_METRICS.map(metric => (
              <SelectItem
                key={metric}
                value={metric}
                className="hover:bg-slate-100 focus:bg-blue-50 focus:text-blue-900 data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-900"
              >
                {metric}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export { CategoricalMetricSelector };
