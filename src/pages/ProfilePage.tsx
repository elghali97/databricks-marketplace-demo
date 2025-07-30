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
  
  // Enhanced user statistics for travel industry
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

  // Enhanced activity data with travel focus
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
    { action: 'Dataset "Global Flight Analytics Q4 2023" gained 15 new subscribers', time: '2 hours ago', type: 'download' },
    { action: 'Access request for "Hotel Revenue Optimization" from Lufthansa Group', time: '5 hours ago', type: 'request' },
    { action: 'Dataset "APAC Passenger Traffic Trends" received 5-star rating', time: '1 day ago', type: 'rating' },
    { action: 'Monthly performance report: +23% revenue growth', time: '2 days ago', type: 'report' },
    { action: 'Profile featured in Databricks Travel Intelligence spotlight', time: '3 days ago', type: 'view' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Professional Header Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">       
        {/* Header Background with adequate height */}
        <div className="relative h-24 bg-gradient-to-r from-primary-600 to-secondary-600">
          {/* Professional Badge */}
          <div className="absolute top-4 right-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 shadow-sm">
              <div className="flex items-center space-x-2 text-white">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Travel Data Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="px-8 pb-12 pt-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Left Side - Profile Info */}
            <div className="flex flex-col sm:flex-row sm:items-end space-y-6 sm:space-y-0 sm:space-x-8">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-2xl object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <User className="w-16 h-16 text-primary-700" />
                  </div>
                )}
                
                {/* Camera Button */}
                <button className="absolute -bottom-2 -right-2 p-2.5 bg-primary-600 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all duration-200 border-2 border-white">
                  <Camera className="w-4 h-4 text-white" />
                </button>
                
                {/* Verification Badge */}
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1 pt-6">
                {/* Name and Rating */}
                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2">
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">{user?.name}</h1>
                    <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(userStats.averageRating) ? 'text-amber-400 fill-current' : 'text-neutral-300'}`} />
                      ))}
                      <span className="text-sm text-neutral-600 ml-2 font-medium">({userStats.averageRating})</span>
                    </div>
                  </div>
                  
                  {/* Organization */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <span className="text-lg font-semibold text-primary-700">{user?.organization}</span>
                    <div className="bg-green-100 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">Verified Partner</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Mail className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium">Email</div>
                      <div className="text-neutral-700">{user?.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="p-2 bg-secondary-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-secondary-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium">Partner Since</div>
                      <div className="text-neutral-700">January 2023</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium">Global Reach</div>
                      <div className="text-neutral-700">{userStats.globalReach} countries</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Briefcase className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium">Experience</div>
                      <div className="text-neutral-700">{userStats.industryExperience} years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-8 lg:mt-6">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 border-2 border-primary-200 rounded-xl text-primary-700 hover:bg-primary-50 hover:border-primary-300 flex items-center justify-center transition-all duration-200 font-semibold"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 flex items-center justify-center transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-xl border border-neutral-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-900">{formatNumber(userStats.datasetsPublished)}</div>
          <div className="text-sm text-neutral-600 font-medium mt-1">Datasets Published</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-900">{formatNumber(userStats.totalDownloads)}</div>
          <div className="text-sm text-neutral-600 font-medium mt-1">Total Downloads</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-900">{userStats.globalReach}</div>
          <div className="text-sm text-neutral-600 font-medium mt-1">Countries Reached</div>
        </div>
      </div>

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard 
          title="Datasets Published"
          value={formatNumber(userStats.datasetsPublished)}
          icon={<Database className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Downloads"
          value={formatNumber(userStats.totalDownloads)}
          icon={<Download className="h-6 w-6" />}
          change={{ value: 18, isPositive: true }}
        />
        <StatCard 
          title="Revenue Generated"
          value={`$${formatNumber(userStats.totalRevenue)}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={{ value: 24, isPositive: true }}
        />
        <StatCard 
          title="Active Subscribers"
          value={formatNumber(userStats.activeSubscriptions)}
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Profile Views"
          value={formatNumber(userStats.profileViews)}
          icon={<Eye className="h-6 w-6" />}
          change={{ value: 15, isPositive: true }}
        />
        <StatCard 
          title="Global Reach"
          value={`${userStats.globalReach} countries`}
          icon={<Globe className="h-6 w-6" />}
          change={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Download Analytics</h2>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Activity className="w-4 h-4" />
              <span>Last 12 months</span>
            </div>
          </div>
          <BarChart 
            data={monthlyDownloads}
            xKey="month"
            yKey="downloads"
            title=""
            color="#1E40AF"
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Revenue Performance</h2>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <DollarSign className="w-4 h-4" />
              <span>Monthly trends</span>
            </div>
          </div>
          <BarChart 
            data={monthlyRevenue}
            xKey="month"
            yKey="revenue"
            title=""
            color="#0F766E"
          />
        </div>
      </div>

      {/* Professional Information & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Information */}
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Professional Information</h2>
            {isEditing && (
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium transition-colors">
                Save Changes
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">{user?.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">{user?.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Organization</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={user?.organization}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                ) : (
                  <p className="text-neutral-900 font-medium">{user?.organization}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Role & Expertise</label>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium capitalize">
                    {user?.role}
                  </span>
                  <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
                    Travel Data Specialist
                  </span>
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Professional Bio</label>
                <textarea 
                  rows={4}
                  placeholder="Share your expertise in travel data, analytics, and industry insights..."
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  defaultValue="Experienced travel industry analyst specializing in passenger traffic patterns, revenue optimization, and market intelligence. 8+ years developing data-driven solutions for airlines, hotels, and travel technology companies."
                />
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Activity Feed</h2>
            <Activity className="w-5 h-5 text-neutral-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-neutral-50 transition-all duration-200 border border-transparent hover:border-neutral-200">
                <div className={`p-3 rounded-full ${
                  activity.type === 'download' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700' :
                  activity.type === 'request' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700' :
                  activity.type === 'rating' ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700' :
                  activity.type === 'report' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700' :
                  'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700'
                }`}>
                  {activity.type === 'download' && <Download className="w-5 h-5" />}
                  {activity.type === 'request' && <User className="w-5 h-5" />}
                  {activity.type === 'rating' && <Star className="w-5 h-5" />}
                  {activity.type === 'report' && <BarChart3 className="w-5 h-5" />}
                  {activity.type === 'view' && <Eye className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{activity.action}</p>
                  <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 text-sm text-primary-700 hover:text-primary-800 font-semibold border border-primary-200 rounded-lg hover:bg-primary-50 transition-all duration-200">
            View Complete Activity History
          </button>
        </div>
      </div>

      {/* Travel Industry Achievements */}
      <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Professional Achievements</h2>
            <p className="text-neutral-600 mt-1">Recognition in travel data excellence</p>
          </div>
          <Award className="w-8 h-8 text-amber-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 rounded-xl border border-primary-200">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-neutral-900 text-lg">Data Pioneer</h3>
            <p className="text-sm text-primary-700 mt-2 font-medium">Published 10+ high-quality datasets</p>
            <div className="mt-3 flex justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-xl border border-amber-200">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-neutral-900 text-lg">Excellence Award</h3>
            <p className="text-sm text-amber-700 mt-2 font-medium">Maintained 4.5+ average rating</p>
            <div className="mt-3 flex justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-xl border border-green-200">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-neutral-900 text-lg">Growth Champion</h3>
            <p className="text-sm text-green-700 mt-2 font-medium">Achieved 15K+ total downloads</p>
            <div className="mt-3 flex justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 rounded-xl border border-purple-200">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-neutral-900 text-lg">Global Impact</h3>
            <p className="text-sm text-purple-700 mt-2 font-medium">Data used across 45+ countries</p>
            <div className="mt-3 flex justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;