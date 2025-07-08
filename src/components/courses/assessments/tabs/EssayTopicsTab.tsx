
import React from 'react';
import { PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EssayTopicsTabProps {
  selectedAssessmentType: string;
}

export const EssayTopicsTab: React.FC<EssayTopicsTabProps> = ({
  selectedAssessmentType
}) => {
  const handleAddEssayQuestion = () => {
    const event = new CustomEvent('addEssayTopic');
    window.dispatchEvent(event);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Essay Questions</h3>
        <p className="text-xs text-gray-600 mb-4">Click to add essay questions to your assessment</p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={handleAddEssayQuestion}
          className={cn(
            "w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-sm hover:border-blue-300",
            "bg-blue-50 border-blue-200"
          )}
        >
          <div className="flex items-start space-x-3">
            <PenTool className="h-5 w-5 mt-0.5 text-gray-600" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900">Essay Question</h4>
              <p className="text-xs text-gray-600 mt-1">Add a question with answer field</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
