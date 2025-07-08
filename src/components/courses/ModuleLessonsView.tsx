
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonEditModal } from './LessonEditModal';
import { LessonDetailView } from './LessonDetailView';
import { LessonsListView } from './LessonsListView';
import { useLessonManagement } from './hooks/useLessonManagement';

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'video' | 'audio';
  duration: string;
  content: string;
}

interface ModuleLessonsViewProps {
  moduleTitle: string;
  onBack: () => void;
}

export const ModuleLessonsView: React.FC<ModuleLessonsViewProps> = ({
  moduleTitle,
  onBack
}) => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  
  const initialLessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Business Trust Fundamentals',
      description: 'Comprehensive overview of business trust concepts and their applications in modern commerce.',
      type: 'text',
      duration: '15 minutes',
      content: 'Business trusts are legal entities that hold and manage assets for the benefit of beneficiaries. They operate under specific legal frameworks and provide various advantages for business operations.'
    },
    {
      id: '2',
      title: 'Digital Marketing Video Tutorial',
      description: 'Visual explanation of digital marketing strategies and implementation techniques.',
      type: 'video',
      duration: '25 minutes',
      content: 'This comprehensive video tutorial covers the essential aspects of digital marketing, from strategy development to execution.'
    },
    {
      id: '3',
      title: 'Legal Framework Audio Lecture',
      description: 'Audio lecture covering the legal aspects and regulatory framework of business operations.',
      type: 'audio',
      duration: '30 minutes',
      content: 'Welcome to this comprehensive audio lecture on the legal framework governing modern business operations.'
    }
  ];

  const {
    lessons,
    selectedLesson,
    showEditModal,
    editingLesson,
    isPlaying,
    setSelectedLesson,
    setShowEditModal,
    handleViewContent,
    handleEdit,
    handleDelete,
    handleUpdateLesson,
    handleAddLesson,
    handlePlayPause,
  } = useLessonManagement(initialLessons);

  // Override the handleAddLesson to navigate to units builder
  const handleAddLessonNavigation = () => {
    console.log('Navigating to units builder for course:', courseId);
    navigate(`/courses/builder/${courseId}/units`);
  };

  if (selectedLesson) {
    return (
      <>
        <LessonDetailView
          lesson={selectedLesson}
          isPlaying={isPlaying}
          onBack={() => setSelectedLesson(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPlayPause={handlePlayPause}
        />
        
        <LessonEditModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          lesson={editingLesson}
          onUpdate={handleUpdateLesson}
          onDelete={handleDelete}
        />
      </>
    );
  }

  return (
    <>
      <LessonsListView
        moduleTitle={moduleTitle}
        lessons={lessons}
        onBack={onBack}
        onAddLesson={handleAddLessonNavigation}
        onViewContent={handleViewContent}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <LessonEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        lesson={editingLesson}
        onUpdate={handleUpdateLesson}
        onDelete={handleDelete}
      />
    </>
  );
};
