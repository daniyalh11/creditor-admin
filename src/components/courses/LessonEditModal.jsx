import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const LessonEditModal = ({
  open,
  onOpenChange,
  lesson,
  onUpdate,
  onDelete
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    content: ''
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || '',
        description: lesson.description || '',
        duration: lesson.duration || '15 min',
        content: lesson.content || ''
      });
    }
  }, [lesson]);

  const handleUpdate = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Lesson title is required.",
        variant: "destructive"
      });
      return;
    }

    onUpdate({
      ...lesson,
      ...formData
    });

    toast({
      title: "Success",
      description: "Lesson updated successfully.",
    });

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (lesson) {
      onDelete(lesson.id);
      toast({
        title: "Success",
        description: "Lesson deleted successfully.",
      });
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Lesson Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter lesson title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter lesson description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="e.g., 15 min"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Enter lesson content"
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Update Lesson
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add prop-types for runtime validation in JavaScript
LessonEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  lesson: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};