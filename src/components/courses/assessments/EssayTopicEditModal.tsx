
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

interface EssayQuestion {
  id: string;
  type: 'essay-question';
  question: string;
  answer: string;
  points: number;
  wordLimit?: number;
  instructions?: string;
}

interface EssayTopicEditModalProps {
  topic: EssayQuestion;
  onSave: (topic: EssayQuestion) => void;
  onCancel: () => void;
}

export const EssayTopicEditModal: React.FC<EssayTopicEditModalProps> = ({
  topic,
  onSave,
  onCancel,
}) => {
  const [editedTopic, setEditedTopic] = useState<EssayQuestion>(topic);

  useEffect(() => {
    setEditedTopic(topic);
  }, [topic]);

  const handleTopicChange = (field: keyof EssayQuestion, value: any) => {
    setEditedTopic({
      ...editedTopic,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (!editedTopic.question.trim()) {
      alert('Please enter an essay topic/title.');
      return;
    }

    console.log('Saving essay topic:', editedTopic);
    onSave(editedTopic);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Essay Topic & Requirements</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic-title">Essay Topic/Title *</Label>
            <Input
              id="topic-title"
              value={editedTopic.question}
              onChange={(e) => handleTopicChange('question', e.target.value)}
              placeholder="The Impact of Technology on Modern Education"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Essay Description/Background</Label>
            <Textarea
              id="description"
              value={editedTopic.answer || ''}
              onChange={(e) => handleTopicChange('answer', e.target.value)}
              placeholder="Provide context or background information for the essay topic..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="essay-prompt">Essay Prompt/Requirements *</Label>
            <Textarea
              id="essay-prompt"
              value={editedTopic.instructions || ''}
              onChange={(e) => handleTopicChange('instructions', e.target.value)}
              placeholder="Write a comprehensive essay discussing the impact of technology on modern education. Include specific examples, analyze both positive and negative effects, and provide your own perspective on future developments."
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="word-limit">Word Limit</Label>
              <Input
                id="word-limit"
                type="number"
                min="100"
                value={editedTopic.wordLimit || 1000}
                onChange={(e) => handleTopicChange('wordLimit', Number(e.target.value))}
                placeholder="1000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={editedTopic.points || 10}
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
