import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
  minimal?: boolean;
}

const BarChart = ({ 
  data, 
  xKey, 
  yKey, 
  title,
  color = '#4F46E5',
  minimal = false
}: BarChartProps) => {
  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
        <XAxis 
          dataKey={xKey} 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#d1d5db' }}
          tickLine={{ stroke: '#d1d5db' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#d1d5db' }}
          tickLine={{ stroke: '#d1d5db' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            fontSize: '12px'
          }}
          labelStyle={{ color: '#374151', fontWeight: 500 }}
        />
        <Bar 
          dataKey={yKey} 
          fill={color}
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );

  if (minimal) {
    return chartContent;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="h-64">
        {chartContent}
      </div>
    </div>
  );
};

export default BarChart;