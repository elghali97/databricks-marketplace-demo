import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, change, className }: StatCardProps) => {
  return (
    <div className={cn(
      "group bg-white rounded-2xl shadow-databricks p-8 transition-all duration-500 hover:shadow-databricks-lg border border-databricks-oat-medium hover:border-databricks-lava-200 hover:-translate-y-1", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-bold text-databricks-navy-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {title}
          </p>
          <h3 className="text-3xl font-bold text-databricks-navy-800 mb-4 tracking-tight" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {value}
          </h3>
          
          {change && (
            <div className={cn(
              "inline-flex items-center px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200",
              change.isPositive 
                ? "bg-gradient-to-r from-success-50 to-success-100 text-success-700 border border-success-200" 
                : "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200"
            )}>
              {change.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-2" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-2" />
              )}
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
            </div>
          )}
        </div>
        
        <div className="relative">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Icon container */}
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-databricks-lava-50 to-databricks-lava-100 text-databricks-lava-600 group-hover:from-databricks-lava-100 group-hover:to-databricks-lava-200 group-hover:text-databricks-lava-700 transition-all duration-300 transform group-hover:scale-110">
            {icon}
          </div>
        </div>
      </div>

      {/* Enhanced micro-interaction elements */}
      <div className="mt-6 pt-4 border-t border-databricks-oat-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between text-xs text-databricks-navy-500">
          <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            vs. last period
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-databricks-lava-600 rounded-full animate-pulse"></div>
            <span className="font-semibold" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              Live data
            </span>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-databricks-lava-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
    </div>
  );
};

export default StatCard;