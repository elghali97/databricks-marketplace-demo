import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Database, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Star,
  Calendar,
  DollarSign,
  ExternalLink,
  Shield,
  Check,
  X
} from 'lucide-react';
import { mockDatasets } from '../data/mockData';
import { formatCurrency, formatDate, formatNumber } from '../utils/formatters';
import { Dataset, PricingModel } from '../types/dataset';

interface AccessRequest {
  id: string;
  datasetId: string;
  datasetTitle: string;
  requesterName: string;
  requesterEmail: string;
  requesterOrganization: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
}

const MyDataPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'owned' | 'accessed' | 'requests'>('owned');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [updatedRequests, setUpdatedRequests] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });
  
  // Mock user's owned datasets (filter by provider)
  const ownedDatasets = mockDatasets.filter(dataset => 
    dataset.provider.name === user?.organization
  );
  
  // Mock user's accessed datasets (datasets they have access to as consumer)
  // In a real app, this would come from API showing datasets user has purchased/been granted access to
  const accessedDatasets = mockDatasets.filter(dataset => 
    dataset.provider.name !== user?.organization && 
    // Simulate user having access to some datasets
    ['1', '2', '5', '8', '12', '15'].includes(dataset.id)
  );

  // State for access requests with ability to update
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    {
      id: '1',
      datasetId: '1',
      datasetTitle: 'Global Flight Traffic Analytics 2022-2023',
      requesterName: 'Marcus Chen',
      requesterEmail: 'marcus@travelcorp.com',
      requesterOrganization: 'Travel Corporation',
      requestDate: '2023-12-20',
      status: 'pending',
      message: 'We need this data for our quarterly market analysis and route optimization project.'
    },
    {
      id: '2',
      datasetId: '2',
      datasetTitle: 'Hotel Occupancy & Revenue Intelligence',
      requesterName: 'Jessica Williams',
      requesterEmail: 'jessica@airlinepartners.com',
      requesterOrganization: 'Airline Partners Inc.',
      requestDate: '2023-12-19',
      status: 'pending',
      message: 'Looking to understand hotel market trends for our travel package offerings.'
    },
    {
      id: '3',
      datasetId: '1',
      datasetTitle: 'Global Flight Traffic Analytics 2022-2023',
      requesterName: 'Sarah Mitchell',
      requesterEmail: 'sarah@datainsights.com',
      requesterOrganization: 'Data Insights Ltd',
      requestDate: '2023-12-18',
      status: 'approved'
    },
    {
      id: '4',
      datasetId: '5',
      datasetTitle: 'Airline Loyalty Program Analytics',
      requesterName: 'David Thompson',
      requesterEmail: 'david@loyaltytech.com',
      requesterOrganization: 'Loyalty Tech Solutions',
      requestDate: '2023-12-17',
      status: 'rejected',
      message: 'Request does not meet our data sharing criteria.'
    }
  ]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleApproveRequest = (requestId: string) => {
    const request = accessRequests.find(r => r.id === requestId);
    
    setAccessRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: 'approved' as const }
          : request
      )
    );
    
    // Add visual feedback
    setUpdatedRequests(prev => new Set(prev).add(requestId));
    setTimeout(() => {
      setUpdatedRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }, 2000);
    
    showNotification(
      `Access request from ${request?.requesterName} has been approved!`,
      'success'
    );
    
    // In a real app, this would also make an API call
    console.log('Approved request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    const request = accessRequests.find(r => r.id === requestId);
    
    setAccessRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: 'rejected' as const }
          : request
      )
    );
    
    // Add visual feedback
    setUpdatedRequests(prev => new Set(prev).add(requestId));
    setTimeout(() => {
      setUpdatedRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }, 2000);
    
    showNotification(
      `Access request from ${request?.requesterName} has been rejected.`,
      'success'
    );
    
    // In a real app, this would also make an API call
    console.log('Rejected request:', requestId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'approved': return 'bg-success-100 text-success-800';
      case 'rejected': return 'bg-error-100 text-error-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const currentDatasets = activeTab === 'owned' ? ownedDatasets : accessedDatasets;
  const filteredDatasets = currentDatasets.filter(dataset =>
    dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = accessRequests.filter(request =>
    request.datasetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.requesterOrganization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Notification */}
      {notification.visible && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${
          notification.type === 'success' ? 'bg-success-50 border-success-200 text-success-800' : 'bg-error-50 border-error-200 text-error-800'
        } border rounded-lg p-4 shadow-lg animate-slide-in-right`}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-3 text-success-600" />
            ) : (
              <XCircle className="w-5 h-5 mr-3 text-error-600" />
            )}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Data</h1>
          <p className="text-neutral-600 mt-1">
            Manage your datasets and access requests
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 flex items-center transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Dataset
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Owned Datasets</p>
              <p className="text-2xl font-bold text-neutral-900">{ownedDatasets.length}</p>
            </div>
            <Database className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Accessed Datasets</p>
              <p className="text-2xl font-bold text-neutral-900">{accessedDatasets.length}</p>
            </div>
            <Shield className="w-8 h-8 text-secondary-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Pending Requests</p>
              <p className="text-2xl font-bold text-neutral-900">
                {accessRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-warning-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Downloads</p>
              <p className="text-2xl font-bold text-neutral-900">
                {formatNumber(ownedDatasets.reduce((sum, dataset) => sum + dataset.downloadCount, 0))}
              </p>
            </div>
            <Download className="w-8 h-8 text-success-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Avg. Rating</p>
              <p className="text-2xl font-bold text-neutral-900">
                {ownedDatasets.length > 0 ? (ownedDatasets.reduce((sum, dataset) => sum + dataset.rating, 0) / ownedDatasets.length).toFixed(1) : '0.0'}
              </p>
            </div>
            <Star className="w-8 h-8 text-warning-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('owned')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'owned'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Owned Datasets ({ownedDatasets.length})
          </button>
          <button
            onClick={() => setActiveTab('accessed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'accessed'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Accessed Datasets ({accessedDatasets.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requests'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Access Requests ({accessRequests.filter(r => r.status === 'pending').length})
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder={activeTab === 'requests' ? 'Search requests...' : 'Search datasets...'}
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'owned' || activeTab === 'accessed' ? (
        <div className="space-y-4">
          {filteredDatasets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
              <Database className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900">No datasets found</h3>
              <p className="text-neutral-500 mt-2">
                {searchQuery ? 'Try adjusting your search terms' : 
                 activeTab === 'owned' ? 'Start by adding your first dataset' : 
                 'No datasets accessed yet'}
              </p>
            </div>
          ) : (
            filteredDatasets.map((dataset) => (
              <Link 
                key={dataset.id} 
                to={`/datasets/${dataset.id}`}
                className="block bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md hover:border-primary-200 transition-all duration-200 p-6 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">{dataset.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        dataset.pricingModel === PricingModel.FREE 
                          ? 'bg-success-100 text-success-800'
                          : 'bg-primary-100 text-primary-800'
                      }`}>
                        {dataset.pricingModel === PricingModel.FREE ? 'Free' : 'Paid'}
                      </span>
                      {activeTab === 'accessed' && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          Access Granted
                        </span>
                      )}
                      {activeTab === 'owned' && dataset.verified && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <p className="text-neutral-600 mb-4 line-clamp-2">{dataset.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-neutral-500">
                        <Download className="w-4 h-4 mr-1" />
                        {formatNumber(dataset.downloadCount)} downloads
                      </div>
                      <div className="flex items-center text-neutral-500">
                        <Star className="w-4 h-4 mr-1 text-warning-500" />
                        {dataset.rating} ({dataset.ratingsCount})
                      </div>
                      <div className="flex items-center text-neutral-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(dataset.lastUpdated)}
                      </div>
                      {dataset.price && (
                        <div className="flex items-center text-neutral-500">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {formatCurrency(dataset.price, dataset.currency)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-primary-600" />
                      <span className="text-sm text-primary-600 font-medium">View Details</span>
                    </div>
                    {activeTab === 'owned' && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle edit action
                          }}
                          className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle delete action
                          }}
                          className="p-2 text-neutral-400 hover:text-error-600 hover:bg-error-50 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
              <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900">No access requests found</h3>
              <p className="text-neutral-500 mt-2">
                {searchQuery ? 'Try adjusting your search terms' : 'No pending access requests at the moment'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className={`bg-white rounded-lg shadow-sm border p-6 transition-all duration-500 ${
                updatedRequests.has(request.id) 
                  ? 'border-success-300 shadow-md scale-[1.01] bg-success-50' 
                  : 'border-neutral-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">{request.datasetTitle}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center transition-all duration-300 ${getStatusColor(request.status)} ${
                        updatedRequests.has(request.id) ? 'animate-pulse' : ''
                      }`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-neutral-500">Requester</p>
                        <p className="font-medium text-neutral-900">{request.requesterName}</p>
                        <p className="text-neutral-600">{request.requesterEmail}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Organization</p>
                        <p className="font-medium text-neutral-900">{request.requesterOrganization}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500">Request Date</p>
                        <p className="font-medium text-neutral-900">{formatDate(request.requestDate)}</p>
                      </div>
                    </div>
                    
                    {request.message && (
                      <div className="bg-neutral-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-neutral-500 mb-1">Message:</p>
                        <p className="text-sm text-neutral-700">{request.message}</p>
                      </div>
                    )}
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex items-center space-x-2 ml-4">
                      <button 
                        onClick={() => handleApproveRequest(request.id)}
                        className="px-3 py-1.5 bg-success-600 text-white text-sm rounded-md hover:bg-success-700 transition-all duration-200 flex items-center hover:shadow-md"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectRequest(request.id)}
                        className="px-3 py-1.5 bg-error-600 text-white text-sm rounded-md hover:bg-error-700 transition-all duration-200 flex items-center hover:shadow-md"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {request.status !== 'pending' && updatedRequests.has(request.id) && (
                    <div className="ml-4 flex items-center">
                      <div className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                        request.status === 'approved' 
                          ? 'bg-success-100 text-success-800 border border-success-200' 
                          : 'bg-error-100 text-error-800 border border-error-200'
                      }`}>
                        Status Updated!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyDataPage;