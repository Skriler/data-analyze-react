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
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">
          {dataset.parameters.length}
        </div>
        <div className="text-sm text-gray-500">Parameters</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">
          {dataset.objects.length.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Objects</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">
          {formatSize(dataset.objects.length, dataset.parameters.length)}
        </div>
        <div className="text-sm text-gray-500">Size</div>
      </div>
    </div>
  );
}

export { DatasetCardStats };
