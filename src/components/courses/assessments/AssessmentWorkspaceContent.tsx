
import React from 'react';
import { QuizBuilder } from './QuizBuilder';

interface AssessmentWorkspaceContentProps {
  selectedAssessmentType: string;
  assessmentSettings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  onQuestionsChange: (questions: any[]) => void;
}

export const AssessmentWorkspaceContent: React.FC<AssessmentWorkspaceContentProps> = ({
  selectedAssessmentType,
  assessmentSettings,
  onQuestionsChange
}) => {
  if (selectedAssessmentType === 'quiz' || selectedAssessmentType === 'survey' || selectedAssessmentType === 'assignment' || selectedAssessmentType === 'essay' || selectedAssessmentType === 'debate') {
    return (
      <QuizBuilder 
        assessmentSettings={assessmentSettings} 
        onQuestionsChange={onQuestionsChange}
        assessmentType={selectedAssessmentType}
      />
    );
  }

  return (
    <div className="p-8 h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {selectedAssessmentType.charAt(0).toUpperCase() + selectedAssessmentType.slice(1)} Builder
        </h2>
        <p className="text-gray-600">This assessment type builder is coming soon</p>
      </div>
    </div>
  );
};
