import type { ProcessedCluster } from '@shared/results/clusteringResultModal';
import { CLUSTER_COLORS } from '@shared/results/clusteringResultModal';

export class ClusteringChartBuilder {
  /**
   * Build chart.js data for clustering visualization
   */
  static buildChartData(clusters: ProcessedCluster[]) {
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
  }

  /**
   * Build chart.js options for clustering visualization
   */
  static buildChartOptions(clusters: ProcessedCluster[]) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14,
              weight: 'bold' as const,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const cluster = clusters[context.datasetIndex];
              return `${context.raw.label} (Cluster ${cluster.number})`;
            },
          },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          titleFont: {
            size: 14,
            weight: 'bold' as const,
          },
          bodyFont: {
            size: 12,
          },
        },
      },
      scales: {
        x: {
          type: 'linear' as const,
          position: 'bottom' as const,
          title: {
            display: true,
            text: 'Dimension X',
            font: {
              size: 16,
              weight: 'bold' as const,
            },
            color: '#374151',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
          },
          ticks: {
            display: true,
            font: {
              size: 12,
            },
            color: '#6b7280',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Dimension Y',
            font: {
              size: 16,
              weight: 'bold' as const,
            },
            color: '#374151',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
          },
          ticks: {
            display: true,
            font: {
              size: 12,
            },
            color: '#6b7280',
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'point' as const,
      },
      animation: {
        duration: 1000,
      },
    };
  }
}
