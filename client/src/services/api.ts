import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = (): string => {
  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  
  if (isDevelopment) {
    return 'http://localhost:8000/api';
  } else {
    return '/api';
  }
};

// Create axios instance with dynamic base URL
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens, logging, etc.
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
    console.error(`❌ API Error: ${error.response?.status || 'Network'} - ${errorMessage}`);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle authentication errors
      console.warn('🔒 Authentication required');
    } else if (error.response?.status === 404) {
      console.warn('🔍 Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('🚨 Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default api;
export { getBaseURL }; 