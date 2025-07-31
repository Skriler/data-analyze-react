import type { DatasetDto } from '@api-types/dataset';

export class DatasetChartUtils {
  /**
   * Calculate average values for each parameter in the dataset
   */
  static calculateParameterAverages(dataset: DatasetDto): number[] {
    const numericParams = dataset.parameters.filter(p => p.type === 'Numeric');

    return numericParams.map(param => {
      const values = dataset.objects
        .map(obj => {
          const paramValue = obj.values.find(v => v.parameterId === param.id);
          return paramValue ? parseFloat(paramValue.value) : NaN;
        })
        .filter(val => !isNaN(val));

      return values.length > 0
        ? values.reduce((sum, val) => sum + val, 0) / values.length
        : 0;
    });
  }

  /**
   * Truncate label to specified maximum length
   */
  static truncateLabel(label: string, maxLength: number = 15): string {
    return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
  }

  /**
   * Destroy existing chart instance to prevent memory leaks
   */
  static destroyChart(
    canvasRef: React.RefObject<HTMLCanvasElement | null>
  ): void {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const chart = (
      canvas as HTMLCanvasElement & { chart?: { destroy: () => void } }
    ).chart;
    if (!chart) return;

    chart.destroy();
  }

  /**
   * Generate truncated labels from dataset parameters
   */
  static generateNumericLabels(
    dataset: DatasetDto,
    maxLength: number = 15
  ): string[] {
    return dataset.parameters
      .filter(p => p.type === 'Numeric')
      .map(p =>
        p.name.length > maxLength
          ? `${p.name.substring(0, maxLength)}...`
          : p.name
      );
  }
}
