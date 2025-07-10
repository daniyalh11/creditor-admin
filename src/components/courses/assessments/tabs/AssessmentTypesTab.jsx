import React from 'react';
import { FileText, Upload, PenTool, BarChart3, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AssessmentTypesTab = ({
  selectedAssessmentType,
  onAssessmentTypeSelect
}) => {
  const assessmentTypes = [
    {
      id: 'quiz',
      title: 'Quiz Section',
      description: 'Test your knowledge with various question formats',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'assignment',
      title: 'Assignment Section', 
      description: 'Submit projects and practical assignments',
      icon: Upload,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'essay',
      title: 'Essay Section',
      description: 'Write detailed essays and analytical pieces',
      icon: PenTool,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'survey',
      title: 'Survey Section',
      description: 'Participate in course feedback and surveys',
      icon: BarChart3,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'debate',
      title: 'Debate Section',
      description: 'Engage in structured debates and discussions',
      icon: MessageSquare,
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Assessment Types</h3>
        <p className="text-xs text-gray-600 mb-4">Choose the type of assessment you want to create</p>
      </div>
      
      <div className="space-y-3">
        {assessmentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onAssessmentTypeSelect(type.id)}
              className={cn(
                "w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-sm",
                type.color,
                selectedAssessmentType === type.id
                  ? "ring-2 ring-blue-500 ring-offset-1"
                  : ""
              )}
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{type.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};