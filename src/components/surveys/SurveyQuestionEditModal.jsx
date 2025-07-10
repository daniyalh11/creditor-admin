import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X, Plus, Trash2 } from 'lucide-react';

const questionTypes = [
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'single-choice', label: 'Single Choice' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'rating', label: 'Rating' },
  { value: 'yes-no', label: 'Yes/No' },
  { value: 'scale', label: 'Scale (1-10)' }
];

export const SurveyQuestionEditModal = ({
  isOpen,
  onClose,
  onSave,
  questionData
}) => {
  const [formData, setFormData] = useState({
    id: questionData.id,
    question: questionData.question,
    type: questionData.type,
    options: questionData.options || []
  });

  const handleQuestionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      question: value
    }));
  };

  const handleTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      type: value,
      options: ['multiple-choice', 'single-choice'].includes(value) 
        ? prev.options?.length ? prev.options : [
            { id: '1', text: 'Option 1' },
            { id: '2', text: 'Option 2' }
          ]
        : []
    }));
  };

  const handleOptionChange = (optionId, text) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.map(option =>
        option.id === optionId ? { ...option, text } : option
      )
    }));
  };

  const addOption = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      options: [
        ...(prev.options || []),
        { id: newId, text: `Option ${(prev.options?.length || 0) + 1}` }
      ]
    }));
  };

  const removeOption = (optionId) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.filter(option => option.id !== optionId)
    }));
  };

  const handleSave = () => {
    if (!formData.question.trim()) {
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      id: questionData.id,
      question: questionData.question,
      type: questionData.type,
      options: questionData.options || []
    });
    onClose();
  };

  const requiresOptions = ['multiple-choice', 'single-choice'].includes(formData.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600 text-sm">❓</span>
              </div>
              Edit Survey Question
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
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your question here..."
              rows={3}
              className="resize-none w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="response-type">Response Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select response type" />
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

          {requiresOptions && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.options?.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                    <Input
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    {(formData.options?.length || 0) > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(option.id)}
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
                <strong>Descriptive Question:</strong> Respondents will see a text area to provide their written response.
              </p>
            </div>
          )}

          {formData.type === 'rating' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Rating Question:</strong> Respondents will see a 5-star rating scale.
              </p>
            </div>
          )}

          {formData.type === 'yes-no' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Yes/No Question:</strong> Respondents will see simple Yes and No buttons.
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
            Save Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};