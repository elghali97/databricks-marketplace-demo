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
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" stroke="#E8E3DC" opacity={0.6} />
        <XAxis 
          dataKey={xKey} 
          tick={{ fontSize: 12, fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#5A544C', fontFamily: 'Inter, system-ui, sans-serif' }}
          axisLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
          tickLine={{ stroke: '#D5D0C7', strokeWidth: 1 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E8E3DC',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(19, 26, 41, 0.1), 0 4px 6px -2px rgba(19, 26, 41, 0.05)',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
          labelStyle={{ color: '#131A29', fontWeight: 600, marginBottom: '4px' }}
          itemStyle={{ color: '#2A3441', fontWeight: 500 }}
        />
        <Bar 
          dataKey={yKey} 
          fill={color}
          radius={[6, 6, 0, 0]}
          animationDuration={1200}
          animationBegin={200}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );

  if (minimal) {
    return chartContent;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-databricks border border-databricks-oat-medium hover:shadow-lg transition-shadow duration-300">
      {title && <h3 className="text-xl font-bold mb-6 text-databricks-navy-800 tracking-tight">{title}</h3>}
      <div className="h-72">
        {chartContent}
      </div>
    </div>
  );
};

export default BarChart;