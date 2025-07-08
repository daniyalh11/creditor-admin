
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AddModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (moduleData: { topic: string; description: string }) => void;
}

export const AddModuleDialog: React.FC<AddModuleDialogProps> = ({ 
  open, 
  onOpenChange, 
  onAdd 
}) => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && description.trim()) {
      onAdd({ topic: topic.trim(), description: description.trim() });
      setTopic('');
      setDescription('');
    }
  };

  const handleClose = () => {
    setTopic('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Module</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Module Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter module topic"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter module description"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Module
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
