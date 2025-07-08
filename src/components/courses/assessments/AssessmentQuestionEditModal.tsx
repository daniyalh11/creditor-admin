
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

interface AssessmentQuestion {
  id: string;
  type: 'assessment-question';
  question: string;
  description?: string;
  points?: number;
}

interface AssessmentQuestionEditModalProps {
  question: AssessmentQuestion;
  onSave: (question: AssessmentQuestion) => void;
  onCancel: () => void;
}

export const AssessmentQuestionEditModal: React.FC<AssessmentQuestionEditModalProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<AssessmentQuestion>(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  const handleQuestionChange = (newQuestion: string) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
    });
  };

  const handleDescriptionChange = (description: string) => {
    setEditedQuestion({
      ...editedQuestion,
      description,
    });
  };

  const handlePointsChange = (points: number) => {
    setEditedQuestion({
      ...editedQuestion,
      points: Math.max(0, points),
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
          <DialogTitle>Edit Assessment Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Textarea
              id="question"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your question here..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              min="0"
              value={editedQuestion.points || 0}
              onChange={(e) => handlePointsChange(Number(e.target.value))}
              className="w-32"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description/Instructions (Optional)</Label>
            <Textarea
              id="description"
              value={editedQuestion.description || ''}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Add additional instructions or context for this question..."
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
