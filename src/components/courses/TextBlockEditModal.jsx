import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label'; // Assuming Label component is available

export const TextBlockEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editContent, setEditContent] = useState(block?.content || {});

  useEffect(() => {
    if (block) {
      setEditContent(block.content);
    } else {
      setEditContent({});
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

  const updateTableCell = (rowIndex, colIndex, value) => {
    if (editContent.tableData) {
      const newRows = [...editContent.tableData.rows];
      newRows[rowIndex][colIndex] = value;
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, rows: newRows }
      });
    }
  };

  const updateTableHeader = (index, value) => {
    if (editContent.tableData) {
      const newHeaders = [...editContent.tableData.headers];
      newHeaders[index] = value;
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, headers: newHeaders }
      });
    }
  };

  const removeTableRow = (index) => {
    if (editContent.tableData && editContent.tableData.rows.length > 1) {
      const newRows = editContent.tableData.rows.filter((_, i) => i !== index);
      setEditContent({
        ...editContent,
        tableData: { ...editContent.tableData, rows: newRows }
      });
    }
  };

  const removeTableColumn = (index) => {
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
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Text Content</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {block.type === 'heading-paragraph' && (
            <>
              <div>
                <Label htmlFor="heading" className="block text-sm font-medium mb-1">Heading</Label>
                <Input
                  id="heading"
                  value={editContent.heading || ''}
                  onChange={(e) => setEditContent({ ...editContent, heading: e.target.value })}
                  placeholder="Enter heading"
                />
              </div>
              <div>
                <Label htmlFor="paragraph-hp" className="block text-sm font-medium mb-1">Paragraph</Label>
                <Textarea
                  id="paragraph-hp"
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
                <Label htmlFor="subheading" className="block text-sm font-medium mb-1">Subheading</Label>
                <Input
                  id="subheading"
                  value={editContent.subheading || ''}
                  onChange={(e) => setEditContent({ ...editContent, subheading: e.target.value })}
                  placeholder="Enter subheading"
                />
              </div>
              <div>
                <Label htmlFor="paragraph-sp" className="block text-sm font-medium mb-1">Paragraph</Label>
                <Textarea
                  id="paragraph-sp"
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
              <Label htmlFor="paragraph-p" className="block text-sm font-medium mb-1">Paragraph</Label>
              <Textarea
                id="paragraph-p"
                value={editContent.paragraph || ''}
                onChange={(e) => setEditContent({ ...editContent, paragraph: e.target.value })}
                placeholder="Enter paragraph content"
                rows={8}
              />
            </div>
          )}

          {block.type === 'table' && editContent.tableData && (
            <div>
              <Label className="block text-sm font-medium mb-2">Table Content</Label>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {editContent.tableData.headers.map((header, index) => (
                        <TableHead key={index} className="relative p-2">
                          <div className="flex items-center gap-1">
                            <Input
                              value={header}
                              onChange={(e) => updateTableHeader(index, e.target.value)}
                              className="h-8 text-sm"
                              placeholder={`Header ${index + 1}`}
                            />
                            {editContent.tableData.headers.length > 1 && (
                              <Button size="icon" variant="ghost" onClick={() => removeTableColumn(index)} className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
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
                          <TableCell key={colIndex} className="p-2">
                            <Input value={cell} onChange={(e) => updateTableCell(rowIndex, colIndex, e.target.value)} className="h-8 text-sm" placeholder="Enter data..."/>
                          </TableCell>
                        ))}
                        <TableCell className="p-2 w-12">
                            {editContent.tableData.rows.length > 1 && (
                                <Button size="icon" variant="ghost" onClick={() => removeTableRow(rowIndex)} className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={addTableRow}><Plus className="h-3 w-3 mr-1" />Add Row</Button>
                <Button size="sm" variant="outline" onClick={addTableColumn}><Plus className="h-3 w-3 mr-1" />Add Column</Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
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

TextBlockEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['paragraph', 'heading-paragraph', 'subheading-paragraph', 'table']).isRequired,
    content: textBlockContentPropTypes.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};