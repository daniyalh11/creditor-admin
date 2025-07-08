
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import type { ChartsBlock } from '../types/blocks';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface ChartsBlockRendererProps {
  block: ChartsBlock;
}

export const ChartsBlockRenderer: React.FC<ChartsBlockRendererProps> = ({ block }) => {
  return (
    <div className="prose max-w-none">
      <div className="bg-white p-6 rounded-lg border">
        {block.content.title && (
          <h4 className="text-lg font-semibold mb-4 text-center">{block.content.title}</h4>
        )}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {block.style === 'bar' ? (
              <BarChart data={block.content.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            ) : block.style === 'pie' ? (
              <PieChart>
                <Pie
                  data={block.content.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ label, percent }) => `${label} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {block.content.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <LineChart data={block.content.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
