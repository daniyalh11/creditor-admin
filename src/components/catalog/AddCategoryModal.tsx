
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: number;
  name: string;
  visibilityFilter: string;
}

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'>) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('none');

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        visibilityFilter
      });
      setName('');
      setVisibilityFilter('none');
      onClose();
    }
  };

  const handleCancel = () => {
    setName('');
    setVisibilityFilter('none');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visibilityFilter">Visibility Filter</Label>
            <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select visibility filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
