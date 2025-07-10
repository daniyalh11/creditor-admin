import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';

export const ListBlockEditor = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false
}) => {
  const renderList = () => {
    switch (block.style) {
      case 'bullet':
        return (
          <div className="space-y-2">
            {block.content.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-gray-700">{item.text || `List item ${index + 1}`}</span>
              </div>
            ))}
          </div>
        );
      case 'numbered':
        return (
          <div className="space-y-2">
            {block.content.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{item.text || `Item ${index + 1}`}</span>
              </div>
            ))}
          </div>
        );
      case 'checklist':
        return (
          <div className="space-y-2">
            {block.content.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-4 h-4 border rounded flex items-center justify-center flex-shrink-0 ${
                  item.checked 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                }`}>
                  {item.checked && (
                    <div className="w-2 h-1 border-l-2 border-b-2 border-white transform rotate-[-45deg] translate-x-[1px] translate-y-[-1px]"></div>
                  )}
                </div>
                <span className="text-gray-700">{item.text || `Task item ${index + 1}`}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white group hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          {renderList()}
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {canMoveUp && (
            <Button size="sm" variant="ghost" onClick={onMoveUp} title="Move up">
              <ArrowUp className="h-3 w-3" />
            </Button>
          )}
          {canMoveDown && (
            <Button size="sm" variant="ghost" onClick={onMoveDown} title="Move down">
              <ArrowDown className="h-3 w-3" />
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={onEdit} title="Edit list">
            <Edit2 className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(block.id)} title="Delete block">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Add prop-types for runtime validation in JavaScript
ListBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['list']).isRequired,
    style: PropTypes.oneOf(['bullet', 'numbered', 'checklist']).isRequired,
    content: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      })).isRequired,
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