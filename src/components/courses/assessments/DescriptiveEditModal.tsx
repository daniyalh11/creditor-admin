
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface DescriptiveQuestion {
  id: string;
  type: 'descriptive';
  question: string;
  expectedLength?: number;
  points?: number;
  feedback?: string;
  isSurvey?: boolean;
}

interface DescriptiveEditModalProps {
  question: DescriptiveQuestion;
  onSave: (question: DescriptiveQuestion) => void;
  onCancel: () => void;
}

export const DescriptiveEditModal: React.FC<DescriptiveEditModalProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<DescriptiveQuestion>(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  const handleQuestionChange = (newQuestion: string) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
    });
  };

  const handleExpectedLengthChange = (expectedLength: number) => {
    setEditedQuestion({
      ...editedQuestion,
      expectedLength: Math.max(0, expectedLength),
    });
  };

  const handlePointsChange = (points: number) => {
    setEditedQuestion({
      ...editedQuestion,
      points: Math.max(0, points),
    });
  };

  const handleFeedbackChange = (feedback: string) => {
    setEditedQuestion({
      ...editedQuestion,
      feedback,
    });
  };

  const handleSave = () => {
    // Validate that question text is not empty
    if (!editedQuestion.question.trim()) {
      alert('Please enter a question.');
      return;
    }

    onSave(editedQuestion);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit {editedQuestion.isSurvey ? 'Survey' : 'Descriptive'} Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Textarea
              id="question"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your descriptive question here..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Expected Length - only for non-survey questions */}
          {!editedQuestion.isSurvey && (
            <div className="space-y-2">
              <Label htmlFor="expectedLength">Expected Answer Length (words)</Label>
              <Input
                id="expectedLength"
                type="number"
                min="0"
                value={editedQuestion.expectedLength || 100}
                onChange={(e) => handleExpectedLengthChange(Number(e.target.value))}
                className="w-32"
              />
              <p className="text-xs text-gray-500">
                Suggested word count for student responses
              </p>
            </div>
          )}

          {/* Points - only for non-survey questions */}
          {!editedQuestion.isSurvey && (
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="0"
                value={editedQuestion.points || 5}
                onChange={(e) => handlePointsChange(Number(e.target.value))}
                className="w-32"
              />
            </div>
          )}

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Additional Instructions (Optional)</Label>
            <Textarea
              id="feedback"
              value={editedQuestion.feedback || ''}
              onChange={(e) => handleFeedbackChange(e.target.value)}
              placeholder="Provide additional instructions or context for this question..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
