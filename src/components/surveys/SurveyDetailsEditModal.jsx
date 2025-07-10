import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';

export const SurveyDetailsEditModal = ({
  isOpen,
  onClose,
  onSave,
  surveyData
}) => {
  const [formData, setFormData] = useState({
    title: surveyData.title,
    description: surveyData.description,
    estimatedTime: surveyData.estimatedTime,
    responseLimit: surveyData.responseLimit
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      title: surveyData.title,
      description: surveyData.description,
      estimatedTime: surveyData.estimatedTime,
      responseLimit: surveyData.responseLimit
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                <span className="text-green-600 text-sm">📝</span>
              </div>
              Edit Survey Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="survey-title">Survey Title *</Label>
            <Input
              id="survey-title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter survey title"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="survey-description">Description</Label>
            <Textarea
              id="survey-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter survey description"
              rows={4}
              className="resize-none w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimated-time">Estimated Time (minutes)</Label>
              <Input
                id="estimated-time"
                type="number"
                value={formData.estimatedTime}
                onChange={(e) => handleInputChange('estimatedTime', parseInt(e.target.value) || 0)}
                placeholder="e.g., 15"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="response-limit">Response Limit</Label>
              <Input
                id="response-limit"
                value={formData.responseLimit}
                onChange={(e) => handleInputChange('responseLimit', e.target.value)}
                placeholder="e.g., unlimited or 100"
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-700 text-sm">
              <strong>Note:</strong> Editing these details will not affect existing responses or learner data. Only the survey metadata will be updated.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={!formData.title.trim()}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};