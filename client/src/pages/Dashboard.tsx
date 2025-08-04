import { useEffect, useState } from 'react';
import { 
  Users, 
  Database, 
  BarChart3, 
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Eye,
  Play,
  Zap,
  Shield,
  Activity,
  Bell,
  ArrowRight,
  Plus,
  Search,
  FileText,
  Download,
  Star,
  ChevronRight,
  Target,
  Lightbulb,
  Globe,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import DatasetCard from '../components/datasets/DatasetCard';
import StatCard from '../components/common/StatCard';
import BarChart from '../components/charts/BarChart';
import { formatNumber, formatCurrency } from '../utils/formatters';
import { mockDatasets, analyticsData } from '../data/mockData';

const Dashboard = () => {
  const { user, isProvider } = useUser();
  const [featuredDatasets, setFeaturedDatasets] = useState(mockDatasets.slice(0, 3));
  
  // AI-driven insights and recommendations
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';
  
  // Simulated AI insights
  const aiInsights = [
    {
      type: 'recommendation',
      title: 'New ESG dataset matches your interests',
      description: 'Based on your recent searches, this sustainability dataset could be valuable',
      action: 'View Dataset',
      priority: 'high',
      icon: Lightbulb
    },
    {
      type: 'trend',
      title: 'Credit risk data trending 23% this week',
      description: 'Your field is seeing increased demand for credit analytics',
      action: 'Explore Trend',
      priority: 'medium',
      icon: TrendingUp
    },
    {
      type: 'opportunity',
      title: 'New collaboration opportunity',
      description: 'JP Morgan Chase has similar data needs in your portfolio',
      action: 'Connect',
      priority: 'low',
      icon: Target
    }
  ];

  // Quick actions for financial data professionals
  const quickActions = [
    {
      title: 'Discover Data',
      description: 'Explore new datasets',
      icon: Search,
      gradient: 'from-databricks-lava-500 to-databricks-lava-600',
      href: '/marketplace'
    },
    {
      title: 'Request Access',
      description: 'Quick data requests',
      icon: Shield,
      gradient: 'from-blue-500 to-blue-600',
      href: '/marketplace?quick=request'
    },
    {
      title: 'Upload Dataset',
      description: 'Share your data',
      icon: Plus,
      gradient: 'from-emerald-500 to-emerald-600',
      href: '/upload',
      show: isProvider
    }
  ].filter(action => action.show !== false);

  // Recent activity simulation
  const recentActivity = [
    {
      type: 'access_granted',
      title: 'Access granted to Global Equities Feed',
      time: '5 min ago',
      icon: CheckCircle2,
      color: 'text-success-600'
    },
    {
      type: 'download',
      title: 'Downloaded ESG Sustainability Metrics',
      time: '12 min ago',
      icon: Download,
      color: 'text-blue-600'
    },
    {
      type: 'collaboration',
      title: 'New collaboration request from BlackRock',
      time: '23 min ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      type: 'update',
      title: 'Credit Risk Analytics updated',
      time: '1 hour ago',
      icon: RefreshCw,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-databricks-oat-light pb-8">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-databricks-navy-900 via-databricks-navy-800 to-databricks-navy-700 text-white mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-databricks-lava-600/10 to-transparent"></div>
        <div className="relative px-6 py-12">
          <div className="w-full px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Welcome Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-6 w-6 text-databricks-lava-400 mr-3 animate-pulse" />
                  <span className="text-databricks-lava-400 font-bold text-sm uppercase tracking-wider">
                    AI-Powered Insights
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Good {timeOfDay}, {user?.name}
                </h1>
                <p className="text-xl text-neutral-300 mb-6 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {isProvider 
                    ? 'Manage your financial datasets and track analytics performance across the Databricks marketplace'
                    : 'Your personalized data intelligence dashboard powered by Databricks AI recommendations'
                  }
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-databricks-lava-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {isProvider ? '12' : '8'}
                    </div>
                    <div className="text-sm text-neutral-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {isProvider ? 'Active Datasets' : 'Subscriptions'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-databricks-lava-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {formatCurrency(isProvider ? 24750 : 8950)}
                    </div>
                    <div className="text-sm text-neutral-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {isProvider ? 'Monthly Revenue' : 'Annual Savings'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-databricks-lava-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      98%
                    </div>
                    <div className="text-sm text-neutral-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      Quality Score
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights Panel */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-databricks-lava-400 mr-2" />
                  <h3 className="font-bold text-white" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    AI Insights
                  </h3>
                </div>
                <div className="space-y-3">
                  {aiInsights.slice(0, 2).map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <insight.icon className="h-4 w-4 text-databricks-lava-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {insight.title}
                        </h4>
                        <p className="text-xs text-neutral-300 mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {insight.description}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 space-y-8">
        {/* Enhanced Charts and Activity Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 text-databricks-lava-600 mr-3" />
                <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Performance Analytics
                </h2>
              </div>
              <button className="text-databricks-lava-600 hover:text-databricks-lava-700 font-semibold flex items-center text-sm">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart 
                data={analyticsData.monthlyDownloads}
                xKey="month"
                yKey="downloads"
                title="Monthly Data Access"
                color="#FF3621"
              />
              <BarChart 
                data={analyticsData.monthlyRevenue}
                xKey="month"
                yKey="revenue"
                title="Monthly Revenue ($)"
                color="#131A29"
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-databricks-lava-600 mr-2" />
                  <h3 className="text-lg font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Recent Activity
                  </h3>
                </div>
                <button className="text-xs text-databricks-navy-500 hover:text-databricks-navy-700">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-databricks-oat-light transition-colors cursor-pointer">
                    <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-databricks-navy-800 truncate" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {activity.title}
                      </p>
                      <p className="text-xs text-databricks-navy-500 mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 font-bold text-sm">
                View All Activity
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Available Datasets"
            value={formatNumber(analyticsData.totalDatasets)}
            icon={<Database className="h-6 w-6" />}
            change={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Active Users"
            value={formatNumber(analyticsData.activeUsers)}
            icon={<Users className="h-6 w-6" />}
            change={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Total Access Requests"
            value={formatNumber(analyticsData.totalDownloads)}
            icon={<ShoppingCart className="h-6 w-6" />}
            change={{ value: 15, isPositive: true }}
          />
          <StatCard 
            title="Data Providers"
            value={formatNumber(analyticsData.totalProviders)}
            icon={<BarChart3 className="h-6 w-6" />}
            change={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Featured Datasets Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-databricks-lava-600 mr-3" />
              <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Featured Financial Datasets
              </h2>
            </div>
            <a 
              href="/marketplace" 
              className="text-databricks-lava-600 hover:text-databricks-lava-700 font-semibold flex items-center"
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDatasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        </div>

        {/* Enhanced Trending Categories */}
        <div className="space-y-6">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-databricks-lava-600 mr-3" />
            <h2 className="text-2xl font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Trending Financial Data Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.topCategories.slice(0, 4).map((category, index) => (
              <a
                key={index}
                href={`/marketplace?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="group block p-6 bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium hover:shadow-databricks-lg hover:border-databricks-lava-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-databricks-navy-800 group-hover:text-databricks-lava-600 transition-colors" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {category.name}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-databricks-navy-400 group-hover:text-databricks-lava-600 transition-colors" />
                </div>
                
                <p className="text-sm text-databricks-navy-600 mb-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {category.value} datasets available
                </p>

                {/* Enhanced Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-databricks-oat-medium rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 h-2 rounded-full transition-all duration-700 group-hover:shadow-lava" 
                      style={{ width: `${(category.value / analyticsData.topCategories[0].value) * 100}%` }}
                    ></div>
                  </div>
                  <div className="absolute -top-1 right-0 w-3 h-3 bg-databricks-lava-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>

                <div className="mt-3 flex items-center text-xs text-databricks-navy-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    +{Math.floor(Math.random() * 25 + 5)}% this week
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;