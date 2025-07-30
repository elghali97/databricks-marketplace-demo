import { Link, useLocation } from 'react-router-dom';
import { 
  Home,  
  Database, 
  ShoppingCart, 
  UserCircle, 
  Settings, 
  HelpCircle, 
  Plane, 
  Building2, 
  Globe, 
  BarChart3, 
  Activity, 
  X,
  ChevronRight,
  Star,
  Zap,
  PanelLeftClose
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';
import logoImage from '../../assets/logo.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { isProvider, isAdmin } = useUser();
  
  const mainNavItems = [
    { icon: Home, label: 'Dashboard', path: '/', description: 'Overview and insights' },
    { icon: ShoppingCart, label: 'Marketplace', path: '/marketplace', description: 'Browse travel datasets' },
    { icon: Database, label: 'My Data', path: '/my-data', show: isProvider, description: 'Manage your datasets' }
  ];

  const categoryItems = [
    { 
      icon: Plane, 
      label: 'Flight Intelligence', 
      path: '/marketplace?category=passenger-traffic',
      description: 'Passenger traffic & flight data',
    },
    { 
      icon: Building2, 
      label: 'Hotel Intelligence', 
      path: '/marketplace?category=hotel-occupancy',
      description: 'Occupancy & revenue data',
    },
    { 
      icon: Globe, 
      label: 'Travel Trends', 
      path: '/marketplace?category=booking-patterns',
      description: 'Market insights & patterns',
    },
    { 
      icon: BarChart3, 
      label: 'Revenue Analytics', 
      path: '/marketplace?category=revenue-management',
      description: 'Pricing & optimization'
    },
    { 
      icon: Activity, 
      label: 'Operations Data', 
      path: '/marketplace?category=operational-data',
      description: 'Performance & efficiency'
    },
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help & Support', path: '/support', description: 'Get assistance' },
  ];

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <Link
      to={item.path}
      className={cn(
        "group flex items-center px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
        isActive 
          ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg" 
          : "text-neutral-700 hover:bg-neutral-50 hover:text-primary-700"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-white/20 text-white" 
          : "bg-neutral-100 text-neutral-600 group-hover:bg-primary-100 group-hover:text-primary-700"
      )}>
        <item.icon className="w-5 h-5" />
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm truncate">{item.label}</span>
          {item.featured && (
            <Star className="w-3 h-3 text-amber-400 fill-current ml-2" />
          )}
        </div>
        {item.description && (
          <p className={cn(
            "text-xs mt-0.5 truncate transition-colors",
            isActive ? "text-white/80" : "text-neutral-500 group-hover:text-primary-600"
          )}>
            {item.description}
          </p>
        )}
      </div>
      
      {!isActive && (
        <ChevronRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </Link>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-80 bg-white shadow-databricks-navy transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-databricks-oat-medium",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-databricks-oat-medium text-databricks-navy-500 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Logo section */}
          <div className="px-6 py-6 border-b border-databricks-oat-medium">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="flex items-center space-x-3">
                    {/* Databricks Logo Mark */}
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-databricks-lava-600 to-databricks-lava-700 rounded-xl shadow-databricks">
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                        <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                        <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xl tracking-tight text-databricks-navy-800">
                        databricks
                      </span>
                      <span className="text-sm font-medium text-databricks-lava-600 -mt-1">
                        Travel Data
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            {/* Main Navigation */}
            <div>
              <h2 className="text-xs font-semibold text-databricks-navy-500 uppercase tracking-wider mb-4 px-4">
                Main Navigation
              </h2>
              <nav className="space-y-2">
                {mainNavItems.map((item) => {
                  // Skip items that should only be shown to providers if user is not a provider
                  if (item.show === false || (item.show !== undefined && !item.show)) {
                    return null;
                  }
                  
                  const isActive = location.pathname === item.path || 
                                  (item.path !== '/' && location.pathname.startsWith(item.path));
                  
                  return (
                    <NavItem key={item.path} item={item} isActive={isActive} />
                  );
                })}
              </nav>
            </div>

            {/* Travel Data Categories */}
            <div>
              <div className="flex items-center justify-between mb-4 px-4">
                <h2 className="text-xs font-semibold text-databricks-navy-500 uppercase tracking-wider">
                  Travel Intelligence
                </h2>
              </div>
              <nav className="space-y-2">
                {categoryItems.map((item, index) => {
                  const isActive = location.pathname.includes('/marketplace') && 
                                  location.search.includes(item.path.split('?')[1]);
                  
                  return (
                    <NavItem key={index} item={item} isActive={isActive} />
                  );
                })}
              </nav>
            </div>

            {/* Support & Settings */}
            <div>
              <h2 className="text-xs font-semibold text-databricks-navy-500 uppercase tracking-wider mb-4 px-4">
                Account & Support
              </h2>
              <nav className="space-y-2">
                {supportItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <NavItem key={item.path} item={item} isActive={isActive} />
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Admin Panel Access */}
          {isAdmin && (
            <div className="p-4 border-t border-databricks-oat-medium bg-gradient-to-r from-databricks-oat-light to-databricks-oat-medium">
              <Link 
                to="/admin" 
                className="flex items-center justify-between p-4 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 shadow-databricks"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-sm">Admin Panel</span>
                    <p className="text-xs text-white/80">System management</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Databricks Branding Footer */}
          <div className="p-4 border-t border-databricks-oat-medium bg-databricks-oat-light">
            <div className="text-center">
              <p className="text-xs text-databricks-navy-600">
                Powered by <span className="font-bold text-databricks-lava-600">Databricks</span>
              </p>
              <p className="text-xs text-databricks-navy-500 mt-1">
                Travel Technology Solutions
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;