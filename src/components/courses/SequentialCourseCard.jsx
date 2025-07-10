import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, BookOpen, Check } from 'lucide-react'; // Added Check icon
import { cn } from '@/lib/utils';

export const SequentialCourseCard = ({
  course,
  isUnlocked,
  isCompleted,
  progress = 0,
  onCourseClick,
  onCourseAction
}) => {
  const handleCardClick = () => {
    if (!isUnlocked) return; // Prevent clicking if locked
    onCourseClick(course.id);
  };

  const handleStartCourse = (e) => {
    e.stopPropagation();
    onCourseAction('start', course.id);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border",
        isUnlocked ? "hover:shadow-lg cursor-pointer border-gray-200 hover:border-blue-300 bg-white" : "bg-gray-50 text-gray-400",
        isCompleted && "border-green-300"
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
              isUnlocked && "group-hover:scale-105",
              !isUnlocked && "filter grayscale"
            )}
          />
          {isCompleted && (
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-purple-500 text-white border-purple-600"
        >
          Sequential
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className={cn("text-lg font-semibold line-clamp-2", isUnlocked ? "text-gray-900" : "text-gray-500")}>
          {course.title}
        </CardTitle>
        <p className="text-sm line-clamp-2 text-gray-600">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Progress bar for courses with progress */}
        {progress > 0 && isUnlocked && (
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
            disabled={!isUnlocked}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
          >
            <Play className="h-4 w-4 mr-1" />
            {progress > 0 ? 'Continue' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Define prop types for runtime type checking
SequentialCourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Published', 'Draft']).isRequired,
    courseType: PropTypes.oneOf(['Open', 'Sequential']).isRequired,
    students: PropTypes.number.isRequired,
    moduleCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  isUnlocked: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  onCourseClick: PropTypes.func.isRequired,
  onCourseAction: PropTypes.func.isRequired,
};

// Default props
SequentialCourseCard.defaultProps = {
  progress: 0,
};