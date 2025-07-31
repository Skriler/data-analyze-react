import { useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import * as Chart from 'chart.js';
import { Card, CardContent } from '@components/Ui/Card';
import type { DatasetDto } from '@api-types/dataset';
import {
  DatasetChartUtils,
  ParameterAveragesChartBuilder,
} from '@libs/utils/datasetDetails';

interface ChartCanvas extends HTMLCanvasElement {
  chart?: Chart.Chart;
}

interface ParameterAveragesChartProps {
  dataset: DatasetDto;
}

const ParameterAveragesChart: React.FC<ParameterAveragesChartProps> = ({
  dataset,
}) => {
  const chartRef = useRef<ChartCanvas | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    DatasetChartUtils.destroyChart(chartRef);

    const parameterAverages =
      DatasetChartUtils.calculateParameterAverages(dataset);
    const labels = DatasetChartUtils.generateNumericLabels(dataset, 15);
    const config = ParameterAveragesChartBuilder.createChartConfig(
      labels,
      parameterAverages
    );

    chartRef.current.chart = new Chart.Chart(ctx!, config);

    return () => {
      DatasetChartUtils.destroyChart(chartRef);
    };
  }, [dataset]);

  return (
    <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Parameter Averages
          </h3>
        </div>
        <div className="h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export { ParameterAveragesChart };
