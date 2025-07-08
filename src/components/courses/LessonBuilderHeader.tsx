
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LessonBuilderHeaderProps {
  courseId: string;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: (lessonData: any) => void;
  addedBlocks: any[];
  lessonTitle?: string;
}

export const LessonBuilderHeader: React.FC<LessonBuilderHeaderProps> = ({
  courseId,
  onSaveDraft,
  onPreview,
  onPublish,
  addedBlocks,
  lessonTitle = "New Lesson"
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    navigate(`/courses/builder/${courseId}/units`);
  };

  const handlePublish = () => {
    const lessonData = {
      id: Date.now().toString(),
      title: lessonTitle,
      blocks: addedBlocks,
      publishedAt: new Date().toISOString(),
      status: 'published'
    };

    onPublish(lessonData);
    
    toast({
      title: "✅ Course published successfully",
      description: "Your lesson has been published and is now available.",
    });

    // Redirect to units page
    navigate(`/courses/builder/${courseId}/units`);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-blue-600">{lessonTitle}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSaveDraft}
        >
          Save as Draft
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPreview}
        >
          Preview
        </Button>
        <Button 
          size="sm"
          onClick={handlePublish}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={addedBlocks.length === 0}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};
