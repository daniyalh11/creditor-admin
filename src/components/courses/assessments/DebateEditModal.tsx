
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DebateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  debateData: any;
  onSave: (data: any) => void;
}

export const DebateEditModal: React.FC<DebateEditModalProps> = ({
  isOpen,
  onClose,
  debateData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    timeLimit: 60,
    participantLimit: 20
  });

  useEffect(() => {
    if (debateData) {
      setFormData({
        title: debateData.title || '',
        description: debateData.description || '',
        topic: debateData.topic || '',
        timeLimit: debateData.timeLimit || 60,
        participantLimit: debateData.participantLimit || 20
      });
    }
  }, [debateData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    if (debateData) {
      setFormData({
        title: debateData.title || '',
        description: debateData.description || '',
        topic: debateData.topic || '',
        timeLimit: debateData.timeLimit || 60,
        participantLimit: debateData.participantLimit || 20
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Debate</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="debate-title">Debate Title *</Label>
            <Input
              id="debate-title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter debate title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="debate-description">Description</Label>
            <Textarea
              id="debate-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter debate description"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="debate-topic">Debate Topic *</Label>
            <Textarea
              id="debate-topic"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              placeholder="Enter the main debate topic or question"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-limit">Time Limit (minutes)</Label>
              <Input
                id="time-limit"
                type="number"
                min="1"
                value={formData.timeLimit}
                onChange={(e) => handleChange('timeLimit', Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participant-limit">Participant Limit</Label>
              <Input
                id="participant-limit"
                type="number"
                min="1"
                value={formData.participantLimit}
                onChange={(e) => handleChange('participantLimit', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
