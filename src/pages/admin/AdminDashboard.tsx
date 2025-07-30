import { 
  BarChart3, 
  Users, 
  Database, 
  DollarSign, 
  AlertCircle, 
  RefreshCw, 
  ArrowUp, 
  ArrowDown,
  TrendingUp,
  Activity,
  Shield
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import BarChart from '../../components/charts/BarChart';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { analyticsData } from '../../data/mockData';

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
            <p className="text-neutral-600">
              Overview of Databricks Travel Data Marketplace performance and statistics
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Datasets" 
          value={formatNumber(analyticsData.totalDatasets)} 
          icon={<Database className="h-6 w-6" />} 
          change={{ value: 12, isPositive: true }}
          className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
        />
        <StatCard 
          title="Active Users" 
          value={formatNumber(analyticsData.activeUsers)} 
          icon={<Users className="h-6 w-6" />} 
          change={{ value: 8, isPositive: true }}
          className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
        />
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(analyticsData.revenueGenerated)} 
          icon={<DollarSign className="h-6 w-6" />} 
          change={{ value: 22, isPositive: true }}
          className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
        />
        <StatCard 
          title="Data Providers" 
          value={formatNumber(analyticsData.totalProviders)} 
          icon={<BarChart3 className="h-6 w-6" />} 
          change={{ value: 5, isPositive: true }}
          className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                <TrendingUp className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Monthly Downloads</h3>
                <p className="text-sm text-neutral-600">Dataset access trends</p>
              </div>
            </div>
          </div>
          <div className="h-80">
            <BarChart 
              data={analyticsData.monthlyDownloads}
              xKey="month"
              yKey="downloads"
              color="#4F46E5"
              minimal={true}
            />
          </div>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success-100">
                <DollarSign className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Monthly Revenue</h3>
                <p className="text-sm text-neutral-600">Financial performance</p>
              </div>
            </div>
          </div>
          <div className="h-80">
            <BarChart 
              data={analyticsData.monthlyRevenue}
              xKey="month"
              yKey="revenue"
              color="#0D9488"
              minimal={true}
            />
          </div>
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-100">
                <Activity className="h-5 w-5 text-secondary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Recent Activity</h2>
                <p className="text-sm text-neutral-600">Latest marketplace events</p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Dataset
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {[
                { event: 'Data Access Request', user: 'marcus@travelcorp.com', dataset: 'Global Airline Passenger Traffic', time: '5 minutes ago', status: 'pending' },
                { event: 'Dataset Downloaded', user: 'jessica@airlinepartners.com', dataset: 'Airline On-Time Performance Statistics', time: '32 minutes ago', status: 'completed' },
                { event: 'New Dataset Published', user: 'alex@airlinetech.com', dataset: 'Global Travel Booking Patterns & Trends', time: '1 hour ago', status: 'completed' },
                { event: 'Access Request Approved', user: 'samantha@hoteldata.com', dataset: 'Hotel Revenue Management Benchmarks', time: '3 hours ago', status: 'completed' },
                { event: 'User Registration', user: 'new.user@flyright.com', dataset: '-', time: '5 hours ago', status: 'completed' },
              ].map((activity, index) => (
                <tr key={index} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    {activity.event}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {activity.dataset}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {activity.time}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-success-100 text-success-800' : 
                      activity.status === 'pending' ? 'bg-warning-100 text-warning-800' : 
                      'bg-error-100 text-error-800'
                    }`}>
                      {activity.status === 'completed' ? (
                        <ArrowUp className="mr-1 h-3 w-3" />
                      ) : activity.status === 'pending' ? (
                        <RefreshCw className="mr-1 h-3 w-3" />
                      ) : (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning-100">
              <AlertCircle className="h-5 w-5 text-warning-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Pending Approvals</h3>
              <p className="text-sm text-neutral-600">8 datasets waiting for approval</p>
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium shadow-sm">
            Review Datasets
          </button>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-100">
              <Users className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Access Requests</h3>
              <p className="text-sm text-neutral-600">12 new access requests to review</p>
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white rounded-lg hover:from-secondary-700 hover:to-secondary-800 transition-all duration-200 font-medium shadow-sm">
            Manage Requests
          </button>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success-100">
              <Activity className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">System Health</h3>
              <p className="text-sm text-neutral-600">All systems operating normally</p>
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-success-600 to-success-700 text-white rounded-lg hover:from-success-700 hover:to-success-800 transition-all duration-200 font-medium shadow-sm">
            View Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;