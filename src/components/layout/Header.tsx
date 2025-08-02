import { Link } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  User, 
  CheckCircle, 
  FileText, 
  Clock, 
  X,
  Search,
  Sparkles,
  Command,
  TrendingUp,
  Shield,
  Award,
  AlertTriangle,
  Settings,
  LogOut,
  Activity,
  BarChart3,
  Database,
  Target,
  Lightbulb
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced notification data with user welcome and AI recommendations
  const notifications = [
    {
      id: 1,
      type: 'user_welcome',
      title: `Welcome back, ${user?.name?.split(' ')[0]}!`,
      message: `${user?.organization} • You have 3 new recommendations today`,
      time: 'just now',
      read: false,
      icon: Award,
      color: 'text-databricks-lava-600',
      bgColor: 'bg-databricks-lava-100',
      priority: 'high'
    },
    {
      id: 2,
      type: 'ai_recommendation',
      title: 'ESG Datasets Trending',
      message: 'Based on your recent activity - 5 new sustainability datasets added',
      time: '30 min ago',
      read: false,
      icon: Lightbulb,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      priority: 'high'
    },
    {
      id: 3,
      type: 'ai_recommendation',
      title: 'New Credit Risk Models',
      message: '5 new datasets this week match your portfolio needs',
      time: '1 hour ago',
      read: false,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'access_granted',
      title: 'Dataset Access',
      message: 'You now have access to "Credit Risk Analytics Q1 2024"',
      time: '2 hours ago',
      read: false,
      icon: Shield,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'request_pending',
      title: 'Access Request Pending',
      message: 'Your request for "ESG Sustainability Metrics" is being reviewed',
      time: '3 hours ago',
      read: true,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'dataset_updated',
      title: 'Dataset Updated',
      message: 'New data added to "Financial Sentiment Analytics 2024"',
      time: '1 day ago',
      read: true,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      priority: 'low'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Quick search suggestions
  const searchSuggestions = [
    { query: 'ESG sustainability data', type: 'dataset', icon: BarChart3 },
    { query: 'Credit risk models', type: 'dataset', icon: Shield },
    { query: 'Real-time market data', type: 'dataset', icon: TrendingUp },
    { query: 'Financial reporting data', type: 'dataset', icon: FileText },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.notification-menu') && !target.closest('.notification-button')) {
        setNotificationMenuOpen(false);
      }
      if (!target.closest('.user-menu') && !target.closest('.user-button')) {
        setUserMenuOpen(false);
      }
      if (!target.closest('.search-menu') && !target.closest('.search-button')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setNotificationMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-80 bg-white/95 backdrop-blur-md border-b border-databricks-oat-medium shadow-databricks z-30">
      <div className="flex items-center justify-between h-20 px-6 lg:px-8">
        {/* Left side - Menu button and branding */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-3 rounded-xl hover:bg-databricks-oat-light transition-all duration-200 border border-transparent hover:border-databricks-oat-medium"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-databricks-navy-600" />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-databricks-navy-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Data Intelligence Marketplace
            </h1>
            <p className="text-sm text-databricks-navy-600 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Financial Services
            </p>
          </div>
        </div>

        {/* Center - AI Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <button
              onClick={() => setSearchOpen(true)}
              className="search-button w-full flex items-center px-4 py-3 bg-databricks-oat-light border border-databricks-oat-medium rounded-xl hover:border-databricks-lava-300 hover:bg-white transition-all duration-200 text-left group"
            >
              <Search className="h-4 w-4 text-databricks-navy-400 mr-3" />
              <span className="text-databricks-navy-500 text-sm" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Search datasets, ask AI...
              </span>
              <div className="ml-auto flex items-center space-x-1 opacity-60">
                <Command className="h-3 w-3" />
                <span className="text-xs">K</span>
              </div>
            </button>

            {/* Enhanced Search Modal */}
            {searchOpen && (
              <div className="search-menu absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-databricks-oat-medium p-6 z-50 animate-scale-in">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-databricks-lava-600 mr-2" />
                  <h3 className="font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    AI-Powered Search
                  </h3>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-databricks-navy-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask: 'Show me ESG data for European banks'..."
                    className="w-full pl-10 pr-4 py-3 border border-databricks-oat-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-databricks-lava-400 focus:border-transparent"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-databricks-navy-500 uppercase tracking-wider mb-3">
                    Popular Searches
                  </h4>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center p-3 rounded-xl hover:bg-databricks-oat-light transition-colors text-left"
                      onClick={() => {
                        setSearchQuery(suggestion.query);
                        setSearchOpen(false);
                      }}
                    >
                      <suggestion.icon className="h-4 w-4 text-databricks-navy-500 mr-3" />
                      <span className="text-sm text-databricks-navy-700" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {suggestion.query}
                      </span>
                      <span className="ml-auto text-xs text-databricks-navy-400 bg-databricks-oat-light px-2 py-1 rounded-md">
                        {suggestion.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Notifications & Profile */}
        <div className="flex items-center space-x-3">
          {/* Mobile search button */}
          <button 
            onClick={() => setSearchOpen(true)}
            className="md:hidden search-button p-3 rounded-xl hover:bg-databricks-oat-light transition-all duration-200"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-databricks-navy-600" />
          </button>

          {/* Enhanced Notifications */}
          <div className="relative">
            <button 
              onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
              className="notification-button relative p-3 rounded-xl hover:bg-databricks-oat-light transition-all duration-200 border border-transparent hover:border-databricks-oat-medium"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-databricks-navy-600" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white text-xs font-bold rounded-full animate-pulse">
                  {unreadCount}
                </div>
              )}
            </button>

            {notificationMenuOpen && (
              <div className="notification-menu absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-databricks-oat-medium animate-scale-in z-50">
                <div className="p-6 border-b border-databricks-oat-medium">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-databricks-lava-100 text-databricks-lava-800 px-2 py-1 rounded-full text-xs font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setNotificationMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-databricks-oat-light transition-colors"
                    >
                      <X className="h-4 w-4 text-databricks-navy-600" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-databricks-oat-light transition-colors border-l-4 ${
                          !notification.read 
                            ? 'border-databricks-lava-600 bg-databricks-lava-50' 
                            : 'border-transparent'
                        } cursor-pointer`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${notification.bgColor}`}>
                            <IconComponent className={`h-4 w-4 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-sm text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-databricks-lava-600 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-databricks-navy-600 mb-2 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                                {notification.time}
                              </span>
                              {notification.priority === 'high' && (
                                <span className="text-xs bg-databricks-lava-100 text-databricks-lava-700 px-2 py-1 rounded-md font-semibold">
                                  Priority
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-databricks-oat-medium">
                  <button className="w-full py-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 font-bold text-sm">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced User Menu */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="user-button flex items-center space-x-3 p-3 rounded-xl hover:bg-databricks-oat-light transition-all duration-200 border border-transparent hover:border-databricks-oat-medium"
              aria-expanded={userMenuOpen}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-databricks-oat-medium"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-databricks-lava-500 to-databricks-lava-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name.charAt(0)}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="font-bold text-sm text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {user?.name}
                </div>
                <div className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {user?.organization}
                </div>
              </div>
            </button>

            {userMenuOpen && (
              <div className="user-menu absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-databricks-oat-medium animate-scale-in z-50">
                <div className="p-4 border-b border-databricks-oat-medium">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-databricks-lava-500 to-databricks-lava-600 flex items-center justify-center text-white font-bold">
                      {user?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user?.name}
                      </div>
                      <div className="text-sm text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user?.email}
                      </div>
                      <div className="text-xs text-databricks-navy-400" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user?.organization}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link 
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-databricks-navy-700 hover:bg-databricks-oat-light rounded-xl transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    <User className="mr-3 h-4 w-4" />
                    View Profile
                  </Link>
                  
                  <Link 
                    to="/settings"
                    className="flex items-center px-4 py-3 text-sm text-databricks-navy-700 hover:bg-databricks-oat-light rounded-xl transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>



                  <div className="border-t border-databricks-oat-medium my-2"></div>

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;