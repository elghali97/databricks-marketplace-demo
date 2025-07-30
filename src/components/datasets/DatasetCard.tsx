import { Link } from 'react-router-dom';
import { Dataset } from '../../types/dataset';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { Star, Download, Clock, Check, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUser } from '../../context/UserContext';

interface DatasetCardProps {
  dataset: Dataset;
  featured?: boolean;
}

export const DatasetCard = ({ dataset, featured = false }: DatasetCardProps) => {
  const { user } = useUser();
  
  const {
    id,
    title,
    description,
    provider,
    category,
    lastUpdated,
    pricingModel,
    price,
    currency,
    rating,
    ratingsCount,
    downloadCount,
    qualityScore,
    verified,
    previewImage
  } = dataset;
  
  // Determine ownership status
  const isOwned = provider.name === user?.organization;
  const isAccessible = ['1', '2', '5', '8', '12', '15'].includes(id);
  
  // Determine display tag
  const getOwnershipTag = () => {
    if (isOwned) {
      return {
        label: 'Owned',
        className: 'text-success-700 bg-success-50',
        icon: <Shield className="w-3 h-3 mr-1" />
      };
    } else if (isAccessible) {
      return {
        label: 'Available',
        className: 'text-primary-700 bg-primary-50',
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />
      };
    } else {
      // Show price for datasets user doesn't have access to
      const isPaid = pricingModel !== 'Free';
      const priceDisplay = isPaid && price ? formatCurrency(price, currency) : 'Free';
      const priceClass = isPaid 
        ? 'text-primary-700 bg-primary-50' 
        : 'text-success-700 bg-success-50';
      
      return {
        label: priceDisplay,
        className: priceClass,
        icon: null
      };
    }
  };
  
  const ownershipTag = getOwnershipTag();

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-neutral-200",
        featured && "md:col-span-2 lg:flex"
      )}
    >
      {previewImage && (
        <div className={cn(
          "h-48 overflow-hidden",
          featured && "lg:h-auto lg:w-1/3"
        )}>
          <img 
            src={previewImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className={cn(
        "p-5",
        featured && "lg:w-2/3"
      )}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 text-neutral-700">
              {category}
            </span>
            
            {verified && (
              <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-success-50 text-success-700 flex items-center inline-flex">
                <Check className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
          </div>
          
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${ownershipTag.icon ? 'flex items-center' : ''} ${ownershipTag.className}`}>
            {ownershipTag.icon}
            {ownershipTag.label}
          </span>
        </div>
        
        <Link to={`/datasets/${id}`}>
          <h3 className="text-lg font-semibold text-neutral-900 hover:text-primary-700 transition-colors mb-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center text-sm text-neutral-500 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-warning-500 mr-1" />
            <span className="font-medium text-neutral-700">{rating}</span>
            <span className="mx-1 text-neutral-400">({ratingsCount})</span>
          </div>
          
          <div className="flex items-center ml-4">
            <Download className="w-4 h-4 text-neutral-400 mr-1" />
            <span>{formatNumber(downloadCount)}</span>
          </div>
          
          <div className="flex items-center ml-4">
            <Clock className="w-4 h-4 text-neutral-400 mr-1" />
            <span>{formatDate(lastUpdated, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {provider.verified ? (
              <Check className="w-4 h-4 text-success-500 mr-1" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-warning-500 mr-1" />
            )}
            <span className="text-sm font-medium">{provider.name}</span>
          </div>
          
          <div className="flex items-center">
            <div 
              className={cn(
                "w-2 h-2 rounded-full mr-1",
                qualityScore >= 90 ? "bg-success-500" :
                qualityScore >= 70 ? "bg-warning-500" : 
                "bg-error-500"
              )}
            ></div>
            <span className="text-xs font-medium">
              Quality: {qualityScore}%
            </span>
          </div>
        </div>
        
        {featured && (
          <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between">
            <Link 
              to={`/datasets/${id}`}
              className="text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
            >
              View Details
            </Link>
            
            <button className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors">
              Request Sample
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetCard;