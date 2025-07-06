import React from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { SummaryCard } from './SummaryCard';

interface SummaryStatsProps {
  stats: {
    totalAnalyses: number;
    uniqueDatasets: number;
    analysisTypes: number;
  };
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ stats }) => {
  const summaryItems = [
    {
      icon: BarChart3,
      value: stats.totalAnalyses,
      label: 'Total Analyses',
      bgColor: 'blue' as const,
    },
    {
      icon: TrendingUp,
      value: stats.uniqueDatasets,
      label: 'Unique Datasets',
      bgColor: 'emerald' as const,
    },
    {
      icon: Activity,
      value: stats.analysisTypes,
      label: 'Analysis Types',
      bgColor: 'purple' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryItems.map((item, index) => (
        <SummaryCard key={index} {...item} />
      ))}
    </div>
  );
};

export { SummaryStats };
