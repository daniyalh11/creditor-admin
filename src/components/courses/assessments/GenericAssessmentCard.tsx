
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Assessment } from './types';

interface GenericAssessmentCardProps {
  assessment: Assessment;
  onView: (assessment: Assessment) => void;
}

export const GenericAssessmentCard: React.FC<GenericAssessmentCardProps> = ({
  assessment,
  onView
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Quiz':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Essay':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assignment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Survey':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Debate':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900">{assessment.title}</h4>
            <Badge variant="outline" className={`text-xs ${getTypeColor(assessment.type)}`}>
              {assessment.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">{assessment.description}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{assessment.duration} min</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(assessment)}
          className="bg-white hover:bg-gray-50"
        >
          View Content
        </Button>
      </div>
    </div>
  );
};
