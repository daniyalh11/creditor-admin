import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Rocket } from 'lucide-react'; // Using lucide-react for icons

export const PublishSection = ({
  modules,
  onPublishCourse
}) => {
  const isReadyToPublish = modules.length > 0;

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-green-700" />
          </div>
          <h3 className="text-lg font-semibold text-green-900">
            Ready to Publish?
          </h3>
        </div>
        <p className="text-green-800 mb-4 ml-11">
          Once you're satisfied with your course content, publish it to make it available to students.
        </p>
        <div className="ml-11">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onPublishCourse}
            disabled={!isReadyToPublish}
            title={!isReadyToPublish ? "You must add at least one module before publishing" : "Publish your course"}
          >
            <Rocket className="h-4 w-4 mr-2" />
            Publish Course
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Define prop types for runtime type checking
PublishSection.propTypes = {
  modules: PropTypes.array.isRequired,
  onPublishCourse: PropTypes.func.isRequired,
};