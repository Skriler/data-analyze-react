import React from 'react';
import type { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import { Badge } from '@components/Ui/Badge';
import type { AlgorithmSettingField, FormData } from '@shared/analysis';

interface ParameterFieldsProps {
  control: Control<FormData>;
  analysisType: FormData['type'];
  color: string;
}

const ParameterFields: React.FC<ParameterFieldsProps> = ({
  control,
  analysisType,
  color,
}) => {
  if (analysisType === 'kmeans') {
    return (
      <div className="space-y-6">
        <ParameterField
          control={control}
          name="numberOfClusters"
          label="Number of Clusters"
          placeholder="Enter number of clusters"
          min={2}
          max={20}
          defaultValue={5}
          color={color}
        />
        <ParameterField
          control={control}
          name="maxIterations"
          label="Max Iterations"
          placeholder="Enter max iterations"
          min={10}
          max={1000}
          defaultValue={40}
          color={color}
        />
      </div>
    );
  }

  if (analysisType === 'dbscan') {
    return (
      <div className="space-y-6">
        <ParameterField
          control={control}
          name="epsilon"
          label="Epsilon (ε)"
          placeholder="Enter epsilon value"
          min={0.01}
          max={1}
          step={0.01}
          defaultValue={0.2}
          color={color}
        />
        <ParameterField
          control={control}
          name="minPoints"
          label="Min Points"
          placeholder="Enter minimum points"
          min={2}
          max={20}
          defaultValue={2}
          color={color}
        />
      </div>
    );
  }

  if (analysisType === 'agglomerative') {
    return (
      <ParameterField
        control={control}
        name="threshold"
        label="Threshold"
        placeholder="Enter threshold value"
        min={0.01}
        max={1}
        step={0.01}
        defaultValue={0.2}
        color={color}
      />
    );
  }

  return null;
};

interface ParameterFieldProps {
  control: Control<FormData>;
  name: AlgorithmSettingField;
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
  color: string;
}

const ParameterField: React.FC<ParameterFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  min,
  max,
  step,
  defaultValue,
  color,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => {
      // Приводим значение к числу или используем defaultValue
      const currentValue =
        typeof field.value === 'number' ? field.value : defaultValue;

      return (
        <FormItem>
          <FormLabel className="flex items-center justify-between text-slate-900 font-semibold">
            <span>{label}</span>
            <Badge
              variant="outline"
              className={`bg-${color}-50 border-${color}-200 text-${color}-800 font-mono`}
            >
              {currentValue}
            </Badge>
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              className={`h-12 border-2 border-slate-200 focus:border-${color}-400 focus:ring-${color}-200 bg-white`}
              min={min}
              max={max}
              step={step}
              value={currentValue}
              onChange={e => {
                const value = parseFloat(e.target.value);
                field.onChange(isNaN(value) ? defaultValue : value);
              }}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);

export { ParameterFields };
