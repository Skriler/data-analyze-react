import React from 'react';
import type { Control } from 'react-hook-form';
import { NUMERIC_METRICS, type FormData } from '@shared/analysis';
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

const NumericMetricSelector: React.FC<Props> = ({ control }) => (
  <FormField
    control={control}
    name="numericMetric"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-slate-800">
          Numeric Metric
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="h-11 border-2 border-slate-200 bg-white focus:border-slate-400 focus:ring-slate-200">
              <SelectValue placeholder="Select numeric metric" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {NUMERIC_METRICS.map(metric => (
              <SelectItem key={metric} value={metric}>
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

export { NumericMetricSelector };
