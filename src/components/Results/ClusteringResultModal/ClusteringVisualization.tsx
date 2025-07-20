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
import {
  CLUSTER_COLORS,
  type ProcessedCluster,
} from '@shared/results/clusteringResultModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

interface ClusteringVisualizationProps {
  clusters: ProcessedCluster[];
}

const ClusteringVisualization: React.FC<ClusteringVisualizationProps> = ({
  clusters,
}) => {
  const chartData = useMemo(() => {
    if (!clusters || clusters.length === 0) {
      return { datasets: [] };
    }

    const datasets = clusters.map((cluster, index) => ({
      label: `Cluster ${cluster.number}`,
      data: cluster.objects.map(obj => ({
        x: obj.x,
        y: obj.y,
        label: obj.name,
      })),
      backgroundColor: CLUSTER_COLORS[index % CLUSTER_COLORS.length],
      borderColor: CLUSTER_COLORS[index % CLUSTER_COLORS.length],
      borderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    }));

    return { datasets };
  }, [clusters]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.raw.label} (${context.parsed.x}, ${context.parsed.y})`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'X Coordinate',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: '#f3f4f6',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Coordinate',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: '#f3f4f6',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'point' as const,
    },
  };

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
    <div className="h-full p-6">
      <div className="bg-gray-50 rounded-lg p-4 h-full">
        <div className="h-full min-h-[500px]">
          <Scatter data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export { ClusteringVisualization };
