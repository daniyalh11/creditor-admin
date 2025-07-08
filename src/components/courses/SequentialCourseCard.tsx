
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Published' | 'Draft';
  courseType: 'Open' | 'Sequential';
  students: number;
  moduleCount: number;
  createdAt: string;
  lastUpdated: string;
  thumbnail: string;
  difficulty: string;
  duration: string;
  isActive: boolean;
}

interface SequentialCourseCardProps {
  course: Course;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress?: number;
  onCourseClick: (courseId: string) => void;
  onCourseAction: (action: string, courseId: string) => void;
}

export const SequentialCourseCard: React.FC<SequentialCourseCardProps> = ({
  course,
  isUnlocked,
  isCompleted,
  progress = 0,
  onCourseClick,
  onCourseAction
}) => {
  const handleCardClick = () => {
    onCourseClick(course.id);
  };

  const handleStartCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCourseAction('start', course.id);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border",
        "hover:shadow-lg cursor-pointer border-gray-200 hover:border-blue-300 bg-white"
      )}
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-300",
              "hover:scale-105"
            )}
          />
          {isCompleted && (
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-purple-500 text-white"
        >
          Sequential
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900">
          {course.title}
        </CardTitle>
        <p className="text-sm line-clamp-2 text-gray-600">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Progress bar for courses with progress */}
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.moduleCount} modules</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {course.difficulty}
          </Badge>
          
          <Button 
            size="sm" 
            onClick={handleStartCourse}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Play className="h-4 w-4 mr-1" />
            {progress > 0 ? 'Continue' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
