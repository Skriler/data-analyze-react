import { Button } from '@components/Ui/Button';

interface DatasetsListPaginationProps {
  totalDatasets: number;
  currentPage: number;
  itemsPerPage: number;
}

function DatasetsListPagination({
  totalDatasets,
  currentPage = 1,
  itemsPerPage = 12,
}: DatasetsListPaginationProps) {
  const totalPages = Math.ceil(totalDatasets / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalDatasets);

  if (totalDatasets <= itemsPerPage) {
    return null;
  }

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalDatasets}</span> datasets
      </p>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
        >
          {currentPage}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export { DatasetsListPagination };
