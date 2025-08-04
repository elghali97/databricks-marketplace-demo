export enum DatasetCategory {
  MARKET_TRADING = 'Market Trading',
  ALTERNATIVE_DATA = 'Alternative Data',
  REFERENCE_DATA = 'Reference Data',
  RISK_COMPLIANCE = 'Risk & Compliance',
  CUSTOMER_ANALYTICS = 'Customer Analytics',
  ESG_SUSTAINABILITY = 'ESG & Sustainability',
  CREDIT_RISK = 'Credit Risk',
  FRAUD_DETECTION = 'Fraud Detection'
}

export enum DataFrequency {
  REAL_TIME = 'Real-time',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
  ANNUALLY = 'Annual'
}

export enum PricingModel {
  FREE = 'Free',
  ONE_TIME = 'One-time Purchase',
  SUBSCRIPTION = 'Subscription',
  PAY_PER_USE = 'Pay-per-use'
}

export enum AccessLevel {
  PUBLIC = 'Public',
  PREMIUM = 'Premium',
  ENTERPRISE = 'Enterprise'
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  provider: {
    id: string;
    name: string;
    verified: boolean;
  };
  category: DatasetCategory;
  subCategory?: string;
  frequency: DataFrequency;
  lastUpdated: string;
  pricingModel: PricingModel;
  price?: number;
  currency?: string;
  accessLevel: AccessLevel;
  rating: number;
  ratingsCount: number;
  downloadCount: number;
  tags: string[];
  formats: string[];
  geographicCoverage: string[];
  timeRange: {
    from: string;
    to?: string;
  };
  sampleAvailable: boolean;
  sampleUrl?: string;
  previewImage?: string;
  qualityScore: number;
  verified: boolean;
}