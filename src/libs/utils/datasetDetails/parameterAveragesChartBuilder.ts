import * as Chart from 'chart.js';

export class ParameterAveragesChartBuilder {
  /**
   * Build chart.js data for bar chart visualization
   */
  static buildChartData(labels: string[], data: number[]) {
    return {
      labels,
      datasets: [
        {
          label: 'Average Value',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }

  /**
   * Build chart.js options for bar chart visualization
   */
  static buildChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          title: {
            display: true,
            text: 'Average Value',
            font: {
              size: 14,
              weight: 'bold' as const,
            },
            color: '#374151',
          },
          ticks: {
            font: {
              size: 12,
            },
            color: '#6b7280',
          },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: 'Parameters',
            font: {
              size: 14,
              weight: 'bold' as const,
            },
            color: '#374151',
          },
          ticks: {
            font: {
              size: 12,
            },
            color: '#6b7280',
            maxRotation: 45,
          },
        },
      },
      animation: {
        duration: 800,
      },
    };
  }

  /**
   * Create complete bar chart configuration
   */
  static createChartConfig(
    labels: string[],
    data: number[]
  ): Chart.ChartConfiguration {
    return {
      type: 'bar',
      data: this.buildChartData(labels, data),
      options: this.buildChartOptions(),
    };
  }
}
