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

export const DebateTopicEditModal = ({
  topic,
  onSave,
  onCancel,
}) => {
  const [editedTopic, setEditedTopic] = useState(topic);

  useEffect(() => {
    setEditedTopic(topic);
  }, [topic]);

  const handleTopicChange = (field, value) => {
    setEditedTopic({
      ...editedTopic,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (!editedTopic.question.trim()) {
      alert('Please enter a debate title.');
      return;
    }

    if (!editedTopic.statement.trim()) {
      alert('Please enter a debate statement/topic.');
      return;
    }

    console.log('Saving debate topic:', editedTopic);
    onSave(editedTopic);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Debate Topic</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="debate-title">Debate Title *</Label>
            <Input
              id="debate-title"
              value={editedTopic.question}
              onChange={(e) => handleTopicChange('question', e.target.value)}
              placeholder="Climate Change Discussion"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="debate-statement">Debate Statement/Topic *</Label>
            <Textarea
              id="debate-statement"
              value={editedTopic.statement}
              onChange={(e) => handleTopicChange('statement', e.target.value)}
              placeholder="Climate change is primarily caused by human activities. Discuss both sides of this argument with supporting evidence."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={editedTopic.instructions || ''}
              onChange={(e) => handleTopicChange('instructions', e.target.value)}
              placeholder="Provide specific instructions for the debate format, time limits, or evaluation criteria..."
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
                placeholder="30"
                defaultValue="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={editedTopic.points || 15}
                onChange={(e) => handleTopicChange('points', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
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