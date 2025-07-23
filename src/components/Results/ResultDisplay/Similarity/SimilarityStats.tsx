import React from 'react';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { StatCard } from '../StatCard';
import { ResultsProcessor, ResultsFormatter } from '@libs/utils/results';
import type { SimilarityAnalysisResult } from '@api-types/analysis';

interface SimilarityStatsProps {
  result: SimilarityAnalysisResult;
}

const SimilarityStats: React.FC<SimilarityStatsProps> = ({ result }) => {
  const stats = ResultsProcessor.calculateSimilarityStats(result);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={Target}
        value={ResultsFormatter.formatNumber(stats.totalPairs)}
        label="Similarity Pairs"
        bgColor="from-blue-50 to-blue-100"
        iconColor="bg-blue-500"
        textColor="text-blue-900"
        borderColor="border-blue-200"
      />
      <StatCard
        icon={TrendingUp}
        value={ResultsFormatter.formatNumber(stats.avgSimilarity) + '%'}
        label="Avg Similarity"
        bgColor="from-emerald-50 to-emerald-100"
        iconColor="bg-emerald-500"
        textColor="text-emerald-900"
        borderColor="border-emerald-200"
      />
      <StatCard
        icon={Zap}
        value={ResultsFormatter.formatNumber(stats.maxSimilarity) + '%'}
        label="Max Similarity"
        bgColor="from-purple-50 to-purple-100"
        iconColor="bg-purple-500"
        textColor="text-purple-900"
        borderColor="border-purple-200"
      />
    </div>
  );
};

export { SimilarityStats };
