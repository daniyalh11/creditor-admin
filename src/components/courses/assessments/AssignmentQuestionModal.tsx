
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X, Plus, Trash2, HelpCircle } from 'lucide-react';

interface AssignmentQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionData?: any;
  onSave: (data: any) => void;
}

const questionTypes = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'true-false', label: 'True/False' },
  { value: 'short-answer', label: 'Short Answer' }
];

export const AssignmentQuestionModal: React.FC<AssignmentQuestionModalProps> = ({
  isOpen,
  onClose,
  questionData,
  onSave
}) => {
  const [formData, setFormData] = useState({
    question: questionData?.question || '',
    type: questionData?.type || 'descriptive',
    points: questionData?.points || 10,
    options: questionData?.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  });

  const handleSave = () => {
    if (!formData.question.trim()) return;
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    if (questionData) {
      setFormData({
        question: questionData.question,
        type: questionData.type,
        points: questionData.points,
        options: questionData.options || []
      });
    } else {
      setFormData({
        question: '',
        type: 'descriptive',
        points: 10,
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
      });
    }
    onClose();
  };

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value,
      options: value === 'mcq' || value === 'true-false' 
        ? (value === 'true-false' ? ['True', 'False'] : ['Option 1', 'Option 2', 'Option 3', 'Option 4'])
        : []
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, `Option ${prev.options.length + 1}`]
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const requiresOptions = formData.type === 'mcq' || formData.type === 'true-false';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-blue-600" />
              </div>
              {questionData ? 'Edit Question' : 'Add New Question'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question-text">Question Text *</Label>
            <Textarea
              id="question-text"
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Enter your question here..."
              rows={3}
              className="resize-none w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="question-type">Question Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                min="1"
                max="100"
              />
            </div>
          </div>

          {requiresOptions && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                {formData.type === 'mcq' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                      disabled={formData.type === 'true-false'}
                    />
                    {formData.type === 'mcq' && formData.options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.type === 'descriptive' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Descriptive Question:</strong> Students will see a text area to provide their written response.
              </p>
            </div>
          )}

          {formData.type === 'short-answer' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Short Answer:</strong> Students will see a single-line input field for brief responses.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!formData.question.trim()}
          >
            <Save className="h-4 w-4 mr-2" />
            {questionData ? 'Update Question' : 'Add Question'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
