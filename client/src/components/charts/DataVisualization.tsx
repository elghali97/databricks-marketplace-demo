import React from 'react';
import { Dataset, DatasetCategory } from '../../types/dataset';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface DataVisualizationProps {
  dataset: Dataset;
}

// Generate realistic financial data based on dataset category
const generateFinancialData = (category: DatasetCategory, datasetId: string) => {
  const currentDate = new Date();
  const monthsBack = 12;
  
  switch (category) {
    case DatasetCategory.MARKET_TRADING:
      if (datasetId === '1' || datasetId === '2') {
        // Equity Intelligence Data
        const equityTimeSeriesData = Array.from({ length: monthsBack }, (_, i) => {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() - (monthsBack - 1 - i));
          return {
            month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            price: 150 + Math.sin(i * 0.5) * 20 + Math.random() * 15,
            volume: 1000000 + Math.random() * 500000,
            volatility: 15 + Math.random() * 10
          };
        });

        const sectorDistribution = [
          { name: 'Technology', value: 28, companies: 1680 },
          { name: 'Healthcare', value: 18, companies: 1080 },
          { name: 'Financial Services', value: 16, companies: 960 },
          { name: 'Consumer Discretionary', value: 14, companies: 840 },
          { name: 'Industrials', value: 12, companies: 720 },
          { name: 'Energy', value: 7, companies: 420 },
          { name: 'Materials', value: 5, companies: 300 }
        ];

        const performanceMetrics = [
          { metric: 'YTD Return', value: 12.5 },
          { metric: 'Sharpe Ratio', value: 1.8 },
          { metric: 'Max Drawdown', value: -8.2 },
          { metric: 'Beta', value: 1.1 },
          { metric: 'Alpha', value: 2.3 }
        ];

        return { equityTimeSeriesData, sectorDistribution, performanceMetrics };
      } else if (datasetId === '5') {
        // Fixed Income Data
        const yieldCurveData = [
          { maturity: '1M', yield: 4.2 },
          { maturity: '3M', yield: 4.5 },
          { maturity: '6M', yield: 4.7 },
          { maturity: '1Y', yield: 4.8 },
          { maturity: '2Y', yield: 4.6 },
          { maturity: '5Y', yield: 4.3 },
          { maturity: '10Y', yield: 4.1 },
          { maturity: '30Y', yield: 4.0 }
        ];

        const bondTypeDistribution = [
          { name: 'Government', value: 45, amount: 22.5 },
          { name: 'Corporate', value: 30, amount: 15.0 },
          { name: 'Municipal', value: 15, amount: 7.5 },
          { name: 'Agency', value: 10, amount: 5.0 }
        ];

        const creditSpreadData = Array.from({ length: monthsBack }, (_, i) => {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() - (monthsBack - 1 - i));
          return {
            month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            AAA: 0.8 + Math.random() * 0.2,
            AA: 1.2 + Math.random() * 0.3,
            A: 1.8 + Math.random() * 0.4,
            BBB: 2.5 + Math.random() * 0.5
          };
        });

        return { yieldCurveData, bondTypeDistribution, creditSpreadData };
      }
      break;

    case DatasetCategory.ESG_SUSTAINABILITY:
      const esgScoreDistribution = [
        { name: 'AAA', value: 8, companies: 240 },
        { name: 'AA', value: 15, companies: 450 },
        { name: 'A', value: 22, companies: 660 },
        { name: 'BBB', value: 25, companies: 750 },
        { name: 'BB', value: 18, companies: 540 },
        { name: 'B', value: 8, companies: 240 },
        { name: 'CCC', value: 4, companies: 120 }
      ];

      const esgTrendData = Array.from({ length: monthsBack }, (_, i) => {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - (monthsBack - 1 - i));
        return {
          month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          environmental: 65 + Math.sin(i * 0.3) * 5 + Math.random() * 8,
          social: 70 + Math.sin(i * 0.4) * 6 + Math.random() * 7,
          governance: 75 + Math.sin(i * 0.2) * 4 + Math.random() * 6
        };
      });

      const climateRiskData = [
        { sector: 'Energy', physicalRisk: 8.2, transitionRisk: 9.1 },
        { sector: 'Materials', physicalRisk: 7.5, transitionRisk: 6.8 },
        { sector: 'Utilities', physicalRisk: 6.9, transitionRisk: 8.7 },
        { sector: 'Industrials', physicalRisk: 5.8, transitionRisk: 5.9 },
        { sector: 'Technology', physicalRisk: 3.2, transitionRisk: 2.8 }
      ];

      return { esgScoreDistribution, esgTrendData, climateRiskData };

    case DatasetCategory.CUSTOMER_ANALYTICS:
      const customerSegments = [
        { name: 'High Value', value: 12, revenue: 45 },
        { name: 'Growing', value: 28, revenue: 32 },
        { name: 'Stable', value: 35, revenue: 18 },
        { name: 'At Risk', value: 25, revenue: 5 }
      ];

      const customerTrendData = Array.from({ length: monthsBack }, (_, i) => {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - (monthsBack - 1 - i));
        return {
          month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          newCustomers: 15000 + Math.random() * 5000,
          churnRate: 2.5 + Math.random() * 1.5,
          avgLifetimeValue: 8500 + Math.random() * 2000
        };
      });

      const engagementMetrics = [
        { channel: 'Mobile App', engagement: 78 },
        { channel: 'Online Banking', engagement: 92 },
        { channel: 'Branch', engagement: 45 },
        { channel: 'Phone', engagement: 38 },
        { channel: 'ATM', engagement: 85 }
      ];

      return { customerSegments, customerTrendData, engagementMetrics };

    default:
      return null;
  }
};

const DataVisualization: React.FC<DataVisualizationProps> = ({ dataset }) => {
  const data = generateFinancialData(dataset.category as DatasetCategory, dataset.id);

  if (!data) {
    return (
      <div className="bg-gradient-to-br from-databricks-oat-50 to-white p-8 rounded-xl border border-databricks-oat-medium">
        <div className="text-center">
          <Activity className="h-16 w-16 text-databricks-lava-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-databricks-navy-800 mb-2">
            Data Intelligence Coming Soon
          </h3>
          <p className="text-databricks-navy-600">
            Advanced visualizations are being prepared for this dataset category.
          </p>
        </div>
      </div>
    );
  }

  const renderEquityVisualizations = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={data.equityTimeSeriesData}
          xKey="month"
          yKey="price"
          title="Stock Price Trends (12 Months)"
          color="#FF3621"
        />
        <BarChart
          data={data.performanceMetrics}
          xKey="metric"
          yKey="value"
          title="Performance Metrics"
          color="#131A29"
        />
      </div>
      <PieChart
        data={data.sectorDistribution}
        nameKey="name"
        valueKey="value"
        title="Sector Distribution (% of Market Cap)"
      />
    </div>
  );

  const renderFixedIncomeVisualizations = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={data.yieldCurveData}
          xKey="maturity"
          yKey="yield"
          title="US Treasury Yield Curve"
          color="#FF3621"
        />
        <PieChart
          data={data.bondTypeDistribution}
          nameKey="name"
          valueKey="value"
          title="Bond Type Distribution"
        />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-databricks border border-databricks-oat-medium">
        <h3 className="text-xl font-bold mb-6 text-databricks-navy-800">Credit Spread Trends</h3>
        <div className="h-72">
          <LineChart
            data={data.creditSpreadData}
            xKey="month"
            yKey="BBB"
            title=""
            color="#FF3621"
            minimal={true}
          />
        </div>
      </div>
    </div>
  );

  const renderESGVisualizations = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={data.esgScoreDistribution}
          nameKey="name"
          valueKey="value"
          title="ESG Score Distribution"
        />
        <BarChart
          data={data.climateRiskData}
          xKey="sector"
          yKey="physicalRisk"
          title="Climate Risk by Sector"
          color="#10B981"
        />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-databricks border border-databricks-oat-medium">
        <h3 className="text-xl font-bold mb-6 text-databricks-navy-800">ESG Score Trends</h3>
        <div className="h-72">
          <LineChart
            data={data.esgTrendData}
            xKey="month"
            yKey="environmental"
            title=""
            color="#10B981"
            minimal={true}
          />
        </div>
      </div>
    </div>
  );

  const renderCustomerAnalyticsVisualizations = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={data.customerSegments}
          nameKey="name"
          valueKey="value"
          title="Customer Segments"
        />
        <BarChart
          data={data.engagementMetrics}
          xKey="channel"
          yKey="engagement"
          title="Channel Engagement Rates (%)"
          color="#3B82F6"
        />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-databricks border border-databricks-oat-medium">
        <h3 className="text-xl font-bold mb-6 text-databricks-navy-800">Customer Acquisition Trends</h3>
        <div className="h-72">
          <LineChart
            data={data.customerTrendData}
            xKey="month"
            yKey="newCustomers"
            title=""
            color="#3B82F6"
            minimal={true}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Visualization Header */}
      <div className="bg-gradient-to-r from-databricks-lava-50 to-databricks-navy-50 p-6 rounded-xl border border-databricks-lava-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-databricks-lava-600 mr-3" />
          <h2 className="text-2xl font-bold text-databricks-navy-800">
            AI-Powered Data Intelligence
          </h2>
        </div>
        <p className="text-databricks-navy-700 leading-relaxed">
          Interactive visualizations powered by Databricks' unified analytics platform. 
          Explore patterns, trends, and insights with real-time data processing and advanced ML analytics.
        </p>
      </div>

      {/* Dynamic Visualizations based on Dataset Category */}
      {dataset.category === DatasetCategory.MARKET_TRADING && 
       (dataset.id === '1' || dataset.id === '2') && renderEquityVisualizations()}
      
      {dataset.category === DatasetCategory.MARKET_TRADING && 
       dataset.id === '5' && renderFixedIncomeVisualizations()}
      
      {dataset.category === DatasetCategory.ESG_SUSTAINABILITY && renderESGVisualizations()}
      
      {dataset.category === DatasetCategory.CUSTOMER_ANALYTICS && renderCustomerAnalyticsVisualizations()}

      {/* Insights Panel */}
      <div className="bg-white p-6 rounded-xl shadow-databricks border border-databricks-oat-medium">
        <h3 className="text-xl font-bold mb-4 text-databricks-navy-800 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-databricks-lava-600" />
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-databricks-oat-50 p-4 rounded-lg">
            <h4 className="font-semibold text-databricks-navy-800 mb-2">Data Quality</h4>
            <p className="text-sm text-databricks-navy-600">
              {dataset.qualityScore}% quality score with comprehensive validation and cleansing
            </p>
          </div>
          <div className="bg-databricks-lava-50 p-4 rounded-lg">
            <h4 className="font-semibold text-databricks-navy-800 mb-2">Update Frequency</h4>
            <p className="text-sm text-databricks-navy-600">
              {dataset.frequency === 'REAL_TIME' ? 'Real-time' : 
               dataset.frequency === 'DAILY' ? 'Daily' : 
               dataset.frequency === 'MONTHLY' ? 'Monthly' : 'Quarterly'} updates
            </p>
          </div>
          <div className="bg-databricks-navy-50 p-4 rounded-lg">
            <h4 className="font-semibold text-databricks-navy-800 mb-2">Usage Analytics</h4>
            <p className="text-sm text-databricks-navy-600">
              {dataset.downloadCount.toLocaleString()} downloads, {dataset.rating}/5 rating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
