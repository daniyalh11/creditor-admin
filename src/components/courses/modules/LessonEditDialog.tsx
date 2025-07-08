
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '../RichTextEditor';
import { ImageUpload } from '../ImageUpload';

interface Lesson {
  id: string;
  title: string;
  description?: string;
  image?: string;
  estimatedTime?: number;
  timeUnit?: 'minutes' | 'hours';
  orderIndex?: number;
  isPublished?: boolean;
  tags?: string[];
}

interface LessonEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson?: Lesson | null;
  onSave: (lesson: Lesson) => void;
}

export const LessonEditDialog: React.FC<LessonEditDialogProps> = ({
  open,
  onOpenChange,
  lesson,
  onSave
}) => {
  const [formData, setFormData] = useState<Lesson>({
    id: '',
    title: '',
    description: '',
    image: '',
    estimatedTime: 15,
    timeUnit: 'minutes',
    orderIndex: 1,
    isPublished: false,
    tags: []
  });
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (lesson && open) {
      setFormData({
        ...lesson,
        description: lesson.description || '',
        estimatedTime: lesson.estimatedTime || 15,
        timeUnit: lesson.timeUnit || 'minutes',
        orderIndex: lesson.orderIndex || 1,
        isPublished: lesson.isPublished || false,
        tags: lesson.tags || []
      });
    } else if (open && !lesson) {
      setFormData({
        id: Date.now().toString(),
        title: '',
        description: '',
        image: '',
        estimatedTime: 15,
        timeUnit: 'minutes',
        orderIndex: 1,
        isPublished: false,
        tags: []
      });
    }
  }, [lesson, open]);

  useEffect(() => {
    if (open) {
      const titleInput = document.getElementById('lesson-title');
      if (titleInput) {
        setTimeout(() => titleInput.focus(), 100);
      }
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: { title?: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Lesson title is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const element = document.getElementById('lesson-title');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    setTagInput('');
    onOpenChange(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] sm:w-full flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{lesson ? 'Edit Lesson' : 'Create New Lesson'}</DialogTitle>
          <DialogDescription>
            Configure the lesson details and content.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6 max-h-[calc(95vh-200px)]">
          <div className="space-y-6 pb-6">
            <div>
              <Label htmlFor="lesson-title">Lesson Title *</Label>
              <Input
                id="lesson-title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({...formData, title: e.target.value});
                  if (errors.title) setErrors({...errors, title: undefined});
                }}
                placeholder="Enter lesson title"
                className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <RichTextEditor
                value={formData.description || ''}
                onChange={(value) => setFormData({...formData, description: value})}
                placeholder="Enter lesson description..."
              />
            </div>

            <div>
              <Label>Lesson Cover Image</Label>
              <ImageUpload
                currentImage={formData.image}
                onImageChange={(image) => setFormData({...formData, image: image || ''})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lesson-estimated-time">Estimated Time</Label>
                <Input
                  id="lesson-estimated-time"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({...formData, estimatedTime: parseInt(e.target.value) || 0})}
                  placeholder="15"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lesson-time-unit">Time Unit</Label>
                <select
                  id="lesson-time-unit"
                  value={formData.timeUnit}
                  onChange={(e) => setFormData({...formData, timeUnit: e.target.value as 'minutes' | 'hours'})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="lesson-order-index">Order/Sequence Number</Label>
              <Input
                id="lesson-order-index"
                type="number"
                value={formData.orderIndex}
                onChange={(e) => setFormData({...formData, orderIndex: parseInt(e.target.value) || 1})}
                placeholder="1"
                className="mt-1"
                min="1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Visibility Status</Label>
                <p className="text-sm text-gray-600">Make this lesson visible to students</p>
              </div>
              <Switch
                checked={formData.isPublished}
                onCheckedChange={(checked) => setFormData({...formData, isPublished: checked})}
              />
            </div>

            <div>
              <Label>Tags / Categories</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t flex-shrink-0 bg-white">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            {lesson ? 'Save Changes' : 'Create Lesson'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
