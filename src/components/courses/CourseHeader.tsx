
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Plus, Award } from 'lucide-react';

interface CourseHeaderProps {
  course: {
    id?: string;
    title: string;
    description: string;
  };
  onNavigateBack: () => void;
  onSaveDraft: () => void;
  onAddModule: () => void;
  onAddReward: () => void;
  hasModules: boolean;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  onNavigateBack,
  onSaveDraft,
  onAddModule,
  onAddReward,
  hasModules
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onNavigateBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title || 'Course Builder'}</h1>
            <p className="text-gray-600 mt-1">{course.description || 'Build your course content'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={onSaveDraft}
            className="text-gray-700 hover:text-gray-900"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={onAddModule}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Module
          </Button>
          <Button 
            onClick={onAddReward}
            disabled={!hasModules}
            className={`${
              hasModules 
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Award className="h-4 w-4 mr-2" />
            Add Reward
          </Button>
        </div>
      </div>
    </div>
  );
};
