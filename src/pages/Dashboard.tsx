import { useEffect, useState } from 'react';
import { Users, Database, BarChart3, ShoppingCart } from 'lucide-react';
import { useUser } from '../context/UserContext';
import DatasetCard from '../components/datasets/DatasetCard';
import StatCard from '../components/common/StatCard';
import BarChart from '../components/charts/BarChart';
import { formatNumber } from '../utils/formatters';
import { mockDatasets, analyticsData } from '../data/mockData';

const Dashboard = () => {
  const { user, isProvider } = useUser();
  const [featuredDatasets, setFeaturedDatasets] = useState(mockDatasets.slice(0, 3));
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-databricks-navy-800">
          Welcome back, {user?.name}
        </h1>
        <p className="text-databricks-navy-600">
          {isProvider 
            ? 'Manage your travel datasets and track your analytics'
            : 'Explore the latest travel and hospitality data from Databricks'
          }
        </p>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Available Datasets"
          value={formatNumber(analyticsData.totalDatasets)}
          icon={<Database className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Active Users"
          value={formatNumber(analyticsData.activeUsers)}
          icon={<Users className="h-6 w-6" />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Total Downloads"
          value={formatNumber(analyticsData.totalDownloads)}
          icon={<ShoppingCart className="h-6 w-6" />}
          change={{ value: 15, isPositive: true }}
        />
        <StatCard 
          title="Data Providers"
          value={formatNumber(analyticsData.totalProviders)}
          icon={<BarChart3 className="h-6 w-6" />}
          change={{ value: 5, isPositive: true }}
        />
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          data={analyticsData.monthlyDownloads}
          xKey="month"
          yKey="downloads"
          title="Monthly Downloads"
          color="#1E3A8A"
        />
        <BarChart 
          data={analyticsData.monthlyRevenue}
          xKey="month"
          yKey="revenue"
          title="Monthly Revenue ($)"
          color="#0D9488"
        />
      </div>
      
      {/* Featured datasets section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-databricks-navy-800">Featured Travel Datasets</h2>
          <a 
            href="/marketplace" 
            className="text-sm font-medium text-databricks-lava-600 hover:text-databricks-lava-700 transition-colors"
          >
            View all
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </div>
      
      {/* Trending categories section */}
      <div>
        <h2 className="text-xl font-semibold text-databricks-navy-800 mb-4">Trending Travel Data Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analyticsData.topCategories.slice(0, 4).map((category, index) => (
            <a
              key={index}
              href={`/marketplace?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="block p-4 bg-white rounded-lg shadow-card border border-databricks-oat-medium hover:shadow-databricks transition-all duration-300"
            >
              <h3 className="font-medium text-databricks-navy-800 mb-2">{category.name}</h3>
              <p className="text-sm text-databricks-navy-600">
                {category.value} datasets
              </p>
              <div className="mt-2 w-full bg-databricks-oat-medium rounded-full h-1.5">
                <div 
                  className="bg-databricks-lava-600 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(category.value / analyticsData.topCategories[0].value) * 100}%` }}
                ></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;