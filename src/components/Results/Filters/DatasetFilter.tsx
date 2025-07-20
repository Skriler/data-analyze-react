import React from 'react';
import { Database } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';
import type { DatasetDto } from '@api-types/dataset';

interface DatasetFilterProps {
  value: string;
  datasets: DatasetDto[] | undefined;
  onChange: (value: string) => void;
}

const DatasetFilter: React.FC<DatasetFilterProps> = ({
  value,
  datasets,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
        <Database className="w-4 h-4" />
        <span>Dataset</span>
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 hover:bg-gray-50">
          <SelectValue placeholder="Select dataset" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300 shadow-lg">
          <SelectItem value="all" className="hover:bg-gray-50">
            All Datasets
          </SelectItem>
          {datasets?.map(dataset => (
            <SelectItem
              key={dataset.id}
              value={dataset.id.toString()}
              className="hover:bg-gray-50"
            >
              {dataset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { DatasetFilter };
