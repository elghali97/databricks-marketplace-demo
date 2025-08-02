import { Link } from 'react-router-dom';
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  Github,
  TrendingUp,
  Shield,
  CreditCard,
  BookOpen,
  Headphones,
  Database
} from 'lucide-react';

interface FooterProps {
  theme?: 'light' | 'dark';
  withSidebar?: boolean;
}

const Footer = ({ theme = 'light', withSidebar = false }: FooterProps) => {
  const isDark = theme === 'dark';
  const baseTextColor = isDark ? 'text-databricks-oat-light' : 'text-databricks-navy-600';
  const headingColor = isDark ? 'text-white' : 'text-databricks-navy-800';
  const bgColor = isDark ? 'bg-databricks-navy-900' : 'bg-gradient-to-br from-white via-databricks-oat-light to-white';
  const borderColor = isDark ? 'border-databricks-navy-700' : 'border-databricks-oat-medium';
  const sidebarMargin = withSidebar ? 'lg:ml-80' : '';

  // Key data categories (simplified)
  const dataCategories = [
    { 
      icon: TrendingUp, 
      label: 'Market & Trading', 
      path: '/marketplace?category=market-trading'
    },
    { 
      icon: CreditCard, 
      label: 'Credit Risk', 
      path: '/marketplace?category=credit-risk'
    },
    { 
      icon: Shield, 
      label: 'Risk & Compliance', 
      path: '/marketplace?category=risk-compliance'
    }
  ];

  // Essential resources
  const resources = [
    { 
      icon: BookOpen, 
      label: 'Documentation', 
      path: '/docs'
    },
    { 
      icon: Database, 
      label: 'Data Connectors', 
      path: '/connectors'
    },
    { 
      icon: Headphones, 
      label: 'Support', 
      path: '/support'
    }
  ];

  // Company links
  const companyLinks = [
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
    { label: 'Security', path: '/security' }
  ];

  // Legal links
  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' }
  ];

  // Social media links
  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/databricks', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/databricks', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/databricks', label: 'GitHub' }
  ];
  
  return (
    <footer className={`${bgColor} border-t ${borderColor} mt-auto ${sidebarMargin}`}>
      {/* Main Footer Content */}
      <div className="px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              {/* Databricks Logo */}
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-databricks-lava-600 to-databricks-lava-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className={`font-bold text-xl ${headingColor} group-hover:text-databricks-lava-600 transition-colors`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Databricks
                </span>
                <span className="text-xs font-medium text-databricks-lava-600 -mt-1" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                  Data Intelligence Marketplace
                </span>
              </div>
            </Link>
            
            <p className={`text-sm leading-relaxed mb-4 ${baseTextColor}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              The premier data marketplace for financial services, powered by Databricks lakehouse architecture.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-databricks-navy-700' : 'hover:bg-databricks-oat-light'} transition-colors group`}
                  aria-label={social.label}
                >
                  <social.icon className={`h-4 w-4 ${baseTextColor} group-hover:text-databricks-lava-600 transition-colors`} />
                </a>
              ))}
            </div>
          </div>

          {/* Data Categories */}
          <div>
            <h4 className={`text-sm font-bold ${headingColor} mb-4 uppercase tracking-wider`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Popular Categories
            </h4>
            <div className="space-y-3">
              {dataCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.path}
                  className={`group flex items-center text-sm ${baseTextColor} hover:text-databricks-lava-600 transition-colors`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  <category.icon className="h-4 w-4 mr-2 text-databricks-lava-600" />
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`text-sm font-bold ${headingColor} mb-4 uppercase tracking-wider`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Resources
            </h4>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <Link
                  key={index}
                  to={resource.path}
                  className={`group flex items-center text-sm ${baseTextColor} hover:text-databricks-lava-600 transition-colors`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  <resource.icon className="h-4 w-4 mr-2 text-databricks-lava-600" />
                  {resource.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className={`text-sm font-bold ${headingColor} mb-4 uppercase tracking-wider`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Company
            </h4>
            <div className="space-y-3 mb-6">
              {companyLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`block text-sm ${baseTextColor} hover:text-databricks-lava-600 transition-colors`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <h5 className={`text-xs font-bold ${headingColor} mb-3 uppercase tracking-wider opacity-75`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Legal
            </h5>
            <div className="space-y-2">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`block text-xs ${baseTextColor} hover:text-databricks-lava-600 transition-colors`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${borderColor} ${isDark ? 'bg-databricks-navy-800' : 'bg-databricks-oat-light'}`}>
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            
            {/* Copyright */}
            <p className={`text-sm ${baseTextColor}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              © {new Date().getFullYear()} Databricks, Inc. All rights reserved.
            </p>

            {/* Contact */}
            <a
              href="mailto:contact@databricks.com"
              className={`flex items-center text-sm ${baseTextColor} hover:text-databricks-lava-600 transition-colors`}
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
            >
              <Mail className="h-4 w-4 mr-2" />
              contact@databricks.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;