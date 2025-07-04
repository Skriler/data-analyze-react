import { Search } from 'lucide-react';
import { Input } from '@components/Ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';

interface DatasetSearchSortProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

function DatasetSearchSort({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: DatasetSearchSortProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Input
          placeholder="Search datasets..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 w-64 bg-white border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px] bg-white border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200 shadow-lg">
          <SelectItem value="name" className="hover:bg-gray-50">
            Sort by Name
          </SelectItem>
          <SelectItem value="date" className="hover:bg-gray-50">
            Sort by Date
          </SelectItem>
          <SelectItem value="size" className="hover:bg-gray-50">
            Sort by Size
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export { DatasetSearchSort };
