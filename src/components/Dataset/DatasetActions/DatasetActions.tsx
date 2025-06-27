import { Plus, Upload, Search } from 'lucide-react';
import { Button } from '@components/Ui/Button';
import { Input } from '@components/Ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Ui/Select';

interface DatasetActionsProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onCreateDataset: () => void;
  onImportDataset: () => void;
}

export function DatasetActions({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onCreateDataset,
  onImportDataset,
}: DatasetActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-3">
        <Button
          onClick={onCreateDataset}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Dataset</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={onImportDataset}
        >
          <Upload className="h-4 w-4" />
          <span>Import</span>
        </Button>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <Input
            placeholder="Search datasets..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="size">Sort by Size</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
