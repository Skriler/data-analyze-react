import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { DatasetDto } from '@api-types/dataset';

export const useAnalysis = () => {
  const { type } = useParams<{ type?: string }>();
  const navigate = useNavigate();
  const [selectedDataset, setSelectedDataset] = useState<DatasetDto | null>(
    null
  );
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>(
    type || 'similarity'
  );
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const handleRunAnalysis = (dataset: DatasetDto, analysisType: string) => {
    setSelectedDataset(dataset);
    setSelectedAnalysisType(analysisType);
    setShowAnalysisModal(true);
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  const handleViewDocumentation = () => {
    navigate('/analysis/documentation');
  };

  return {
    selectedDataset,
    selectedAnalysisType,
    showAnalysisModal,
    setSelectedAnalysisType,
    setShowAnalysisModal,
    handleRunAnalysis,
    handleViewResults,
    handleViewDocumentation,
  };
};
