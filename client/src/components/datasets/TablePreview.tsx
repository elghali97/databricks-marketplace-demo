/**
 * TablePreview component for displaying dataset preview data
 */
import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useTablePreview } from '../../hooks/useTablePreview';

interface TablePreviewProps {
  sampleUrl: string;
  datasetTitle: string;
  className?: string;
}

export const TablePreview: React.FC<TablePreviewProps> = ({
  sampleUrl,
  datasetTitle,
  className = ''
}) => {
  const { previewData, loading, error, refetch } = useTablePreview(sampleUrl, true);

  // Log detailed errors to console for debugging
  React.useEffect(() => {
    if (error) {
      console.error('Dataset preview error:', {
        sampleUrl,
        datasetTitle,
        error,
        previewData
      });
    }
  }, [error, sampleUrl, datasetTitle, previewData]);

  const handleRefresh = async () => {
    await refetch();
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700"></div>
        <p className="text-neutral-600">Loading dataset preview...</p>
      </div>
    </div>
  );

  const renderNotFoundState = () => (
    <div className="text-center py-20">
      <AlertCircle className="h-16 w-16 text-error-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-neutral-800 mb-2">Dataset Preview Not Available</h3>
      <p className="text-neutral-600 mb-6">
        The preview data for this dataset could not be loaded at this time.
      </p>
      <button 
        onClick={handleRefresh}
        className="px-6 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const renderDataTable = () => {
    if (!previewData || previewData.row_count === 0) {
      return renderNotFoundState();
    }

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold">Live Data Preview</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 text-sm text-primary-700 hover:text-primary-800 font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  {previewData.columns.map((column) => (
                    <th
                      key={column.name}
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {previewData.data.map((row, index) => (
                  <tr key={index} className="hover:bg-neutral-50">
                    {previewData.columns.map((column) => (
                      <td
                        key={column.name}
                        className="px-6 py-3 text-sm text-neutral-900 whitespace-nowrap"
                      >
                        {row[column.name] !== null && row[column.name] !== undefined
                          ? String(row[column.name])
                          : <span className="text-neutral-400 italic">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center text-sm">
          <p className="text-neutral-500 italic">
            Live data preview
          </p>
          <p className="text-neutral-400">
            Showing {previewData.row_count} recent records
          </p>
        </div>
      </>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm border border-neutral-200 ${className}`}>
        {renderLoadingState()}
      </div>
    );
  }

  // Show "not found" for any error or empty data
  if (error || !previewData || previewData.row_count === 0) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm border border-neutral-200 ${className}`}>
        {renderNotFoundState()}
      </div>
    );
  }

  // Show successful data
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-neutral-200 ${className}`}>
      {renderDataTable()}
    </div>
  );
}; 