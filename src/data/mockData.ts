import { Dataset, DatasetCategory, DataFrequency, PricingModel, AccessLevel } from '../types/dataset';
import { User, UserRole } from '../types/user';

// Mock datasets
export const mockDatasets: Dataset[] = [
  {
    id: '1',
    title: 'Global Flight Traffic Analytics 2022-2023',
    description: 'Comprehensive dataset containing monthly flight traffic data for major airlines across global routes, including origin-destination pairs, load factors, passenger demographics, and booking patterns powered by Databricks technology.',
    provider: {
      id: '1',
      name: 'Databricks Travel Intelligence',
      verified: true
    },
    category: DatasetCategory.PASSENGER_TRAFFIC,
    subCategory: 'International Flights',
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-12-15',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 499,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.7,
    ratingsCount: 128,
    downloadCount: 843,
    tags: ['flight', 'passenger', 'traffic', 'international', 'demographics', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'North America', 'Europe', 'Asia'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-12-31'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/flight-traffic-sample.csv',
    previewImage: 'https://images.pexels.com/photos/1716825/pexels-photo-1716825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 98,
    verified: true
  },
  {
    id: '2',
    title: 'Hotel Occupancy & Revenue Intelligence - Global Markets',
    description: 'Detailed occupancy data for hotels across major global markets, segmented by hotel class, room type, and booking channel. Includes average daily rates and revenue per available room with Databricks hospitality insights.',
    provider: {
      id: '2',
      name: 'Databricks Hospitality Solutions',
      verified: true
    },
    category: DatasetCategory.HOTEL_OCCUPANCY,
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-11-30',
    pricingModel: PricingModel.ONE_TIME,
    price: 349,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.5,
    ratingsCount: 93,
    downloadCount: 621,
    tags: ['hotel', 'occupancy', 'ADR', 'RevPAR', 'hospitality', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Top 50 Markets'],
    timeRange: {
      from: '2022-06-01',
      to: '2023-11-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/hotel-occupancy-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 95,
    verified: true
  },
  {
    id: '3',
    title: 'Flight On-Time Performance & Operational Analytics',
    description: 'Detailed on-time performance data for domestic and international flights, including delays, cancellations, and diversion statistics categorized by airline, airport, and route with real-time Databricks operational data.',
    provider: {
      id: '3',
      name: 'Databricks Operations Intelligence',
      verified: true
    },
    category: DatasetCategory.OPERATIONAL,
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-12-20',
    pricingModel: PricingModel.FREE,
    accessLevel: AccessLevel.PUBLIC,
    rating: 4.2,
    ratingsCount: 215,
    downloadCount: 1893,
    tags: ['flight', 'on-time', 'delays', 'cancellations', 'performance', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['United States', 'Canada', 'European Union'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-12-20'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/flight-performance-sample.csv',
    previewImage: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 90,
    verified: true
  },
  {
    id: '4',
    title: 'Global Travel Booking Intelligence & Market Trends',
    description: 'Analysis of global travel booking patterns, including lead times, booking channels, price sensitivity, and seasonal trends for both air travel and accommodations powered by Databricks booking intelligence.',
    provider: {
      id: '4',
      name: 'Databricks Market Intelligence',
      verified: true
    },
    category: DatasetCategory.BOOKING_PATTERNS,
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-10-15',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 799,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.8,
    ratingsCount: 64,
    downloadCount: 312,
    tags: ['bookings', 'travel', 'trends', 'seasonal', 'channels', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Regional Breakdowns'],
    timeRange: {
      from: '2020-01-01',
      to: '2023-09-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/booking-trends-sample.pdf',
    previewImage: 'https://images.pexels.com/photos/91217/pexels-photo-91217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 96,
    verified: false
  },
  {
    id: '5',
    title: 'Airline Loyalty Program Analytics & Member Intelligence',
    description: 'Detailed analysis of airline loyalty program member behavior, including redemption patterns, tier progression, partner engagement, and demographic profiles with Databricks loyalty insights.',
    provider: {
      id: '5',
      name: 'Databricks Loyalty Solutions',
      verified: true
    },
    category: DatasetCategory.LOYALTY_PROGRAM,
    frequency: DataFrequency.QUARTERLY,
    lastUpdated: '2023-09-30',
    pricingModel: PricingModel.CUSTOM,
    accessLevel: AccessLevel.PRIVATE,
    rating: 4.9,
    ratingsCount: 42,
    downloadCount: 156,
    tags: ['loyalty', 'airline', 'members', 'redemption', 'behavior', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['North America', 'Europe', 'Asia Pacific'],
    timeRange: {
      from: '2021-01-01',
      to: '2023-09-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/loyalty-analysis-sample.pdf',
    previewImage: 'https://images.pexels.com/photos/8292805/pexels-photo-8292805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 99,
    verified: true
  },
  {
    id: '6',
    title: 'Hotel Revenue Management Intelligence & Benchmarks',
    description: 'Comprehensive benchmarking data for hotel revenue management, including pricing strategies, competitive rate analysis, and revenue optimization metrics across various property types and markets with Databricks revenue intelligence.',
    provider: {
      id: '6',
      name: 'Databricks Revenue Intelligence',
      verified: true
    },
    category: DatasetCategory.REVENUE_MANAGEMENT,
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-11-15',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 599,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.6,
    ratingsCount: 78,
    downloadCount: 345,
    tags: ['revenue management', 'hotel', 'pricing', 'benchmarks', 'optimization', 'databricks'],
    formats: ['DELTA SHARING', 'Interactive Dashboard'],
    geographicCoverage: ['Global', 'Top 100 Markets'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-10-31'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/revenue-benchmarks-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 94,
    verified: true
  },
  // Additional PASSENGER_TRAFFIC datasets
  {
    id: '7',
    title: 'Regional Airport Passenger Flow Analytics - Europe',
    description: 'Detailed passenger flow analysis for European regional airports, including seasonal variations, connecting passenger patterns, and demographic breakdowns with Databricks regional intelligence.',
    provider: {
      id: '1',
      name: 'Databricks Travel Intelligence',
      verified: true
    },
    category: DatasetCategory.PASSENGER_TRAFFIC,
    subCategory: 'Regional Airports',
    frequency: DataFrequency.WEEKLY,
    lastUpdated: '2023-12-10',
    pricingModel: PricingModel.ONE_TIME,
    price: 275,
    currency: 'EUR',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.4,
    ratingsCount: 67,
    downloadCount: 423,
    tags: ['regional', 'airports', 'europe', 'passenger', 'flow', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Europe', 'Regional Airports'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-12-10'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/regional-passenger-sample.csv',
    previewImage: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 92,
    verified: true
  },
  {
    id: '8',
    title: 'Low-Cost Carrier Passenger Intelligence - Asia Pacific',
    description: 'Comprehensive analysis of low-cost carrier passenger behavior, route preferences, and demographic profiles across Asia Pacific markets with specialized Databricks LCC insights.',
    provider: {
      id: '7',
      name: 'Databricks Asia Pacific Analytics',
      verified: true
    },
    category: DatasetCategory.PASSENGER_TRAFFIC,
    subCategory: 'Low-Cost Carriers',
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-11-25',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 399,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.6,
    ratingsCount: 89,
    downloadCount: 567,
    tags: ['LCC', 'low-cost', 'asia-pacific', 'passenger', 'routes', 'databricks'],
    formats: ['DELTA SHARING', 'Dashboard'],
    geographicCoverage: ['Asia Pacific', 'Southeast Asia', 'Australia'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-11-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/lcc-passenger-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 95,
    verified: false
  },
  // Additional HOTEL_OCCUPANCY datasets
  {
    id: '9',
    title: 'Luxury Hotel Performance Metrics - Middle East',
    description: 'Premium hotel performance data focusing on luxury properties in Middle East markets, including guest satisfaction scores, amenity utilization, and premium service analytics with Databricks luxury hospitality insights.',
    provider: {
      id: '8',
      name: 'Databricks Luxury Hospitality',
      verified: true
    },
    category: DatasetCategory.HOTEL_OCCUPANCY,
    subCategory: 'Luxury Properties',
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-12-18',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 749,
    currency: 'USD',
    accessLevel: AccessLevel.PRIVATE,
    rating: 4.8,
    ratingsCount: 45,
    downloadCount: 234,
    tags: ['luxury', 'hotel', 'middle-east', 'performance', 'satisfaction', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Middle East', 'UAE', 'Saudi Arabia', 'Qatar'],
    timeRange: {
      from: '2023-06-01',
      to: '2023-12-15'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/luxury-hotel-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 97,
    verified: true
  },
  {
    id: '10',
    title: 'Boutique Hotel Market Intelligence - North America',
    description: 'Specialized dataset covering boutique and independent hotel performance across North American markets, including occupancy trends, rate positioning, and competitive analysis with Databricks boutique insights.',
    provider: {
      id: '2',
      name: 'Databricks Hospitality Solutions',
      verified: true
    },
    category: DatasetCategory.HOTEL_OCCUPANCY,
    subCategory: 'Boutique Hotels',
    frequency: DataFrequency.WEEKLY,
    lastUpdated: '2023-12-12',
    pricingModel: PricingModel.ONE_TIME,
    price: 425,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.3,
    ratingsCount: 112,
    downloadCount: 678,
    tags: ['boutique', 'independent', 'north-america', 'occupancy', 'rates', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['North America', 'USA', 'Canada'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-12-10'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/boutique-hotel-sample.csv',
    previewImage: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 91,
    verified: true
  },
  // Additional OPERATIONAL datasets
  {
    id: '11',
    title: 'Airport Ground Operations Efficiency Analytics',
    description: 'Comprehensive analysis of airport ground operations including baggage handling times, gate utilization, ground service equipment efficiency, and turnaround performance metrics with Databricks operational intelligence.',
    provider: {
      id: '3',
      name: 'Databricks Operations Intelligence',
      verified: true
    },
    category: DatasetCategory.OPERATIONAL,
    subCategory: 'Ground Operations',
    frequency: DataFrequency.HOURLY,
    lastUpdated: '2023-12-21',
    pricingModel: PricingModel.PAY_PER_USE,
    price: 0.05,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.1,
    ratingsCount: 156,
    downloadCount: 2134,
    tags: ['ground', 'operations', 'baggage', 'gate', 'turnaround', 'databricks'],
    formats: ['DELTA SHARING', 'Real-time API'],
    geographicCoverage: ['Global', 'Major Airports'],
    timeRange: {
      from: '2023-08-01',
      to: '2023-12-21'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/ground-ops-sample.csv',
    previewImage: 'https://images.pexels.com/photos/2767767/pexels-photo-2767767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 88,
    verified: true
  },
  {
    id: '12',
    title: 'Airline Crew Scheduling & Resource Optimization Data',
    description: 'Detailed airline crew scheduling data including crew utilization rates, duty time analysis, training schedules, and resource optimization metrics with Databricks crew management insights.',
    provider: {
      id: '9',
      name: 'Databricks Crew Solutions',
      verified: true
    },
    category: DatasetCategory.OPERATIONAL,
    subCategory: 'Crew Management',
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-12-19',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 899,
    currency: 'USD',
    accessLevel: AccessLevel.PRIVATE,
    rating: 4.7,
    ratingsCount: 73,
    downloadCount: 398,
    tags: ['crew', 'scheduling', 'optimization', 'duty-time', 'training', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Major Airlines'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-12-15'
    },
    sampleAvailable: false,
    previewImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 96,
    verified: true
  },
  // Additional BOOKING_PATTERNS datasets
  {
    id: '13',
    title: 'Corporate Travel Booking Behavior Analysis',
    description: 'In-depth analysis of corporate travel booking patterns, including advance booking trends, expense policy compliance, preferred suppliers, and cost optimization opportunities with Databricks corporate insights.',
    provider: {
      id: '10',
      name: 'Databricks Corporate Travel',
      verified: true
    },
    category: DatasetCategory.BOOKING_PATTERNS,
    subCategory: 'Corporate Travel',
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-11-30',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 649,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.5,
    ratingsCount: 91,
    downloadCount: 445,
    tags: ['corporate', 'booking', 'expense', 'policy', 'suppliers', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Enterprise Markets'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-11-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/corporate-booking-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/356086/pexels-photo-356086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 93,
    verified: true
  },
  {
    id: '14',
    title: 'Leisure Travel Booking Trends & Seasonal Patterns',
    description: 'Comprehensive analysis of leisure travel booking behavior including seasonal booking patterns, destination preferences, family travel trends, and vacation package selections with Databricks leisure insights.',
    provider: {
      id: '4',
      name: 'Databricks Market Intelligence',
      verified: false
    },
    category: DatasetCategory.BOOKING_PATTERNS,
    subCategory: 'Leisure Travel',
    frequency: DataFrequency.WEEKLY,
    lastUpdated: '2023-12-05',
    pricingModel: PricingModel.ONE_TIME,
    price: 299,
    currency: 'USD',
    accessLevel: AccessLevel.PUBLIC,
    rating: 4.2,
    ratingsCount: 187,
    downloadCount: 856,
    tags: ['leisure', 'seasonal', 'destinations', 'family', 'vacation', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Popular Destinations'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-12-01'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/leisure-booking-sample.csv',
    previewImage: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 89,
    verified: false
  },
  // Additional LOYALTY_PROGRAM datasets
  {
    id: '15',
    title: 'Hotel Loyalty Program Performance Analytics',
    description: 'Detailed analysis of hotel loyalty program performance including member engagement, point redemption patterns, tier benefits utilization, and cross-property stays with Databricks hospitality loyalty insights.',
    provider: {
      id: '11',
      name: 'Databricks Hotel Loyalty',
      verified: true
    },
    category: DatasetCategory.LOYALTY_PROGRAM,
    subCategory: 'Hotel Loyalty',
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-11-15',
    pricingModel: PricingModel.CUSTOM,
    accessLevel: AccessLevel.PRIVATE,
    rating: 4.6,
    ratingsCount: 56,
    downloadCount: 203,
    tags: ['hotel', 'loyalty', 'points', 'redemption', 'tier-benefits', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Major Hotel Chains'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-10-31'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/hotel-loyalty-sample.pdf',
    previewImage: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 97,
    verified: true
  },
  {
    id: '16',
    title: 'Coalition Loyalty Program Cross-Brand Analytics',
    description: 'Advanced analytics on coalition loyalty programs including cross-brand point transfers, partner engagement, multi-brand customer journeys, and program synergies with Databricks coalition insights.',
    provider: {
      id: '5',
      name: 'Databricks Loyalty Solutions',
      verified: true
    },
    category: DatasetCategory.LOYALTY_PROGRAM,
    subCategory: 'Coalition Programs',
    frequency: DataFrequency.QUARTERLY,
    lastUpdated: '2023-09-30',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 1299,
    currency: 'USD',
    accessLevel: AccessLevel.PRIVATE,
    rating: 4.8,
    ratingsCount: 34,
    downloadCount: 127,
    tags: ['coalition', 'cross-brand', 'partners', 'multi-brand', 'synergy', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Multi-Brand Networks'],
    timeRange: {
      from: '2021-01-01',
      to: '2023-09-30'
    },
    sampleAvailable: false,
    previewImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 98,
    verified: true
  },
  // Additional REVENUE_MANAGEMENT datasets
  {
    id: '17',
    title: 'Airline Dynamic Pricing & Yield Management Analytics',
    description: 'Comprehensive airline pricing analytics including dynamic pricing strategies, yield management performance, fare class optimization, and competitive pricing intelligence with Databricks airline revenue insights.',
    provider: {
      id: '12',
      name: 'Databricks Airline Revenue',
      verified: true
    },
    category: DatasetCategory.REVENUE_MANAGEMENT,
    subCategory: 'Airline Pricing',
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-12-20',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 899,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.7,
    ratingsCount: 102,
    downloadCount: 567,
    tags: ['airline', 'dynamic-pricing', 'yield', 'fare-class', 'competitive', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Major Airlines'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-12-20'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/airline-pricing-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 96,
    verified: true
  },
  {
    id: '18',
    title: 'Vacation Rental Revenue Optimization Intelligence',
    description: 'Advanced revenue management data for vacation rental properties including seasonal pricing trends, occupancy optimization, length-of-stay strategies, and market positioning with Databricks rental insights.',
    provider: {
      id: '13',
      name: 'Databricks Rental Intelligence',
      verified: true
    },
    category: DatasetCategory.REVENUE_MANAGEMENT,
    subCategory: 'Vacation Rentals',
    frequency: DataFrequency.WEEKLY,
    lastUpdated: '2023-12-14',
    pricingModel: PricingModel.ONE_TIME,
    price: 449,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.4,
    ratingsCount: 87,
    downloadCount: 389,
    tags: ['vacation-rental', 'seasonal', 'length-of-stay', 'optimization', 'positioning', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Popular Destinations'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-12-10'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/rental-revenue-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 92,
    verified: true
  },
  // FLIGHT_SCHEDULES datasets
  {
    id: '19',
    title: 'Global Flight Schedule Intelligence & Capacity Analysis',
    description: 'Comprehensive flight schedule data including published schedules, capacity variations, route frequency changes, and seasonal adjustments across global airlines with Databricks schedule intelligence.',
    provider: {
      id: '14',
      name: 'Databricks Schedule Intelligence',
      verified: true
    },
    category: DatasetCategory.FLIGHT_SCHEDULES,
    subCategory: 'Global Schedules',
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-12-21',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 699,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.8,
    ratingsCount: 145,
    downloadCount: 1234,
    tags: ['flight', 'schedule', 'capacity', 'frequency', 'seasonal', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'All Major Routes'],
    timeRange: {
      from: '2023-01-01',
      to: '2024-12-31'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/flight-schedule-sample.csv',
    previewImage: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 99,
    verified: true
  },
  {
    id: '20',
    title: 'Regional Airlines Schedule Optimization Data',
    description: 'Specialized dataset focusing on regional airline schedules including hub connectivity, spoke route optimization, feeder flight timing, and regional market coverage with Databricks regional insights.',
    provider: {
      id: '15',
      name: 'Databricks Regional Analytics',
      verified: true
    },
    category: DatasetCategory.FLIGHT_SCHEDULES,
    subCategory: 'Regional Airlines',
    frequency: DataFrequency.WEEKLY,
    lastUpdated: '2023-12-18',
    pricingModel: PricingModel.ONE_TIME,
    price: 399,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.3,
    ratingsCount: 78,
    downloadCount: 456,
    tags: ['regional', 'hub', 'spoke', 'connectivity', 'feeder', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['North America', 'Europe', 'Regional Markets'],
    timeRange: {
      from: '2023-01-01',
      to: '2024-06-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/regional-schedule-sample.xlsx',
    previewImage: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 91,
    verified: true
  },
  {
    id: '21',
    title: 'Cargo Flight Schedule & Capacity Intelligence',
    description: 'Dedicated cargo flight schedule analysis including freight capacity, cargo route networks, freighter utilization, and cargo demand patterns with Databricks cargo intelligence.',
    provider: {
      id: '16',
      name: 'Databricks Cargo Solutions',
      verified: true
    },
    category: DatasetCategory.FLIGHT_SCHEDULES,
    subCategory: 'Cargo Flights',
    frequency: DataFrequency.DAILY,
    lastUpdated: '2023-12-20',
    pricingModel: PricingModel.PAY_PER_USE,
    price: 0.08,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.5,
    ratingsCount: 63,
    downloadCount: 789,
    tags: ['cargo', 'freight', 'capacity', 'freighter', 'demand', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Major Cargo Routes'],
    timeRange: {
      from: '2023-06-01',
      to: '2023-12-20'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/cargo-schedule-sample.csv',
    previewImage: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 94,
    verified: true
  },
  // MARKET_INTELLIGENCE datasets
  {
    id: '22',
    title: 'Travel Market Competitive Intelligence & Benchmarking',
    description: 'Advanced competitive intelligence covering market share analysis, competitive positioning, pricing strategies, and performance benchmarking across travel sectors with Databricks market intelligence.',
    provider: {
      id: '4',
      name: 'Databricks Market Intelligence',
      verified: false
    },
    category: DatasetCategory.MARKET_INTELLIGENCE,
    subCategory: 'Competitive Analysis',
    frequency: DataFrequency.MONTHLY,
    lastUpdated: '2023-11-30',
    pricingModel: PricingModel.SUBSCRIPTION,
    price: 999,
    currency: 'USD',
    accessLevel: AccessLevel.RESTRICTED,
    rating: 4.6,
    ratingsCount: 89,
    downloadCount: 345,
    tags: ['competitive', 'market-share', 'benchmarking', 'positioning', 'strategy', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Regional Markets'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-11-30'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/market-intelligence-sample.pdf',
    previewImage: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 95,
    verified: false
  },
  {
    id: '23',
    title: 'Emerging Travel Markets & Growth Opportunities',
    description: 'Strategic analysis of emerging travel markets including growth forecasts, market entry opportunities, consumer behavior shifts, and investment insights with Databricks emerging market intelligence.',
    provider: {
      id: '17',
      name: 'Databricks Strategic Intelligence',
      verified: true
    },
    category: DatasetCategory.MARKET_INTELLIGENCE,
    subCategory: 'Emerging Markets',
    frequency: DataFrequency.QUARTERLY,
    lastUpdated: '2023-09-30',
    pricingModel: PricingModel.CUSTOM,
    accessLevel: AccessLevel.PRIVATE,
    rating: 4.9,
    ratingsCount: 41,
    downloadCount: 178,
    tags: ['emerging', 'growth', 'forecasts', 'opportunities', 'investment', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Emerging Markets', 'APAC', 'Latin America', 'Africa'],
    timeRange: {
      from: '2023-01-01',
      to: '2023-09-30'
    },
    sampleAvailable: false,
    previewImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 98,
    verified: true
  },
  {
    id: '24',
    title: 'Travel Technology Adoption & Digital Transformation Trends',
    description: 'Comprehensive analysis of travel technology adoption rates, digital transformation initiatives, mobile usage patterns, and future technology trends with Databricks technology intelligence.',
    provider: {
      id: '18',
      name: 'Databricks Technology Intelligence',
      verified: true
    },
    category: DatasetCategory.MARKET_INTELLIGENCE,
    subCategory: 'Technology Trends',
    frequency: DataFrequency.QUARTERLY,
    lastUpdated: '2023-12-15',
    pricingModel: PricingModel.ONE_TIME,
    price: 749,
    currency: 'USD',
    accessLevel: AccessLevel.PUBLIC,
    rating: 4.4,
    ratingsCount: 156,
    downloadCount: 678,
    tags: ['technology', 'digital', 'mobile', 'transformation', 'trends', 'databricks'],
    formats: ['DELTA SHARING'],
    geographicCoverage: ['Global', 'Technology Markets'],
    timeRange: {
      from: '2022-01-01',
      to: '2023-12-01'
    },
    sampleAvailable: true,
    sampleUrl: '/samples/tech-trends-sample.pdf',
    previewImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qualityScore: 93,
    verified: true
  }
];

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Travel Intelligence',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Samantha Lee',
    email: 'samantha@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Hospitality Solutions',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Marcus Chen',
    email: 'marcus@travelcorp.com',
    role: UserRole.CONSUMER,
    organization: 'Travel Corporation',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Jessica Williams',
    email: 'jessica@airlinepartners.com',
    role: UserRole.CONSUMER,
    organization: 'Airline Partners Inc.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    name: 'Robert Garcia',
    email: 'robert@databricks.com',
    role: UserRole.ADMIN,
    organization: 'Databricks Admin Team',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '7',
    name: 'Li Wei',
    email: 'li.wei@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Asia Pacific Analytics',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '8',
    name: 'Fatima Al-Rashid',
    email: 'fatima@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Luxury Hospitality',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '9',
    name: 'Carlos Rodriguez',
    email: 'carlos@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Crew Solutions',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '10',
    name: 'Sarah Mitchell',
    email: 'sarah@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Corporate Travel',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '11',
    name: 'Marco Rossi',
    email: 'marco@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Hotel Loyalty',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '12',
    name: 'Anna Kowalski',
    email: 'anna@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Airline Revenue',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '13',
    name: 'David Thompson',
    email: 'david@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Rental Intelligence',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '14',
    name: 'Elena Petrov',
    email: 'elena@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Schedule Intelligence',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '15',
    name: 'James Anderson',
    email: 'james@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Regional Analytics',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '16',
    name: 'Priya Sharma',
    email: 'priya@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Cargo Solutions',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '17',
    name: 'Michael O\'Brien',
    email: 'michael@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Strategic Intelligence',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '18',
    name: 'Lisa Chang',
    email: 'lisa@databricks.com',
    role: UserRole.PROVIDER,
    organization: 'Databricks Technology Intelligence',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

// Analytics data
export const analyticsData = {
  totalDatasets: 324,
  totalProviders: 78,
  totalConsumers: 1456,
  totalDownloads: 23847,
  revenueGenerated: 892456,
  activeUsers: 1234,
  topCategories: [
    { name: DatasetCategory.PASSENGER_TRAFFIC, value: 45 },
    { name: DatasetCategory.HOTEL_OCCUPANCY, value: 42 },
    { name: DatasetCategory.FLIGHT_SCHEDULES, value: 38 },
    { name: DatasetCategory.BOOKING_PATTERNS, value: 36 },
    { name: DatasetCategory.MARKET_INTELLIGENCE, value: 34 },
    { name: DatasetCategory.OPERATIONAL, value: 32 },
    { name: DatasetCategory.REVENUE_MANAGEMENT, value: 31 },
    { name: DatasetCategory.LOYALTY_PROGRAM, value: 28 }
  ],
  monthlyDownloads: [
    { month: 'Jan', downloads: 845 },
    { month: 'Feb', downloads: 932 },
    { month: 'Mar', downloads: 1021 },
    { month: 'Apr', downloads: 978 },
    { month: 'May', downloads: 1167 },
    { month: 'Jun', downloads: 1024 },
    { month: 'Jul', downloads: 1089 },
    { month: 'Aug', downloads: 1245 },
    { month: 'Sep', downloads: 1321 },
    { month: 'Oct', downloads: 1408 },
    { month: 'Nov', downloads: 1523 },
    { month: 'Dec', downloads: 1400 }
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 28350 },
    { month: 'Feb', revenue: 32500 },
    { month: 'Mar', revenue: 35750 },
    { month: 'Apr', revenue: 33200 },
    { month: 'May', revenue: 38600 },
    { month: 'Jun', revenue: 37450 },
    { month: 'Jul', revenue: 39800 },
    { month: 'Aug', revenue: 41250 },
    { month: 'Sep', revenue: 43750 },
    { month: 'Oct', revenue: 46200 },
    { month: 'Nov', revenue: 49850 },
    { month: 'Dec', revenue: 50089 }
  ]
};