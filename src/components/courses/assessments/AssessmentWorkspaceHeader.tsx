
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface AssessmentWorkspaceHeaderProps {
  selectedAssessmentType: string | null;
  assessmentSettings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  onBack: () => void;
  onPreview: () => void;
  onPublish: () => void;
}

export const AssessmentWorkspaceHeader: React.FC<AssessmentWorkspaceHeaderProps> = ({
  selectedAssessmentType,
  assessmentSettings,
  onBack,
  onPreview,
  onPublish
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-6 flex-shrink-0">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {selectedAssessmentType ? assessmentSettings.title : 'New Assessment'}
            </h1>
            <p className="text-gray-600 mt-1">
              {selectedAssessmentType 
                ? assessmentSettings.description || 'Add questions to your assessment using the sidebar'
                : 'Select an assessment type from the sidebar to get started'
              }
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button variant="outline" onClick={onPreview}>Preview</Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onPublish}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
