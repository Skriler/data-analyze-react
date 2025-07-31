import { useSetLayout } from '@hooks/features/layout';
import { useDatasets } from '@hooks/api/useDatasets';
import { useResults } from '@hooks/features/results';
import { ResultsContent } from '@components/Results';
import type { DatasetDto } from '@api-types/dataset';

export default function ResultsPage() {
  const { data: datasets, isLoading: isDatasetsLoading } = useDatasets();
  const resultsState = useResults();

  useSetLayout('Results', 'View analysis results and insights');

  return (
    <ResultsContent
      datasets={datasets as DatasetDto[]}
      isDatasetsLoading={isDatasetsLoading}
      {...resultsState}
    />
  );
}
