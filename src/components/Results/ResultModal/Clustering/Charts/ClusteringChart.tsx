import React, { useMemo } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
} from 'chart.js';
import { type ProcessedCluster } from '@shared/results/clusteringResultModal';
import { ClusteringChartBuilder } from '@libs/utils/results';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

interface ClusteringChartProps {
  clusters: ProcessedCluster[];
}

const ClusteringChart: React.FC<ClusteringChartProps> = ({ clusters }) => {
  const chartData = useMemo(() => {
    return ClusteringChartBuilder.buildChartData(clusters);
  }, [clusters]);

  const options = useMemo(() => {
    return ClusteringChartBuilder.buildChartOptions(clusters);
  }, [clusters]);

  if (!clusters || clusters.length === 0) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No clustering data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 flex-1 min-h-0 border border-gray-200 flex flex-col">
        <div className="flex-1 min-h-0">
          <Scatter data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export { ClusteringChart };
