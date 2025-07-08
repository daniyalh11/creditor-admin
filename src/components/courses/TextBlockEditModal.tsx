
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

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

interface TextBlockEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: TextBlock | null;
  onSave: (block: TextBlock) => void;
}

export const TextBlockEditModal: React.FC<TextBlockEditModalProps> = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editContent, setEditContent] = useState(block?.content || {});

  React.useEffect(() => {
    if (block) {
      setEditContent(block.content);
    }
  }, [block]);

  const handleSave = () => {
    if (block) {
      onSave({ ...block, content: editContent });
      onOpenChange(false);
    }
  };

  const addTableRow = () => {
    if (editContent.tableData) {
      const newRows = [...editContent.tableData.rows, new Array(editContent.tableData.headers.length).fill('')];
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, rows: newRows }
      });
    }
  };

  const addTableColumn = () => {
    if (editContent.tableData) {
      const newHeaders = [...editContent.tableData.headers, 'New Header'];
      const newRows = editContent.tableData.rows.map(row => [...row, '']);
      setEditContent({
        ...editContent,
        tableData: { headers: newHeaders, rows: newRows }
      });
    }
  };

  const updateTableCell = (rowIndex: number, colIndex: number, value: string) => {
    if (editContent.tableData) {
      const newRows = [...editContent.tableData.rows];
      newRows[rowIndex][colIndex] = value;
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, rows: newRows }
      });
    }
  };

  const updateTableHeader = (index: number, value: string) => {
    if (editContent.tableData) {
      const newHeaders = [...editContent.tableData.headers];
      newHeaders[index] = value;
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, headers: newHeaders }
      });
    }
  };

  const removeTableRow = (index: number) => {
    if (editContent.tableData && editContent.tableData.rows.length > 1) {
      const newRows = editContent.tableData.rows.filter((_, i) => i !== index);
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, rows: newRows }
      });
    }
  };

  const removeTableColumn = (index: number) => {
    if (editContent.tableData && editContent.tableData.headers.length > 1) {
      const newHeaders = editContent.tableData.headers.filter((_, i) => i !== index);
      const newRows = editContent.tableData.rows.map(row => row.filter((_, i) => i !== index));
      setEditContent({
        ...editContent,
        tableData: { headers: newHeaders, rows: newRows }
      });
    }
  };

  if (!block) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Text Content</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {block.type === 'heading-paragraph' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Heading</label>
                <Input
                  value={editContent.heading || ''}
                  onChange={(e) => setEditContent({ ...editContent, heading: e.target.value })}
                  placeholder="Enter heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Paragraph</label>
                <Textarea
                  value={editContent.paragraph || ''}
                  onChange={(e) => setEditContent({ ...editContent, paragraph: e.target.value })}
                  placeholder="Enter paragraph content"
                  rows={4}
                />
              </div>
            </>
          )}

          {block.type === 'subheading-paragraph' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Subheading</label>
                <Input
                  value={editContent.subheading || ''}
                  onChange={(e) => setEditContent({ ...editContent, subheading: e.target.value })}
                  placeholder="Enter subheading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Paragraph</label>
                <Textarea
                  value={editContent.paragraph || ''}
                  onChange={(e) => setEditContent({ ...editContent, paragraph: e.target.value })}
                  placeholder="Enter paragraph content"
                  rows={4}
                />
              </div>
            </>
          )}

          {block.type === 'paragraph' && (
            <div>
              <label className="block text-sm font-medium mb-1">Paragraph</label>
              <Textarea
                value={editContent.paragraph || ''}
                onChange={(e) => setEditContent({ ...editContent, paragraph: e.target.value })}
                placeholder="Enter paragraph content"
                rows={4}
              />
            </div>
          )}

          {block.type === 'table' && editContent.tableData && (
            <div>
              <label className="block text-sm font-medium mb-1">Table</label>
              <div className="border rounded">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {editContent.tableData.headers.map((header, index) => (
                        <TableHead key={index} className="relative">
                          <div className="flex items-center gap-1">
                            <Input
                              value={header}
                              onChange={(e) => updateTableHeader(index, e.target.value)}
                              className="h-8 text-sm"
                            />
                            {editContent.tableData!.headers.length > 1 && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeTableColumn(index)}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editContent.tableData.rows.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <TableCell key={colIndex}>
                            <div className="flex items-center gap-1">
                              <Input
                                value={cell}
                                onChange={(e) => updateTableCell(rowIndex, colIndex, e.target.value)}
                                className="h-8 text-sm"
                              />
                              {colIndex === 0 && editContent.tableData!.rows.length > 1 && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeTableRow(rowIndex)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={addTableRow}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Row
                </Button>
                <Button size="sm" variant="outline" onClick={addTableColumn}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Column
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
