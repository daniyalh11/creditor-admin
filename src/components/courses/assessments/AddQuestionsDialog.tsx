
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, ArrowLeft, X } from 'lucide-react';

interface AddQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentType: string;
  onPublish: () => void;
  onBackToDetails: () => void;
}

export const AddQuestionsDialog: React.FC<AddQuestionsDialogProps> = ({
  open,
  onOpenChange,
  assessmentType,
  onPublish,
  onBackToDetails
}) => {
  const [timeLimit, setTimeLimit] = useState(15);
  const [essayPrompt, setEssayPrompt] = useState('');
  const [wordLimit, setWordLimit] = useState(500);
  const [gradingRubric, setGradingRubric] = useState('');
  const [points, setPoints] = useState(1);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(60);
  const [explanation, setExplanation] = useState('');

  const handleSaveDraft = () => {
    console.log('Save as draft');
    onOpenChange(false);
  };

  const handlePreviewAssessment = () => {
    console.log('Preview assessment');
  };

  const handlePublishAssessment = () => {
    onPublish();
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-semibold">Create New Assessment</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(90vh-180px)]">
            <div className="px-6 py-6 space-y-8">
              {/* Assessment Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Assessment Settings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="time-limit" className="text-sm font-medium text-gray-700">
                      Assessment Time Limit (minutes)
                    </Label>
                    <Input
                      id="time-limit"
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total time allowed for the entire assessment</p>
                  </div>
                </div>
              </div>

              {/* Create New Question Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Create New Question - {assessmentType}
                </h2>
                
                <div className="space-y-6">
                  {/* Essay Prompt */}
                  <div>
                    <Label htmlFor="essay-prompt" className="text-sm font-medium text-gray-700">
                      Essay Prompt
                    </Label>
                    <Textarea
                      id="essay-prompt"
                      value={essayPrompt}
                      onChange={(e) => setEssayPrompt(e.target.value)}
                      placeholder="Enter the essay question or prompt..."
                      className="mt-2 resize-none min-h-[120px]"
                      rows={5}
                    />
                  </div>

                  {/* Word Limit and Grading Rubric Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="word-limit" className="text-sm font-medium text-gray-700">
                        Word Limit (optional)
                      </Label>
                      <Input
                        id="word-limit"
                        type="number"
                        value={wordLimit}
                        onChange={(e) => setWordLimit(Number(e.target.value))}
                        placeholder="e.g. 500"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Grading Rubric */}
                  <div>
                    <Label htmlFor="grading-rubric" className="text-sm font-medium text-gray-700">
                      Grading Rubric
                    </Label>
                    <Textarea
                      id="grading-rubric"
                      value={gradingRubric}
                      onChange={(e) => setGradingRubric(e.target.value)}
                      placeholder="Define grading criteria and point distribution..."
                      className="mt-2 resize-none min-h-[120px]"
                      rows={5}
                    />
                  </div>

                  {/* Points and Time Limit Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="points" className="text-sm font-medium text-gray-700">
                        Points
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time-limit-seconds" className="text-sm font-medium text-gray-700">
                        Time Limit (seconds)
                      </Label>
                      <Input
                        id="time-limit-seconds"
                        type="number"
                        value={timeLimitSeconds}
                        onChange={(e) => setTimeLimitSeconds(Number(e.target.value))}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <Label htmlFor="explanation" className="text-sm font-medium text-gray-700">
                      Explanation (optional)
                    </Label>
                    <Textarea
                      id="explanation"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Provide explanation for the correct answer..."
                      className="mt-2 resize-none min-h-[120px]"
                      rows={5}
                    />
                  </div>

                  {/* Add Question Button */}
                  <div className="flex justify-center">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center gap-3 p-6 border-t bg-white flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onBackToDetails}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Details
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePreviewAssessment}>
              Preview Assessment
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handlePublishAssessment}
            >
              Publish Assessment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
