
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PublishSectionProps {
  modules: Array<any>;
  onPublishCourse: () => void;
}

export const PublishSection: React.FC<PublishSectionProps> = ({
  modules,
  onPublishCourse
}) => {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-green-800">
            Ready to Publish?
          </h3>
        </div>
        <p className="text-green-700 mb-4">
          Once you're satisfied with your modules and content, publish your course to make it available to students.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onPublishCourse}
          disabled={modules.length === 0}
        >
          <span className="mr-2">↗</span>
          Publish Course
        </Button>
      </CardContent>
    </Card>
  );
};
