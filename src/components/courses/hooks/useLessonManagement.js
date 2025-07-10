import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLessonManagement = (initialLessons) => {
  const { toast } = useToast();
  const [lessons, setLessons] = useState(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleViewContent = (lesson) => {
    setSelectedLesson(lesson);
    setIsPlaying(false);
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setShowEditModal(true);
  };

  const handleDelete = (lessonId) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    if (selectedLesson && selectedLesson.id === lessonId) {
      setSelectedLesson(null);
    }
    toast({
      title: "Success",
      description: "Lesson deleted successfully.",
    });
  };

  const handleUpdateLesson = (updatedLesson) => {
    setLessons(lessons.map(lesson => 
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    ));
    if (selectedLesson && selectedLesson.id === updatedLesson.id) {
      setSelectedLesson(updatedLesson);
    }
  };

  const handleAddLesson = () => {
    toast({
      title: "Add Lesson",
      description: "Add lesson functionality would open here.",
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: `${selectedLesson?.type === 'audio' ? 'Audio' : 'Video'} ${isPlaying ? 'paused' : 'started playing'}.`,
    });
  };

  return {
    lessons,
    selectedLesson,
    showEditModal,
    editingLesson,
    isPlaying,
    setSelectedLesson,
    setShowEditModal,
    setEditingLesson,
    handleViewContent,
    handleEdit,
    handleDelete,
    handleUpdateLesson,
    handleAddLesson,
    handlePlayPause,
  };
};