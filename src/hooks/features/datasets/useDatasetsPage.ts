import { useState, useMemo } from 'react';
import { useDatasets } from '@hooks/api/useDatasets';

export function useDatasetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: datasets, isLoading, error } = useDatasets();

  const filteredDatasets = useMemo(() => {
    if (!datasets) return [];
    return datasets
      .filter(dataset =>
        dataset.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'date':
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case 'size':
            return b.objects.length - a.objects.length;
          default:
            return 0;
        }
      });
  }, [datasets, searchQuery, sortBy]);

  const layoutSubtitle = isLoading
    ? 'Loading...'
    : `${filteredDatasets.length} dataset${filteredDatasets.length !== 1 ? 's' : ''}`;

  const actions = {
    searchQuery,
    setSearchQuery: (q: string) => setSearchQuery(q),
    sortBy,
    setSortBy: (s: string) => setSortBy(s as 'name' | 'date' | 'size'),
    showCreateModal,
    setShowCreateModal,
  };

  return { filteredDatasets, isLoading, error, layoutSubtitle, actions };
}
