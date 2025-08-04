import api from './api';
import { Dataset, DatasetCategory } from '../types/dataset';

// Dataset API service
export class DatasetService {
  /**
   * Fetch all datasets from the API
   */
  static async getAllDatasets(): Promise<Dataset[]> {
    try {
      const response = await api.get('/datasets');
      // Backend returns {data: [...], total: number, page: number, limit: number}
      return response.data.data.map(this.convertDataset);
    } catch (error) {
      console.error('Failed to fetch datasets:', error);
      // In case of API failure, return empty array or fallback to local data
      return this.getFallbackDatasets();
    }
  }

  /**
   * Fetch a single dataset by ID
   */
  static async getDatasetById(id: string): Promise<Dataset | null> {
    try {
      const response = await api.get(`/datasets/${id}`);
      // Single dataset endpoint returns the dataset directly
      return this.convertDataset(response.data);
    } catch (error) {
      console.error(`Failed to fetch dataset ${id}:`, error);
      return null;
    }
  }

  /**
   * Fetch datasets by category
   */
  static async getDatasetsByCategory(category: DatasetCategory): Promise<Dataset[]> {
    try {
      const encodedCategory = encodeURIComponent(category);
      const response = await api.get(`/datasets?category=${encodedCategory}`);
      // Backend returns {data: [...], total: number, page: number, limit: number}
      return response.data.data.map(this.convertDataset);
    } catch (error) {
      console.error(`Failed to fetch datasets for category ${category}:`, error);
      return [];
    }
  }

  /**
   * Search datasets by query
   */
  static async searchDatasets(query: string): Promise<Dataset[]> {
    try {
      const response = await api.get(`/datasets/search?q=${encodeURIComponent(query)}`);
      // Backend returns {data: [...], total: number, page: number, limit: number}
      return response.data.data.map(this.convertDataset);
    } catch (error) {
      console.error(`Failed to search datasets with query "${query}":`, error);
      return [];
    }
  }

  /**
   * Get dataset statistics
   */
  static async getDatasetStats(): Promise<{
    totalDatasets: number;
    totalProviders: number;
    categoryCounts: Record<string, number>;
  }> {
    try {
      const response = await api.get('/datasets/stats');
      // Stats endpoint returns the data directly
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dataset statistics:', error);
      return {
        totalDatasets: 0,
        totalProviders: 0,
        categoryCounts: {}
      };
    }
  }

  /**
   * Convert raw API data to Dataset interface
   * This handles string to enum conversion and ensures type safety
   */
  private static convertDataset(raw: any): Dataset {
    return {
      ...raw,
      category: raw.category as DatasetCategory,
      // Handle both API datetime strings and fallback JSON datetime strings
      lastUpdated: new Date(raw.lastUpdated),
      timeRange: raw.timeRange ? {
        start: new Date(raw.timeRange.start || raw.timeRange.from),
        end: new Date(raw.timeRange.end || raw.timeRange.to)
      } : undefined
    };
  }

  /**
   * Fallback datasets in case API is unavailable
   * This loads from the existing JSON file as a backup
   */
  private static async getFallbackDatasets(): Promise<Dataset[]> {
    try {
      console.warn('🔄 Using fallback dataset loading from JSON');
      // Dynamically import the JSON data as fallback
      const { default: datasetsJson } = await import('../data/datasets.json');
      
      // Convert JSON data to proper Dataset format (same as the backend conversion)
      return datasetsJson.map((item: any) => {
        // Convert enum string keys to enum values for fallback compatibility
        const converted = {
          ...item,
          category: item.category as DatasetCategory,
          frequency: item.frequency,
          pricingModel: item.pricingModel,
          accessLevel: item.accessLevel,
          lastUpdated: new Date(item.lastUpdated),
          timeRange: item.timeRange ? {
            start: new Date(item.timeRange.from),
            end: new Date(item.timeRange.to)
          } : undefined
        };
        return this.convertDataset(converted);
      });
    } catch (error) {
      console.error('Failed to load fallback datasets:', error);
      return [];
    }
  }
}

export default DatasetService; 