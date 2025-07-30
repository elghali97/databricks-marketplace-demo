import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

interface FooterProps {
  theme?: 'light' | 'dark';
  withSidebar?: boolean;
}

const Footer = ({ theme = 'light', withSidebar = false }: FooterProps) => {
  const baseTextColor = theme === 'dark' ? 'text-databricks-oat-light' : 'text-databricks-navy-600';
  const bgColor = theme === 'dark' ? 'bg-databricks-navy-900' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-databricks-navy-700' : 'border-databricks-oat-medium';
  const sidebarMargin = withSidebar ? 'lg:ml-80' : '';
  
  return (
    <footer className={`${bgColor} border-t ${borderColor} py-8 mt-auto ${sidebarMargin} transition-all duration-300`}>
      <div className={`px-4 lg:px-6 ${withSidebar ? '' : 'container mx-auto'}`}>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                {/* Databricks Logo Mark */}
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-databricks-lava-600 to-databricks-lava-700 rounded-lg shadow-databricks">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white/80 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white/80 rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-bold text-lg tracking-tight ${theme === 'dark' ? 'text-white' : 'text-databricks-navy-800'}`}>
                    databricks
                  </span>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-databricks-lava-400' : 'text-databricks-lava-600'} -mt-1`}>
                    Travel Data
                  </span>
                </div>
              </div>
            </Link>
            <p className={`mt-2 text-sm ${baseTextColor}`}>
              The premier travel data marketplace powered by Databricks technology.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-databricks-navy-800'} mb-4`}>
                Marketplace
              </h3>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className={`text-sm ${baseTextColor} hover:underline`}>Browse Datasets</Link></li>
                <li><Link to="/marketplace?category=passenger-traffic" className={`text-sm ${baseTextColor} hover:underline`}>Flight Data</Link></li>
                <li><Link to="/marketplace?category=hotel-occupancy" className={`text-sm ${baseTextColor} hover:underline`}>Hotel Data</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-databricks-navy-800'} mb-4`}>
                Resources
              </h3>
              <ul className="space-y-2">
                <li><Link to="/documentation" className={`text-sm ${baseTextColor} hover:underline`}>Documentation</Link></li>
                <li><Link to="/api-docs" className={`text-sm ${baseTextColor} hover:underline`}>API Reference</Link></li>
                <li><Link to="/support" className={`text-sm ${baseTextColor} hover:underline`}>Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-databricks-navy-800'} mb-4`}>
                Company
              </h3>
              <ul className="space-y-2">
                <li><Link to="/about" className={`text-sm ${baseTextColor} hover:underline`}>About Databricks</Link></li>
                <li><Link to="/privacy" className={`text-sm ${baseTextColor} hover:underline`}>Privacy Policy</Link></li>
                <li><Link to="/terms" className={`text-sm ${baseTextColor} hover:underline`}>Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`mt-8 pt-4 border-t ${borderColor} text-sm ${baseTextColor} flex flex-col md:flex-row justify-between items-center`}>
          <p>© {new Date().getFullYear()} Databricks Travel Data. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className={`${baseTextColor} hover:underline`}>Privacy</a>
            <a href="#" className={`${baseTextColor} hover:underline`}>Terms</a>
            <a href="#" className={`${baseTextColor} hover:underline`}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;