import React from 'react';
import { SummaryCard } from './SummaryCard';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

interface ResultsSummaryProps {
  stats: {
    totalAnalyses: number;
    uniqueDatasets: number;
    analysisTypes: number;
  };
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        icon={BarChart3}
        value={stats.totalAnalyses}
        label="Total Analyses"
        bgColor="blue"
      />
      <SummaryCard
        icon={TrendingUp}
        value={stats.uniqueDatasets}
        label="Unique Datasets"
        bgColor="emerald"
      />
      <SummaryCard
        icon={Activity}
        value={stats.analysisTypes}
        label="Analysis Types"
        bgColor="purple"
      />
    </div>
  );
};
