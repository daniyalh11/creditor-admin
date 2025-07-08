
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Edit, Trash2, BarChart3, PieChart, LineChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line, Pie } from 'recharts';

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartsBlock {
  id: string;
  type: 'charts';
  style: 'bar' | 'pie' | 'line';
  content: {
    title?: string;
    data: ChartDataPoint[];
  };
}

interface ChartsBlockEditorProps {
  block: ChartsBlock;
  onUpdate: (block: ChartsBlock) => void;
  onDelete: (blockId: string) => void;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const BLUE_COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#1E40AF', '#2563EB'];

export const ChartsBlockEditor: React.FC<ChartsBlockEditorProps> = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar': return <BarChart3 className="h-4 w-4" />;
      case 'pie': return <PieChart className="h-4 w-4" />;
      case 'line': return <LineChart className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getChartTypeName = (type: string) => {
    switch (type) {
      case 'bar': return 'Bar Chart';
      case 'pie': return 'Pie Chart';
      case 'line': return 'Line Chart';
      default: return 'Chart';
    }
  };

  const renderChart = () => {
    if (!block.content.data || block.content.data.length === 0) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-2">{getChartIcon(block.style)}</div>
          <p className="text-gray-500">No chart data available</p>
        </div>
      );
    }

    const chartData = block.content.data.map(point => ({
      name: point.label,
      value: point.value
    }));

    switch (block.style) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie 
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            {getChartIcon(block.style)}
          </div>
          <div>
            <h3 className="font-medium">{getChartTypeName(block.style)}</h3>
            <p className="text-sm text-gray-600">
              {block.content.title || `${block.content.data?.length || 0} data points`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="h-8 w-8 p-0"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="h-8 w-8 p-0"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(block.id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {block.content.title && (
          <h4 className="text-lg font-semibold">{block.content.title}</h4>
        )}
        
        {renderChart()}
      </div>
    </div>
  );
};
