import type { DatasetDto } from '@api-types/dataset';

interface DatasetCardStatsProps {
  dataset: DatasetDto;
}

function DatasetCardStats({ dataset }: DatasetCardStatsProps) {
  const formatSize = (objectCount: number, paramCount: number) => {
    const estimatedKB = (objectCount * paramCount * 10) / 1024;
    if (estimatedKB < 1024) {
      return `${estimatedKB.toFixed(1)} KB`;
    }
    return `${(estimatedKB / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Parameters:</span>
        <span className="font-medium text-gray-900">
          {dataset.parameters.length}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Objects:</span>
        <span className="font-medium text-gray-900">
          {dataset.objects.length.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Size:</span>
        <span className="font-medium text-gray-900">
          {formatSize(dataset.objects.length, dataset.parameters.length)}
        </span>
      </div>
    </div>
  );
}

export { DatasetCardStats };
