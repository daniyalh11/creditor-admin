import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, FileText, Video, Headphones } from 'lucide-react';
import { LessonContentRenderer } from './LessonContentRenderer';

export const LessonDetailView = ({
  lesson,
  isPlaying,
  onBack,
  onEdit,
  onDelete,
  onPlayPause
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type) => {
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
    <div className="space-y-6 animate-fade-in">
      {/* Content Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(lesson.type)}`}>
                {getTypeIcon(lesson.type)}
                <span className="ml-1 capitalize">{lesson.type}</span>
              </Badge>
              <span className="text-sm text-gray-600">{lesson.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(lesson)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(lesson.id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg border p-6">
        <LessonContentRenderer 
          lesson={lesson}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
        />
      </div>
    </div>
  );
};

// Add prop-types for runtime validation in JavaScript
LessonDetailView.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'video', 'audio']).isRequired,
    duration: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
};