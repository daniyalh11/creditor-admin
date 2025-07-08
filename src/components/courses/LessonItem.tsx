
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Play, FileText, Video, Headphones } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'video' | 'audio';
  duration: string;
  content: string;
}

interface LessonItemProps {
  lesson: Lesson;
  onViewContent: (lesson: Lesson) => void;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: string) => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  onViewContent,
  onEdit,
  onDelete
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'audio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-3 rounded-lg ${
              lesson.type === 'video' ? 'bg-blue-100' : 
              lesson.type === 'audio' ? 'bg-purple-100' : 'bg-green-100'
            }`}>
              {getTypeIcon(lesson.type)}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {lesson.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {lesson.description}
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(lesson.type)}`}>
                  {getTypeIcon(lesson.type)}
                  <span className="ml-1 capitalize">{lesson.type}</span>
                </Badge>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(lesson)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(lesson.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => onViewContent(lesson)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-4 w-4 mr-2" />
              View Content
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
