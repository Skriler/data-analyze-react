import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Ui/Form';
import { Input } from '@components/Ui/Input';
import type { Control } from 'react-hook-form';
import type { FormData } from './analysisSchema';

interface AlgorithmSettingsProps {
  control: Control<FormData>;
  analysisType: FormData['type'];
}

const AlgorithmSettings: React.FC<AlgorithmSettingsProps> = ({
  control,
  analysisType,
}) => {
  if (analysisType === 'similarity') {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h5 className="font-medium text-gray-900 mb-3">Algorithm Settings</h5>
      <div className="space-y-4">
        {analysisType === 'kmeans' && (
          <>
            <FormField
              control={control}
              name="numberOfClusters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Clusters</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="2"
                      max="20"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="maxIterations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Iterations</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="100"
                      max="1000"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {analysisType === 'dbscan' && (
          <>
            <FormField
              control={control}
              name="epsilon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Epsilon</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0.1"
                      max="10"
                      step="0.1"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="minPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Points</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="2"
                      max="100"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {analysisType === 'agglomerative' && (
          <FormField
            control={control}
            name="threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Threshold</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export { AlgorithmSettings };
