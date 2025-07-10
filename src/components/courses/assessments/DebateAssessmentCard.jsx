import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const DebateAssessmentCard = ({
  assessment,
  onView
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                <span className="text-red-600 text-sm">💬</span>
              </div>
              <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
              <Badge className={getDifficultyColor(assessment.difficulty || 'Medium')}>
                {assessment.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{assessment.description}</p>
            {assessment.topic && (
              <p className="text-sm text-gray-500 italic mb-3">
                <strong>Topic:</strong> {assessment.topic}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span><strong>Max Score:</strong> {assessment.maxScore}</span>
              <span><strong>Format:</strong> {assessment.format}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => onView(assessment.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Debate
          </Button>
        </div>
      </div>
    </div>
  );
};