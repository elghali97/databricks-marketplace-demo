// Backend API configuration from environment variables
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  apiKey: import.meta.env.VITE_API_KEY, // Optional API key for authentication
};

export interface SampleDataRow {
  date: string;
  airport: string;
  airline: string;
  passengers: number;
  load_factor: number;
}

export interface QueryResult {
  data: SampleDataRow[];
  columns: string[];
  error?: string;
}

class DataService {
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${config.apiUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add API key if configured
    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  }

  private isApiConfigured(): boolean {
    return !!config.apiUrl;
  }

  async executeQuery(sql: string): Promise<QueryResult> {
    try {
      console.log('Executing SQL query via backend API:', sql);
      
      const response = await this.makeRequest('/execute-query', {
        method: 'POST',
        body: JSON.stringify({ sql }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log(`Successfully retrieved ${result.data?.length || 0} rows from backend API`);
      
      return {
        data: result.data || [],
        columns: result.columns || [],
        error: result.error,
      };

    } catch (error) {
      console.error('Error calling backend API:', error);
      
      // Fall back to mock data on any error
      return {
        ...this.getFallbackSampleData(),
        error: `Backend API failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Get sample data for a specific dataset
  async getSampleData(datasetId: string, limit: number = 10): Promise<QueryResult> {
    try {
      console.log(`Fetching sample data for dataset ${datasetId} via backend API`);
      
      const response = await this.makeRequest(`/datasets/${datasetId}/sample`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log(`Successfully retrieved ${result.data?.length || 0} rows for dataset ${datasetId}`);
      
      return {
        data: result.data || [],
        columns: result.columns || [],
        error: result.error,
      };

    } catch (error) {
      console.error(`Error fetching sample data for dataset ${datasetId}:`, error);
      
      // Fall back to mock data on any error
      return {
        ...this.getFallbackSampleData(),
        error: `Failed to fetch dataset ${datasetId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Fallback sample data for development/demo
  getFallbackSampleData(): QueryResult {
    const airports = ['JFK', 'LAX', 'LHR', 'DXB', 'SYD', 'CDG', 'FRA', 'NRT', 'SIN', 'AMS'];
    const airlines = ['Delta', 'United', 'American', 'Emirates', 'Qantas', 'Air France', 'Lufthansa', 'ANA', 'Singapore Airlines', 'KLM'];
    
    const fallbackData: SampleDataRow[] = Array.from({ length: 10 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      
      return {
        date: date.toISOString().split('T')[0],
        airport: airports[index % airports.length],
        airline: airlines[index % airlines.length],
        passengers: Math.floor(Math.random() * 2000) + 1000,
        load_factor: Math.round((Math.random() * 25 + 75) * 10) / 10
      };
    });

    return {
      data: fallbackData,
      columns: ['date', 'airport', 'airline', 'passengers', 'load_factor']
    };
  }

  // Test connection to backend API
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.makeRequest('/health');
      
      if (!response.ok) {
        return { 
          success: false, 
          error: `API responded with ${response.status}: ${response.statusText}` 
        };
      }

      const result = await response.json();
      return { 
        success: true,
        error: result.message || 'Connection successful'
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Connection test failed' 
      };
    }
  }

  // Debug method to check configuration
  debugConfig(): void {
    console.log('Backend API Configuration:', {
      apiUrl: config.apiUrl,
      apiKey: config.apiKey ? `${config.apiKey.substring(0, 10)}...` : 'Not set',
      isConfigured: this.isApiConfigured()
    });
  }
}

// Export a singleton instance
export const dataService = new DataService();

// Keep the old export name for backward compatibility
export const databricksService = dataService; 