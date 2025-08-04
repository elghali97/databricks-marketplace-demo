import { Link, useLocation } from 'react-router-dom';
import { 
  Home,  
  Database, 
  ShoppingCart, 
  Settings, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  Activity, 
  X,
  ChevronRight,
  Sparkles,
  Leaf,
  Users,
  AlertTriangle
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { isProvider, isAdmin } = useUser();
  
  const mainNavItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/', 
      description: 'AI insights & overview'
    },
    { 
      icon: ShoppingCart, 
      label: 'Marketplace', 
      path: '/marketplace', 
      description: 'Browse financial datasets'
    },
    { 
      icon: Database, 
      label: 'My Data', 
      path: '/my-data', 
      show: isProvider, 
      description: 'Manage your datasets'
    }
  ];

  const categoryItems = [
    { 
      icon: TrendingUp, 
      label: 'Market & Trading', 
      path: '/marketplace?category=market-trading',
      description: 'Equities, bonds & derivatives',
      color: 'text-databricks-lava-600',
      bgColor: 'bg-databricks-lava-50',
      borderColor: 'border-databricks-lava-200',
      count: 16
    },
    { 
      icon: Activity, 
      label: 'Alternative Data', 
      path: '/marketplace?category=alternative-data',
      description: 'Transaction & sentiment data',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      count: 8
    },
    { 
      icon: Shield, 
      label: 'Risk & Compliance', 
      path: '/marketplace?category=risk-compliance',
      description: 'KYC, AML & regulatory data',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      count: 8,
      trending: true
    },
    { 
      icon: CreditCard, 
      label: 'Credit Risk', 
      path: '/marketplace?category=credit-risk',
      description: 'Credit scoring & analytics',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      count: 4
    },
    { 
      icon: Leaf, 
      label: 'ESG & Sustainability', 
      path: '/marketplace?category=esg-sustainability',
      description: 'Environmental & social data',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      count: 4,
      trending: true
    },
    { 
      icon: Users, 
      label: 'Customer Analytics', 
      path: '/marketplace?category=customer-analytics',
      description: 'Behavioral & demographic data',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      count: 4
    },
    { 
      icon: AlertTriangle, 
      label: 'Fraud Detection', 
      path: '/marketplace?category=fraud-detection',
      description: 'Security & anomaly detection',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      count: 4
    },
    { 
      icon: Database, 
      label: 'Reference Data', 
      path: '/marketplace?category=reference-data',
      description: 'Entity IDs & instrument data',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      count: 4
    },
  ];

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <Link
      to={item.path}
      className={cn(
        "group flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
        isActive 
          ? "bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white shadow-lg transform scale-105" 
          : "text-databricks-navy-700 hover:bg-databricks-oat-light hover:text-databricks-lava-600 hover:scale-102"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300",
        isActive 
          ? "bg-white/20 text-white shadow-lg" 
          : "bg-databricks-oat-medium text-databricks-navy-500 group-hover:bg-databricks-lava-100 group-hover:text-databricks-lava-600"
      )}>
        <item.icon className="w-5 h-5" />
      </div>
      
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm truncate" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {item.label}
          </span>
        </div>
        <p className="text-xs opacity-75 mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
          {item.description}
        </p>
      </div>
    </Link>
  );

  const CategoryItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <Link
      to={item.path}
      className={cn(
        "group block p-4 rounded-2xl transition-all duration-300 border-2 hover:scale-105 relative overflow-hidden",
        isActive 
          ? `${item.bgColor} ${item.borderColor} shadow-lg transform scale-105` 
          : "bg-white border-databricks-oat-medium hover:border-databricks-lava-200 hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
          isActive ? `${item.bgColor} ${item.borderColor} border` : "bg-databricks-oat-light"
        )}>
          <item.icon className={cn(
            "w-6 h-6 transition-colors",
            isActive ? item.color : "text-databricks-navy-600 group-hover:text-databricks-lava-600"
          )} />
          {item.trending && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <span className="text-xs font-bold text-databricks-navy-500 bg-databricks-oat-medium px-2 py-1 rounded-md">
          {item.count}
        </span>
      </div>
      
      <h3 className={cn(
        "font-bold text-sm mb-1 transition-colors",
        isActive ? item.color : "text-databricks-navy-800 group-hover:text-databricks-lava-600"
      )} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
        {item.label}
      </h3>
      
      <p className="text-xs text-databricks-navy-500 leading-relaxed" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
        {item.description}
      </p>

      {/* Progress indicator */}
      <div className="mt-3 w-full bg-databricks-oat-medium rounded-full h-1 overflow-hidden">
        <div 
          className={cn(
            "h-1 rounded-full transition-all duration-700",
            isActive ? `bg-gradient-to-r ${item.color.replace('text-', 'from-').replace('-600', '-400')} to-${item.color.replace('text-', '').replace('-600', '-600')}` : "bg-databricks-oat-dark"
          )}
          style={{ width: `${Math.min((item.count / 250) * 100, 100)}%` }}
        ></div>
      </div>
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
          "fixed top-0 left-0 z-40 h-screen w-80 bg-white shadow-databricks-lg transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-databricks-oat-medium",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-xl hover:bg-databricks-oat-medium text-databricks-navy-500 transition-colors z-10"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Enhanced Logo section */}
          <div className="px-6 py-6 border-b border-databricks-oat-medium bg-gradient-to-r from-databricks-oat-light to-white">
            <Link to="/" className="flex items-center space-x-4">
              {/* Enhanced Databricks Logo Mark */}
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-databricks-lava-600 to-databricks-lava-700 rounded-2xl shadow-databricks-lg hover:shadow-lava-lg transition-all duration-300 hover:scale-105">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2.5 h-2.5 bg-white rounded-sm animate-pulse"></div>
                    <div className="w-2.5 h-2.5 bg-white/80 rounded-sm animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2.5 h-2.5 bg-white/80 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Databricks
                </span>
                <span className="text-sm font-bold text-databricks-lava-600 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Financial Intelligence
                </span>
              </div>
            </Link>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            {/* Main Navigation */}
            <div>
              <h2 className="text-xs font-bold text-databricks-navy-500 uppercase tracking-wider mb-4 px-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Navigation
              </h2>
              <nav className="space-y-2">
                {mainNavItems.map((item) => {
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

            {/* Financial Intelligence Categories */}
            <div>
              <div className="flex items-center justify-between mb-4 px-4">
                <h2 className="text-xs font-bold text-databricks-navy-500 uppercase tracking-wider" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Financial Intelligence
                </h2>
                <Sparkles className="h-4 w-4 text-databricks-lava-600" />
              </div>
              <div className="grid grid-cols-1 gap-3">
                {categoryItems.map((item, index) => {
                  const isActive = location.pathname.includes('/marketplace') && 
                                  location.search.includes(item.path.split('?')[1]);
                  
                  return (
                    <CategoryItem key={index} item={item} isActive={isActive} />
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Admin Panel Access */}
          {isAdmin && (
            <div className="p-4 border-t border-databricks-oat-medium bg-gradient-to-r from-databricks-oat-light to-databricks-oat-medium">
              <Link 
                to="/admin" 
                className="flex items-center justify-between p-4 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white rounded-2xl hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 shadow-databricks hover:shadow-lava-lg transform hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <span className="font-bold text-base" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Admin Panel</span>
                    <p className="text-sm text-white/80 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>System management</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* Enhanced Databricks Branding Footer */}
          <div className="p-6 border-t border-databricks-oat-medium bg-gradient-to-r from-databricks-oat-light to-white">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-databricks-lava-600 to-databricks-lava-700 rounded-lg mr-2">
                  <div className="grid grid-cols-2 gap-0.5 p-1">
                    <div className="w-1 h-1 bg-white rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/80 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/80 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="font-bold text-databricks-navy-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Powered by Databricks
                </span>
              </div>
              <p className="text-xs text-databricks-navy-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Data Intelligence Platform for Financial Services
              </p>
              <div className="mt-3 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-databricks-navy-500 font-semibold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;