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
import { useToast } from '@/hooks/use-toast';

export const FillUpEditModal = ({
  question,
  onSave,
  onCancel,
}) => {
  const { toast } = useToast();
  const [editedQuestion, setEditedQuestion] = useState({
    question: '',
    correctAnswer: '',
    points: 1,
    explanation: '',
    ...question
  });

  useEffect(() => {
    setEditedQuestion({
      question: '',
      correctAnswer: '',
      points: 1,
      explanation: '',
      ...question
    });
  }, [question]);

  const handleQuestionChange = (field, value) => {
    setEditedQuestion(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editedQuestion.question.trim()) {
      toast({
        title: "Missing Question",
        description: "Please enter a question text.",
        variant: "destructive"
      });
      return;
    }
    if (!editedQuestion.correctAnswer.trim()) {
      toast({
        title: "Missing Answer",
        description: "Please enter the correct answer.",
        variant: "destructive"
      });
      return;
    }

    onSave({
      ...editedQuestion,
      // Ensure points is a number
      points: Number(editedQuestion.points) || 1
    });
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {question.id ? 'Edit Fill-in-the-Blank' : 'Create Fill-in-the-Blank'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="question-text">Question Text *</Label>
            <Textarea
              id="question-text"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange('question', e.target.value)}
              placeholder="Complete this sentence: The capital of France is ____."
              rows={3}
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              Use underscores (____) or brackets ([ ]) to indicate blank spaces
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="correct-answer">Correct Answer *</Label>
              <Input
                id="correct-answer"
                value={editedQuestion.correctAnswer}
                onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                placeholder="Paris"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points *</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={editedQuestion.points}
                onChange={(e) => handleQuestionChange('points', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <Textarea
              id="explanation"
              value={editedQuestion.explanation || ''}
              onChange={(e) => handleQuestionChange('explanation', e.target.value)}
              placeholder="Explain why this is the correct answer..."
              rows={3}
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              This will be shown to students after they answer
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};