import { DatasetActionButtons } from './DatasetActionButtons';
import { DatasetSearchSort } from './DatasetSearchSort';

interface DatasetActionsProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onCreateDataset: () => void;
  onImportDataset: () => void;
}

const DatasetActions: React.FC<DatasetActionsProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onCreateDataset,
  onImportDataset,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <DatasetActionButtons
      onCreateDataset={onCreateDataset}
      onImportDataset={onImportDataset}
    />

    <DatasetSearchSort
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  </div>
);

export { DatasetActions };
