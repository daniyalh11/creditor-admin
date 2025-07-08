
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AssessmentTypesTab } from './tabs/AssessmentTypesTab';
import { QuestionTypesTab } from './tabs/QuestionTypesTab';
import { AssessmentSettingsTab } from './tabs/AssessmentSettingsTab';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface AssessmentBuilderSidebarProps {
  selectedAssessmentType: string | null;
  onAssessmentTypeSelect: (type: string) => void;
  assessmentSettings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  onSettingsChange: (settings: any) => void;
  onInstructionsClick?: () => void;
  showInstructions?: boolean;
}

export const AssessmentBuilderSidebar: React.FC<AssessmentBuilderSidebarProps> = ({
  selectedAssessmentType,
  onAssessmentTypeSelect,
  assessmentSettings,
  onSettingsChange,
  onInstructionsClick,
  showInstructions = false
}) => {
  const [activeTab, setActiveTab] = useState('types');

  const handleAssessmentTypeSelect = (type: string) => {
    onAssessmentTypeSelect(type);
    setActiveTab('questions');
  };

  // Show Questions tab only when an assessment type is selected
  const tabs = selectedAssessmentType 
    ? ['types', 'questions', 'settings']
    : ['types', 'settings'];

  return (
    <div className="h-full bg-white flex flex-col border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">Assessment Builder</h2>
        <p className="text-sm text-gray-600">Create and manage your assessment</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab('types')}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'types'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Types
          </button>
          {selectedAssessmentType && (
            <button
              onClick={() => setActiveTab('questions')}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === 'questions'
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              Questions
            </button>
          )}
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              activeTab === 'settings'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'types' && (
          <AssessmentTypesTab
            selectedAssessmentType={selectedAssessmentType}
            onAssessmentTypeSelect={handleAssessmentTypeSelect}
          />
        )}

        {activeTab === 'questions' && selectedAssessmentType && (
          <div>
            {/* Instructions Button - Only show in questions tab and not during instructions editing */}
            {!showInstructions && (
              <div className="p-4 border-b border-gray-200">
                <Button
                  onClick={onInstructionsClick}
                  variant="outline"
                  className="w-full justify-start gap-2 text-left"
                >
                  <FileText className="h-4 w-4" />
                  Instructions
                </Button>
              </div>
            )}
            <QuestionTypesTab selectedAssessmentType={selectedAssessmentType} />
          </div>
        )}

        {activeTab === 'settings' && (
          <AssessmentSettingsTab
            assessmentSettings={assessmentSettings}
            onSettingsChange={onSettingsChange}
          />
        )}
      </div>
    </div>
  );
};
