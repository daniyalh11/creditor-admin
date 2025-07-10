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
import { Plus, Trash2 } from 'lucide-react';

export const MatchingEditModal = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  const handleQuestionChange = (newQuestion) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
    });
  };

  const handlePointsChange = (points) => {
    setEditedQuestion({
      ...editedQuestion,
      points: Math.max(0, points),
    });
  };

  const handlePairChange = (index, field, value) => {
    const newPairs = [...editedQuestion.pairs];
    newPairs[index] = { ...newPairs[index], [field]: value };
    setEditedQuestion({
      ...editedQuestion,
      pairs: newPairs,
    });
  };

  const handleAddPair = () => {
    const newPair = {
      id: Date.now().toString(),
      term: '',
      match: '',
    };
    setEditedQuestion({
      ...editedQuestion,
      pairs: [...editedQuestion.pairs, newPair],
    });
  };

  const handleRemovePair = (index) => {
    if (editedQuestion.pairs.length > 2) {
      const newPairs = editedQuestion.pairs.filter((_, i) => i !== index);
      setEditedQuestion({
        ...editedQuestion,
        pairs: newPairs,
      });
    }
  };

  const handleFeedbackChange = (feedback) => {
    setEditedQuestion({
      ...editedQuestion,
      feedback,
    });
  };

  const handleSave = () => {
    if (!editedQuestion.question.trim()) {
      alert('Please enter a question.');
      return;
    }

    const hasValidPairs = editedQuestion.pairs.every(pair => 
      pair.term.trim() !== '' && pair.match.trim() !== ''
    );
    if (!hasValidPairs) {
      alert('Please fill in all term and match pairs.');
      return;
    }

    console.log('Saving matching question:', editedQuestion);
    onSave(editedQuestion);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Matching Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Question/Instructions *</Label>
            <Textarea
              id="question"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your matching question instructions here..."
              rows={3}
              className="resize-none"
            />
          </div>

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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Matching Pairs *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddPair}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Pair
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                <div>Terms/Items</div>
                <div>Matches</div>
              </div>

              {editedQuestion.pairs.map((pair, index) => (
                <div key={pair.id} className="grid grid-cols-2 gap-4 items-center">
                  <Input
                    value={pair.term}
                    onChange={(e) => handlePairChange(index, 'term', e.target.value)}
                    placeholder={`Term ${index + 1}`}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      value={pair.match}
                      onChange={(e) => handlePairChange(index, 'match', e.target.value)}
                      placeholder={`Match ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePair(index)}
                      disabled={editedQuestion.pairs.length <= 2}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};