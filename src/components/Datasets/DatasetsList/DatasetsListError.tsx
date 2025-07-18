interface DatasetsListErrorProps {
  error: unknown;
}

function DatasetsListError({ error }: DatasetsListErrorProps) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <div className="text-4xl">⚠️</div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        Failed to load datasets
      </h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        {error instanceof Error
          ? error.message
          : 'An error occurred while loading datasets. Please try again.'}
      </p>
    </div>
  );
}

export { DatasetsListError };
