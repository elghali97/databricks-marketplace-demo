/**
 * Hook for managing table preview data from Databricks SQL warehouse
 */
import { useState, useEffect, useCallback } from 'react';
import { PreviewService, TablePreviewData, DatabricksConnectionStatus } from '../services/previewService';

interface UseTablePreviewReturn {
  previewData: TablePreviewData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseConnectionStatusReturn {
  connectionStatus: DatabricksConnectionStatus | null;
  loading: boolean;
  error: string | null;
  testConnection: () => Promise<void>;
}

/**
 * Hook for fetching table preview data
 */
export const useTablePreview = (
  tableReference: string | undefined,
  enabled: boolean = true
): UseTablePreviewReturn => {
  const [previewData, setPreviewData] = useState<TablePreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPreview = useCallback(async () => {
    if (!tableReference || !enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await PreviewService.getTablePreview(tableReference);
      
      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
      }
      
      setPreviewData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch preview data';
      setError(errorMessage);
      setPreviewData(null);
    } finally {
      setLoading(false);
    }
  }, [tableReference, enabled]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  return {
    previewData,
    loading,
    error,
    refetch: fetchPreview
  };
};

/**
 * Hook for testing Databricks connection status
 */
export const useConnectionStatus = (): UseConnectionStatusReturn => {
  const [connectionStatus, setConnectionStatus] = useState<DatabricksConnectionStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const status = await PreviewService.testConnection();
      setConnectionStatus(status);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to test connection';
      setError(errorMessage);
      setConnectionStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    connectionStatus,
    loading,
    error,
    testConnection
  };
};

/**
 * Hook for preview data with automatic retry and caching
 */
export const useTablePreviewWithRetry = (
  tableReference: string | undefined,
  enabled: boolean = true,
  retryAttempts: number = 2
): UseTablePreviewReturn & { retryCount: number } => {
  const [retryCount, setRetryCount] = useState(0);
  const baseHook = useTablePreview(tableReference, enabled && retryCount <= retryAttempts);

  const retryFetch = useCallback(async () => {
    if (retryCount < retryAttempts) {
      setRetryCount(prev => prev + 1);
      await baseHook.refetch();
    }
  }, [baseHook, retryCount, retryAttempts]);

  // Auto-retry on error (but not on the first attempt)
  useEffect(() => {
    if (baseHook.error && retryCount === 0 && retryCount < retryAttempts) {
      const timeout = setTimeout(() => {
        retryFetch();
      }, 1000); // Wait 1 second before retry

      return () => clearTimeout(timeout);
    }
  }, [baseHook.error, retryCount, retryAttempts, retryFetch]);

  return {
    ...baseHook,
    retryCount,
    refetch: retryFetch
  };
}; 