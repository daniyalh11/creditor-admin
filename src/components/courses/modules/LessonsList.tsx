import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronDown, ChevronRight, Edit, Trash2, BookOpen, FileText, Clock, Layers } from 'lucide-react';
import { ContentSectionsList } from './ContentSectionsList';
import { LessonEditDialog } from './LessonEditDialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';

interface ContentSection {
  id: string;
  type: 'text' | 'video' | 'image' | 'file';
  title: string;
  content: string;
}

interface Lesson {
  id: string;
  title: string;
  description?: string;
  sections: ContentSection[];
  expanded?: boolean;
  estimatedTime?: number;
}

interface LessonsListProps {
  unitId: string;
  lessons: Lesson[];
}

export const LessonsList: React.FC<LessonsListProps> = ({ unitId, lessons: initialLessons }) => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const [lessons, setLessons] = useState<(Lesson & { expanded: boolean })[]>(
    initialLessons.map(lesson => ({ 
      ...lesson, 
      expanded: false,
      description: lesson.description || '',
      estimatedTime: lesson.estimatedTime || 15,
    }))
  );
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showLessonDialog, setShowLessonDialog] = useState(false);
  const { toast } = useToast();

  const toggleLesson = (lessonId: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId 
        ? { ...lesson, expanded: !lesson.expanded }
        : lesson
    ));
  };

  const addNewLesson = () => {
    // Navigate to units builder
    console.log('Navigating to units builder for course:', courseId);
    navigate(`/courses/builder/${courseId}/units`);
  };

  const editLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowLessonDialog(true);
  };

  const handleSaveLesson = (lessonData: any) => {
    if (editingLesson) {
      setLessons(lessons.map(lesson => 
        lesson.id === editingLesson.id 
          ? { ...lesson, ...lessonData, expanded: lesson.expanded }
          : lesson
      ));
      toast({
        title: "Lesson updated",
        description: "Lesson has been successfully updated.",
      });
    } else {
      const newLesson: Lesson & { expanded: boolean } = {
        ...lessonData,
        sections: [],
        expanded: true
      };
      setLessons([...lessons, newLesson]);
      toast({
        title: "Lesson created",
        description: "New lesson has been successfully created.",
      });
    }
    setShowLessonDialog(false);
    setEditingLesson(null);
  };

  const deleteLesson = (lessonId: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    toast({
      title: "Lesson deleted",
      description: "Lesson has been successfully deleted.",
    });
  };

  return (
    <div className="ml-6 space-y-3">
      <div className="flex justify-between items-center">
        <h5 className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          Lessons
        </h5>
        <Button variant="outline" size="sm" onClick={addNewLesson}>
          <Plus className="h-4 w-4 mr-1" />
          Add Lesson
        </Button>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-6 border border-dashed rounded-lg border-gray-300">
          <FileText className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm mb-3">No lessons in this unit yet</p>
          <Button variant="outline" size="sm" onClick={addNewLesson}>
            <Plus className="h-4 w-4 mr-1" />
            Create First Lesson
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="border border-gray-200 shadow-sm rounded-md">
              <CardHeader className="py-2.5 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-1 h-6 w-6"
                      onClick={() => toggleLesson(lesson.id)}
                    >
                      {lesson.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                    <div className="flex-1">
                      <CardTitle className="text-sm font-medium">{lesson.title}</CardTitle>
                      {lesson.description && (
                        <p className="text-xs text-gray-600 mt-0.5">{lesson.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.estimatedTime} min
                      </span>
                      <Badge variant="outline" className="text-xs font-normal">
                        <Layers className="h-3 w-3 mr-1" />
                        {lesson.sections.length} sections
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => editLesson(lesson)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteLesson(lesson.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {lesson.expanded && (
                <CardContent className="border-t pt-3 px-4 pb-4 bg-gray-50">
                  <div className="animate-fade-in">
                    <ContentSectionsList lessonId={lesson.id} sections={lesson.sections} />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <LessonEditDialog
        open={showLessonDialog}
        onOpenChange={setShowLessonDialog}
        lesson={editingLesson}
        onSave={handleSaveLesson}
      />
    </div>
  );
};
