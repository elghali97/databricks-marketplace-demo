import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Sparkles,
  TrendingUp,
  Shield,
  Award,
  BarChart3,
  Users,
  Leaf,
  CreditCard,
  AlertTriangle,
  SlidersHorizontal
} from 'lucide-react';
import { DatasetCategory, DataFrequency } from '../../types/dataset';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: SearchFilters) => void;
  initialQuery?: string;
}

export interface SearchFilters {
  categories: DatasetCategory[];
  frequencies: DataFrequency[];
  minRating?: number;
  verified?: boolean;
}

// Enhanced category mapping with icons and descriptions
const categoryConfig = {
  [DatasetCategory.MARKET_TRADING]: {
    icon: TrendingUp,
    description: "Real-time market data, equities, bonds",
    color: "text-databricks-lava-600",
    bgColor: "bg-databricks-lava-50",
    borderColor: "border-databricks-lava-200"
  },
  [DatasetCategory.RISK_COMPLIANCE]: {
    icon: Shield,
    description: "KYC, AML, regulatory compliance",
    color: "text-databricks-navy-600",
    bgColor: "bg-databricks-navy-50",
    borderColor: "border-databricks-navy-200"
  },
  [DatasetCategory.ESG_SUSTAINABILITY]: {
    icon: Leaf,
    description: "Environmental, social, governance",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  [DatasetCategory.ALTERNATIVE_DATA]: {
    icon: Sparkles,
    description: "Sentiment, transaction insights",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  [DatasetCategory.REFERENCE_DATA]: {
    icon: BarChart3,
    description: "Economic indicators, indices",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  [DatasetCategory.CUSTOMER_ANALYTICS]: {
    icon: Users,
    description: "Customer insights, behavior",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  [DatasetCategory.CREDIT_RISK]: {
    icon: CreditCard,
    description: "Credit scoring, default prediction",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  [DatasetCategory.FRAUD_DETECTION]: {
    icon: AlertTriangle,
    description: "Security, anomaly detection",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  }
};

// Natural language search suggestions
const searchSuggestions = [
  "ESG data for European banks",
  "Real-time equity prices NYSE",
  "Credit risk models banking",
  "Alternative data sentiment analysis",
  "Regulatory compliance KYC data",
  "Market volatility indicators"
];

export const SearchFilter = ({ onSearch, onFilter, initialQuery = '' }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    frequencies: []
  });

  const filterRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleFilterChange = <T extends keyof SearchFilters>(
    filterType: T, 
    value: SearchFilters[T]
  ) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const toggleCategory = (category: DatasetCategory) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
      
    handleFilterChange('categories', updatedCategories);
  };

  const toggleFrequency = (frequency: DataFrequency) => {
    const updatedFrequencies = filters.frequencies.includes(frequency)
      ? filters.frequencies.filter(f => f !== frequency)
      : [...filters.frequencies, frequency];
      
    handleFilterChange('frequencies', updatedFrequencies);
  };

  const applySuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const activeFilterCount = filters.categories.length + filters.frequencies.length + 
    (filters.minRating ? 1 : 0) + (filters.verified ? 1 : 0);

  return (
    <div className="w-full mb-8">
      {/* Enhanced Search Section */}
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex shadow-xl rounded-2xl overflow-hidden border border-databricks-oat-medium bg-white">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-databricks-navy-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="block w-full pl-14 pr-16 py-4 text-lg bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-databricks-navy-400"
                placeholder="Ask anything: 'Show me ESG data for European banks'..."
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="absolute inset-y-0 right-4 flex items-center text-databricks-navy-400 hover:text-databricks-navy-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {!searchQuery && (
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <span className="text-xs text-databricks-navy-400 bg-databricks-oat-light px-3 py-1 rounded-full font-semibold">
                    AI Search
                  </span>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white font-bold hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 flex items-center"
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </form>

        {/* AI Search Suggestions */}
        {showSuggestions && !searchQuery && (
          <div className="absolute z-20 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-databricks-oat-medium p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-databricks-lava-600 mr-2" />
              <h4 className="font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Try these AI-powered searches
              </h4>
            </div>
            <div className="space-y-2">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => applySuggestion(suggestion)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-databricks-oat-light transition-colors text-databricks-navy-600 hover:text-databricks-navy-800"
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-6 py-3 bg-white border border-databricks-oat-medium rounded-xl hover:shadow-md transition-all duration-200 font-semibold text-databricks-navy-700"
          style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
        >
          <SlidersHorizontal className="h-5 w-5 mr-3" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={() => {
              setFilters({ categories: [], frequencies: [] });
              onFilter({ categories: [], frequencies: [] });
            }}
            className="text-databricks-navy-500 hover:text-databricks-navy-700 font-semibold transition-colors"
            style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Enhanced Filters Panel */}
      {showFilters && (
        <div 
          ref={filterRef}
          className="mt-6 bg-white rounded-2xl shadow-2xl border border-databricks-oat-medium p-8 animate-slide-up"
        >
          {/* Financial Data Categories */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <BarChart3 className="h-6 w-6 text-databricks-lava-600 mr-3" />
              <h4 className="text-xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Financial Data Categories
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(DatasetCategory).map((category) => {
                const config = categoryConfig[category];
                const isSelected = filters.categories.includes(category);
                const IconComponent = config.icon;
                
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`group relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected 
                        ? `${config.bgColor} ${config.borderColor} shadow-lg scale-105` 
                        : 'bg-white border-neutral-200 hover:shadow-md hover:scale-102'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent className={`h-6 w-6 mt-1 ${isSelected ? config.color : 'text-neutral-400'} group-hover:${config.color} transition-colors`} />
                      <div className="flex-1">
                        <h5 className={`font-bold text-sm mb-1 ${isSelected ? config.color : 'text-neutral-700'} group-hover:${config.color}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {category}
                        </h5>
                        <p className={`text-xs ${isSelected ? 'text-neutral-600' : 'text-neutral-500'}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {config.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Update Frequency */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-databricks-lava-600 mr-3" />
              <h4 className="text-xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Data Freshness
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(DataFrequency).map((frequency) => {
                const isSelected = filters.frequencies.includes(frequency);
                return (
                  <button
                    key={frequency}
                    onClick={() => toggleFrequency(frequency)}
                    className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white border-databricks-lava-600 shadow-lg' 
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-databricks-lava-300 hover:text-databricks-lava-600'
                    }`}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    {frequency}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quality & Trust Filters */}
          <div>
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-databricks-lava-600 mr-3" />
              <h4 className="text-xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Quality & Trust
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-databricks-navy-700 mb-3" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('minRating', filters.minRating === rating ? undefined : rating)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        filters.minRating === rating
                          ? 'bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white border-databricks-lava-600'
                          : 'bg-white border-neutral-200 text-neutral-600 hover:border-databricks-lava-300'
                      }`}
                      style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                    >
                      <span className="font-bold">{rating}+</span>
                      <span className="ml-2">stars and above</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Filter */}
              <div>
                <label className="block text-sm font-semibold text-databricks-navy-700 mb-3" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Provider Status
                </label>
                <button
                  onClick={() => handleFilterChange('verified', !filters.verified)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    filters.verified
                      ? 'bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white border-databricks-lava-600'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:border-databricks-lava-300'
                  }`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  <span className="font-bold">Verified Providers Only</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Apply/Close Actions */}
          <div className="mt-8 pt-6 border-t border-databricks-oat-medium flex justify-between items-center">
            <div className="text-sm text-databricks-navy-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              {activeFilterCount > 0 ? `${activeFilterCount} filters applied` : 'No filters applied'}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-3 bg-databricks-oat-light text-databricks-navy-700 rounded-xl hover:bg-databricks-oat-medium transition-colors font-semibold"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                Close
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 font-semibold shadow-lg"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;