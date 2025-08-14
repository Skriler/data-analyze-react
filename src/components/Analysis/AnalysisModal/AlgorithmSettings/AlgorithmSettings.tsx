import React from 'react';
import type { Control } from 'react-hook-form';
import { Settings, Network, Map, GitBranch } from 'lucide-react';
import { Card, CardContent } from '@components/Ui/Card';
import { type FormData } from '@shared/analysis';
import { AlgorithmHeader } from './AlgorithmHeader';
import { NumericMetricSelector } from './NumericMetricSelector';
import { CategoricalMetricSelector } from './CategoricalMetricSelector';
import { ParameterFields } from './ParameterFields';

interface AlgorithmSettingsProps {
  control: Control<FormData>;
  analysisType: FormData['type'];
}

const getAnalysisConfig = (type: FormData['type']) => {
  switch (type) {
    case 'kmeans':
      return {
        title: 'K-Means Configuration',
        description: 'Cluster data into k distinct groups',
        icon: Network,
        gradient: 'from-green-500 to-emerald-600',
        color: 'green',
      };
    case 'dbscan':
      return {
        title: 'DBSCAN Configuration',
        description: 'Density-based spatial clustering',
        icon: Map,
        gradient: 'from-purple-500 to-violet-600',
        color: 'purple',
      };
    case 'agglomerative':
      return {
        title: 'Agglomerative Configuration',
        description: 'Hierarchical clustering approach',
        icon: GitBranch,
        gradient: 'from-orange-500 to-amber-600',
        color: 'orange',
      };
    default:
      return null;
  }
};

const AlgorithmSettings: React.FC<AlgorithmSettingsProps> = ({
  control,
  analysisType,
}) => {
  if (analysisType === 'similarity') return null;

  const config = getAnalysisConfig(analysisType);
  if (!config) return null;

  return (
    <Card className="border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50/50 shadow-sm flex flex-col">
      <CardContent className="p-6 space-y-8 flex-1 flex flex-col">
        <AlgorithmHeader config={config} />

        <div className="flex-1 flex flex-col">
          <ParameterFields
            control={control}
            analysisType={analysisType}
            color={config.color}
          />

          <div className="space-y-4 border-t pt-6 mt-6">
            <div className="flex items-center space-x-2 text-slate-700">
              <Settings className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Distance Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NumericMetricSelector control={control} />
              <CategoricalMetricSelector control={control} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { AlgorithmSettings };
