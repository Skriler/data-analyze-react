import React, { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import type {
  ProcessedSimilarityPair,
  SimilarityDistributionData,
} from '@shared/results/similarityResultModal';
import { SimilarityChartBuilder } from '@libs/utils/results';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SimilarityChartProps {
  pairs: ProcessedSimilarityPair[];
  distribution: SimilarityDistributionData[];
}

const SimilarityChart: React.FC<SimilarityChartProps> = ({
  pairs,
  distribution,
}) => {
  const histogramData = useMemo(
    () => SimilarityChartBuilder.buildHistogramChart(pairs),
    [pairs]
  );

  const histogramOptions = useMemo(
    () => SimilarityChartBuilder.getHistogramOptions(),
    []
  );

  const doughnutData = useMemo(
    () => SimilarityChartBuilder.buildDoughnutChart(distribution),
    [distribution]
  );

  const doughnutOptions = useMemo(
    () => SimilarityChartBuilder.getDoughnutOptions(distribution),
    [distribution]
  );

  if (pairs.length === 0) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No data available for chart visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
        {/* Histogram */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-80">
            <Bar data={histogramData} options={histogramOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="h-80">
            {distribution.length > 0 ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>No category data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SimilarityChart };
