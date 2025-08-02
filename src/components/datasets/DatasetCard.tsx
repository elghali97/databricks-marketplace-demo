import { Link } from 'react-router-dom';
import { Dataset } from '../../types/dataset';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { 
  Star, 
  Download, 
  Clock, 
  Check, 
  AlertTriangle, 
  Shield, 
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Eye,
  Play,
  Zap,
  Database,
  Users,
  Award,
  Lock,
  Unlock,
  ExternalLink,
  Activity,
  Globe,
  Verified,
  FileText,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUser } from '../../context/UserContext';

interface DatasetCardProps {
  dataset: Dataset;
  featured?: boolean;
}

// Compliance certifications mapping
const complianceBadges = {
  'GDPR': { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  'SOC2': { icon: Lock, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  'ISO27001': { icon: Award, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  'PCI DSS': { icon: Shield, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' }
};

// Data quality scoring with enhanced indicators
const getQualityScoreConfig = (score: number) => {
  if (score >= 95) return { 
    label: 'Exceptional', 
    color: 'text-emerald-700', 
    bg: 'bg-emerald-50', 
    border: 'border-emerald-200',
    icon: Award,
    gradient: 'from-emerald-500 to-emerald-600'
  };
  if (score >= 85) return { 
    label: 'Excellent', 
    color: 'text-blue-700', 
    bg: 'bg-blue-50', 
    border: 'border-blue-200',
    icon: CheckCircle2,
    gradient: 'from-blue-500 to-blue-600'
  };
  if (score >= 75) return { 
    label: 'Good', 
    color: 'text-amber-700', 
    bg: 'bg-amber-50', 
    border: 'border-amber-200',
    icon: BarChart3,
    gradient: 'from-amber-500 to-amber-600'
  };
  return { 
    label: 'Fair', 
    color: 'text-red-700', 
    bg: 'bg-red-50', 
    border: 'border-red-200',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-red-600'
  };
};

// Sample compliance certifications (in real implementation, this would come from dataset metadata)
const getRandomCompliance = () => {
  const available = ['GDPR', 'SOC2', 'ISO27001', 'PCI DSS'];
  return available.slice(0, Math.floor(Math.random() * 3) + 1);
};

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
    previewImage,
    frequency,
    tags
  } = dataset;
  
  // Enhanced data quality and metadata
  const qualityConfig = getQualityScoreConfig(qualityScore);
  const compliance = getRandomCompliance();
  const freshnessScore = Math.floor(Math.random() * 24) + 1; // Hours since last update
  const lineageDepth = Math.floor(Math.random() * 5) + 1; // Data lineage depth
  
  // Determine ownership status
  const isOwned = provider.name === user?.organization;
  const isAccessible = ['1', '2', '5', '8', '12', '15'].includes(id);
  
  // Enhanced ownership/access status
  const getAccessStatus = () => {
    if (isOwned) {
      return {
        label: 'Owned',
        className: 'text-success-700 bg-gradient-to-r from-success-50 to-success-100 border-success-200',
        icon: <Shield className="w-4 h-4 mr-2" />,
        action: 'Manage'
      };
    } else if (isAccessible) {
      return {
        label: 'Subscribed',
        className: 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200',
        icon: <CheckCircle2 className="w-4 h-4 mr-2" />,
        action: 'Access Now'
      };
    } else {
      const isPaid = pricingModel !== 'Free';
      const priceDisplay = isPaid && price ? formatCurrency(price, currency) : 'Free';
      
      return {
        label: priceDisplay,
        className: isPaid 
          ? 'text-databricks-lava-700 bg-gradient-to-r from-databricks-lava-50 to-databricks-lava-100 border-databricks-lava-200' 
          : 'text-success-700 bg-gradient-to-r from-success-50 to-success-100 border-success-200',
        icon: isPaid ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />,
        action: 'Try Sample'
      };
    }
  };
  
  const accessStatus = getAccessStatus();

  return (
    <div 
      className={cn(
        "group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl border border-databricks-oat-medium hover:border-databricks-lava-200 transform hover:-translate-y-1",
        featured && "md:col-span-2 lg:flex lg:h-[33rem]"
      )}
    >
      {/* Enhanced Image Section */}
      {previewImage && (
        <div className={cn(
          "relative overflow-hidden",
          featured ? "lg:w-1/3" : "h-48"
        )}>
          <img 
            src={previewImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          


          {/* Price/Access Status Badge Overlay */}
          <div className="absolute top-4 right-4">
            <div className={`flex items-center px-3 py-2 rounded-xl border backdrop-blur-sm ${accessStatus.className}`}>
              {accessStatus.icon}
              <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {accessStatus.label}
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className={cn(
        "p-6 flex-1",
        featured && "lg:w-2/3"
      )}>
        {/* Header Section with Enhanced Metadata */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Category Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-databricks-navy-100 to-databricks-navy-200 text-databricks-navy-800 border border-databricks-navy-200" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {category}
          </span>
          
          {/* Verified Badge */}
          {verified && (
            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-success-100 to-success-200 text-success-800 border border-success-200" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              <Verified className="w-3 h-3 mr-1" />
              Verified
            </span>
          )}

          {/* Frequency Badge - Only show for featured cards */}
          {featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              <Activity className="w-3 h-3 mr-1" />
              {frequency}
            </span>
          )}
        </div>
        
        {/* Title and Description */}
        <Link to={`/datasets/${id}`} className="group/title">
          <h3 className="text-xl font-bold text-databricks-navy-800 group-hover/title:text-databricks-lava-600 transition-colors mb-3 leading-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {title}
            <ExternalLink className="inline w-4 h-4 ml-2 opacity-0 group-hover/title:opacity-100 transition-opacity" />
          </h3>
        </Link>
        
        <p className="text-databricks-navy-600 text-sm mb-4 line-clamp-2 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
          {description}
        </p>

        {/* Metrics Row */}
        {featured ? (
          // Enhanced Metrics for Featured Cards
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="font-bold text-databricks-navy-800 ml-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{rating}</span>
              </div>
              <span className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>({ratingsCount})</span>
            </div>
            
            {/* Downloads */}
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-databricks-navy-500" />
              <span className="font-semibold text-databricks-navy-700 text-sm" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{formatNumber(downloadCount)}</span>
            </div>
            
            {/* Freshness */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-databricks-navy-700 text-sm" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{freshnessScore}h</span>
            </div>

            {/* Lineage Depth */}
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-databricks-navy-700 text-sm" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{lineageDepth} sources</span>
            </div>
          </div>
        ) : (
          // Simplified Metrics for Regular Cards
          <div className="flex items-center justify-between mb-4">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="font-bold text-databricks-navy-800 ml-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{rating}</span>
              </div>
              <span className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>({ratingsCount})</span>
            </div>
            
            {/* Downloads */}
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-databricks-navy-500" />
              <span className="font-semibold text-databricks-navy-700 text-sm" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{formatNumber(downloadCount)}</span>
            </div>
          </div>
        )}

        {/* Compliance Badges - Only show for featured cards */}
        {featured && compliance.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-xs text-databricks-navy-600 mr-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              <Shield className="w-3 h-3 mr-1" />
              Compliant:
            </div>
            {compliance.map((cert) => {
              const config = complianceBadges[cert as keyof typeof complianceBadges];
              return (
                <span 
                  key={cert} 
                  className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold border ${config.bg} ${config.color} ${config.border}`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  <config.icon className="w-3 h-3 mr-1" />
                  {cert}
                </span>
              );
            })}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, featured ? 3 : 2).map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-databricks-oat-light text-databricks-navy-600 hover:bg-databricks-oat-medium transition-colors cursor-pointer"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                #{tag}
              </span>
            ))}
            {tags.length > (featured ? 3 : 2) && (
              <span className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                +{tags.length - (featured ? 3 : 2)} more
              </span>
            )}
          </div>
        )}
        
        {/* Provider and Quality Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              {provider.verified ? (
                <CheckCircle2 className="w-5 h-5 text-success-500 mr-2" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              )}
              <div>
                <span className="font-bold text-sm text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{provider.name}</span>
                {featured && (
                  <div className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Updated {formatDate(lastUpdated, { month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Quality Score */}
          {featured ? (
            // Enhanced Quality Score for Featured Cards
            <div className={`flex items-center px-3 py-2 rounded-xl border ${qualityConfig.bg} ${qualityConfig.border}`}>
              <qualityConfig.icon className={`w-4 h-4 mr-2 ${qualityConfig.color}`} />
              <div className="text-right">
                <div className={`text-sm font-bold ${qualityConfig.color}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {qualityConfig.label}
                </div>
                <div className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {qualityScore}% quality
                </div>
              </div>
            </div>
          ) : (
            // Simple Quality Score for Regular Cards
            <div className={`flex items-center px-2 py-1 rounded-lg ${qualityConfig.bg}`}>
              <qualityConfig.icon className={`w-3 h-3 mr-1 ${qualityConfig.color}`} />
              <span className={`text-xs font-bold ${qualityConfig.color}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {qualityScore}%
              </span>
            </div>
          )}
        </div>
        
        {/* Enhanced Action Section for Featured Cards */}
        {featured && (
          <div className="mt-6 pt-6 border-t border-databricks-oat-medium">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link 
                to={`/datasets/${id}`}
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Link>
              
              <Link 
                to={`/datasets/${id}`}
                className="flex items-center justify-center px-4 py-3 bg-white border-2 border-databricks-navy-200 text-databricks-navy-700 rounded-xl hover:border-databricks-navy-300 hover:bg-databricks-navy-50 transition-all duration-200 font-bold"
              >
                <Play className="w-4 h-4 mr-2" />
                <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Try Sample</span>
              </Link>

              <Link 
                to={`/datasets/${id}`}
                className="flex items-center justify-center px-4 py-3 bg-white border-2 border-databricks-oat-medium text-databricks-navy-600 rounded-xl hover:border-databricks-oat-dark hover:bg-databricks-oat-light transition-all duration-200 font-bold"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Preview</span>
              </Link>
            </div>

            {/* AI Recommendation */}
            <div className="mt-4 p-3 bg-gradient-to-r from-databricks-lava-50 to-databricks-lava-100 rounded-xl border border-databricks-lava-200">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 text-databricks-lava-600 mr-2" />
                <span className="text-sm font-bold text-databricks-lava-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  AI Insight:
                </span>
                <span className="text-sm text-databricks-lava-700 ml-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Matches your recent ESG analytics queries
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Standard Action Section for Regular Cards */}
        {!featured && (
          <div className="flex justify-between items-center">
            <Link 
              to={`/datasets/${id}`}
              className="flex items-center text-sm font-bold text-databricks-lava-600 hover:text-databricks-lava-700 transition-colors"
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            
            <Link 
              to={`/datasets/${id}`}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-lg hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>{accessStatus.action}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetCard;