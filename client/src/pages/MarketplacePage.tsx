import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  Users,
  BarChart3,
  Shield,
  Zap,
  ChevronRight,
  Filter,
  Search,
  Loader2
} from 'lucide-react';
import DatasetCard from '../components/datasets/DatasetCard';
import SearchFilter, { SearchFilters } from '../components/common/SearchFilter';
import { Dataset, DatasetCategory } from '../types/dataset';
import { useFilteredDatasets } from '../hooks/useDatasets';

const MarketplacePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const initialCategory = queryParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    categories: [],
    frequencies: []
  });

  // Use the new smart filtered datasets hook
  const { datasets, loading, error, refetch } = useFilteredDatasets({
    categories: activeFilters.categories,
    searchQuery: searchQuery
  });
  
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);

  // AI-driven recommendations (simulated) - one featured dataset per category
  const getFeaturedDatasetPerCategory = (allDatasets: Dataset[], maxCount: number) => {
    const categorySeen = new Set<DatasetCategory>();
    const featured: Dataset[] = [];
    
    for (const dataset of allDatasets) {
      if (!categorySeen.has(dataset.category) && featured.length < maxCount) {
        categorySeen.add(dataset.category);
        featured.push(dataset);
      }
    }
    
    return featured;
  };

  const trendingDatasets = getFeaturedDatasetPerCategory(datasets.slice(1), 6);

  useEffect(() => {
    // Convert URL category parameter to proper filter
    if (initialCategory) {
      const categoryMapping: { [key: string]: DatasetCategory } = {
        'market-trading': DatasetCategory.MARKET_TRADING,
        'alternative-data': DatasetCategory.ALTERNATIVE_DATA,
        'reference-data': DatasetCategory.REFERENCE_DATA,
        'risk-compliance': DatasetCategory.RISK_COMPLIANCE,
        'customer-analytics': DatasetCategory.CUSTOMER_ANALYTICS,
        'esg-sustainability': DatasetCategory.ESG_SUSTAINABILITY,
        'credit-risk': DatasetCategory.CREDIT_RISK,
        'fraud-detection': DatasetCategory.FRAUD_DETECTION
      };
      
      const matchedCategory = categoryMapping[initialCategory];
      
      if (matchedCategory) {
        setActiveFilters({
          ...activeFilters,
          categories: [matchedCategory]
        });
      }
    }
  }, [initialCategory]);

  useEffect(() => {
    // Apply only client-side filters that aren't handled by the backend
    let filtered = [...datasets];
    
    // Apply frequency filters (not handled by backend API)
    if (activeFilters.frequencies.length > 0) {
      filtered = filtered.filter(dataset => 
        activeFilters.frequencies.includes(dataset.frequency)
      );
    }
    
    // Apply rating filter (not handled by backend API)
    if (activeFilters.minRating && activeFilters.minRating > 0) {
      filtered = filtered.filter(dataset => dataset.rating >= (activeFilters.minRating || 0));
    }
    
    setFilteredDatasets(filtered);
  }, [datasets, activeFilters]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-databricks-oat-100 via-white to-databricks-oat-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-databricks-lava-600 mx-auto mb-4" />
              <p className="text-databricks-navy-600 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Loading datasets...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-databricks-oat-100 via-white to-databricks-oat-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-red-800 font-semibold mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Failed to load datasets
                </h3>
                <p className="text-red-600 text-sm mb-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {error}
                </p>
                <button
                  onClick={refetch}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters: SearchFilters) => {
    setActiveFilters(filters);
  };

  // Check if a category is currently selected
  const isCategorySelected = activeFilters.categories.length > 0;

  // Combined quick actions and popular categories for discovery
  const discoveryItems = [
    {
      title: "Market & Trading",
      description: "Real-time equities & bonds",
      count: "156 datasets",
      icon: TrendingUp,
      gradient: "from-databricks-lava-500 to-databricks-lava-600",
      category: DatasetCategory.MARKET_TRADING
    },
    {
      title: "Risk & Compliance",
      description: "KYC, AML & regulatory data",
      count: "234 datasets",
      icon: Shield,
      gradient: "from-databricks-navy-600 to-databricks-navy-700",
      category: DatasetCategory.RISK_COMPLIANCE
    },
    {
      title: "ESG & Sustainability",
      description: "Environmental & social data",
      count: "67 datasets",
      icon: Award,
      gradient: "from-emerald-500 to-emerald-600",
      category: DatasetCategory.ESG_SUSTAINABILITY
    },
    {
      title: "Alternative Data",
      description: "Sentiment & transactions",
      count: "89 datasets",
      icon: Zap,
      gradient: "from-purple-500 to-purple-600",
      category: DatasetCategory.ALTERNATIVE_DATA
    },
    {
      title: "Credit Risk",
      description: "Scoring & default prediction",
      count: "143 datasets",
      icon: BarChart3,
      gradient: "from-orange-500 to-orange-600",
      category: DatasetCategory.CREDIT_RISK
    },
    {
      title: "Customer Analytics",
      description: "Behavioral & demographic data",
      count: "125 datasets",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      category: DatasetCategory.CUSTOMER_ANALYTICS
    }
  ];

  const handleCategoryClick = (category: DatasetCategory) => {
    setActiveFilters({ categories: [category], frequencies: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-databricks-oat-light">
      {/* Hero Section with Enhanced Typography */}
      <div className="relative overflow-hidden bg-gradient-to-br from-databricks-navy-900 via-databricks-navy-800 to-databricks-navy-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-databricks-lava-600/20 to-transparent"></div>
        <div className="relative px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-databricks-lava-400 mr-3 animate-pulse" />
              <span className="text-databricks-lava-400 font-bold text-sm uppercase tracking-wider">
                AI-Powered Data Intelligence
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Databricks Data Intelligence
              <span className="block text-databricks-lava-400">Marketplace</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Discover premium financial data products, AI models, and analytics solutions. 
              Powered by Databricks' unified data intelligence platform.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-databricks-lava-400 focus:border-transparent transition-all duration-300"
                  placeholder="Ask: 'Show me ESG data for European banks' or search datasets..."
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-neutral-400 bg-white/10 px-2 py-1 rounded-md">
                    AI Search
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-16">
        {/* Featured Dataset - Always visible */}
        {!isCategorySelected && (
          <section className="py-12 animate-fade-in mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-databricks-lava-600 mr-3" />
                <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Featured for Financial Services
                </h2>
                <span className="ml-3 bg-gradient-to-r from-databricks-lava-100 to-databricks-lava-200 text-databricks-lava-800 px-3 py-1 rounded-full text-sm font-semibold">
                  AI Curated
                </span>
                <span className="ml-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                  Premium Pick
                </span>
              </div>
              <button className="text-databricks-lava-600 hover:text-databricks-lava-700 font-semibold flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="relative mx-auto">
              {/* Hero-style featured dataset background */}
              <div className="absolute inset-0 bg-gradient-to-br from-databricks-navy-50 via-white to-databricks-lava-50 rounded-3xl shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-3xl"></div>
              
              <div className="relative px-8 py-16">
                {/* Featured Dataset Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-databricks-lava-600 mr-4"></div>
                    <Award className="h-8 w-8 text-databricks-lava-600" />
                    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-databricks-lava-600 ml-4"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-databricks-navy-800 mb-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Premium Financial Intelligence
                  </h3>
                  <p className="text-lg text-databricks-navy-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Handpicked by our AI engine as the highest-quality, most trusted dataset for financial services professionals. 
                    Featuring superior data quality, comprehensive coverage, and proven track record.
                  </p>
                </div>

                {/* Large Featured Dataset Card */}
                <div className="max-w-6xl mx-auto">
                  {datasets.slice(0, 1).map((dataset) => (
                    <div key={dataset.id} className="transform hover:scale-[1.02] transition-all duration-500">
                      <DatasetCard 
                        dataset={dataset} 
                        featured={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Trending in Banking - Only visible when no category selected */}
        {!isCategorySelected && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-databricks-lava-600 mr-3" />
                <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Trending in Banking
                </h2>
                <span className="ml-3 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Hot
                </span>
                <span className="ml-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                  Curated Selection
                </span>
              </div>
              <button className="text-databricks-lava-600 hover:text-databricks-lava-700 font-semibold flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </section>
        )}

        {/* Category Results - Show when category is selected */}
        {isCategorySelected && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Filter className="h-6 w-6 text-databricks-lava-600 mr-3" />
                <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {activeFilters.categories[0]?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Datasets
                </h2>
                <span className="ml-3 bg-databricks-oat-light text-databricks-navy-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {filteredDatasets.length} datasets
                </span>
              </div>
              <button 
                onClick={() => setActiveFilters({ categories: [], frequencies: [] })}
                className="text-databricks-lava-600 hover:text-databricks-lava-700 font-semibold flex items-center"
              >
                Clear Filters
              </button>
            </div>

            <SearchFilter 
              onSearch={handleSearch}
              onFilter={handleFilter}
              initialQuery={searchQuery}
            />

            {filteredDatasets.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-databricks-oat-medium">
                <BarChart3 className="h-16 w-16 text-databricks-oat-dark mx-auto mb-6" />
                <h3 className="text-xl font-bold text-databricks-navy-800 mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  No datasets found
                </h3>
                <p className="text-databricks-navy-600 max-w-md mx-auto" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Try adjusting your search criteria or explore other categories above
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDatasets.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Search Results - Show when text search is active but no category selected */}
        {searchQuery && !isCategorySelected && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Search className="h-6 w-6 text-databricks-lava-600 mr-3" />
                <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Search Results
                </h2>
                <span className="ml-3 bg-databricks-oat-light text-databricks-navy-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {filteredDatasets.length} datasets
                </span>
              </div>
            </div>

            <SearchFilter 
              onSearch={handleSearch}
              onFilter={handleFilter}
              initialQuery={searchQuery}
            />

            {filteredDatasets.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-databricks-oat-medium">
                <Search className="h-16 w-16 text-databricks-oat-dark mx-auto mb-6" />
                <h3 className="text-xl font-bold text-databricks-navy-800 mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  No datasets found
                </h3>
                <p className="text-databricks-navy-600 max-w-md mx-auto" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Try different search terms or explore our featured collections above
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDatasets.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Discover Data by Categories - Always visible at bottom */}
        <section className="mt-16 pt-16 border-t border-databricks-oat-medium">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-databricks-lava-600 mr-3" />
              <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {isCategorySelected ? "Explore Other Categories" : "Discover Data by Category"}
              </h2>
            </div>
            <button className="text-databricks-lava-600 hover:text-databricks-lava-700 font-semibold flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoveryItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(item.category)}
                className={`group relative overflow-hidden bg-gradient-to-br ${item.gradient} p-6 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-left`}
              >
                <item.icon className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm opacity-90 mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {item.description}
                </p>
                <p className="text-xs opacity-75" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {item.count}
                </p>
                <ChevronRight className="absolute top-4 right-4 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketplacePage;