import type { DatasetDto } from '@api-types/dataset';

interface DatasetCardTagsProps {
  dataset: DatasetDto;
}

function DatasetCardTags({ dataset }: DatasetCardTagsProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {dataset.parameters.slice(0, 3).map(param => (
        <span
          key={param.id}
          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
        >
          {param.name}
        </span>
      ))}
      {dataset.parameters.length > 3 && (
        <span className="px-2 py-1 text-xs text-gray-500">
          +{dataset.parameters.length - 3} more
        </span>
      )}
    </div>
  );
}

export { DatasetCardTags };
