
import React, { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';

interface DebateScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: any;
  onSave: (scoreData: any) => void;
}

export const DebateScoreModal: React.FC<DebateScoreModalProps> = ({
  isOpen,
  onClose,
  participant,
  onSave,
}) => {
  const [score, setScore] = useState(participant.score || '');
  const [feedback, setFeedback] = useState('');

  const handleSave = () => {
    if (!score || score < 0 || score > 100) {
      alert('Please enter a valid score between 0 and 100.');
      return;
    }

    onSave({
      score: Number(score),
      feedback
    });
    onClose();
  };

  const handleCancel = () => {
    setScore(participant.score || '');
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Score Response - {participant.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {participant.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{participant.name}</h3>
              <Badge variant={participant.position === 'For' ? 'default' : 'secondary'}>
                {participant.position} the Topic
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Participant Response</h4>
              <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                <p className="text-gray-700 leading-relaxed">
                  {participant.response || 'No response submitted yet.'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="score">Score (0-100) *</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Enter score"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (Optional)</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback on the participant's response..."
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Score
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
