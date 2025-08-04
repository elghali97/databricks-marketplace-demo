import { Dataset, DatasetCategory, DataFrequency, PricingModel, AccessLevel } from '../types/dataset';
import { User, UserRole } from '../types/user';
import DatasetService from '../services/datasetService';

// For backward compatibility - load datasets from JSON as fallback
import datasetsJson from './datasets.json';

// Convert JSON data to properly typed datasets
const convertDataset = (data: any): Dataset => ({
  ...data,
  category: DatasetCategory[data.category as keyof typeof DatasetCategory],
  frequency: DataFrequency[data.frequency as keyof typeof DataFrequency],
  pricingModel: PricingModel[data.pricingModel as keyof typeof PricingModel],
  accessLevel: AccessLevel[data.accessLevel as keyof typeof AccessLevel]
});

// Load datasets from JSON file (fallback for backward compatibility)
export const mockDatasets: Dataset[] = datasetsJson.map(convertDataset);

// NEW: API-based dataset loading functions
export const getDatasets = async (): Promise<Dataset[]> => {
  return await DatasetService.getAllDatasets();
};

export const getDatasetById = async (id: string): Promise<Dataset | null> => {
  return await DatasetService.getDatasetById(id);
};

export const getDatasetsByCategory = async (category: DatasetCategory): Promise<Dataset[]> => {
  return await DatasetService.getDatasetsByCategory(category);
};

export const searchDatasets = async (query: string): Promise<Dataset[]> => {
  return await DatasetService.searchDatasets(query);
};

export const getDatasetStats = async () => {
  return await DatasetService.getDatasetStats();
};

// Mock users - Updated for financial services
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Market Intelligence',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Samantha Lee',
    email: 'samantha@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Fixed Income Analytics',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@databricks.com',
    role: UserRole.CONSUMER,
    organization: 'JPMorgan Chase',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah@databricks.com',
    role: UserRole.CONSUMER,
    organization: 'Goldman Sachs',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Alternative Data',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '6',
    name: 'Emily Brown',
    email: 'emily@databricks.com',
    role: UserRole.CONSUMER,
    organization: 'Morgan Stanley',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '7',
    name: 'James Anderson',
    email: 'james@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Risk Solutions',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '8',
    name: 'Lisa Thompson',
    email: 'lisa@databricks.com',
    role: UserRole.CONSUMER,
    organization: 'Wells Fargo',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '9',
    name: 'Robert Kim',
    email: 'robert@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks ESG Analytics',
    avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '10',
    name: 'Jennifer White',
    email: 'jennifer@databricks.com',
    role: UserRole.CONSUMER,
    organization: 'BlackRock',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

// Analytics data - This will be dynamically fetched in components using the API
export const analyticsData = {
  totalDatasets: 52,
  totalProviders: 29,
  totalConsumers: 1834,
  totalDownloads: 65247,
  revenueGenerated: 3247890,
  activeUsers: 1667,
  topCategories: [
    { name: DatasetCategory.MARKET_TRADING, value: 16 },
    { name: DatasetCategory.ALTERNATIVE_DATA, value: 8 },
    { name: DatasetCategory.RISK_COMPLIANCE, value: 8 },
    { name: DatasetCategory.ESG_SUSTAINABILITY, value: 4 },
    { name: DatasetCategory.REFERENCE_DATA, value: 4 },
    { name: DatasetCategory.CREDIT_RISK, value: 4 },
    { name: DatasetCategory.CUSTOMER_ANALYTICS, value: 4 },
    { name: DatasetCategory.FRAUD_DETECTION, value: 4 }
  ],
  monthlyDownloads: [
    { month: 'Jan', downloads: 4245 },
    { month: 'Feb', downloads: 4589 },
    { month: 'Mar', downloads: 4967 },
    { month: 'Apr', downloads: 5123 },
    { month: 'May', downloads: 5398 },
    { month: 'Jun', downloads: 5634 },
    { month: 'Jul', downloads: 5823 },
    { month: 'Aug', downloads: 6156 },
    { month: 'Sep', downloads: 6234 },
    { month: 'Oct', downloads: 6489 },
    { month: 'Nov', downloads: 6767 },
    { month: 'Dec', downloads: 7134 }
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 187890 },
    { month: 'Feb', revenue: 202450 },
    { month: 'Mar', revenue: 218920 },
    { month: 'Apr', revenue: 231250 },
    { month: 'May', revenue: 249670 },
    { month: 'Jun', revenue: 264320 },
    { month: 'Jul', revenue: 282850 },
    { month: 'Aug', revenue: 298940 },
    { month: 'Sep', revenue: 315670 },
    { month: 'Oct', revenue: 333450 },
    { month: 'Nov', revenue: 354580 },
    { month: 'Dec', revenue: 372890 }
  ]
};

// NEW: Function to get analytics data from API
export const getAnalyticsData = async () => {
  try {
    const stats = await DatasetService.getDatasetStats();
    return {
      ...analyticsData,
      totalDatasets: stats.totalDatasets,
      totalProviders: stats.totalProviders,
      topCategories: Object.entries(stats.categoryCounts).map(([name, value]) => ({
        name: name as DatasetCategory,
        value
      }))
    };
  } catch (error) {
    console.warn('Failed to fetch analytics from API, using fallback data');
    return analyticsData;
  }
};