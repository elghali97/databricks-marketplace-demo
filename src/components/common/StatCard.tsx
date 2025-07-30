import { ReactNode } from 'react';
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
      "bg-white rounded-lg shadow-card p-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-databricks border border-databricks-oat-medium", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-databricks-navy-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-databricks-navy-800">{value}</h3>
          
          {change && (
            <p className={cn(
              "text-xs font-medium flex items-center mt-2",
              change.isPositive ? "text-success-600" : "text-error-600"
            )}>
              <span className={cn(
                "inline-block mr-1",
                change.isPositive ? "border-b-4 border-r-4 border-success-600 rotate-45 w-2 h-2" :
                "border-t-4 border-r-4 border-error-600 -rotate-135 w-2 h-2"
              )}></span>
              {change.isPositive ? '+' : ''}{change.value}% from last period
            </p>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-databricks-lava-50 text-databricks-lava-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;