import { useState, useEffect } from 'react';
import { databricksService, QueryResult, SampleDataRow } from '../services/databricksService';

interface UseSampleDataResult {
  data: SampleDataRow[];
  columns: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSampleData = (datasetId: string, enabled: boolean = true): UseSampleDataResult => {
  const [data, setData] = useState<SampleDataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      // Try to get real data from backend API
      const result = await databricksService.getSampleData(datasetId, 10);
      
      if (result.error) {
        // If there's an error, fall back to mock data
        console.warn('Backend API query failed, using fallback data:', result.error);
        const fallbackResult = databricksService.getFallbackSampleData();
        setData(fallbackResult.data);
        setColumns(fallbackResult.columns);
        setError(`Using sample data: ${result.error}`);
      } else {
        setData(result.data);
        setColumns(result.columns);
      }
    } catch (err) {
      // If connection fails completely, use fallback data
      console.error('Failed to connect to backend API, using fallback data:', err);
      const fallbackResult = databricksService.getFallbackSampleData();
      setData(fallbackResult.data);
      setColumns(fallbackResult.columns);
      setError(err instanceof Error ? err.message : 'Failed to connect to data source');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [datasetId, enabled]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    columns,
    loading,
    error,
    refetch
  };
}; 