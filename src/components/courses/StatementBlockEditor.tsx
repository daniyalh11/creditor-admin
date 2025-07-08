
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';

interface StatementBlock {
  id: string;
  type: 'statement';
  style: 'italic' | 'bold' | 'caps' | 'highlighted';
  content: {
    text: string;
  };
}

interface StatementBlockEditorProps {
  block: StatementBlock;
  onUpdate: (block: StatementBlock) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const StatementBlockEditor: React.FC<StatementBlockEditorProps> = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false
}) => {
  const getStatementClassName = (style: string) => {
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
        return '';
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white group hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className={`${getStatementClassName(block.style)}`}>
            {block.content.text || 'This is an important statement.'}
          </div>
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
          <Button size="sm" variant="ghost" onClick={onEdit} title="Edit statement">
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
