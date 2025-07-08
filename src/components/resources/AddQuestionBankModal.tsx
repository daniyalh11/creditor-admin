
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
}

interface AddQuestionBankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBankAdded: (bank: any) => void;
}

export const AddQuestionBankModal: React.FC<AddQuestionBankModalProps> = ({
  open,
  onOpenChange,
  onBankAdded
}) => {
  const [bankName, setBankName] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '', type: 'mcq', options: ['', '', '', ''] }
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      text: '',
      type: 'mcq',
      options: ['', '', '', '']
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateQuestionOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options?.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSave = () => {
    if (!bankName.trim()) {
      toast.error("Please enter a bank name");
      return;
    }

    if (!category.trim()) {
      toast.error("Please select a category");
      return;
    }

    const validQuestions = questions.filter(q => q.text.trim());
    if (validQuestions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    const newBank = {
      id: Date.now(),
      type: 'question-bank',
      title: bankName.trim(),
      category: category.trim(),
      questions: validQuestions,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onBankAdded(newBank);
    toast.success(`Question Bank "${newBank.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setBankName('');
    setCategory('');
    setQuestions([{ id: 1, text: '', type: 'mcq', options: ['', '', '', ''] }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Add to Question Bank
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name *</Label>
              <Input
                id="bank-name"
                placeholder="Enter question bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bank-category">Category / Subject *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Math">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="General">General Knowledge</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                    placeholder="Enter your question..."
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
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
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
            disabled={!bankName.trim() || !category}
          >
            Save Question Bank
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
