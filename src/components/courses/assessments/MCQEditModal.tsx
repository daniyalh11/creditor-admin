
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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2 } from 'lucide-react';

interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MCQQuestion {
  id: string;
  type: 'mcq';
  question: string;
  options: MCQOption[];
  points: number;
  feedback?: string;
}

interface MCQEditModalProps {
  question: MCQQuestion;
  onSave: (question: MCQQuestion) => void;
  onCancel: () => void;
}

export const MCQEditModal: React.FC<MCQEditModalProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<MCQQuestion>(question);
  const [allowMultiple, setAllowMultiple] = useState(() => {
    return question.options.filter(opt => opt.isCorrect).length > 1;
  });

  useEffect(() => {
    setEditedQuestion(question);
    setAllowMultiple(question.options.filter(opt => opt.isCorrect).length > 1);
  }, [question]);

  const handleQuestionChange = (newQuestion: string) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
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

  const handleOptionTextChange = (optionId: string, text: string) => {
    setEditedQuestion({
      ...editedQuestion,
      options: editedQuestion.options.map(opt =>
        opt.id === optionId ? { ...opt, text } : opt
      ),
    });
  };

  const handleOptionCorrectChange = (optionId: string, isCorrect: boolean) => {
    if (allowMultiple) {
      // Multiple correct answers allowed - toggle individual option
      setEditedQuestion({
        ...editedQuestion,
        options: editedQuestion.options.map(opt =>
          opt.id === optionId ? { ...opt, isCorrect } : opt
        ),
      });
    } else {
      // Single correct answer - uncheck all others when one is selected
      setEditedQuestion({
        ...editedQuestion,
        options: editedQuestion.options.map(opt => ({
          ...opt,
          isCorrect: opt.id === optionId,
        })),
      });
    }
  };

  const handleAddOption = () => {
    if (editedQuestion.options.length < 6) {
      const newOption: MCQOption = {
        id: Date.now().toString(),
        text: `Option ${String.fromCharCode(65 + editedQuestion.options.length)}`,
        isCorrect: false,
      };
      setEditedQuestion({
        ...editedQuestion,
        options: [...editedQuestion.options, newOption],
      });
    }
  };

  const handleRemoveOption = (optionId: string) => {
    if (editedQuestion.options.length > 2) {
      setEditedQuestion({
        ...editedQuestion,
        options: editedQuestion.options.filter(opt => opt.id !== optionId),
      });
    }
  };

  const handleAllowMultipleToggle = (checked: boolean) => {
    setAllowMultiple(checked);
    if (!checked) {
      // If switching to single answer, keep only the first correct answer
      const firstCorrectIndex = editedQuestion.options.findIndex(opt => opt.isCorrect);
      setEditedQuestion({
        ...editedQuestion,
        options: editedQuestion.options.map((opt, index) => ({
          ...opt,
          isCorrect: index === firstCorrectIndex && opt.isCorrect,
        })),
      });
    }
  };

  const handleSave = () => {
    // Validate that at least one option is correct
    const hasCorrectAnswer = editedQuestion.options.some(opt => opt.isCorrect);
    if (!hasCorrectAnswer) {
      alert('Please select at least one correct answer.');
      return;
    }

    // Validate that question text is not empty
    if (!editedQuestion.question.trim()) {
      alert('Please enter a question.');
      return;
    }

    // Validate that all options have text
    const hasEmptyOption = editedQuestion.options.some(opt => !opt.text.trim());
    if (hasEmptyOption) {
      alert('Please fill in all option texts.');
      return;
    }

    onSave(editedQuestion);
  };

  const selectedOptionId = editedQuestion.options.find(opt => opt.isCorrect)?.id || '';

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Multiple Choice Question</DialogTitle>
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
              value={editedQuestion.points}
              onChange={(e) => handlePointsChange(Number(e.target.value))}
              className="w-32"
            />
          </div>

          {/* Multiple Correct Answers Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowMultiple"
              checked={allowMultiple}
              onCheckedChange={handleAllowMultipleToggle}
            />
            <Label htmlFor="allowMultiple">Allow multiple correct answers</Label>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Answer Options *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddOption}
                disabled={editedQuestion.options.length >= 6}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Option
              </Button>
            </div>

            <div className="space-y-3">
              {editedQuestion.options.map((option, index) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex items-center space-x-2 mt-2">
                    {allowMultiple ? (
                      <Checkbox
                        checked={option.isCorrect}
                        onCheckedChange={(checked) =>
                          handleOptionCorrectChange(option.id, checked as boolean)
                        }
                      />
                    ) : (
                      <RadioGroup
                        value={selectedOptionId}
                        onValueChange={(value) => handleOptionCorrectChange(value, true)}
                      >
                        <RadioGroupItem value={option.id} id={`radio-${option.id}`} />
                      </RadioGroup>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`option-${option.id}`}>
                      Option {String.fromCharCode(65 + index)}
                    </Label>
                    <Input
                      id={`option-${option.id}`}
                      value={option.text}
                      onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                      placeholder={`Enter option ${String.fromCharCode(65 + index)}...`}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveOption(option.id)}
                    disabled={editedQuestion.options.length <= 2}
                    className="mt-6 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback (Optional)</Label>
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
