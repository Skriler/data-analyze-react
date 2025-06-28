import React from 'react';
import { RadioGroup, RadioGroupItem } from '@components/Ui/RadioGroup';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import { Label } from '@components/Ui/Label';
import { ANALYSIS_TYPES } from './analysisTypes';
import type { Control } from 'react-hook-form';
import type { FormData } from './analysisSchema';

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
        <FormItem>
          <FormLabel className="text-lg font-medium">Analysis Type</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="space-y-3"
            >
              {ANALYSIS_TYPES.map(type => (
                <div
                  key={type.id}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <RadioGroupItem value={type.id} id={type.id} />
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`w-10 h-10 bg-${type.color}-100 rounded-lg flex items-center justify-center`}
                    >
                      <type.icon className={`text-${type.color}-600`} />
                    </div>
                    <div>
                      <Label
                        htmlFor={type.id}
                        className="font-medium text-gray-900 cursor-pointer"
                      >
                        {type.name}
                      </Label>
                      <p className="text-sm text-gray-600">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
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
