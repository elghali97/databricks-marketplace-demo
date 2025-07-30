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

const COLORS = ['#0891b2', '#0e7490', '#155e75', '#164e63', '#1e3a8a', '#1e40af', '#2563eb', '#3b82f6'];

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
    <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50 flex flex-col items-center justify-center h-64">
      <BarChart3 className="h-16 w-16 text-neutral-300 mb-4" />
      <h4 className="text-lg font-medium text-neutral-700 mb-2">{title}</h4>
      <p className="text-neutral-500 text-center mb-4">{description}</p>
      <button 
        onClick={onRequestAccess}
        className="px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
      >
        Request Access to View
      </button>
    </div>
  );

  const renderLoadingState = () => (
    <div className="border border-neutral-200 rounded-lg p-6 bg-white flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-neutral-600">Loading visualization data...</p>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Data Visualizations</h2>
        {userHasAccess && (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-secondary-600" />
            <span className="text-sm text-secondary-600 font-medium">Live Data Access</span>
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
              <div className="border border-neutral-200 rounded-lg p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Routes by Passenger Volume
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData.routeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [value.toLocaleString(), 'Passengers']}
                        labelFormatter={(label) => `Route: ${label}`}
                      />
                      <Bar dataKey="passengers" fill="#0891b2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Airport Distribution Pie Chart */}
                <div className="border border-neutral-200 rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Airport Traffic Distribution
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={processedData.airportPieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {processedData.airportPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [value.toLocaleString(), 'Passengers']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Load Factor Analysis */}
                <div className="border border-neutral-200 rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Load Factor Analysis
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={processedData.routeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="passengers" 
                          name="Passengers"
                          type="number"
                          domain={['dataMin', 'dataMax']}
                        />
                        <YAxis 
                          dataKey="loadFactor" 
                          name="Load Factor (%)"
                          type="number"
                          domain={[70, 100]}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                                  <p className="font-medium">{data.airport}</p>
                                  <p className="text-sm text-gray-600">Airline: {data.airline}</p>
                                  <p className="text-sm">Passengers: {data.passengers.toLocaleString()}</p>
                                  <p className="text-sm">Load Factor: {data.loadFactor}%</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Scatter dataKey="loadFactor" fill="#0891b2" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Time Series Trends */}
              {processedData.timeSeriesData.length > 1 && (
                <div className="border border-neutral-200 rounded-lg p-6 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <TrendingUp className="inline w-5 h-5 mr-2" />
                    Passenger Trends Over Time
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={processedData.timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date"
                          tickFormatter={(date) => new Date(date).toLocaleDateString()}
                        />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
                          formatter={(value: any, name: string) => [
                            typeof value === 'number' ? value.toLocaleString() : value, 
                            name === 'passengers' ? 'Total Passengers' : 'Avg Load Factor (%)'
                          ]}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="passengers" 
                          stroke="#0891b2" 
                          strokeWidth={3}
                          name="Total Passengers"
                          yAxisId="left"
                          dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="loadFactor" 
                          stroke="#dc2626" 
                          strokeWidth={3}
                          yAxisId="right"
                          name="Avg Load Factor (%)"
                          dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Data Source Indicator */}
              <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
                <div className="flex items-center text-secondary-800">
                  <Database className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    Real-time visualizations powered by backend API
                  </span>
                </div>
                <p className="text-sm text-secondary-600 mt-1">
                  Charts update automatically based on live data from your backend
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No visualization data available</p>
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