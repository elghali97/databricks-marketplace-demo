import React from 'react';
import { Users, TrendingUp, TrendingDown, BarChart3, Calendar, Zap } from 'lucide-react';
import { SampleDataRow } from '../../services/databricksService';
import { formatNumber } from '../../utils/formatters';

interface DataSummaryCardProps {
  data: SampleDataRow[];
  loading?: boolean;
}

export const DataSummaryCard: React.FC<DataSummaryCardProps> = ({ data, loading }) => {
  const insights = React.useMemo(() => {
    if (!data || data.length === 0) return null;

    // Calculate total passengers
    const totalPassengers = data.reduce((sum, row) => sum + row.passengers, 0);
    
    // Calculate average load factor
    const avgLoadFactor = data.reduce((sum, row) => sum + row.load_factor, 0) / data.length;
    
    // Find busiest airport
    const airportTraffic = data.reduce((acc, row) => {
      acc[row.airport] = (acc[row.airport] || 0) + row.passengers;
      return acc;
    }, {} as Record<string, number>);
    
    const busiestAirport = Object.entries(airportTraffic)
      .sort(([,a], [,b]) => b - a)[0];
    
    // Calculate trend (comparing first half vs second half)
    const midpoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midpoint);
    const secondHalf = data.slice(midpoint);
    
    const firstHalfAvg = firstHalf.reduce((sum, row) => sum + row.passengers, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, row) => sum + row.passengers, 0) / secondHalf.length;
    const trendPercent = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
    
    // Find date range
    const dates = data.map(row => new Date(row.date)).sort((a, b) => a.getTime() - b.getTime());
    const dateRange = dates.length > 1 ? 
      `${dates[0].toLocaleDateString()} - ${dates[dates.length - 1].toLocaleDateString()}` :
      dates[0]?.toLocaleDateString() || 'N/A';

    // Count unique airlines
    const uniqueAirlines = new Set(data.map(row => row.airline)).size;
    const uniqueAirports = new Set(data.map(row => row.airport)).size;

    // Find peak performance
    const peakDay = data.reduce((max, row) => 
      row.passengers > max.passengers ? row : max, data[0]);

    return {
      totalPassengers,
      avgLoadFactor,
      busiestAirport,
      trendPercent,
      dateRange,
      uniqueAirlines,
      uniqueAirports,
      peakDay,
      dataPoints: data.length
    };
  }, [data]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  const summaryCards = [
    {
      title: 'Total Traffic',
      value: formatNumber(insights.totalPassengers),
      description: `Across ${insights.dataPoints} records`,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Avg Load Factor',
      value: `${insights.avgLoadFactor.toFixed(1)}%`,
      description: 'Capacity utilization',
      icon: BarChart3,
      color: 'bg-green-50 text-green-600 border-green-200',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Growth Trend',
      value: `${insights.trendPercent >= 0 ? '+' : ''}${insights.trendPercent.toFixed(1)}%`,
      description: 'Period over period',
      icon: insights.trendPercent >= 0 ? TrendingUp : TrendingDown,
      color: insights.trendPercent >= 0 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
        : 'bg-red-50 text-red-600 border-red-200',
      bgColor: insights.trendPercent >= 0 ? 'bg-emerald-500' : 'bg-red-500'
    },
    {
      title: 'Peak Performance',
      value: formatNumber(insights.peakDay.passengers),
      description: `${insights.peakDay.airport} Hub`,
      icon: Zap,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Dataset Overview</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {insights.dateRange}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`border rounded-lg p-4 ${card.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.bgColor} bg-opacity-10`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{insights.uniqueAirports}</div>
          <div className="text-sm text-gray-500">Airports Covered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{insights.uniqueAirlines}</div>
          <div className="text-sm text-gray-500">Airlines Tracked</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{insights.busiestAirport[0]}</div>
          <div className="text-sm text-gray-500">Top Hub</div>
        </div>
      </div>
    </div>
  );
}; 