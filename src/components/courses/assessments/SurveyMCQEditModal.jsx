import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, GripVertical } from 'lucide-react';

/**
 * @typedef {object} SurveyMCQOption
 * @property {string} id
 * @property {string} text
 */

/**
 * @typedef {object} SurveyMCQQuestion
 * @property {string} id
 * @property {'survey-mcq'} type
 * @property {string} question
 * @property {SurveyMCQOption[]} options
 * @property {boolean} [allowMultiple]
 * @property {string} [feedback]
 * @property {boolean} [required]
 */

/**
 * A modal component for editing a Survey Multiple Choice Question.
 *
 * @param {object} props
 * @param {SurveyMCQQuestion} props.question - The survey question object to edit.
 * @param {(question: SurveyMCQQuestion) => void} props.onSave - Callback to save the question.
 * @param {() => void} props.onCancel - Callback to cancel the edit.
 */
export const SurveyMCQEditModal = ({
  question,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState(question);

  const handleQuestionChange = (value) => {
    setFormData(prev => ({ ...prev, question: value }));
  };

  const handleOptionChange = (optionId, text) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === optionId ? { ...opt, text } : opt
      )
    }));
  };

  const handleAddOption = () => {
    const newOption = {
      id: Date.now().toString(),
      text: `Option ${formData.options.length + 1}`
    };
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
  };

  const handleRemoveOption = (optionId) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter(opt => opt.id !== optionId)
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Multiple Choice Question</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your question..."
              rows={3}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <Label>Answer Options</Label>
            <div className="space-y-2">
              {formData.options.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                  <span className="w-8 text-sm text-gray-500">{index + 1}.</span>
                  <Input
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(option.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={handleAddOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Multiple Selections</Label>
                <p className="text-sm text-gray-600">
                  Allow respondents to select multiple answers
                </p>
              </div>
              <Switch
                checked={formData.allowMultiple || false}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, allowMultiple: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Required Question</Label>
                <p className="text-sm text-gray-600">
                  Respondents must answer this question
                </p>
              </div>
              <Switch
                checked={formData.required || false}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, required: checked }))
                }
              />
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              value={formData.feedback || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
              placeholder="Add feedback or explanation for this question..."
              rows={2}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
