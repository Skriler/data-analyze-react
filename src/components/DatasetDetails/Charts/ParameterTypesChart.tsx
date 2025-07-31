import { useEffect, useRef } from 'react';
import { PieChart } from 'lucide-react';
import * as Chart from 'chart.js';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetStatsData } from '@shared/datasetDetails';
import {
  DatasetChartUtils,
  ParameterDistributionChartBuilder,
} from '@libs/utils/datasetDetails';

interface ChartCanvas extends HTMLCanvasElement {
  chart?: Chart.Chart;
}

interface ParameterTypesChartProps {
  stats: DatasetStatsData;
}

const ParameterTypesChart: React.FC<ParameterTypesChartProps> = ({ stats }) => {
  const pieChartRef = useRef<ChartCanvas | null>(null);

  useEffect(() => {
    if (!pieChartRef.current) return;

    const ctx = pieChartRef.current.getContext('2d');
    DatasetChartUtils.destroyChart(pieChartRef);

    const config = ParameterDistributionChartBuilder.createChartConfig(stats);

    if (ctx) {
      pieChartRef.current.chart = new Chart.Chart(ctx, config);
    }

    return () => {
      DatasetChartUtils.destroyChart(pieChartRef);
    };
  }, [stats]);

  return (
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Parameter Types
          </h3>
        </div>
        <div className="h-64">
          <canvas ref={pieChartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export { ParameterTypesChart };
