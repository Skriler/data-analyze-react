import type { DatasetDto } from '@api-types/dataset';

interface DatasetCardTagsProps {
  dataset: DatasetDto;
}

function DatasetCardTags({ dataset }: DatasetCardTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {dataset.parameters.slice(0, 3).map(param => (
        <span
          key={param.id}
          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-xs font-medium border border-blue-200"
        >
          {param.name}
        </span>
      ))}
      {dataset.parameters.length > 3 && (
        <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
          +{dataset.parameters.length - 3} more
        </span>
      )}
    </div>
  );
}

export { DatasetCardTags };
