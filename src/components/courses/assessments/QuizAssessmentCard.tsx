
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Assessment } from './types';

interface QuizAssessmentCardProps {
  assessment: Assessment;
  onView: (quizId: string) => void;
}

export const QuizAssessmentCard: React.FC<QuizAssessmentCardProps> = ({
  assessment,
  onView
}) => {
  const getDifficultyColor = (difficulty: string) => {
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
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600 text-sm">📝</span>
          </div>
          <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
          <Badge className="bg-blue-100 text-blue-800">
            {assessment.type === 'Quiz' ? 'General Quiz' : assessment.type}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3">{assessment.description}</p>
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Time: {assessment.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <span>Attempts: {assessment.attempts}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>❓</span>
            <span>{assessment.questions} questions</span>
          </div>
        </div>
        <Badge className={getDifficultyColor(assessment.difficulty || 'Medium')}>
          {assessment.difficulty}
        </Badge>
        <div className="pt-2">
          <Button
            onClick={() => onView(assessment.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
