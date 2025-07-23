export interface DatasetStatsData {
  totalObjects: number;
  totalParameters: number;
  numericParameters: number;
  categoricalParameters: number;
}

export interface DatasetActions {
  handleAnalyze: () => void;
  handleViewResults: () => void;
  handleDelete: () => void;
}
