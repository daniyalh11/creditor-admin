
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

interface OneWordQuestion {
  id: string;
  type: 'oneword';
  question: string;
  correctAnswer: string;
  points: number;
  feedback?: string;
}

interface OneWordEditModalProps {
  question: OneWordQuestion;
  onSave: (question: OneWordQuestion) => void;
  onCancel: () => void;
}

export const OneWordEditModal: React.FC<OneWordEditModalProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<OneWordQuestion>(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  const handleQuestionChange = (newQuestion: string) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
    });
  };

  const handleCorrectAnswerChange = (correctAnswer: string) => {
    setEditedQuestion({
      ...editedQuestion,
      correctAnswer,
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

    // Validate that correct answer is not empty and is one word
    if (!editedQuestion.correctAnswer.trim()) {
      alert('Please enter the correct answer.');
      return;
    }

    if (editedQuestion.correctAnswer.trim().split(' ').length > 1) {
      alert('The answer should be a single word.');
      return;
    }

    onSave(editedQuestion);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit One Word Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Textarea
              id="question"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your one-word question here..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Correct Answer */}
          <div className="space-y-2">
            <Label htmlFor="correctAnswer">Correct Answer (One Word) *</Label>
            <Input
              id="correctAnswer"
              value={editedQuestion.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(e.target.value)}
              placeholder="Enter the correct one-word answer"
            />
            <p className="text-xs text-gray-500">
              Answer should be a single word only
            </p>
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              min="0"
              value={editedQuestion.points}
              onChange={(e) => handlePointsChange(Number(e.target.value))}
              className="w-32"
            />
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Explanation/Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              value={editedQuestion.feedback || ''}
              onChange={(e) => handleFeedbackChange(e.target.value)}
              placeholder="Provide explanation or feedback for this question..."
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
