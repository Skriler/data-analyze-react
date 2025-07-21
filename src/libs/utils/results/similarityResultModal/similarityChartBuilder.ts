import type {
  ProcessedSimilarityPair,
  SimilarityDistributionData,
} from '@shared/results/similarityResultModal';

export class SimilarityChartBuilder {
  static buildHistogramChart(pairs: ProcessedSimilarityPair[]) {
    const bins = Array.from({ length: 10 }, (_, i) => ({
      min: i * 10,
      max: (i + 1) * 10,
      count: 0,
      label: `${i * 10}-${(i + 1) * 10}%`,
    }));

    pairs.forEach(pair => {
      const binIndex = Math.min(Math.floor(pair.similarityPercentage / 10), 9);
      bins[binIndex].count++;
    });

    return {
      labels: bins.map(bin => bin.label),
      datasets: [
        {
          label: 'Number of Pairs',
          data: bins.map(bin => bin.count),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
        },
      ],
    };
  }

  static getHistogramOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Similarity Distribution',
          font: { size: 16, weight: 'bold' as const },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.parsed.y} pairs`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Similarity Percentage Range',
            font: { size: 12, weight: 'bold' as const },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of Pairs',
            font: { size: 12, weight: 'bold' as const },
          },
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    };
  }

  static buildDoughnutChart(distribution: SimilarityDistributionData[]) {
    if (distribution.length === 0) {
      return { labels: [], datasets: [] };
    }

    return {
      labels: distribution.map(item => item.range),
      datasets: [
        {
          data: distribution.map(item => item.count),
          backgroundColor: distribution.map(item => item.color),
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverBorderWidth: 3,
        },
      ],
    };
  }

  static getDoughnutOptions(distribution: SimilarityDistributionData[]) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: { padding: 20, usePointStyle: true, font: { size: 11 } },
        },
        title: {
          display: true,
          text: 'Similarity Categories',
          font: { size: 16, weight: 'bold' as const },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const item = distribution[context.dataIndex];
              return `${item.range}: ${item.count} pairs (${item.percentage}%)`;
            },
          },
        },
      },
    };
  }
}
