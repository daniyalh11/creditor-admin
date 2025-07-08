
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TrueFalseQuestion {
  id: string;
  type: 'truefalse';
  question: string;
  correctAnswer: boolean;
  points: number;
  feedback?: string;
}

interface TrueFalseEditModalProps {
  question: TrueFalseQuestion;
  onSave: (question: TrueFalseQuestion) => void;
  onCancel: () => void;
}

export const TrueFalseEditModal: React.FC<TrueFalseEditModalProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<TrueFalseQuestion>(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  const handleQuestionChange = (newQuestion: string) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
    });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setEditedQuestion({
      ...editedQuestion,
      correctAnswer: value === 'true',
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
          <DialogTitle>Edit True/False Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Textarea
              id="question"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your true/false statement here..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Correct Answer */}
          <div className="space-y-4">
            <Label>Correct Answer *</Label>
            <RadioGroup
              value={editedQuestion.correctAnswer.toString()}
              onValueChange={handleCorrectAnswerChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="text-green-700 font-medium">
                  True
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="text-red-700 font-medium">
                  False
                </Label>
              </div>
            </RadioGroup>
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
