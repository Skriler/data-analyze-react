import { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { DatasetDto } from '@api-types/dataset';

export const useAnalysis = () => {
  const { type } = useParams<{ type?: string }>();
  const [selectedDataset, setSelectedDataset] = useState<DatasetDto | null>(
    null
  );
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>(
    type || 'similarity'
  );
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const handleAnalyzeDataset = (dataset: DatasetDto, analysisType: string) => {
    setSelectedDataset(dataset);
    setSelectedAnalysisType(analysisType);
    setShowAnalysisModal(true);
  };

  return {
    selectedDataset,
    selectedAnalysisType,
    showAnalysisModal,
    setSelectedAnalysisType,
    setShowAnalysisModal,
    handleAnalyzeDataset,
  };
};
