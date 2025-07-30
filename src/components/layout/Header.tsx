import { Link } from 'react-router-dom';
import { Bell, Menu, User, CheckCircle, FileText, Clock, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'access_granted',
      title: 'Access Granted',
      message: 'Your access to "Global Flight Routes 2024" has been approved',
      time: '2 minutes ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'access_granted',
      title: 'Dataset Access',
      message: 'You now have access to "Hotel Booking Patterns Q1 2024"',
      time: '1 hour ago',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'request_pending',
      title: 'Access Request Pending',
      message: 'Your request for "Airport Traffic Analytics" is being reviewed',
      time: '3 hours ago',
      read: true,
      icon: Clock,
      color: 'text-amber-600'
    },
    {
      id: 4,
      type: 'dataset_updated',
      title: 'Dataset Updated',
      message: 'New data added to "European Rail Networks 2024"',
      time: '1 day ago',
      read: true,
      icon: FileText,
      color: 'text-blue-600'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-80 bg-white/95 backdrop-blur-sm border-b border-databricks-oat-medium shadow-databricks-navy z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side - Menu button only */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden mr-4 p-2 rounded-md hover:bg-databricks-oat-medium transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="block">
            <h1 className="text-lg font-semibold text-databricks-navy-800">Databricks Travel Data Marketplace</h1>
          </div>
        </div>



        {/* Right side - Notifications & Profile */}
        <div className="flex items-center">
          <div className="relative">
            <button 
              onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
              className="notification-button p-2 rounded-md hover:bg-databricks-oat-medium transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-databricks-lava-600 animate-pulse"></span>
              )}
            </button>

            {notificationMenuOpen && (
              <div className="notification-menu origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-databricks-oat-medium">
                    <h3 className="text-sm font-semibold text-databricks-navy-800">Notifications</h3>
                    <button
                      onClick={() => setNotificationMenuOpen(false)}
                      className="p-1 rounded-md hover:bg-databricks-oat-medium transition-colors"
                    >
                      <X className="h-4 w-4 text-databricks-navy-600" />
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-neutral-50 transition-colors border-l-4 ${
                            notification.read ? 'border-transparent' : 'border-databricks-lava-600 bg-databricks-lava-50'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${
                              notification.type === 'access_granted' ? 'bg-success-100' :
                              notification.type === 'request_pending' ? 'bg-warning-100' :
                              'bg-databricks-lava-100'
                            }`}>
                              <IconComponent className={`h-4 w-4 ${notification.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-databricks-navy-800">{notification.title}</p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-databricks-lava-600 rounded-full flex-shrink-0"></span>
                                )}
                              </div>
                              <p className="text-sm text-databricks-navy-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-databricks-navy-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-databricks-oat-medium px-4 py-3">
                    <button className="w-full text-center text-sm text-databricks-lava-600 hover:text-databricks-lava-700 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative ml-3">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="user-button flex items-center space-x-2 p-2 rounded-md hover:bg-databricks-oat-medium transition-colors"
              aria-expanded={userMenuOpen}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-databricks-lava-500 to-databricks-lava-600 flex items-center justify-center text-white font-medium">
                  {user?.name.charAt(0)}
                </div>
              )}
              <span className="hidden md:block font-medium text-sm text-neutral-800">
                {user?.name}
              </span>
            </button>

            {userMenuOpen && (
              <div className="user-menu origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link 
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-databricks-navy-700 hover:bg-databricks-oat-light"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-databricks-oat-light"
                  >
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