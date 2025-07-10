import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';

export const TextBlockEditor = ({
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
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-4">
          {block.type === 'heading-paragraph' && (
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 break-words">{block.content.heading || 'Main Heading'}</h2>
              <p className="text-gray-700 break-words">{block.content.paragraph || 'Content paragraph goes here.'}</p>
            </div>
          )}

          {block.type === 'subheading-paragraph' && (
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-900 break-words">{block.content.subheading || 'Subheading'}</h4>
              <p className="text-gray-700 break-words">{block.content.paragraph || 'Content paragraph goes here.'}</p>
            </div>
          )}

          {block.type === 'paragraph' && (
            <p className="text-gray-700 break-words">{block.content.paragraph || 'This is a sample paragraph text that would appear in your lesson content.'}</p>
          )}

          {block.type === 'table' && block.content.tableData && (
            <div className="overflow-x-auto">
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
            </div>
          )}
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <Button size="sm" variant="ghost" onClick={onEdit} title="Edit content">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(block.id)} 
            title="Delete block"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Define prop types for runtime type checking
const tableDataPropTypes = PropTypes.shape({
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
});

const textBlockContentPropTypes = PropTypes.shape({
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.string,
  tableData: tableDataPropTypes,
});

TextBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['paragraph', 'heading-paragraph', 'subheading-paragraph', 'table']).isRequired,
    content: textBlockContentPropTypes.isRequired,
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
TextBlockEditor.defaultProps = {
  canMoveUp: false,
  canMoveDown: false,
};