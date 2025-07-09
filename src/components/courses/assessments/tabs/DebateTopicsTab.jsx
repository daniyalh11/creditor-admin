import React from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DebateTopicsTab = ({
  selectedAssessmentType
}) => {
  const handleAddDebateQuestion = () => {
    const event = new CustomEvent('addDebateTopic');
    window.dispatchEvent(event);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Debate Questions</h3>
        <p className="text-xs text-gray-600 mb-4">Click to add debate questions to your assessment</p>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={handleAddDebateQuestion}
          className={cn(
            "w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-sm hover:border-blue-300",
            "bg-blue-50 border-blue-200"
          )}
        >
          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 mt-0.5 text-gray-600" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900">Debate Question</h4>
              <p className="text-xs text-gray-600 mt-1">Add a debate topic with discussion</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};