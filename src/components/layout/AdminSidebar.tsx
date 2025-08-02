import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Users, 
  BarChart3, 
  Shield, 
  FileText, 
  Settings, 
  LogOut, 
  X,
  TrendingUp,
  Activity,
  CreditCard,
  Leaf
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const AdminSidebar = ({ isOpen, onClose, onToggle }: AdminSidebarProps) => {
  const location = useLocation();
  const { logout } = useUser();
  
  const mainNavItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin', 
      description: 'System overview & metrics'
    },
    { 
      icon: Database, 
      label: 'Dataset Management', 
      path: '/admin/datasets', 
      description: 'Manage marketplace data'
    },
    { 
      icon: Users, 
      label: 'User Management', 
      path: '/admin/users', 
      description: 'Providers & consumers'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/admin/analytics', 
      description: 'Performance insights'
    },
    { 
      icon: Shield, 
      label: 'Security & Compliance', 
      path: '/admin/security',
      description: 'Access control & audits'
    }
  ];

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <Link
      to={item.path}
      className={cn(
        "group flex items-center px-4 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
        isActive 
          ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg" 
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
        isActive 
          ? "bg-white/20 text-white" 
          : "bg-slate-200 text-slate-600 group-hover:bg-slate-300 group-hover:text-slate-700"
      )}>
        <item.icon className="w-5 h-5" />
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <span className={cn(
          "block font-bold text-sm transition-colors",
          isActive ? "text-white" : "text-slate-800 group-hover:text-slate-900"
        )} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
          {item.label}
        </span>
        {item.description && (
          <p className={cn(
            "text-xs mt-0.5 transition-colors",
            isActive ? "text-white/80" : "text-slate-500 group-hover:text-slate-600"
          )} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {item.description}
          </p>
        )}
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
          "fixed top-0 left-0 z-40 h-screen w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-slate-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors z-10"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Enhanced Logo section - matching main sidebar structure */}
          <div className="px-6 py-6 border-b border-slate-300 bg-gradient-to-r from-slate-100 to-white">
            <Link to="/admin" className="flex items-center space-x-4">
              {/* Enhanced Databricks Logo Mark - Admin Version */}
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2.5 h-2.5 bg-white rounded-sm animate-pulse"></div>
                    <div className="w-2.5 h-2.5 bg-white/80 rounded-sm animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2.5 h-2.5 bg-white/80 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Databricks
                </span>
                <span className="text-sm font-bold text-slate-600 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Admin Console
                </span>
              </div>
            </Link>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            {/* Main Admin Navigation */}
            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Administration
              </h2>
              <nav className="space-y-2">
                {mainNavItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  (item.path !== '/admin' && location.pathname.startsWith(item.path));
                  
                  return (
                    <NavItem key={item.path} item={item} isActive={isActive} />
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Admin Actions */}
          <div className="p-4 border-t border-slate-300 bg-gradient-to-r from-slate-100 to-slate-200">
            <Link 
              to="/"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-3"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <span className="font-bold text-base" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Exit Admin</span>
                  <p className="text-sm text-white/80 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Return to marketplace</p>
                </div>
              </div>
            </Link>
            
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                  <LogOut className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <span className="font-bold text-base" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>Sign Out</span>
                  <p className="text-sm text-white/80 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>End admin session</p>
                </div>
              </div>
            </button>
          </div>

          {/* Enhanced Databricks Branding Footer - Admin Version */}
          <div className="p-6 border-t border-slate-300 bg-gradient-to-r from-slate-100 to-white">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mr-2">
                  <div className="grid grid-cols-2 gap-0.5 p-1">
                    <div className="w-1 h-1 bg-white rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/80 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white/80 rounded-sm"></div>
                    <div className="w-1 h-1 bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="font-bold text-slate-800" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Powered by Databricks
                </span>
              </div>
              <p className="text-xs text-slate-500" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                Data Intelligence Platform for Financial Services
              </p>
              <div className="mt-3 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500 font-semibold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
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

export default AdminSidebar;