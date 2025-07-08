
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Target, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AssignmentCardProps {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimit: number;
  maxScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status?: string;
  wordLimit?: number;
  onViewAssignment?: (assignmentId: string) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  id,
  courseId,
  title,
  description,
  timeLimit,
  maxScore,
  difficulty,
  status,
  wordLimit,
  onViewAssignment
}) => {
  const navigate = useNavigate();

  const getDifficultyColor = (level: string) => {
    switch (level) {
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

  const handleViewAssignment = () => {
    if (onViewAssignment) {
      onViewAssignment(id);
    } else {
      // Navigate to the admin assignment dashboard with specific assignment
      navigate(`/admin/courses/${courseId}/assignments/${id}`);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
            </div>
          </div>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{timeLimit} minutes</span>
          </div>
          {wordLimit && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="h-4 w-4" />
              <span>{wordLimit} words</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="h-4 w-4" />
            <span>Max Score: {maxScore}</span>
          </div>
          {status && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="capitalize">{status}</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleViewAssignment}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          View Assignment
        </Button>
      </CardContent>
    </Card>
  );
};
