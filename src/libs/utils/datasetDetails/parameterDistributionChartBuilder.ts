import * as Chart from 'chart.js';
import type { DatasetStatsData } from '@shared/datasetDetails';
import type { TooltipItem } from 'chart.js';

export class ParameterDistributionChartBuilder {
  /**
   * Build chart.js data for doughnut chart visualization
   */
  static buildChartData(stats: DatasetStatsData) {
    const hasCategorial = stats.categoricalParameters > 0;

    return {
      labels: hasCategorial
        ? ['Numeric Parameters', 'Categorical Parameters']
        : ['Numeric Parameters'],
      datasets: [
        {
          data: hasCategorial
            ? [stats.numericParameters, stats.categoricalParameters]
            : [stats.numericParameters],
          backgroundColor: hasCategorial
            ? ['rgba(59, 130, 246, 0.8)', 'rgba(249, 115, 22, 0.8)']
            : ['rgba(59, 130, 246, 0.8)'],
          borderWidth: 0,
          hoverBackgroundColor: hasCategorial
            ? ['rgba(59, 130, 246, 1)', 'rgba(249, 115, 22, 1)']
            : ['rgba(59, 130, 246, 1)'],
          hoverBorderWidth: 2,
          hoverBorderColor: '#fff',
        },
      ],
    };
  }

  /**
   * Build chart.js options for doughnut chart visualization
   */
  static buildChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 14,
              weight: 'bold' as const,
            },
            color: '#374151',
          },
        },
        tooltip: {
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
          callbacks: {
            label: (context: TooltipItem<'doughnut'>) => {
              const total = context.dataset.data.reduce(
                (a: number, b: number) => a + b,
                0
              );

              const rawValue = context.raw as number;
              const percentage = ((rawValue / total) * 100).toFixed(1);

              return `${context.label}: ${rawValue} (${percentage}%)`;
            },
          },
        },
      },
      cutout: '50%',
      animation: {
        animateRotate: true,
        duration: 1200,
      },
    };
  }

  /**
   * Create complete doughnut chart configuration
   */
  static createChartConfig(stats: DatasetStatsData): Chart.ChartConfiguration {
    return {
      type: 'doughnut',
      data: this.buildChartData(stats),
      options: this.buildChartOptions(),
    };
  }
}
