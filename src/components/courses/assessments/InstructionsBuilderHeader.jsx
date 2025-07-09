import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';

export const InstructionsBuilderHeader = ({
  onBack,
  onPreview,
  hasInstructions
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-6 flex-shrink-0">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Assessment Instructions</h1>
            <p className="text-gray-600 mt-1">Configure your assessment instructions and settings</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button 
            variant="outline"
            onClick={onPreview}
            disabled={!hasInstructions}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Publish</Button>
        </div>
      </div>
    </div>
  );
};