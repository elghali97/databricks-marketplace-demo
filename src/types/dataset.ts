export enum DatasetCategory {
  PASSENGER_TRAFFIC = 'Passenger Traffic',
  FLIGHT_SCHEDULES = 'Flight Schedules',
  HOTEL_OCCUPANCY = 'Hotel Occupancy',
  BOOKING_PATTERNS = 'Booking Patterns',
  LOYALTY_PROGRAM = 'Loyalty Program Data',
  REVENUE_MANAGEMENT = 'Revenue Management',
  OPERATIONAL = 'Operational Data',
  MARKET_INTELLIGENCE = 'Market Intelligence'
}

export enum DataFrequency {
  REAL_TIME = 'Real-time',
  HOURLY = 'Hourly',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
  YEARLY = 'Yearly',
  HISTORICAL = 'Historical'
}

export enum PricingModel {
  FREE = 'Free',
  ONE_TIME = 'One-time purchase',
  SUBSCRIPTION = 'Subscription',
  PAY_PER_USE = 'Pay per use',
  CUSTOM = 'Custom pricing'
}

export enum AccessLevel {
  PUBLIC = 'Public',
  RESTRICTED = 'Restricted',
  PRIVATE = 'Private'
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