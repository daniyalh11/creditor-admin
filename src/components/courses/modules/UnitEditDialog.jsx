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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '../RichTextEditor';
import { ImageUpload } from '../ImageUpload';

export const UnitEditDialog = ({
  open,
  onOpenChange,
  unit,
  onSave
}) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    estimatedTime: 30,
    timeUnit: 'minutes',
    orderIndex: 1,
    isPublished: false,
    tags: []
  });

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (unit && open) {
      setFormData({
        ...unit,
        description: unit.description || '',
        estimatedTime: unit.estimatedTime || 30,
        timeUnit: unit.timeUnit || 'minutes',
        orderIndex: unit.orderIndex || 1,
        isPublished: unit.isPublished || false,
        tags: unit.tags || []
      });
    } else if (open && !unit) {
      setFormData({
        id: Date.now().toString(),
        title: '',
        description: '',
        image: '',
        estimatedTime: 30,
        timeUnit: 'minutes',
        orderIndex: 1,
        isPublished: false,
        tags: []
      });
    }
  }, [unit, open]);

  useEffect(() => {
    if (open) {
      const titleInput = document.getElementById('unit-title');
      if (titleInput) {
        setTimeout(() => titleInput.focus(), 100);
      }
    }
  }, [open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Unit title is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const element = document.getElementById('unit-title');
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
          <DialogTitle>{unit ? 'Edit Unit' : 'Create New Unit'}</DialogTitle>
          <DialogDescription>
            Configure the unit details and settings.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6 max-h-[calc(95vh-200px)]">
          <div className="space-y-6 pb-6">
            {/* Title */}
            <div>
              <Label htmlFor="unit-title">Unit Title *</Label>
              <Input
                id="unit-title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: undefined });
                }}
                placeholder="Enter unit title"
                className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <RichTextEditor
                value={formData.description || ''}
                onChange={(value) => setFormData({ ...formData, description: value })}
                placeholder="Enter unit description..."
              />
            </div>

            {/* Image */}
            <div>
              <Label>Unit Cover Image</Label>
              <ImageUpload
                currentImage={formData.image}
                onImageChange={(image) =>
                  setFormData({ ...formData, image: image || '' })
                }
              />
            </div>

            {/* Time Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unit-estimated-time">Estimated Time</Label>
                <Input
                  id="unit-estimated-time"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedTime: parseInt(e.target.value) || 0
                    })
                  }
                  placeholder="30"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="unit-time-unit">Time Unit</Label>
                <select
                  id="unit-time-unit"
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
              <Label htmlFor="unit-order-index">Order/Sequence Number</Label>
              <Input
                id="unit-order-index"
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

            {/* Visibility */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Visibility Status</Label>
                <p className="text-sm text-gray-600">
                  Make this unit visible to students
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

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t flex-shrink-0 bg-white">
          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            {unit ? 'Save Changes' : 'Create Unit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
