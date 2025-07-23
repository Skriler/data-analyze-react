import React from 'react';
import { Zap } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
        <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
          <Zap className="w-3 h-3 text-purple-600" />
        </div>
        <span>Analysis Type</span>
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[220px] h-11 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 text-left">
          <SelectValue placeholder="Analysis type" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300 shadow-lg">
          <SelectItem value="all" className="hover:bg-gray-50">
            All Types
          </SelectItem>
          <SelectItem value="similarity" className="hover:bg-gray-50">
            Similarity Analysis
          </SelectItem>
          <SelectItem value="KMeans" className="hover:bg-gray-50">
            K-Means Clustering
          </SelectItem>
          <SelectItem value="DBSCAN" className="hover:bg-gray-50">
            DBSCAN Clustering
          </SelectItem>
          <SelectItem value="Agglomerative" className="hover:bg-gray-50">
            Agglomerative Clustering
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export { TypeFilter };
