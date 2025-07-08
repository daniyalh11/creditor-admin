
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Box {
  id: string;
  title: string;
  description: string;
  dateAdded: string;
}

interface AddBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (box: Omit<Box, 'id' | 'dateAdded'>) => void;
}

export const AddBoxModal: React.FC<AddBoxModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim()
      });
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Box</DialogTitle>
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
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
