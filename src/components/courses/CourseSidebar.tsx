
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Trophy, 
  Users, 
  GraduationCap, 
  Gamepad2, 
  Settings,
  Newspaper,
  ChevronRight,
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Published' | 'Draft';
  students: number;
  thumbnail?: string;
  createdAt: string;
  progressionType: 'open' | 'sequential';
}

interface CourseSidebarProps {
  course: Course;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggle?: (collapsed: boolean) => void;
  onBackToCourses: () => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  course,
  activeSection,
  onSectionChange,
  onToggle,
  onBackToCourses
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'modules', label: 'Modules', icon: BookOpen, color: 'text-blue-600' },
    { id: 'news', label: 'News', icon: Newspaper, color: 'text-green-600' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'text-purple-600' },
    { id: 'scores', label: 'Scores', icon: BarChart3, color: 'text-orange-600' },
    { id: 'mastery', label: 'Mastery', icon: Trophy, color: 'text-yellow-600' },
    { id: 'learners', label: 'Learners', icon: Users, color: 'text-pink-600' },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap, color: 'text-indigo-600' },
    { id: 'games', label: 'Games', icon: Gamepad2, color: 'text-red-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
  ];

  const getInitials = (text: string) => {
    return text.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onToggle) {
      onToggle(newCollapsed);
    }
  };

  return (
    <div className={cn(
      "fixed top-0 bottom-0 bg-white border-r border-gray-200 flex flex-col shadow-lg z-30 transition-all duration-300 left-0",
      isCollapsed ? "w-20" : "w-80"
    )}>
      {!isCollapsed && (
        <>
          {/* Course Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToCourses}
                className="h-8 w-8 hover:bg-gray-100"
                title="Back to Courses"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Course</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-8 w-8 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Course Header - Smaller */}
          <div className="p-4 border-b border-gray-100 flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 font-medium">{course.category}</p>
              </div>
            </div>
          </div>

          {/* Navigation - Scrollable */}
          <ScrollArea className="flex-1 py-2">
            <nav className="px-3 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      "w-full justify-start px-4 py-3 h-auto text-left cursor-pointer group transition-all duration-200 rounded-lg",
                      "hover:bg-gray-50 hover:shadow-sm",
                      isActive 
                        ? "bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600 hover:bg-blue-100" 
                        : "text-gray-700 hover:text-gray-900"
                    )}
                  >
                    <div className="flex items-center w-full">
                      <Icon className={cn(
                        "h-5 w-5 mr-3 flex-shrink-0 transition-colors",
                        isActive ? "text-blue-600" : item.color
                      )} />
                      <span className="truncate font-medium flex-1">{item.label}</span>
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform opacity-0 group-hover:opacity-100",
                        isActive && "opacity-100 text-blue-600"
                      )} />
                    </div>
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Course Info - Fixed at bottom */}
          <div className="p-4 border-t border-gray-100 flex-shrink-0 bg-gray-50/80 backdrop-blur-sm">
            <div className="text-xs text-gray-500 space-y-2 bg-white p-3 rounded-lg border">
              <div className="flex justify-between">
                <span className="font-medium">Course ID:</span>
                <span className="font-mono">{course.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Created:</span>
                <span>{new Date(course.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Progression:</span>
                <span className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  course.progressionType === 'open' 
                    ? "bg-green-100 text-green-700" 
                    : "bg-orange-100 text-orange-700"
                )}>
                  {course.progressionType === 'open' ? 'Open' : 'Sequential'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Collapsed State - Show only icons */}
      {isCollapsed && (
        <>
          {/* Collapsed Header with expand button */}
          <div className="p-4 border-b border-gray-100 flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToCourses}
              className="h-8 w-8 hover:bg-gray-100"
              title="Back to Courses"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-8 w-8 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="py-2">
            <div className="flex flex-col items-center space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="icon"
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      "h-10 w-10 transition-all duration-200",
                      isActive 
                        ? "bg-blue-50 text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                    title={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
