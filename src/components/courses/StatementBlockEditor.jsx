import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';

export const StatementBlockEditor = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false
}) => {
  const getStatementClassName = (style) => {
    switch (style) {
      case 'italic':
        return 'italic text-blue-600';
      case 'bold':
        return 'font-bold text-gray-900';
      case 'caps':
        return 'uppercase font-medium text-gray-700 tracking-wide';
      case 'highlighted':
        return 'bg-yellow-100 px-3 py-2 rounded font-medium text-gray-900 inline-block';
      default:
        // 'simple' or any other default style
        return 'text-gray-800'; 
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white group hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className={`${getStatementClassName(block.style)}`}>
            {block.content.text || 'This is an important statement.'}
          </div>
        </div>
        
        <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onMoveUp && (
            <Button size="sm" variant="ghost" onClick={onMoveUp} disabled={!canMoveUp} title="Move up">
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button size="sm" variant="ghost" onClick={onMoveDown} disabled={!canMoveDown} title="Move down">
              <ArrowDown className="h-4 w-4" />
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={onEdit} title="Edit statement">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(block.id)} 
            title="Delete block"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Define prop types for runtime type checking
StatementBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['statement']).isRequired,
    style: PropTypes.oneOf(['italic', 'bold', 'caps', 'highlighted']).isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
};

// Default props for optional booleans
StatementBlockEditor.defaultProps = {
  canMoveUp: false,
  canMoveDown: false,
};