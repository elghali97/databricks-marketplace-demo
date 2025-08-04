/**
 * Preview Service for fetching table preview data from Databricks SQL warehouse
 */
import api from './api';

export interface TableColumn {
  name: string;
  type: string;
}

export interface TablePreviewData {
  table_name: string;
  columns: TableColumn[];
  data: Record<string, any>[];
  row_count: number;
  preview_limit: number;
  error?: string;
}

export interface DatabricksConnectionStatus {
  status: 'connected' | 'disconnected';
  service: string;
  server_hostname: string;
  http_path: string;
  preview_limit: number;
  using_cli_profile: boolean;
}

export class PreviewService {
  /**
   * Get table preview data from Databricks SQL warehouse
   */
  static async getTablePreview(tableReference: string): Promise<TablePreviewData> {
    try {
      const encodedReference = encodeURIComponent(tableReference);
      const response = await api.get(`/preview?table_reference=${encodedReference}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch table preview for ${tableReference}:`, error);
      
      // Return fallback structure
      return {
        table_name: tableReference,
        columns: [],
        data: [],
        row_count: 0,
        preview_limit: 15,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test Databricks SQL warehouse connection
   */
  static async testConnection(): Promise<DatabricksConnectionStatus> {
    try {
      const response = await api.get('/preview/test');
      return response.data;
    } catch (error) {
      console.error('Failed to test Databricks connection:', error);
      
      // Return fallback status
      return {
        status: 'disconnected',
        service: 'databricks-sql-warehouse',
        server_hostname: 'unknown',
        http_path: 'unknown',
        preview_limit: 15,
        using_cli_profile: true
      };
    }
  }

  /**
   * Extract table name from sample URL
   * This helps users understand what table is being queried
   */
  static extractTableName(sampleUrl: string): string {
    // Remove common prefixes and file extensions
    let tableName = sampleUrl
      .replace('/samples/', '')
      .replace('.csv', '')
      .replace('.parquet', '')
      .replace('.json', '');

    // Map sample file names to likely table names
    const tableNameMappings: Record<string, string> = {
      'msci-esg-sample': 'ESG Ratings',
      'bloomberg-corporate-sample': 'Corporate Bonds',
      'sp500-sample': 'S&P 500 Data',
      'refinitiv-worldcheck-sample': 'Risk Intelligence',
      'moody-credit-sample': 'Credit Ratings',
      'visa-fraud-sample': 'Fraud Detection',
      'dowjones-kyc-sample': 'KYC/AML Data'
    };

    // Try to find a friendly mapping
    for (const [sampleName, friendlyName] of Object.entries(tableNameMappings)) {
      if (tableName.includes(sampleName.replace('-sample', ''))) {
        return friendlyName;
      }
    }

    // Default: capitalize and clean up the name
    return tableName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Format data type for display
   */
  static formatDataType(type: string): string {
    // Simplify complex type names for display
    const typeMap: Record<string, string> = {
      'string': 'Text',
      'integer': 'Number',
      'bigint': 'Number',
      'double': 'Decimal',
      'float': 'Decimal',
      'boolean': 'Boolean',
      'timestamp': 'Date/Time',
      'date': 'Date',
      'array': 'List',
      'struct': 'Object'
    };

    const lowerType = type.toLowerCase();
    return typeMap[lowerType] || type;
  }

  /**
   * Check if a dataset has preview data available
   */
  static isPreviewAvailable(dataset: { sampleAvailable: boolean; sampleUrl?: string }): boolean {
    return dataset.sampleAvailable && !!dataset.sampleUrl;
  }
} 