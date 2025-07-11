import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const AddBoxModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  onDelete,
  editingBox = null,
  mode = 'add'
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'edit' && editingBox) {
      setTitle(editingBox.title);
      setDescription(editingBox.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [mode, editingBox, isOpen]);

  const handleSave = () => {
    if (title.trim()) {
      if (mode === 'edit' && editingBox && onEdit) {
        onEdit({
          ...editingBox,
          title: title.trim(),
          description: description.trim()
        });
      } else {
        onSave({
          title: title.trim(),
          description: description.trim()
        });
      }
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleDelete = () => {
    if (editingBox && onDelete) {
      onDelete(editingBox.id);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Box' : 'Add New Box'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Box Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter box title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter box description..."
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            {mode === 'edit' && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};