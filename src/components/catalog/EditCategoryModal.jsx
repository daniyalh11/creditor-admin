import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const EditCategoryModal = ({
  isOpen,
  onClose,
  onSave,
  category
}) => {
  const [name, setName] = useState(category?.name || '');
  const [visibilityFilter, setVisibilityFilter] = useState(category?.visibilityFilter || 'none');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setVisibilityFilter(category.visibilityFilter);
    }
  }, [category]);

  const handleSave = () => {
    if (name.trim() && category) {
      onSave({
        ...category,
        name: name.trim(),
        visibilityFilter
      });
      onClose();
    }
  };

  const handleCancel = () => {
    if (category) {
      setName(category.name);
      setVisibilityFilter(category.visibilityFilter);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
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