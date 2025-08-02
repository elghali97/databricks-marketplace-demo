import { Link } from 'react-router-dom';
import { Bell, Menu, User, Shield, Settings, LogOut, X, Search, Command, Database, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const { user, logout } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Admin-specific notifications
  const notifications = [
    {
      id: 1,
      type: 'system_alert',
      title: 'System Performance Alert',
      message: 'High API usage detected - 15% above normal threshold',
      time: '5 min ago',
      read: false,
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      priority: 'high'
    },
    {
      id: 2,
      type: 'user_activity',
      title: 'New Provider Registration',
      message: '3 new data providers pending approval',
      time: '1 hour ago',
      read: false,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'security',
      title: 'Security Review Required',
      message: 'Weekly compliance report ready for review',
      time: '2 hours ago',
      read: false,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'analytics',
      title: 'Revenue Milestone',
      message: 'Monthly revenue target exceeded by 12%',
      time: '1 day ago',
      read: true,
      icon: BarChart3,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      priority: 'low'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Admin search suggestions
  const searchSuggestions = [
    { query: 'User management dashboard', type: 'admin', icon: Users },
    { query: 'Dataset analytics report', type: 'admin', icon: Database },
    { query: 'System performance metrics', type: 'admin', icon: TrendingUp },
    { query: 'Security compliance logs', type: 'admin', icon: Shield },
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
    <header className="fixed top-0 left-0 right-0 lg:left-80 bg-white/95 backdrop-blur-md border-b border-slate-300 shadow-lg z-30">
      <div className="flex items-center justify-between h-20 px-6 lg:px-8">
        {/* Left side - Menu button and branding */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 border border-transparent hover:border-slate-300"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
          
          <div className="hidden lg:block">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-7 w-7 text-slate-700" />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-slate-600 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Financial Data Management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Admin Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <button
              onClick={() => setSearchOpen(true)}
              className="search-button w-full flex items-center px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl hover:border-slate-400 hover:bg-white transition-all duration-200 text-left group"
            >
              <Search className="h-4 w-4 text-slate-500 mr-3" />
              <span className="text-slate-600 text-sm" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Search admin panel, users, datasets...
              </span>
              <div className="ml-auto flex items-center space-x-1 opacity-60">
                <Command className="h-3 w-3" />
                <span className="text-xs">K</span>
              </div>
            </button>

            {/* Admin Search Modal */}
            {searchOpen && (
              <div className="search-menu absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 z-50 animate-scale-in">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-slate-700 mr-2" />
                  <h3 className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    Admin Search
                  </h3>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users, datasets, analytics..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
                    Admin Functions
                  </h4>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center p-3 rounded-xl hover:bg-slate-100 transition-colors text-left"
                      onClick={() => {
                        setSearchQuery(suggestion.query);
                        setSearchOpen(false);
                      }}
                    >
                      <suggestion.icon className="h-4 w-4 text-slate-600 mr-3" />
                      <span className="text-sm text-slate-700" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {suggestion.query}
                      </span>
                      <span className="ml-auto text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
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
            className="md:hidden search-button p-3 rounded-xl hover:bg-slate-100 transition-all duration-200"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-slate-700" />
          </button>

          {/* Admin Notifications */}
          <div className="relative">
            <button 
              onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
              className="notification-button relative p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 border border-transparent hover:border-slate-300"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-slate-700" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full animate-pulse">
                  {unreadCount}
                </div>
              )}
            </button>

            {notificationMenuOpen && (
              <div className="notification-menu absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-300 animate-scale-in z-50">
                <div className="p-6 border-b border-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Admin Alerts
                      </h3>
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setNotificationMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="h-4 w-4 text-slate-700" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-slate-50 transition-colors border-l-4 ${
                          !notification.read 
                            ? 'border-red-600 bg-red-50' 
                            : 'border-transparent'
                        } cursor-pointer`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${notification.bgColor}`}>
                            <IconComponent className={`h-4 w-4 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-sm text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-700 mb-2 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                                {notification.time}
                              </span>
                              {notification.priority === 'high' && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md font-semibold">
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

                <div className="p-4 border-t border-slate-300">
                  <button className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-200 font-bold text-sm">
                    View All Admin Alerts
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Admin User Menu */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="user-button flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 border border-transparent hover:border-slate-300"
              aria-expanded={userMenuOpen}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-300"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name.charAt(0)}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="font-bold text-sm text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  {user?.name}
                </div>
                <div className="text-xs text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  System Administrator
                </div>
              </div>
            </button>

            {userMenuOpen && (
              <div className="user-menu absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-300 animate-scale-in z-50">
                <div className="p-4 border-b border-slate-300">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold">
                      {user?.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user?.name}
                      </div>
                      <div className="text-sm text-slate-600" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        {user?.email}
                      </div>
                      <div className="text-xs text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                        Administrator
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link 
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    <User className="mr-3 h-4 w-4" />
                    View Profile
                  </Link>
                  
                  <Link 
                    to="/admin/settings"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Admin Settings
                  </Link>

                  <Link 
                    to="/"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                  >
                    <Shield className="mr-3 h-4 w-4" />
                    Exit Admin Panel
                  </Link>

                  <div className="border-t border-slate-300 my-2"></div>

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

export default AdminHeader;