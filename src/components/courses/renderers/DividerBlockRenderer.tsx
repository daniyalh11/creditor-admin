
import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { DividerBlock } from '../types/blocks';

interface DividerBlockRendererProps {
  block: DividerBlock;
}

export const DividerBlockRenderer: React.FC<DividerBlockRendererProps> = ({ block }) => {
  switch (block.style) {
    case 'continue':
      return (
        <div className="flex justify-center py-8">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            {block.content.label || 'Continue'}
          </Badge>
        </div>
      );
    case 'divider':
      return <hr className="my-8 border-gray-300" />;
    case 'number':
      return (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            {block.content.number || 1}
          </div>
        </div>
      );
    case 'space':
      return <div className="py-8"></div>;
    default:
      return <hr className="my-8 border-gray-300" />;
  }
};
