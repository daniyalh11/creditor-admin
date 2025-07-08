
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

interface SurveyQuestion {
  id: string;
  type: 'survey-mcq' | 'description';
  question: string;
  options?: Array<{ id: string; text: string; }>;
  allowMultiple?: boolean;
  feedback?: string;
  required?: boolean;
}

interface SurveyInstruction {
  id: string;
  content: string;
}

interface SurveyData {
  id: string;
  title: string;
  description: string;
  instructions: SurveyInstruction[];
  questions: SurveyQuestion[];
  status: 'Draft' | 'Published';
  createdAt: string;
  publishedAt?: string;
}

interface SurveyPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyData: SurveyData;
}

export const SurveyPreviewModal: React.FC<SurveyPreviewModalProps> = ({
  isOpen,
  onClose,
  surveyData
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Survey Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Survey Header */}
          <div className="text-center space-y-2 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900">{surveyData.title}</h2>
            {surveyData.description && (
              <p className="text-gray-600">{surveyData.description}</p>
            )}
          </div>

          {/* Instructions */}
          {surveyData.instructions.map((instruction) => (
            <Card key={instruction.id} className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Instructions</span>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: instruction.content }}
                />
              </CardContent>
            </Card>
          ))}

          {/* Questions */}
          <div className="space-y-4">
            {surveyData.questions.map((question, index) => (
              <Card key={question.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-blue-600 capitalize">
                            {question.type.replace('-', ' ')}
                          </span>
                          {question.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900 mb-3">{question.question}</h3>
                        
                        {question.type === 'survey-mcq' && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <div key={option.id} className="flex items-center space-x-3">
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full hover:border-blue-500 cursor-pointer transition-colors"></div>
                                <span className="text-gray-700">{option.text}</span>
                              </div>
                            ))}
                            {question.allowMultiple && (
                              <p className="text-xs text-blue-600 mt-2">Multiple selections allowed</p>
                            )}
                          </div>
                        )}

                        {question.type === 'description' && (
                          <div className="p-3 bg-gray-50 rounded border-2 border-dashed border-gray-300">
                            <p className="text-sm text-gray-500">Text response area</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button Preview */}
          <div className="flex justify-center pt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Survey
            </Button>
          </div>

          {/* Preview Footer */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            This is a preview. Participants will see this layout when taking the survey.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
