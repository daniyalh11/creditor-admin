import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, X } from 'lucide-react';
import { AddQuestionsDialog } from './AddQuestionsDialog';

interface Assessment {
  id?: string;
  type: 'quiz' | 'debate' | 'survey' | 'essay' | 'resources' | 'assignment';
  title: string;
  description: string;
  status: 'draft' | 'published';
  passingScore: number;
  attemptsAllowed: string;
  category: string;
}

interface AddAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (assessment: Omit<Assessment, 'id'>) => void;
}

export const AddAssessmentDialog: React.FC<AddAssessmentDialogProps> = ({
  open,
  onOpenChange,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [description, setDescription] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [attemptsAllowed, setAttemptsAllowed] = useState('3 Attempts');
  const [category, setCategory] = useState('Quiz');
  const [errors, setErrors] = useState<{ title?: string; assessmentType?: string }>({});
  const [showQuestionsDialog, setShowQuestionsDialog] = useState(false);

  const assessmentTypeOptions = [
    'Multiple Choice Quiz',
    'True/False Test',
    'Fill in the Blanks',
    'Essay Writing',
    'Assignment Upload',
    'Project Submission',
    'Live Proctored Exam'
  ];

  const attemptOptions = [
    '1 Attempt',
    '2 Attempts', 
    '3 Attempts',
    '5 Attempts',
    'Unlimited'
  ];

  const categoryOptions = [
    'Quiz',
    'Assignment',
    'Test',
    'Project',
    'Survey'
  ];

  const validateForm = () => {
    const newErrors: { title?: string; assessmentType?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Assessment title is required';
    }
    
    if (!assessmentType) {
      newErrors.assessmentType = 'Assessment type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTitle('');
    setAssessmentType('');
    setDescription('');
    setPassingScore(70);
    setAttemptsAllowed('3 Attempts');
    setCategory('Quiz');
    setErrors({});
  };

  const handleNext = () => {
    if (!validateForm()) return;
    setShowQuestionsDialog(true);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleBackToDetails = () => {
    setShowQuestionsDialog(false);
  };

  const handlePublishAssessment = () => {
    onAdd({
      type: 'quiz',
      title: title.trim(),
      description: description.trim(),
      status: 'published',
      passingScore,
      attemptsAllowed,
      category
    });

    resetForm();
    setShowQuestionsDialog(false);
  };

  return (
    <>
      <Dialog open={open && !showQuestionsDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <Settings className="h-4 w-4 text-blue-600" />
              </div>
              <DialogTitle className="text-xl font-semibold">Create New Assessment</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(90vh-180px)]">
              <div className="px-6 py-6 space-y-6">
                {/* Assessment Details Header */}
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Assessment Details</h2>
                </div>

                {/* Assessment Title and Type Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="assessment-title" className="text-sm font-medium text-gray-700">
                      Assessment Title *
                    </Label>
                    <Input
                      id="assessment-title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) setErrors({...errors, title: undefined});
                      }}
                      placeholder="Enter assessment title"
                      className={`mt-2 ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Assessment Type *
                    </Label>
                    <Select value={assessmentType} onValueChange={setAssessmentType}>
                      <SelectTrigger className={`mt-2 ${errors.assessmentType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select assessment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {assessmentTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.assessmentType && (
                      <p className="text-red-500 text-xs mt-1">{errors.assessmentType}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter assessment description"
                    className="mt-2 resize-none min-h-[100px]"
                    rows={4}
                  />
                </div>

                {/* Passing Score, Attempts, Category Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="passing-score" className="text-sm font-medium text-gray-700">
                      Passing Score (%)
                    </Label>
                    <Input
                      id="passing-score"
                      type="number"
                      value={passingScore}
                      onChange={(e) => setPassingScore(Number(e.target.value))}
                      min="0"
                      max="100"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Attempts Allowed
                    </Label>
                    <Select value={attemptsAllowed} onValueChange={setAttemptsAllowed}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {attemptOptions.map((attempt) => (
                          <SelectItem key={attempt} value={attempt}>{attempt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-white flex-shrink-0">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next: Add Questions
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Questions Dialog */}
      <AddQuestionsDialog
        open={showQuestionsDialog}
        onOpenChange={setShowQuestionsDialog}
        assessmentType={assessmentType}
        onPublish={handlePublishAssessment}
        onBackToDetails={handleBackToDetails}
      />
    </>
  );
};
