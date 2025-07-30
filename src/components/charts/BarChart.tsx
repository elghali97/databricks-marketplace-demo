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
  color = '#FF3621', // Databricks Lava
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
          tick={{ fontSize: 12, fill: '#5A544C' }}
          axisLine={{ stroke: '#E8E3DC' }}
          tickLine={{ stroke: '#E8E3DC' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#5A544C' }}
          axisLine={{ stroke: '#E8E3DC' }}
          tickLine={{ stroke: '#E8E3DC' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #E8E3DC',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px -5px rgba(19, 26, 41, 0.15)',
            fontSize: '12px'
          }}
          labelStyle={{ color: '#131A29', fontWeight: 500 }}
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
    <div className="bg-white p-4 rounded-lg shadow-card border border-databricks-oat-medium">
      {title && <h3 className="text-lg font-semibold mb-4 text-databricks-navy-800">{title}</h3>}
      <div className="h-64">
        {chartContent}
      </div>
    </div>
  );
};

export default BarChart;