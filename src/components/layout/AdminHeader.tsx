import { Link } from 'react-router-dom';
import { Bell, Menu, User, Shield } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const { user, logout } = useUser();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-80 bg-white/95 backdrop-blur-sm border-b border-neutral-200 z-30 shadow-sm">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo & menu button */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden mr-4 p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary-600" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-neutral-900">Admin Dashboard</h1>
                  <p className="text-xs text-neutral-500 -mt-1">Databricks Data Management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Notifications & Profile */}
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
            </button>
            
            <div className="relative ml-3">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-expanded={userMenuOpen}
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-200"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name.charAt(0)}
                  </div>
                )}
                <div className="hidden md:flex flex-col items-start">
                  <span className="font-medium text-sm text-neutral-900">
                    {user?.name}
                  </span>
                  <span className="text-xs text-neutral-500">Administrator</span>
                </div>
              </button>

              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in border border-neutral-200">
                  <div className="py-2" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                      <p className="text-xs text-neutral-500">System Administrator</p>
                    </div>
                    <Link 
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-700 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile Settings
                    </Link>
                    <Link 
                      to="/"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-700 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Shield className="mr-3 h-4 w-4" />
                      Exit Admin Panel
                    </Link>
                    <div className="border-t border-neutral-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-error-50 hover:text-error-700 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;