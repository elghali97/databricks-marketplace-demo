import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';
import { CheckCircle, Database, TrendingUp, BarChart3 } from 'lucide-react';
import { SampleDataRow } from '../../services/databricksService';
import { Dataset } from '../../types/dataset';

interface DataVisualizationPreviewProps {
  data: SampleDataRow[];
  dataset: Dataset;
  loading: boolean;
  userHasAccess: boolean;
  onRequestAccess: () => void;
}

const COLORS = [
  '#FF3621', // Databricks Lava
  '#E73016', // Darker Lava
  '#FF7F6B', // Light Lava
  '#131A29', // Databricks Navy
  '#2A3441', // Medium Navy
  '#4A5568', // Light Navy
  '#FF8F73', // Soft Lava
  '#FFB5A3'  // Pale Lava
];

export const DataVisualizationPreview: React.FC<DataVisualizationPreviewProps> = ({
  data,
  dataset,
  loading,
  userHasAccess,
  onRequestAccess
}) => {
  // Process data for different chart types
  const processedData = React.useMemo(() => {
    if (!data || data.length === 0) return null;

    // Top routes by passenger volume
    const routeData = data.map((row, index) => ({
      name: `${row.airport}-${row.airline}`,
      passengers: row.passengers,
      loadFactor: row.load_factor,
      airport: row.airport,
      airline: row.airline
    })).sort((a, b) => b.passengers - a.passengers).slice(0, 8);

    // Airport distribution
    const airportData = data.reduce((acc, row) => {
      acc[row.airport] = (acc[row.airport] || 0) + row.passengers;
      return acc;
    }, {} as Record<string, number>);

    const airportPieData = Object.entries(airportData)
      .map(([airport, passengers]) => ({
        name: airport,
        value: passengers
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    // Time series data
    const timeData = data.reduce((acc, row) => {
      const date = row.date;
      if (!acc[date]) {
        acc[date] = { date, passengers: 0, loadFactor: 0, count: 0 };
      }
      acc[date].passengers += row.passengers;
      acc[date].loadFactor += row.load_factor;
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, any>);

    const timeSeriesData = Object.values(timeData)
      .map((item: any) => ({
        ...item,
        loadFactor: Math.round(item.loadFactor / item.count * 10) / 10
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      routeData,
      airportPieData,
      timeSeriesData
    };
  }, [data]);

  const renderAccessDeniedPlaceholder = (title: string, description: string) => (
    <div className="border border-databricks-oat-medium rounded-xl p-8 bg-gradient-to-br from-neutral-50 to-databricks-oat-light flex flex-col items-center justify-center h-80">
      <BarChart3 className="h-20 w-20 text-databricks-oat-dark mb-6" />
      <h4 className="text-xl font-bold text-databricks-navy-800 mb-3 tracking-tight">{title}</h4>
      <p className="text-databricks-navy-600 text-center mb-6 max-w-sm">{description}</p>
      <button 
        onClick={onRequestAccess}
        className="px-6 py-3 bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 text-white font-semibold rounded-lg hover:from-databricks-lava-700 hover:to-databricks-lava-800 transition-all duration-200 shadow-lg"
      >
        Request Access to View
      </button>
    </div>
  );

  const renderLoadingState = () => (
    <div className="border border-databricks-oat-medium rounded-xl p-8 bg-white flex flex-col items-center justify-center h-80">
      <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-databricks-lava-600 mb-6"></div>
      <p className="text-databricks-navy-600 font-medium">Loading visualization data...</p>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-databricks border border-databricks-oat-medium">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-databricks-navy-800 tracking-tight">Data Intelligence Visualizations</h2>
        {userHasAccess && (
          <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-success-50 to-success-100 rounded-lg border border-success-200">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <span className="text-sm text-success-800 font-semibold">Live Data Access</span>
          </div>
        )}
      </div>

      {userHasAccess ? (
        <>
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>{renderLoadingState()}</div>
              ))}
            </div>
          ) : processedData ? (
            <div className="space-y-8">
              {/* Top Routes Bar Chart */}
              <div className="border border-databricks-oat-medium rounded-xl p-8 bg-gradient-to-br from-white to-neutral-50 shadow-sm">
                <h3 className="text-xl font-bold text-databricks-navy-800 mb-6 tracking-tight">
                  Market Leaders by Transaction Volume
                </h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData.routeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#E8E3DC" opacity={0.6} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                        tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                        axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                      />
                      <YAxis 
                        tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                        axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                      />
                      <Tooltip 
                        formatter={(value: any) => [value.toLocaleString(), 'Transactions']}
                        labelFormatter={(label) => `Market: ${label}`}
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E8E3DC',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px -5px rgba(19, 26, 41, 0.1)',
                          fontFamily: 'Inter, system-ui, sans-serif'
                        }}
                        labelStyle={{ color: '#131A29', fontWeight: 600 }}
                        itemStyle={{ color: '#2A3441', fontWeight: 500 }}
                      />
                      <Bar dataKey="passengers" fill="#FF3621" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Market Distribution Pie Chart */}
                <div className="border border-databricks-oat-medium rounded-xl p-8 bg-gradient-to-br from-white to-neutral-50 shadow-sm">
                  <h3 className="text-xl font-bold text-databricks-navy-800 mb-6 tracking-tight">
                    Market Share Distribution
                  </h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={processedData.airportPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          strokeWidth={2}
                          stroke="#FFFFFF"
                        >
                          {processedData.airportPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => [value.toLocaleString(), 'Volume']} 
                          contentStyle={{ 
                            backgroundColor: '#FFFFFF', 
                            border: '1px solid #E8E3DC',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px -5px rgba(19, 26, 41, 0.1)',
                            fontFamily: 'Inter, system-ui, sans-serif'
                          }}
                          labelStyle={{ color: '#131A29', fontWeight: 600 }}
                          itemStyle={{ color: '#2A3441', fontWeight: 500 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Risk Factor Analysis */}
                <div className="border border-databricks-oat-medium rounded-xl p-8 bg-gradient-to-br from-white to-neutral-50 shadow-sm">
                  <h3 className="text-xl font-bold text-databricks-navy-800 mb-6 tracking-tight">
                    Risk Factor Analysis
                  </h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={processedData.routeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#E8E3DC" opacity={0.6} />
                        <XAxis 
                          dataKey="passengers" 
                          name="Volume"
                          type="number"
                          domain={['dataMin', 'dataMax']}
                          tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        />
                        <YAxis 
                          dataKey="loadFactor" 
                          name="Risk Score (%)"
                          type="number"
                          domain={[70, 100]}
                          tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '2 2', stroke: '#FF3621' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-4 border border-databricks-oat-medium rounded-lg shadow-lg">
                                  <p className="font-bold text-databricks-navy-800">{data.airport}</p>
                                  <p className="text-sm text-databricks-navy-600">Institution: {data.airline}</p>
                                  <p className="text-sm">Volume: {data.passengers.toLocaleString()}</p>
                                  <p className="text-sm">Risk Score: {data.loadFactor}%</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter dataKey="loadFactor" fill="#FF3621" stroke="#E73016" strokeWidth={1} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Time Series Trends */}
              {processedData.timeSeriesData.length > 1 && (
                <div className="border border-databricks-oat-medium rounded-xl p-8 bg-gradient-to-br from-white to-neutral-50 shadow-sm">
                  <h3 className="text-xl font-bold text-databricks-navy-800 mb-6 tracking-tight">
                    <TrendingUp className="inline w-6 h-6 mr-3 text-databricks-lava-600" />
                    Performance Trends Over Time
                  </h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={processedData.timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#E8E3DC" opacity={0.6} />
                        <XAxis 
                          dataKey="date"
                          tickFormatter={(date) => new Date(date).toLocaleDateString()}
                          tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        />
                        <YAxis 
                          yAxisId="left" 
                          tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          tick={{ fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
                          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
                        />
                        <Tooltip 
                          labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
                          formatter={(value: any, name: string) => [
                            typeof value === 'number' ? value.toLocaleString() : value, 
                            name === 'passengers' ? 'Total Volume' : 'Performance Score (%)'
                          ]}
                          contentStyle={{ 
                            backgroundColor: '#FFFFFF', 
                            border: '1px solid #E8E3DC',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px -5px rgba(19, 26, 41, 0.1)',
                            fontFamily: 'Inter, system-ui, sans-serif'
                          }}
                          labelStyle={{ color: '#131A29', fontWeight: 600 }}
                          itemStyle={{ color: '#2A3441', fontWeight: 500 }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="passengers" 
                          stroke="#FF3621" 
                          strokeWidth={3}
                          name="Total Volume"
                          yAxisId="left"
                          dot={{ fill: '#FF3621', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, stroke: '#FF3621', strokeWidth: 2, fill: '#FFFFFF' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="loadFactor" 
                          stroke="#131A29" 
                          strokeWidth={3}
                          yAxisId="right"
                          name="Performance Score (%)"
                          dot={{ fill: '#131A29', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, stroke: '#131A29', strokeWidth: 2, fill: '#FFFFFF' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Data Source Indicator */}
              <div className="mt-8 p-6 bg-gradient-to-r from-databricks-lava-50 to-databricks-lava-100 border border-databricks-lava-200 rounded-xl">
                <div className="flex items-center text-databricks-lava-800">
                  <Database className="h-6 w-6 mr-3 text-databricks-lava-600" />
                  <span className="font-bold text-lg">
                    Real-time Intelligence powered by Databricks
                  </span>
                </div>
                <p className="text-sm text-databricks-lava-700 mt-2 font-medium">
                  Advanced analytics and visualizations update automatically from live data streams
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-databricks-navy-600 text-lg font-medium">No visualization data available</p>
              <p className="text-databricks-navy-500 text-sm mt-2">Connect your data source to see intelligence insights</p>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderAccessDeniedPlaceholder(
            "Route Analytics",
            "Interactive charts showing top routes and performance metrics"
          )}
          {renderAccessDeniedPlaceholder(
            "Market Intelligence", 
            "Distribution analysis and trend visualizations"
          )}
        </div>
      )}
    </div>
  );
}; 