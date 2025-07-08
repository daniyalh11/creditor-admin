
import React from 'react';
import { Plus } from 'lucide-react';

export const EmptyLessonState: React.FC = () => {
  return (
    <div className="flex-1 p-8">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Plus className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-blue-600 mb-2">Start Building Your Lesson</h3>
        <p className="text-gray-600 max-w-md">
          Add blocks from the sidebar to create engaging content for your students, or choose a template to get started quickly.
        </p>
      </div>
    </div>
  );
};
