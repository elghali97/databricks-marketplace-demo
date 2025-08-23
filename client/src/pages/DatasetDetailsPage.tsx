import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  Star, 
  Calendar, 
  Tag, 
  FileText, 
  Globe, 
  PlusCircle,
  CheckCircle, 
  AlertCircle,
  Users,
  ShieldCheck,
  Play,
  Award
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useDataset, useDatasets } from '../hooks/useDatasets';
import { TablePreview } from '../components/datasets/TablePreview';
import DataVisualization from '../components/charts/DataVisualization';
import { Dataset, PricingModel } from '../types/dataset';
import { formatCurrency, formatDate, formatNumber } from '../utils/formatters';

const DatasetDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [requestSent, setRequestSent] = useState(false);
  
  // Use the dedicated hook for fetching a single dataset by ID
  const { dataset, loading, error } = useDataset(id || '');
  
  // Use the datasets hook only for getting all datasets for featured dataset logic
  const { datasets } = useDatasets();
  
  // Function to check if dataset is the featured dataset (highest quality)
  const isFeaturedDataset = (dataset: Dataset) => {
    if (!dataset) return false;
    
    // Get the featured dataset using the same logic as MarketplacePage
    const sortedDatasets = [...datasets].sort((a, b) => {
      // Primary sort: Quality score (descending)
      if (b.qualityScore !== a.qualityScore) {
        return b.qualityScore - a.qualityScore;
      }
      // Secondary sort: Rating (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // Tertiary sort: Download count (descending)
      return b.downloadCount - a.downloadCount;
    });
    
    // The featured dataset is the first one (highest quality)
    return sortedDatasets.length > 0 && sortedDatasets[0].id === dataset.id;
  };

  // Check if user has access to this dataset
  // ALL accessible datasets get: Live Data Preview + Dataset Overview + Data Intelligence Visualization
  const userHasAccess = dataset && (
    // User owns the dataset
    dataset.provider.name === user?.organization ||
    // User has been granted access (simulate with dataset IDs)
    ['1', '2', '5', '8', '12', '15'].includes(dataset.id) ||
    // Featured dataset gets exclusive access (highest quality dataset)
    isFeaturedDataset(dataset)
  );
  
  // Show loading spinner while dataset is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700"></div>
          <p className="text-neutral-600">Loading dataset details...</p>
        </div>
      </div>
    );
  }
  
  // Show error if there was an API error
  if (error) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="h-16 w-16 text-error-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Error Loading Dataset</h2>
        <p className="text-neutral-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  // Show "not found" if no dataset was returned
  if (!dataset) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="h-16 w-16 text-error-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Dataset Not Found</h2>
        <p className="text-neutral-600 mb-6">The dataset you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/marketplace')}
          className="px-6 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-colors"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }
  
  const isPaid = dataset.pricingModel !== PricingModel.FREE;
  const priceDisplay = isPaid && dataset.price 
    ? formatCurrency(dataset.price, dataset.currency) 
    : 'Free';
  
  const handleRequestAccess = () => {
    // In a real app, this would send an access request
    setRequestSent(true);
  };
  
  const handleExploreDataset = () => {
    // Open Databricks workspace in a new tab
    window.open('https://dbc-913550aa-14d5.cloud.databricks.com/', '_blank');
  };

  const handleDownload = () => {
    // In a real app, this would initiate dataset download
    alert(`Downloading ${dataset.title}... This would start the download process in a real application.`);
  };



  const handleShare = () => {
    // In a real app, this would open share options or copy link to clipboard
    if (navigator.share) {
      navigator.share({
        title: dataset.title,
        text: dataset.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Dataset link copied to clipboard!');
    }
  };
  
  return (
    <div className="animate-fade-in px-6 py-6 pr-8">
      {/* Featured Dataset Banner */}
      {isFeaturedDataset(dataset) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 rounded-xl border border-databricks-lava-500 shadow-lg">
          <div className="flex items-center justify-center text-center">
            <Award className="h-6 w-6 text-white mr-3" />
            <div className="text-white">
              <p className="text-lg font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                🏆 Featured Premium Dataset
              </p>
              <p className="text-sm text-databricks-lava-100" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Exclusive access to our top-rated financial intelligence with live data preview
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <button 
              onClick={() => navigate('/marketplace')}
              className="text-neutral-500 hover:text-neutral-700"
            >
              Marketplace
            </button>
            <span className="mx-2 text-neutral-400">/</span>
            <span className="text-neutral-800">{dataset.category}</span>
            {isFeaturedDataset(dataset) && (
              <>
                <span className="mx-2 text-neutral-400">/</span>
                <span className="text-databricks-lava-600 font-semibold">Featured</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900">{dataset.title}</h1>
            {isFeaturedDataset(dataset) && (
              <div className="flex items-center bg-gradient-to-r from-databricks-lava-100 to-databricks-lava-200 text-databricks-lava-800 px-3 py-1 rounded-full">
                <Award className="h-4 w-4 mr-1" />
                <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Premium Pick
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleShare}
            className="px-3 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center transition-colors"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </button>
          
          {userHasAccess ? (
            <button 
              onClick={handleExploreDataset}
              className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 flex items-center transition-colors"
            >
              <Play className="h-4 w-4 mr-2" />
              Explore Dataset
            </button>
          ) : dataset.pricingModel === PricingModel.FREE ? (
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-success-600 text-white rounded-md hover:bg-success-700 flex items-center transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          ) : requestSent ? (
            <button 
              disabled
              className="px-4 py-2 bg-neutral-500 text-white rounded-md flex items-center opacity-75"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Request Sent
            </button>
          ) : (
            <button 
              onClick={handleRequestAccess}
              className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 flex items-center transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Request Access
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Dataset preview image */}
          {dataset.previewImage && (
            <div className="rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
              <img 
                src={dataset.previewImage} 
                alt={dataset.title} 
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          
          {/* Dataset description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold mb-4">About this dataset</h2>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              {dataset.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm uppercase text-neutral-500 font-medium mb-2">Data details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-neutral-900 font-medium">Time Range</p>
                      <p className="text-neutral-600 text-sm">
                        {formatDate(dataset.timeRange.from)} - {
                          dataset.timeRange.to 
                            ? formatDate(dataset.timeRange.to)
                            : 'Present'
                        }
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-neutral-900 font-medium">Available Formats</p>
                      <p className="text-neutral-600 text-sm">
                        {dataset.formats.join(', ')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Tag className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-neutral-900 font-medium">Tags</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {dataset.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm uppercase text-neutral-500 font-medium mb-2">Coverage</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Globe className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-neutral-900 font-medium">Geographic Coverage</p>
                      <p className="text-neutral-600 text-sm">
                        {dataset.geographicCoverage.join(', ')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-neutral-900 font-medium">Usage Statistics</p>
                      <p className="text-neutral-600 text-sm">
                        Downloaded {formatNumber(dataset.downloadCount)} times
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-neutral-900 font-medium">Quality Score</p>
                      <div className="flex items-center">
                        <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2 mt-1">
                          <div 
                            className="bg-success-500 h-2.5 rounded-full" 
                            style={{ width: `${dataset.qualityScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-neutral-700">{dataset.qualityScore}%</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Live Data Preview - Available for all accessible datasets */}
          {dataset.sampleAvailable && userHasAccess && dataset.sampleUrl && (
            <TablePreview 
              sampleUrl={dataset.sampleUrl}
              datasetTitle={dataset.title}
              className="mb-6"
            />
          )}
          
          {/* Dataset Overview & Analytics - Available for all accessible datasets */}
          {!!userHasAccess && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold mb-4">Dataset Overview</h2>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                This dataset provides comprehensive insights into global air travel trends, including passenger counts, load factors, and key metrics across major airports and airlines.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm uppercase text-neutral-500 font-medium mb-2">Data details</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Calendar className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-neutral-900 font-medium">Time Range</p>
                        <p className="text-neutral-600 text-sm">
                          {formatDate(dataset.timeRange.from)} - {
                            dataset.timeRange.to 
                              ? formatDate(dataset.timeRange.to)
                              : 'Present'
                          }
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-neutral-900 font-medium">Available Formats</p>
                        <p className="text-neutral-600 text-sm">
                          CSV, Parquet
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Tag className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-neutral-900 font-medium">Tags</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {dataset.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-neutral-500 font-medium mb-2">Coverage</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Globe className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-neutral-900 font-medium">Geographic Coverage</p>
                        <p className="text-neutral-600 text-sm">
                          Worldwide, including major international airports and airlines
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-neutral-900 font-medium">Usage Statistics</p>
                        <p className="text-neutral-600 text-sm">
                          Downloaded {formatNumber(dataset.downloadCount)} times
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ShieldCheck className="h-5 w-5 text-neutral-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-neutral-900 font-medium">Quality Score</p>
                        <div className="flex items-center">
                          <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2 mt-1">
                            <div 
                              className="bg-success-500 h-2.5 rounded-full" 
                              style={{ width: `${dataset.qualityScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-neutral-700">{dataset.qualityScore}%</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Data Intelligence Visualization - Available for all accessible datasets */}
          {!!userHasAccess && dataset.sampleAvailable && (
            <DataVisualization dataset={dataset} />
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 sticky top-24">
            {userHasAccess ? (
              <div className={`mb-4 p-3 rounded-lg ${
                isFeaturedDataset(dataset) 
                  ? 'bg-gradient-to-r from-databricks-lava-50 to-databricks-lava-100 border border-databricks-lava-200' 
                  : 'bg-secondary-50 border border-secondary-200'
              }`}>
                <div className={`flex items-center ${
                  isFeaturedDataset(dataset) ? 'text-databricks-lava-800' : 'text-secondary-800'
                }`}>
                  {isFeaturedDataset(dataset) ? (
                    <Award className="h-5 w-5 mr-2" />
                  ) : (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  )}
                  <span className="font-medium">
                    {isFeaturedDataset(dataset) ? 'Featured Premium Access' : 'Access Granted'}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${
                  isFeaturedDataset(dataset) ? 'text-databricks-lava-700' : 'text-secondary-600'
                }`}>
                  {isFeaturedDataset(dataset) 
                    ? 'Exclusive preview of our top-rated financial dataset with live data access'
                    : 'Full access with live data preview, analytics, and intelligence visualization'
                  }
                </p>
              </div>
            ) : (
              <div className="text-2xl font-bold mb-2">
                {priceDisplay}
                {dataset.pricingModel === PricingModel.SUBSCRIPTION && (
                  <span className="text-base font-normal text-neutral-500"> / month</span>
                )}
              </div>
            )}
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-warning-500" />
                <Star className="h-4 w-4 text-warning-500" />
                <Star className="h-4 w-4 text-warning-500" />
                <Star className="h-4 w-4 text-warning-500" />
                <Star className="h-4 w-4 text-warning-500 opacity-50" />
              </div>
              <span className="text-sm text-neutral-700 ml-2">
                {dataset.rating} ({dataset.ratingsCount} ratings)
              </span>
            </div>
            
            {userHasAccess ? (
              <button 
                onClick={handleExploreDataset}
                className="w-full py-3 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 flex items-center justify-center transition-colors mb-4"
              >
                <Play className="h-5 w-5 mr-2" />
                Explore Dataset
              </button>
            ) : dataset.pricingModel === PricingModel.FREE ? (
              <button 
                onClick={handleDownload}
                className="w-full py-3 bg-success-600 text-white rounded-md hover:bg-success-700 flex items-center justify-center transition-colors mb-4"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Now
              </button>
            ) : requestSent ? (
              <button 
                disabled
                className="w-full py-3 bg-neutral-500 text-white rounded-md flex items-center justify-center opacity-75 mb-4"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Request Sent
              </button>
            ) : (
              <button 
                onClick={handleRequestAccess}
                className="w-full py-3 bg-primary-700 text-white rounded-md hover:bg-primary-800 flex items-center justify-center transition-colors mb-4"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Request Access
              </button>
            )}
            

            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <h3 className="font-semibold mb-4">Dataset Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-neutral-500">Provider:</span>
                  <span className="font-medium text-neutral-900">
                    {dataset.provider.name} 
                    {dataset.provider.verified && (
                      <CheckCircle className="inline-block h-3.5 w-3.5 ml-1 text-success-600" />
                    )}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Last Updated:</span>
                  <span className="font-medium text-neutral-900">
                    {formatDate(dataset.lastUpdated)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Frequency:</span>
                  <span className="font-medium text-neutral-900">{dataset.frequency}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Category:</span>
                  <span className="font-medium text-neutral-900">{dataset.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-500">Access Level:</span>
                  <span className="font-medium text-neutral-900">{dataset.accessLevel}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Similar datasets */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h3 className="font-semibold mb-4">Similar Datasets</h3>
            <ul className="space-y-4">
              {datasets
                .filter(d => d.category === dataset.category && d.id !== dataset.id)
                .slice(0, 3)
                .map((relatedDataset) => (
                  <li key={relatedDataset.id} className="border-b border-neutral-200 pb-3 last:border-0 last:pb-0">
                    <a 
                      href={`/datasets/${relatedDataset.id}`}
                      className="text-sm font-medium text-neutral-900 hover:text-primary-700 transition-colors"
                    >
                      {relatedDataset.title}
                    </a>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center text-xs text-neutral-500">
                        <Star className="h-3 w-3 text-warning-500 mr-1" />
                        <span>{relatedDataset.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedDataset.frequency}</span>
                      </div>
                      <span className="text-xs font-medium text-primary-700">
                        {relatedDataset.pricingModel === PricingModel.FREE 
                          ? 'Free' 
                          : 'Paid'}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetailsPage;