import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HelpCircle, Users, BarChart3, FileText, BookOpen, ClipboardList } from 'lucide-react';
import { ImageUpload } from '@/components/courses/ImageUpload';

export const EditAssessmentDialog = ({
  open,
  onOpenChange,
  assessment,
  onUpdate
}) => {
  const [selectedType, setSelectedType] = useState(assessment.type);
  const [title, setTitle] = useState(assessment.title);
  const [description, setDescription] = useState(assessment.description);
  const [status, setStatus] = useState(assessment.status);
  const [image, setImage] = useState(assessment.image || null);
  const [errors, setErrors] = useState({});

  const assessmentTypes = [
    { 
      type: 'quiz', 
      icon: <HelpCircle className="h-5 w-5" />, 
      label: 'Quiz',
      description: 'Multiple choice, true/false, and short answer questions'
    },
    { 
      type: 'debate', 
      icon: <Users className="h-5 w-5" />, 
      label: 'Debate',
      description: 'Structured discussion and argumentation activities'
    },
    { 
      type: 'survey', 
      icon: <BarChart3 className="h-5 w-5" />, 
      label: 'Survey',
      description: 'Collect feedback and opinions from students'
    },
    { 
      type: 'essay', 
      icon: <FileText className="h-5 w-5" />, 
      label: 'Essay',
      description: 'Long-form written assignments and responses'
    },
    { 
      type: 'assignment', 
      icon: <ClipboardList className="h-5 w-5" />, 
      label: 'Assignment',
      description: 'Practical tasks and homework assignments'
    },
    { 
      type: 'resources', 
      icon: <BookOpen className="h-5 w-5" />, 
      label: 'Resources',
      description: 'Additional reading materials and references'
    }
  ];

  useEffect(() => {
    if (open) {
      setSelectedType(assessment.type);
      setTitle(assessment.title);
      setDescription(assessment.description);
      setStatus(assessment.status);
      setImage(assessment.image || null);
      setErrors({});
    }
  }, [open, assessment]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Assessment title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    onUpdate({
      ...assessment,
      type: selectedType,
      title: title.trim(),
      description: description.trim(),
      status,
      image: image || undefined
    });
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 sm:px-6 py-4 border-b flex-shrink-0">
          <DialogTitle className="text-lg sm:text-xl">Edit Assessment</DialogTitle>
          <DialogDescription className="text-sm">
            Update the assessment details and configuration.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(90vh-200px)]">
            <div className="px-4 sm:px-6 py-4 space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Assessment Type</Label>
                <div className="grid grid-cols-1 gap-2">
                  {assessmentTypes.map((type) => (
                    <button
                      key={type.type}
                      onClick={() => setSelectedType(type.type)}
                      className={`p-3 border rounded-lg text-left transition-colors hover:bg-gray-50 ${
                        selectedType === type.type 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-teal-600 mt-0.5 flex-shrink-0">{type.icon}</div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm">{type.label}</h4>
                          <p className="text-xs text-gray-600 mt-1 break-words">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="assessment-title" className="text-sm font-medium">Assessment Title *</Label>
                <Input
                  id="assessment-title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors({...errors, title: undefined});
                  }}
                  placeholder="Enter assessment title"
                  className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="assessment-description" className="text-sm font-medium">Description *</Label>
                <Textarea
                  id="assessment-description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({...errors, description: undefined});
                  }}
                  placeholder="Describe the assessment objectives and instructions"
                  className={`mt-1 resize-none ${errors.description ? 'border-red-500' : ''}`}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Assessment Image</Label>
                <ImageUpload
                  currentImage={image || undefined}
                  onImageChange={setImage}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Status</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={status === 'draft'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mr-2"
                    />
                    Draft
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === 'published'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mr-2"
                    />
                    Published
                  </label>
                </div>
              </div>
              
              <div className="pb-6"></div>
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 p-4 sm:p-6 border-t bg-white flex-shrink-0">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate} 
            className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
          >
            Update Assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};