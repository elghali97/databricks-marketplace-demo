import { useState, useEffect, useCallback } from 'react';
import { Dataset, DatasetCategory } from '../types/dataset';
import DatasetService from '../services/datasetService';

export interface UseDatasetReturn {
  datasets: Dataset[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseDatasetStatsReturn {
  stats: {
    totalDatasets: number;
    totalProviders: number;
    categoryCounts: Record<string, number>;
  } | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface DatasetFilters {
  categories: DatasetCategory[];
  searchQuery?: string;
}

/**
 * Hook for fetching all datasets
 */
export const useDatasets = (): UseDatasetReturn => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.getAllDatasets();
      setDatasets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch datasets';
      setError(errorMessage);
      console.error('Error fetching datasets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  return {
    datasets,
    loading,
    error,
    refetch: fetchDatasets
  };
};

/**
 * Hook for fetching datasets by category
 */
export const useDatasetsByCategory = (category: DatasetCategory): UseDatasetReturn => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.getDatasetsByCategory(category);
      setDatasets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch datasets';
      setError(errorMessage);
      console.error('Error fetching datasets by category:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  return {
    datasets,
    loading,
    error,
    refetch: fetchDatasets
  };
};

/**
 * Hook for searching datasets
 */
export const useDatasetSearch = (query: string): UseDatasetReturn => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDatasets = useCallback(async () => {
    if (!query.trim()) {
      setDatasets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.searchDatasets(query);
      setDatasets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search datasets';
      setError(errorMessage);
      console.error('Error searching datasets:', err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchDatasets();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchDatasets]);

  return {
    datasets,
    loading,
    error,
    refetch: searchDatasets
  };
};

/**
 * Hook for fetching a single dataset by ID
 */
export const useDataset = (id: string) => {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataset = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.getDatasetById(id);
      setDataset(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dataset';
      setError(errorMessage);
      console.error('Error fetching dataset:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDataset();
  }, [fetchDataset]);

  return {
    dataset,
    loading,
    error,
    refetch: fetchDataset
  };
};

/**
 * Hook for fetching dataset statistics
 */
export const useDatasetStats = (): UseDatasetStatsReturn => {
  const [stats, setStats] = useState<{
    totalDatasets: number;
    totalProviders: number;
    categoryCounts: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.getDatasetStats();
      setStats(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dataset statistics';
      setError(errorMessage);
      console.error('Error fetching dataset stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

/**
 * Smart hook that uses the optimal API endpoint based on filters
 * - Uses category API when single category is selected
 * - Uses search API when search query is provided
 * - Uses all datasets API as fallback
 */
export const useFilteredDatasets = (filters: DatasetFilters): UseDatasetReturn => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: Dataset[];
      
      // Priority 1: Search query
      if (filters.searchQuery && filters.searchQuery.trim()) {
        data = await DatasetService.searchDatasets(filters.searchQuery.trim());
      }
      // Priority 2: Single category filter
      else if (filters.categories.length === 1) {
        data = await DatasetService.getDatasetsByCategory(filters.categories[0]);
      }
      // Priority 3: All datasets (with client-side filtering for multiple categories)
      else {
        data = await DatasetService.getAllDatasets();
        
        // Apply multiple category filtering client-side if needed
        if (filters.categories.length > 1) {
          data = data.filter(dataset => 
            filters.categories.includes(dataset.category)
          );
        }
      }
      
      setDatasets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch datasets';
      setError(errorMessage);
      console.error('Error fetching filtered datasets:', err);
    } finally {
      setLoading(false);
    }
  }, [filters.categories, filters.searchQuery]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  return {
    datasets,
    loading,
    error,
    refetch: fetchDatasets
  };
}; 