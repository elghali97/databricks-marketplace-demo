import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  Award, 
  Download, 
  Database, 
  TrendingUp,
  Edit3,
  Camera,
  Settings,
  BarChart3,
  Globe,
  Shield,
  Star,
  MapPin,
  Briefcase,
  CheckCircle,
  Activity,
  Eye,
  DollarSign
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import BarChart from '../components/charts/BarChart';
import { formatNumber, formatDate } from '../utils/formatters';

const ProfilePage = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // Enhanced user statistics for financial services
  const userStats = {
    datasetsPublished: 12,
    totalDownloads: 15847,
    totalRevenue: 45230,
    activeSubscriptions: 28,
    averageRating: 4.7,
    profileViews: 2341,
    globalReach: 45, // countries
    industryExperience: 8 // years
  };

  // Enhanced activity data with financial focus
  const monthlyDownloads = [
    { month: 'Jan', downloads: 1245 },
    { month: 'Feb', downloads: 1389 },
    { month: 'Mar', downloads: 1567 },
    { month: 'Apr', downloads: 1423 },
    { month: 'May', downloads: 1678 },
    { month: 'Jun', downloads: 1834 },
    { month: 'Jul', downloads: 1923 },
    { month: 'Aug', downloads: 2156 },
    { month: 'Sep', downloads: 2034 },
    { month: 'Oct', downloads: 2287 },
    { month: 'Nov', downloads: 2456 },
    { month: 'Dec', downloads: 2234 }
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 3250 },
    { month: 'Feb', revenue: 3680 },
    { month: 'Mar', revenue: 4120 },
    { month: 'Apr', revenue: 3890 },
    { month: 'May', revenue: 4350 },
    { month: 'Jun', revenue: 4780 },
    { month: 'Jul', revenue: 5120 },
    { month: 'Aug', revenue: 5650 },
    { month: 'Sep', revenue: 5340 },
    { month: 'Oct', revenue: 5890 },
    { month: 'Nov', revenue: 6230 },
    { month: 'Dec', revenue: 5980 }
  ];

  const recentActivity = [
    { action: 'Dataset "Global Market Analytics Q4 2024" gained 15 new subscribers', time: '2 hours ago', type: 'download' },
    { action: 'Access request for "Credit Risk Models" from Goldman Sachs', time: '5 hours ago', type: 'request' },
    { action: 'Dataset "APAC Credit Risk Analytics" received 5-star rating', time: '1 day ago', type: 'rating' },
    { action: 'Monthly performance report: +23% revenue growth', time: '2 days ago', type: 'report' },
    { action: 'Profile featured in Databricks Financial Intelligence spotlight', time: '3 days ago', type: 'view' }
  ];

  return (
    <div className="space-y-8 animate-fade-in px-6 py-8">
      {/* Enhanced Professional Header Section */}
      <div className="bg-white rounded-2xl shadow-databricks-lg border border-databricks-oat-medium overflow-hidden">       
        {/* Header Background with Databricks gradient */}
        <div className="relative h-32 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700">
          {/* Professional Badge */}
          <div className="absolute top-6 right-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30 shadow-lg">
              <div className="flex items-center space-x-3 text-white">
                <Award className="w-5 h-5" />
                <span className="text-sm font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Financial Data Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="px-8 pb-12 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Left Side - Profile Info */}
            <div className="flex flex-col sm:flex-row sm:items-end space-y-6 sm:space-y-0 sm:space-x-8">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-36 h-36 rounded-2xl border-4 border-white shadow-databricks-lg object-cover"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-2xl border-4 border-white shadow-databricks-lg bg-gradient-to-br from-databricks-lava-100 to-databricks-lava-200 flex items-center justify-center">
                    <User className="w-18 h-18 text-databricks-lava-700" />
                  </div>
                )}
                
                {/* Camera Button */}
                <button className="absolute -bottom-3 -right-3 p-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 rounded-2xl shadow-databricks hover:shadow-lava-lg hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-300 border-3 border-white transform hover:scale-105">
                  <Camera className="w-5 h-5 text-white" />
                </button>
                
                {/* Verification Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full p-2 border-3 border-white shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1 pt-8">
                {/* Name and Rating */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-3">
                    <h1 className="text-4xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {user?.name}
                    </h1>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-6 h-6 ${i < Math.floor(userStats.averageRating) ? 'text-amber-400 fill-current' : 'text-databricks-oat-medium'}`} />
                      ))}
                      <span className="text-sm text-databricks-navy-600 ml-3 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        ({userStats.averageRating})
                      </span>
                    </div>
                  </div>
                  
                  {/* Organization */}
                  <div className="flex items-center space-x-3 mb-6">
                    <Building2 className="w-6 h-6 text-databricks-lava-600" />
                    <span className="text-xl font-bold text-databricks-lava-700" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                      {user?.organization}
                    </span>
                    <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full px-3 py-1.5 flex items-center space-x-2 border border-emerald-300">
                      <Shield className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs text-emerald-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Verified Partner
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-databricks-oat-light to-white rounded-2xl border border-databricks-oat-medium shadow-sm">
                    <div className="p-3 bg-gradient-to-br from-databricks-lava-100 to-databricks-lava-200 rounded-2xl">
                      <Mail className="w-5 h-5 text-databricks-lava-700" />
                    </div>
                    <div>
                      <div className="text-xs text-databricks-navy-500 font-bold uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Email
                      </div>
                      <div className="text-databricks-navy-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-databricks-oat-light to-white rounded-2xl border border-databricks-oat-medium shadow-sm">
                    <div className="p-3 bg-gradient-to-br from-databricks-navy-100 to-databricks-navy-200 rounded-2xl">
                      <Calendar className="w-5 h-5 text-databricks-navy-700" />
                    </div>
                    <div>
                      <div className="text-xs text-databricks-navy-500 font-bold uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Partner Since
                      </div>
                      <div className="text-databricks-navy-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        January 2023
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-databricks-oat-light to-white rounded-2xl border border-databricks-oat-medium shadow-sm">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl">
                      <MapPin className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs text-databricks-navy-500 font-bold uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Global Reach
                      </div>
                      <div className="text-databricks-navy-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {userStats.globalReach} countries
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-databricks-oat-light to-white rounded-2xl border border-databricks-oat-medium shadow-sm">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl">
                      <Briefcase className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs text-databricks-navy-500 font-bold uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Experience
                      </div>
                      <div className="text-databricks-navy-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {userStats.industryExperience} years
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 lg:mt-8">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-8 py-4 border-2 border-databricks-lava-300 rounded-2xl text-databricks-lava-700 hover:bg-databricks-lava-50 hover:border-databricks-lava-400 flex items-center justify-center transition-all duration-300 font-bold shadow-sm hover:shadow-md"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                <Edit3 className="w-5 h-5 mr-3" />
                Edit Profile
              </button>
              <button 
                className="px-8 py-4 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-2xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 flex items-center justify-center transition-all duration-300 font-bold shadow-databricks hover:shadow-lava-lg transform hover:scale-105"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard 
          title="Datasets Published"
          value={formatNumber(userStats.datasetsPublished)}
          icon={<Database className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
          className="bg-white border border-databricks-oat-medium rounded-2xl shadow-databricks hover:shadow-databricks-lg transition-all duration-300 hover:scale-105"
        />
        <StatCard 
          title="Total Downloads"
          value={formatNumber(userStats.totalDownloads)}
          icon={<Download className="h-6 w-6" />}
          change={{ value: 18, isPositive: true }}
          className="bg-white border border-databricks-oat-medium rounded-2xl shadow-databricks hover:shadow-databricks-lg transition-all duration-300 hover:scale-105"
        />
        <StatCard 
          title="Revenue Generated"
          value={`$${formatNumber(userStats.totalRevenue)}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={{ value: 24, isPositive: true }}
          className="bg-white border border-databricks-oat-medium rounded-2xl shadow-databricks hover:shadow-databricks-lg transition-all duration-300 hover:scale-105"
        />
        <StatCard 
          title="Active Subscribers"
          value={formatNumber(userStats.activeSubscriptions)}
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 8, isPositive: true }}
          className="bg-white border border-databricks-oat-medium rounded-2xl shadow-databricks hover:shadow-databricks-lg transition-all duration-300 hover:scale-105"
        />
        <StatCard 
          title="Profile Views"
          value={formatNumber(userStats.profileViews)}
          icon={<Eye className="h-6 w-6" />}
          change={{ value: 15, isPositive: true }}
          className="bg-white border border-databricks-oat-medium rounded-2xl shadow-databricks hover:shadow-databricks-lg transition-all duration-300 hover:scale-105"
        />
        <StatCard 
          title="Global Reach"
          value={`${userStats.globalReach} countries`}
          icon={<Globe className="h-6 w-6" />}
          change={{ value: 3, isPositive: true }}
          className="bg-white border border-databricks-oat-medium rounded-2xl shadow-databricks hover:shadow-databricks-lg transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium p-8 hover:shadow-databricks-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-databricks-lava-100 to-databricks-lava-200">
                <Activity className="w-6 w-6 text-databricks-lava-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Download Analytics
                </h2>
                <p className="text-sm text-databricks-navy-600 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Last 12 months performance
                </p>
              </div>
            </div>
          </div>
          <BarChart 
            data={monthlyDownloads}
            xKey="month"
            yKey="downloads"
            title=""
            color="#FF3621"
          />
        </div>
        
        <div className="bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium p-8 hover:shadow-databricks-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-databricks-navy-100 to-databricks-navy-200">
                <DollarSign className="w-6 w-6 text-databricks-navy-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Revenue Performance
                </h2>
                <p className="text-sm text-databricks-navy-600 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Monthly revenue trends
                </p>
              </div>
            </div>
          </div>
          <BarChart 
            data={monthlyRevenue}
            xKey="month"
            yKey="revenue"
            title=""
            color="#131A29"
          />
        </div>
      </div>

      {/* Professional Information & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Information */}
        <div className="bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium p-8 hover:shadow-databricks-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-databricks-lava-100 to-databricks-lava-200">
                <User className="w-5 h-5 text-databricks-lava-700" />
              </div>
              <h2 className="text-2xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Professional Information
              </h2>
            </div>
            {isEditing && (
              <button 
                className="px-6 py-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                Save Changes
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-databricks-navy-700 mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Full Name
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 border border-databricks-oat-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-databricks-lava-400 focus:border-databricks-lava-400 transition-all duration-300"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  />
                ) : (
                  <p className="text-databricks-navy-800 font-bold text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {user?.name}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-databricks-navy-700 mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Email Address
                </label>
                {isEditing ? (
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 border border-databricks-oat-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-databricks-lava-400 focus:border-databricks-lava-400 transition-all duration-300"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  />
                ) : (
                  <p className="text-databricks-navy-800 font-bold text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {user?.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-databricks-navy-700 mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Organization
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={user?.organization}
                    className="w-full px-4 py-3 border border-databricks-oat-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-databricks-lava-400 focus:border-databricks-lava-400 transition-all duration-300"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  />
                ) : (
                  <p className="text-databricks-navy-800 font-bold text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {user?.organization}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-databricks-navy-700 mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Role & Expertise
                </label>
                <div className="flex items-center space-x-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-databricks-lava-100 to-databricks-lava-200 text-databricks-lava-800 rounded-full text-sm font-bold capitalize border border-databricks-lava-300">
                    {user?.role}
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-databricks-navy-100 to-databricks-navy-200 text-databricks-navy-800 rounded-full text-sm font-bold">
                    Financial Data Specialist
                  </span>
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div>
                <label className="block text-sm font-bold text-databricks-navy-700 mb-3 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Professional Bio
                </label>
                <textarea 
                  rows={4}
                  placeholder="Share your expertise in financial data, analytics, and industry insights..."
                  className="w-full px-4 py-3 border border-databricks-oat-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-databricks-lava-400 focus:border-databricks-lava-400 transition-all duration-300"
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  defaultValue="Experienced financial industry analyst specializing in market data patterns, risk assessment, and investment intelligence. 8+ years developing data-driven solutions for banks, investment firms, and fintech companies."
                />
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium p-8 hover:shadow-databricks-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-databricks-navy-100 to-databricks-navy-200">
                <Activity className="w-5 h-5 text-databricks-navy-700" />
              </div>
              <h2 className="text-2xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Activity Feed
              </h2>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-5 rounded-2xl hover:bg-databricks-oat-light transition-all duration-300 border border-transparent hover:border-databricks-oat-medium hover:shadow-sm">
                <div className={`p-3 rounded-2xl ${
                  activity.type === 'download' ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700' :
                  activity.type === 'request' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700' :
                  activity.type === 'rating' ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700' :
                  activity.type === 'report' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700' :
                  'bg-gradient-to-r from-databricks-oat-light to-databricks-oat-medium text-databricks-navy-700'
                }`}>
                  {activity.type === 'download' && <Download className="w-5 h-5" />}
                  {activity.type === 'request' && <User className="w-5 h-5" />}
                  {activity.type === 'rating' && <Star className="w-5 h-5" />}
                  {activity.type === 'report' && <BarChart3 className="w-5 h-5" />}
                  {activity.type === 'view' && <Eye className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {activity.action}
                  </p>
                  <p className="text-xs text-databricks-navy-600 mt-1 font-medium" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="w-full mt-8 py-4 text-sm text-databricks-lava-700 hover:text-databricks-lava-800 font-bold border-2 border-databricks-lava-300 rounded-2xl hover:bg-databricks-lava-50 hover:border-databricks-lava-400 transition-all duration-300 shadow-sm hover:shadow-md"
            style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
          >
            View Complete Activity History
          </button>
        </div>
      </div>

      {/* Financial Services Achievements */}
      <div className="bg-white rounded-2xl shadow-databricks border border-databricks-oat-medium p-8 hover:shadow-databricks-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200">
              <Award className="w-6 w-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Professional Achievements
              </h2>
              <p className="text-databricks-navy-600 mt-2 font-medium text-lg" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Recognition in financial data excellence
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-8 bg-gradient-to-br from-databricks-lava-50 via-databricks-lava-100 to-databricks-lava-200 rounded-2xl border-2 border-databricks-lava-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-24 h-24 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-databricks">
              <Database className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-bold text-databricks-navy-900 text-xl mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Data Pioneer
            </h3>
            <p className="text-sm text-databricks-lava-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Published 10+ high-quality datasets
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-2xl border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-databricks">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-bold text-databricks-navy-900 text-xl mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Excellence Award
            </h3>
            <p className="text-sm text-amber-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Maintained 4.5+ average rating
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 rounded-2xl border-2 border-emerald-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-databricks">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-bold text-databricks-navy-900 text-xl mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Growth Champion
            </h3>
            <p className="text-sm text-emerald-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Achieved 15K+ total downloads
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 rounded-2xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-databricks">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-bold text-databricks-navy-900 text-xl mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Global Impact
            </h3>
            <p className="text-sm text-purple-800 font-bold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Data used across 45+ countries
            </p>
            <div className="mt-4 flex justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;