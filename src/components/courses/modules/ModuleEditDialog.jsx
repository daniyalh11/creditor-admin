import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export const ModuleEditDialog = ({
  open,
  onOpenChange,
  module,
  onSave
}) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    topic: '',
    description: '',
    image: '',
    estimatedTime: 60,
    timeUnit: 'minutes',
    orderIndex: 1,
    isPublished: false,
    tags: []
  });

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (module && open) {
      setFormData({
        ...module,
        title: module.title || module.topic || '',
        topic: module.topic || module.title || '',
        estimatedTime: module.estimatedTime || 60,
        timeUnit: module.timeUnit || 'minutes',
        orderIndex: module.orderIndex || 1,
        isPublished: module.isPublished || false,
        tags: module.tags || []
      });
    } else if (open && !module) {
      setFormData({
        id: Date.now().toString(),
        title: '',
        topic: '',
        description: '',
        image: '',
        estimatedTime: 60,
        timeUnit: 'minutes',
        orderIndex: 1,
        isPublished: false,
        tags: []
      });
    }
  }, [module, open]);

  useEffect(() => {
    if (open) {
      const titleInput = document.getElementById('module-title');
      if (titleInput) {
        setTimeout(() => titleInput.focus(), 100);
      }
    }
  }, [open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim() && !formData.topic?.trim()) {
      newErrors.title = 'Module title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(`module-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const moduleToSave = {
      ...formData,
      topic: formData.title || formData.topic || '',
      title: formData.title || formData.topic || ''
    };

    onSave(moduleToSave);
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

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] sm:w-full flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{module ? 'Edit Module' : 'Create New Module'}</DialogTitle>
          <DialogDescription>
            Configure the module details, content, and settings.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6 max-h-[calc(95vh-200px)]">
          <div className="space-y-6 pb-6">
            {/* Module Title */}
            <div>
              <Label htmlFor="module-title">Module Title *</Label>
              <Input
                id="module-title"
                value={formData.title || formData.topic || ''}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value, topic: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: undefined });
                }}
                placeholder="Enter module title"
                className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Module Description */}
            <div>
              <Label htmlFor="module-description">Description *</Label>
              <Textarea
                id="module-description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: undefined });
                }}
                placeholder="Enter module description..."
                rows={4}
                className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Estimated Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estimated-time">Estimated Time</Label>
                <Input
                  id="estimated-time"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedTime: parseInt(e.target.value) || 0
                    })
                  }
                  placeholder="60"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="time-unit">Time Unit</Label>
                <select
                  id="time-unit"
                  value={formData.timeUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, timeUnit: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>

            {/* Order Index */}
            <div>
              <Label htmlFor="order-index">Order/Sequence Number</Label>
              <Input
                id="order-index"
                type="number"
                value={formData.orderIndex}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orderIndex: parseInt(e.target.value) || 1
                  })
                }
                placeholder="1"
                className="mt-1"
                min="1"
              />
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Visibility Status</Label>
                <p className="text-sm text-gray-600">
                  Make this module visible to students
                </p>
              </div>
              <Switch
                checked={formData.isPublished}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPublished: checked })
                }
              />
            </div>

            {/* Tags */}
            <div>
              <Label>Tags / Categories</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTag())
                  }
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Sticky Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t flex-shrink-0 bg-white">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            {module ? 'Save Changes' : 'Create Module'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
