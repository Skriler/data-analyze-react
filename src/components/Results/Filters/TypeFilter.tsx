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
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
        <Zap className="w-4 h-4" />
        <span>Analysis Type</span>
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500">
          <SelectValue placeholder="Analysis type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="similarity">Similarity Analysis</SelectItem>
          <SelectItem value="KMeans">K-Means Clustering</SelectItem>
          <SelectItem value="DBSCAN">DBSCAN Clustering</SelectItem>
          <SelectItem value="Agglomerative">
            Agglomerative Clustering
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export { TypeFilter };
