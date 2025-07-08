import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  BarChart3, 
  Users, 
  GraduationCap, 
  Settings,
  ChevronLeft,
  ChevronRight
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

interface ModernCourseSidebarProps {
  course: Course;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggle: (collapsed: boolean) => void;
  onBackToCourses: () => void;
  isCollapsed: boolean;
}

export const ModernCourseSidebar: React.FC<ModernCourseSidebarProps> = ({
  course,
  activeSection,
  onSectionChange,
  onToggle,
  onBackToCourses,
  isCollapsed
}) => {
  const sidebarItems = [
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'scores', label: 'Scores', icon: BarChart3 },
    { id: 'learners', label: 'Learners', icon: Users },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const toggleCollapse = () => {
    onToggle(!isCollapsed);
  };

  return (
    <div className={cn(
      "h-full bg-white flex flex-col border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Course Info Header - Start from top with logo area */}
      {!isCollapsed && (
        <div className="px-4 py-4 border-b border-gray-200 flex-shrink-0 bg-gray-50">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {course.title}
            </h2>
            <div className="text-sm text-gray-600">
              {course.category} • {course.students} students
            </div>
            <div className="text-xs text-gray-500">
              Course Navigation
            </div>
          </div>
        </div>
      )}

      {/* Collapsed header with proper spacing */}
      {isCollapsed && (
        <div className="p-2 border-b border-gray-200 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mx-auto">
            <span className="text-blue-600 font-bold text-xs">CS</span>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 px-2 py-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full h-10 text-left transition-all duration-200 relative group",
                  isCollapsed ? "justify-center px-2" : "justify-start px-3",
                  isActive 
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-r-2 border-blue-600" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn(
                  "h-4 w-4 flex-shrink-0",
                  !isCollapsed ? "mr-3" : "",
                  isActive ? "text-blue-600" : "text-gray-500"
                )} />
                
                {!isCollapsed && (
                  <span className="font-medium text-sm truncate">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Course Status Info - Only show when expanded */}
      {!isCollapsed && (
        <div className="p-3 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">Status</span>
              <Badge 
                variant={course.status === 'Published' ? 'default' : 'secondary'}
                className="text-xs px-2 py-0"
              >
                {course.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">Type</span>
              <span className="text-gray-700 text-xs capitalize">
                {course.progressionType}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle Button */}
      <div className="p-2 border-t border-gray-200 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="w-full h-8 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
