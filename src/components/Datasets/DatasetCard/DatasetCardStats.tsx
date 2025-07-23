import type { DatasetDto } from '@api-types/dataset';

interface DatasetCardStatsProps {
  dataset: DatasetDto;
}

function DatasetCardStats({ dataset }: DatasetCardStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
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
    </div>
  );
}

export { DatasetCardStats };
