
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ListBlock {
  id: string;
  type: 'list';
  style: 'bullet' | 'numbered' | 'checklist';
  content: {
    items: { text: string; checked?: boolean }[];
  };
}

interface ListEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: ListBlock | null;
  onSave: (block: ListBlock) => void;
}

export const ListEditModal: React.FC<ListEditModalProps> = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [style, setStyle] = useState<'bullet' | 'numbered' | 'checklist'>('bullet');
  const [items, setItems] = useState<{ text: string; checked?: boolean }[]>([]);

  useEffect(() => {
    if (block && block.content && block.content.items) {
      setStyle(block.style);
      setItems(block.content.items);
    } else {
      // Reset to default values when block is null or invalid
      setStyle('bullet');
      setItems([]);
    }
  }, [block]);

  const handleSave = () => {
    if (!block) return;

    const updatedBlock: ListBlock = {
      ...block,
      style,
      content: {
        items: items.filter(item => item.text.trim() !== '')
      }
    };

    onSave(updatedBlock);
    onOpenChange(false);
  };

  const addItem = () => {
    setItems([...items, { text: '', checked: false }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], text };
    setItems(newItems);
  };

  const toggleCheck = (index: number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], checked: !newItems[index].checked };
    setItems(newItems);
  };

  if (!block) return null;

  // Ensure items is always an array before rendering
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] mx-4 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Edit List</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">List Style</label>
            <Select value={style} onValueChange={(value: 'bullet' | 'numbered' | 'checklist') => setStyle(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bullet">Bullet List</SelectItem>
                <SelectItem value="numbered">Numbered List</SelectItem>
                <SelectItem value="checklist">Checklist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">List Items</label>
              <Button onClick={addItem} size="sm" className="h-8">
                <Plus className="h-3 w-3 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {safeItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move flex-shrink-0" />
                  
                  {style === 'checklist' && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-0 h-4 w-4 flex-shrink-0"
                      onClick={() => toggleCheck(index)}
                    >
                      <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                        item.checked 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300'
                      }`}>
                        {item.checked && (
                          <div className="w-2 h-1 border-l-2 border-b-2 border-white transform rotate-[-45deg] translate-x-[1px] translate-y-[-1px]"></div>
                        )}
                      </div>
                    </Button>
                  )}

                  <Input
                    value={item.text || ''}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder={`${style === 'checklist' ? 'Task' : 'Item'} ${index + 1}`}
                    className="flex-1 min-w-0"
                  />

                  <Button
                    onClick={() => removeItem(index)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8 text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            {safeItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No items yet. Click "Add Item" to get started.</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
