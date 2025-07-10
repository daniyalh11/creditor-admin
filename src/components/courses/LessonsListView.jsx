import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { LessonItem } from './LessonItem';
import { useNavigate, useParams } from 'react-router-dom';

export const LessonsListView = ({
  moduleTitle,
  lessons,
  onBack,
  onAddLesson,
  onViewContent,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const handleAddLesson = () => {
    if (onAddLesson) {
      // Use the provided onAddLesson function
      onAddLesson();
    } else {
      // Fallback: Navigate to the units builder
      navigate(`/courses/builder/${courseId}/units`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="rounded-full px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{moduleTitle} - Lessons</h1>
            <p className="text-gray-600">Manage and view lesson content for this module</p>
          </div>
        </div>
        <Button 
          onClick={handleAddLesson}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            onViewContent={onViewContent}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

// Add prop-types for runtime validation in JavaScript
LessonsListView.propTypes = {
  moduleTitle: PropTypes.string.isRequired,
  lessons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'video', 'audio']).isRequired,
    duration: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  onBack: PropTypes.func.isRequired,
  onAddLesson: PropTypes.func,
  onViewContent: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};