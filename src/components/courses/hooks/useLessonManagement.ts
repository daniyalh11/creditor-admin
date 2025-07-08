
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'video' | 'audio';
  duration: string;
  content: string;
}

export const useLessonManagement = (initialLessons: Lesson[]) => {
  const { toast } = useToast();
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleViewContent = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsPlaying(false);
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowEditModal(true);
  };

  const handleDelete = (lessonId: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    if (selectedLesson && selectedLesson.id === lessonId) {
      setSelectedLesson(null);
    }
    toast({
      title: "Success",
      description: "Lesson deleted successfully.",
    });
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
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
