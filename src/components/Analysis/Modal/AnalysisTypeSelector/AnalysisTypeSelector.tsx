import React from 'react';
import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/Ui/Form';
import { RadioGroup } from '@components/Ui/RadioGroup';
import type { FormData } from '@shared/analysis';
import { ANALYSIS_TYPE_CONFIGS } from '@shared/analysis';
import { AnalysisTypeItem } from './AnalysisTypeItem';

interface AnalysisTypeSelectorProps {
  control: Control<FormData>;
}

const AnalysisTypeSelector: React.FC<AnalysisTypeSelectorProps> = ({
  control,
}) => {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-6">
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {ANALYSIS_TYPE_CONFIGS.map(type => (
                <AnalysisTypeItem
                  key={type.id}
                  type={type}
                  selected={field.value === type.id}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { AnalysisTypeSelector };
