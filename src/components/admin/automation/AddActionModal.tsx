
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Award, Mail, Bell, BookOpen, Badge } from 'lucide-react';

interface AddActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (action: ActionData) => void;
  title: string;
  actionType?: 'general' | 'assessment' | 'resource';
  editingAction?: any;
}

interface ActionData {
  type: string;
  title: string;
  description: string;
  triggerConditions?: string;
  assessmentType?: string;
  condition?: string;
}

const generalActionTypes = [
  { value: 'award_certificate', label: 'Award Certificate', icon: Award },
  { value: 'send_email', label: 'Send Email', icon: Mail },
  { value: 'notify_instructor', label: 'Notify Instructor', icon: Bell },
  { value: 'enroll_course', label: 'Enroll in Course', icon: BookOpen },
];

const assessmentActionTypes = [
  { value: 'award_certificate', label: 'Award Certificate', icon: Award },
  { value: 'award_badge', label: 'Award Badge', icon: Badge },
  { value: 'send_email', label: 'Send Email', icon: Mail },
  { value: 'notify_instructor', label: 'Notify Instructor', icon: Bell },
];

const resourceActionTypes = [
  { value: 'send_email', label: 'Send Email', icon: Mail },
  { value: 'notify_instructor', label: 'Notify Instructor', icon: Bell },
  { value: 'award_badge', label: 'Award Badge', icon: Badge },
];

const assessmentTypes = [
  { value: 'quiz', label: 'Quiz' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'survey', label: 'Survey' },
  { value: 'essay', label: 'Essay' },
  { value: 'debate', label: 'Debate' },
];

const assessmentConditions = [
  { value: 'completed', label: 'Assessment Completed' },
  { value: 'passed', label: 'Assessment Passed' },
  { value: 'failed', label: 'Assessment Failed' },
  { value: 'score_above_80', label: 'Score Above 80%' },
  { value: 'score_below_60', label: 'Score Below 60%' },
];

export const AddActionModal: React.FC<AddActionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title,
  actionType = 'general',
  editingAction
}) => {
  const [formData, setFormData] = useState<ActionData>({
    type: '',
    title: '',
    description: '',
    triggerConditions: '',
    assessmentType: '',
    condition: ''
  });

  // Reset form when modal opens/closes or when editing action changes
  useEffect(() => {
    if (isOpen) {
      if (editingAction) {
        setFormData({
          type: editingAction.type || '',
          title: editingAction.title || '',
          description: editingAction.description || '',
          triggerConditions: editingAction.triggerConditions || '',
          assessmentType: editingAction.assessmentType || '',
          condition: editingAction.condition || ''
        });
      } else {
        setFormData({
          type: '',
          title: '',
          description: '',
          triggerConditions: '',
          assessmentType: '',
          condition: ''
        });
      }
    }
  }, [isOpen, editingAction]);

  const getActionTypes = () => {
    switch (actionType) {
      case 'assessment':
        return assessmentActionTypes;
      case 'resource':
        return resourceActionTypes;
      default:
        return generalActionTypes;
    }
  };

  const handleSave = () => {
    if (!formData.type || !formData.title || !formData.description) {
      return;
    }
    
    onSave(formData);
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({ 
      type: '', 
      title: '', 
      description: '', 
      triggerConditions: '',
      assessmentType: '',
      condition: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="action-type">Action Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select an action type" />
              </SelectTrigger>
              <SelectContent>
                {getActionTypes().map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {actionType === 'assessment' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="assessment-type">Assessment Type</Label>
                <Select value={formData.assessmentType} onValueChange={(value) => setFormData({ ...formData, assessmentType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentConditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="action-title">Action Title</Label>
            <Input
              id="action-title"
              placeholder="Enter action title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="action-description">Description / Notes</Label>
            <Textarea
              id="action-description"
              placeholder="Enter description or notes for this action..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger-conditions">Trigger Conditions (Optional)</Label>
            <Textarea
              id="trigger-conditions"
              placeholder="Enter any specific conditions for when this action should trigger..."
              rows={3}
              value={formData.triggerConditions}
              onChange={(e) => setFormData({ ...formData, triggerConditions: e.target.value })}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!formData.type || !formData.title || !formData.description}
          >
            {editingAction ? 'Update Action' : 'Save Action'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
