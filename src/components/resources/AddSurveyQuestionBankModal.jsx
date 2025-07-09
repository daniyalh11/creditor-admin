import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const AddSurveyQuestionBankModal = ({
  open,
  onOpenChange,
  onBankAdded
}) => {
  const [bankTitle, setBankTitle] = useState('');
  const [tags, setTags] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, text: '', type: 'mcq', options: ['', '', '', ''] }
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      type: 'mcq',
      options: ['', '', '', '']
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateQuestionOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options?.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSave = () => {
    if (!bankTitle.trim()) {
      toast.error("Please enter a bank title");
      return;
    }

    const validQuestions = questions.filter(q => q.text.trim());
    if (validQuestions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    const newBank = {
      id: Date.now(),
      type: 'survey-question-bank',
      title: bankTitle.trim(),
      questions: validQuestions,
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()) : undefined,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onBankAdded(newBank);
    toast.success(`Survey Question Bank "${newBank.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setBankTitle('');
    setTags('');
    setQuestions([{ id: 1, text: '', type: 'mcq', options: ['', '', '', ''] }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            Create Survey Question Bank
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bank-title">Bank Title *</Label>
            <Input
              id="bank-title"
              placeholder="Enter survey question bank title"
              value={bankTitle}
              onChange={(e) => setBankTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bank-tags">Tags (Optional)</Label>
            <Input
              id="bank-tags"
              placeholder="Enter tags separated by commas (e.g., feedback, satisfaction, evaluation)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Questions</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addQuestion}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            {questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Question {index + 1}</h4>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    placeholder="Enter your survey question..."
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select 
                    value={question.type} 
                    onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="descriptive">Descriptive</SelectItem>
                      <SelectItem value="rating">Rating Scale</SelectItem>
                      <SelectItem value="yes-no">Yes/No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {question.type === 'mcq' && question.options && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <Input
                        key={optionIndex}
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!bankTitle.trim()}
          >
            Save Question Bank
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};