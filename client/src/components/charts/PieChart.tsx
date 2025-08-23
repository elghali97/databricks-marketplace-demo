import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface PieChartProps {
  data: any[];
  nameKey: string;
  valueKey: string;
  title?: string;
  colors?: string[];
  minimal?: boolean;
}

const DATABRICKS_COLORS = [
  '#FF3621', // Databricks Lava
  '#131A29', // Databricks Navy
  '#E8E3DC', // Databricks Oat
  '#5A544C', // Databricks Dark
  '#D5D0C7', // Databricks Medium
  '#F5F5F5', // Light Gray
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444'  // Red
];

const PieChart = ({ 
  data, 
  nameKey, 
  valueKey, 
  title,
  colors = DATABRICKS_COLORS,
  minimal = false
}: PieChartProps) => {
  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={minimal ? 80 : 100}
          dataKey={valueKey}
          animationDuration={1200}
          animationBegin={200}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
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
        <Legend 
          wrapperStyle={{
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#5A544C'
          }}
        />
      </RechartsPieChart>
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

export default PieChart;
