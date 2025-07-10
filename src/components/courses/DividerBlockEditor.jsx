import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Edit, Trash2, Minus, Play, Hash, Space } from 'lucide-react';

export const DividerBlockEditor = ({
  block,
  onUpdate,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const getDividerIcon = (type) => {
    switch (type) {
      case 'continue': return <Play className="h-4 w-4" />;
      case 'divider': return <Minus className="h-4 w-4" />;
      case 'number': return <Hash className="h-4 w-4" />;
      case 'space': return <Space className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const getDividerTypeName = (type) => {
    switch (type) {
      case 'continue': return 'Continue Button';
      case 'divider': return 'Horizontal Divider';
      case 'number': return 'Number Divider';
      case 'space': return 'Vertical Space';
      default: return 'Divider';
    }
  };

  const renderDivider = () => {
    switch (block.style) {
      case 'continue':
        return (
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {block.content.label || 'Continue'}
            </Button>
          </div>
        );

      case 'divider':
        return <hr className="border-gray-300" />;

      case 'number':
        return (
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {block.content.number || 1}
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        );

      case 'space':
        return <div className="h-12"></div>;

      default:
        return <hr className="border-gray-300" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            {getDividerIcon(block.style)}
          </div>
          <div>
            <h3 className="font-medium">{getDividerTypeName(block.style)}</h3>
            <p className="text-sm text-gray-600">
              {block.style === 'continue' && 'Interactive continue button'}
              {block.style === 'divider' && 'Visual content separator'}
              {block.style === 'number' && `Step ${block.content.number || 1} divider`}
              {block.style === 'space' && 'Vertical spacing element'}
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

      <div className="py-4">
        {renderDivider()}
      </div>
    </div>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
DividerBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['divider']).isRequired,
    style: PropTypes.oneOf(['continue', 'divider', 'number', 'space']).isRequired,
    content: PropTypes.shape({
      label: PropTypes.string,
      number: PropTypes.number,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
};