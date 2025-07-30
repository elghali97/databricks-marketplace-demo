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
  PanelLeftClose
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';
import logoImage from '../../assets/logo.png';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const AdminSidebar = ({ isOpen, onClose, onToggle }: AdminSidebarProps) => {
  const location = useLocation();
  const { logout } = useUser();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', description: 'System overview' },
    { icon: Database, label: 'Datasets', path: '/admin/datasets', description: 'Data management' },
    { icon: Users, label: 'Users', path: '/admin/users', description: 'User management' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics', description: 'Performance metrics' },
    { icon: Shield, label: 'Permissions', path: '/admin/permissions', description: 'Access control' },
    { icon: FileText, label: 'Reports', path: '/admin/reports', description: 'System reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings', description: 'Configuration' },
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
            <Shield className="w-3 h-3 text-primary-500 fill-current ml-2" />
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
          "fixed top-0 left-0 z-40 h-screen w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-neutral-100",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Logo section */}
          <div className="px-6 py-6 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <Link to="/admin" className="flex items-center space-x-3">
                <div className="flex items-center relative">
                  <img 
                    src={logoImage} 
                    alt="Databricks Admin Panel" 
                    className="h-16 w-auto object-contain"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                    <Shield className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Admin Navigation */}
            <div>
              <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-4">
                Administration
              </h2>
              <nav className="space-y-2">
                {navItems.map((item) => {
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
          <div className="p-4 border-t border-neutral-100 space-y-2">
            <Link 
              to="/"
              className="flex items-center justify-between p-3 bg-gradient-to-r from-neutral-50 to-neutral-100 text-neutral-700 rounded-xl hover:from-neutral-100 hover:to-neutral-200 transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-200">
                  <LogOut className="w-4 h-4 text-neutral-600" />
                </div>
                <div className="ml-3">
                  <span className="font-medium text-sm">Exit Admin</span>
                  <p className="text-xs text-neutral-500">Return to marketplace</p>
                </div>
              </div>
            </Link>
            
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-error-50 to-error-100 text-error-700 rounded-xl hover:from-error-100 hover:to-error-200 transition-all duration-200"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-error-200">
                  <LogOut className="w-4 h-4 text-error-600" />
                </div>
                <div className="ml-3">
                  <span className="font-medium text-sm">Sign Out</span>
                  <p className="text-xs text-error-600">End admin session</p>
                </div>
              </div>
            </button>
          </div>

          {/* Databricks Branding Footer */}
          <div className="p-4 border-t border-neutral-100 bg-gradient-to-r from-primary-50 to-primary-100">
            <div className="text-center">
              <p className="text-xs text-primary-800 font-semibold">
                Powered by <span className="font-bold">Databricks</span>
              </p>
              <p className="text-xs text-primary-600 mt-1">
                Travel Technology Solutions
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;