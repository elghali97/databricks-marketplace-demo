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
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import BarChart from '../../components/charts/BarChart';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { analyticsData } from '../../data/mockData';

const AdminDashboard = () => {
  // Admin-specific activity data
  const recentActivities = [
    {
      id: 1,
      action: 'New dataset approved',
      description: 'S&P Global Credit Analytics Q4 2024 approved for marketplace',
      timestamp: '5 minutes ago',
      status: 'approved',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 2,
      action: 'Provider registration',
      description: 'TransUnion submitted registration for review',
      timestamp: '23 minutes ago',
      status: 'pending',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      id: 3,
      action: 'High API usage detected',
      description: 'Bloomberg Terminal API usage 15% above threshold',
      timestamp: '1 hour ago',
      status: 'warning',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 4,
      action: 'Revenue milestone reached',
      description: 'Monthly revenue target exceeded by 12%',
      timestamp: '2 hours ago',
      status: 'success',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in px-6 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Admin Dashboard
            </h1>
            <p className="text-slate-600 text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Financial Data Marketplace Management & Analytics
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
          className="bg-white border border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl"
        />
        <StatCard 
          title="Active Users" 
          value={formatNumber(analyticsData.activeUsers)} 
          icon={<Users className="h-6 w-6" />} 
          change={{ value: 8, isPositive: true }}
          className="bg-white border border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl"
        />
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(analyticsData.revenueGenerated)} 
          icon={<DollarSign className="h-6 w-6" />} 
          change={{ value: 22, isPositive: true }}
          className="bg-white border border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl"
        />
        <StatCard 
          title="Data Providers" 
          value={formatNumber(analyticsData.totalProviders)} 
          icon={<BarChart3 className="h-6 w-6" />} 
          change={{ value: 5, isPositive: true }}
          className="bg-white border border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl"
        />
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-md">
                <TrendingUp className="h-7 w-7 text-slate-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Monthly Data Access
                </h3>
                <p className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Dataset download trends & usage analytics
                </p>
              </div>
            </div>
            <button className="p-3 rounded-xl hover:bg-slate-100 transition-colors">
              <RefreshCw className="h-5 w-5 text-slate-600" />
            </button>
          </div>
          <div className="h-80">
            <BarChart 
              data={analyticsData.monthlyDownloads}
              xKey="month"
              yKey="downloads"
              color="#475569"
              minimal={true}
            />
          </div>
        </div>
        
        <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-md">
                <DollarSign className="h-7 w-7 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Monthly Revenue
                </h3>
                <p className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Financial performance & growth metrics
                </p>
              </div>
            </div>
            <button className="p-3 rounded-xl hover:bg-slate-100 transition-colors">
              <RefreshCw className="h-5 w-5 text-slate-600" />
            </button>
          </div>
          <div className="h-80">
            <BarChart 
              data={analyticsData.monthlyRevenue}
              xKey="month"
              yKey="revenue"
              color="#059669"
              minimal={true}
            />
          </div>
        </div>
      </div>
      
      {/* Recent Admin Activity */}
      <div className="bg-white border border-slate-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="p-8 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-md">
                <Activity className="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Recent Admin Activity
                </h3>
                <p className="text-sm text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Latest system events and administrative actions
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-200 font-bold text-sm shadow-lg">
              View All
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className={`p-3 rounded-2xl ${activity.bgColor} shadow-sm`}>
                    <IconComponent className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {activity.action}
                      </h4>
                      <span className="text-xs text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200">
              <CheckCircle className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                System Status
              </h4>
              <p className="text-sm text-emerald-600 font-semibold">All systems operational</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200">
              <Clock className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Pending Reviews
              </h4>
              <p className="text-sm text-amber-600 font-semibold">3 items require attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200">
              <TrendingUp className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Performance
              </h4>
              <p className="text-sm text-blue-600 font-semibold">98.7% uptime this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;