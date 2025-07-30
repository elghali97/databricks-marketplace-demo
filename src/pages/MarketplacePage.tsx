import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DatasetCard from '../components/datasets/DatasetCard';
import SearchFilter, { SearchFilters } from '../components/common/SearchFilter';
import { Dataset } from '../types/dataset';
import { mockDatasets } from '../data/mockData';

const MarketplacePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const initialCategory = queryParams.get('category') || '';

  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>(mockDatasets);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    categories: [],
    frequencies: []
  });

  useEffect(() => {
    // Convert URL category parameter to proper filter
    if (initialCategory) {
      const formattedCategory = initialCategory
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
        
      // Find matching category if it exists
      const matchedCategory = Object.values(mockDatasets)
        .map(dataset => dataset.category)
        .find(cat => cat.toLowerCase() === formattedCategory.toLowerCase());
      
      if (matchedCategory) {
        setActiveFilters({
          ...activeFilters,
          categories: [matchedCategory]
        });
      }
    }
  }, [initialCategory]);

  useEffect(() => {
    let filtered = [...datasets];
    
    // Apply text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dataset =>
        dataset.title.toLowerCase().includes(query) ||
        dataset.description.toLowerCase().includes(query) ||
        dataset.provider.name.toLowerCase().includes(query) ||
        dataset.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filters
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(dataset => 
        activeFilters.categories.includes(dataset.category)
      );
    }
    
    // Apply frequency filters
    if (activeFilters.frequencies.length > 0) {
      filtered = filtered.filter(dataset => 
        activeFilters.frequencies.includes(dataset.frequency)
      );
    }
    

    
    // Apply rating filter
    if (activeFilters.minRating) {
      filtered = filtered.filter(dataset => 
        dataset.rating >= activeFilters.minRating!
      );
    }
    
    // Apply verified filter
    if (activeFilters.verified) {
      filtered = filtered.filter(dataset => dataset.verified);
    }
    
    setFilteredDatasets(filtered);
  }, [searchQuery, activeFilters, datasets]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters: SearchFilters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-databricks-navy-800">
          Databricks Travel Data Marketplace
        </h1>
        <p className="text-databricks-navy-600">
          Discover and access premium travel and hospitality datasets powered by Databricks
        </p>
      </div>

      <SearchFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
        initialQuery={searchQuery}
      />

      {filteredDatasets.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-databricks-navy-700">No datasets found</h3>
          <p className="mt-2 text-databricks-navy-500">
            Try adjusting your search or filters to find what you're looking for
          </p>
        </div>
      ) : (
        <>
          {/* Featured dataset */}
          {filteredDatasets.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-databricks-navy-800 mb-4">Featured Dataset</h2>
              <DatasetCard 
                dataset={filteredDatasets[0]} 
                featured={true}
              />
            </div>
          )}

          {/* Regular dataset grid */}
          <div>
            <h2 className="text-xl font-semibold text-databricks-navy-800 mb-4">All Datasets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketplacePage;