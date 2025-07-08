
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';

interface TextBlock {
  id: string;
  type: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table';
  content: {
    heading?: string;
    subheading?: string;
    paragraph?: string;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  };
}

interface TextBlockEditorProps {
  block: TextBlock;
  onUpdate: (block: TextBlock) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const TextBlockEditor: React.FC<TextBlockEditorProps> = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white group hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          {block.type === 'heading-paragraph' && (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{block.content.heading || 'Main Heading'}</h2>
              <p className="text-gray-700">{block.content.paragraph || 'Content paragraph goes here.'}</p>
            </>
          )}

          {block.type === 'subheading-paragraph' && (
            <>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{block.content.subheading || 'Subheading'}</h4>
              <p className="text-gray-700">{block.content.paragraph || 'Content paragraph goes here.'}</p>
            </>
          )}

          {block.type === 'paragraph' && (
            <p className="text-gray-700">{block.content.paragraph || 'This is a sample paragraph text that would appear in your lesson content.'}</p>
          )}

          {block.type === 'table' && block.content.tableData && (
            <Table>
              <TableHeader>
                <TableRow>
                  {block.content.tableData.headers.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {block.content.tableData.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <TableCell key={colIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
          <Button size="sm" variant="ghost" onClick={onEdit} title="Edit content">
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
