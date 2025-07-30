import { useState, useRef, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
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

export const SearchFilter = ({ onSearch, onFilter, initialQuery = '' }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    frequencies: []
  });

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
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

  return (
    <div className="w-full mb-6">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 rounded-l-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search for travel datasets, providers, or topics..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-l-0 border-neutral-300 flex items-center rounded-r-md transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Filters</span>
            {(filters.categories.length > 0 || filters.frequencies.length > 0) && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-medium text-white">
                {filters.categories.length + filters.frequencies.length}
              </span>
            )}
          </button>
        </div>

        {/* Filters dropdown */}
        {showFilters && (
          <div 
            ref={filterRef}
            className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-4 border border-neutral-200 animate-slide-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category filters */}
              <div>
                <h4 className="font-medium mb-2 text-sm text-neutral-700">Travel Data Categories</h4>
                <div className="space-y-1.5">
                  {Object.values(DatasetCategory).map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-neutral-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Frequency filters */}
              <div>
                <h4 className="font-medium mb-2 text-sm text-neutral-700">Update Frequency</h4>
                <div className="space-y-1.5">
                  {Object.values(DataFrequency).map((frequency) => (
                    <label key={frequency} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.frequencies.includes(frequency)}
                        onChange={() => toggleFrequency(frequency)}
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-neutral-600">{frequency}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-neutral-200 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setFilters({ categories: [], frequencies: [] });
                  onFilter({ categories: [], frequencies: [] });
                }}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                Clear all filters
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Apply filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilter;