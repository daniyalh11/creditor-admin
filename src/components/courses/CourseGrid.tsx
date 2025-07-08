import React from 'react';
import { MoreHorizontal, Edit, Eye, Trash2, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SequentialCourseCard } from './SequentialCourseCard';
import { useNavigate } from 'react-router-dom';

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

interface CourseGridProps {
  courses: Course[];
  onCourseClick: (courseId: string) => void;
  onCourseAction: (action: string, courseId: string) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, onCourseClick, onCourseAction }) => {
  const navigate = useNavigate();

  // Mock user progress data - in a real app, this would come from a backend
  const getUserProgress = (courseId: string) => {
    const progressData: { [key: string]: { completed: boolean; progress: number } } = {
      '7': { completed: false, progress: 25 }, // First course with some progress
      '8': { completed: false, progress: 0 },
      '9': { completed: false, progress: 0 },
      '10': { completed: false, progress: 0 },
      '11': { completed: false, progress: 0 },
      '12': { completed: false, progress: 0 },
    };
    return progressData[courseId] || { completed: false, progress: 0 };
  };

  const handleEditCourse = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/courses/create?edit=true&courseId=${courseId}`);
  };

  // Group courses by type
  const openCourses = courses.filter(course => course.courseType === 'Open');
  const sequentialCourses = courses.filter(course => course.courseType === 'Sequential');

  const renderOpenCourseCard = (course: Course) => (
    <Card 
      key={course.id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
      onClick={() => onCourseClick(course.id)}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-blue-500 text-white"
        >
          Open
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCourseAction('view', course.id); }}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleEditCourse(course.id, e)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onCourseAction('archive', course.id); }}>
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onCourseAction('delete', course.id); }}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course.title}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">
          {course.description}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{course.students} students</span>
          <span>{course.moduleCount} modules</span>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {course.difficulty}
          </Badge>
          <Badge variant={course.status === 'Published' ? 'default' : 'secondary'} className="text-xs">
            {course.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Open Courses */}
      {openCourses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Open Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openCourses.map(renderOpenCourseCard)}
          </div>
        </div>
      )}

      {/* Sequential Courses */}
      {sequentialCourses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Sequential Learning Path</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sequentialCourses.map((course) => {
              const progress = getUserProgress(course.id);
              
              return (
                <SequentialCourseCard
                  key={course.id}
                  course={course}
                  isUnlocked={true} // All sequential courses are now unlocked
                  isCompleted={progress.completed}
                  progress={progress.progress}
                  onCourseClick={onCourseClick}
                  onCourseAction={onCourseAction}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;
