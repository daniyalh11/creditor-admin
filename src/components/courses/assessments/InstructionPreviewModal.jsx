import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const InstructionPreviewModal = ({
  isOpen,
  onClose,
  onSaveChanges,
  instructionTitle,
  instructionPoints,
  backgroundColor,
  getBackgroundColorValue
}) => {
  const handleStartAssessment = () => {
    console.log('Starting assessment...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs sm:max-w-2xl max-h-[90vh] p-0" hideCloseButton>
        <DialogHeader className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <DialogTitle className="text-lg sm:text-xl font-semibold">Preview</DialogTitle>
        </DialogHeader>

        <div className="p-4 sm:p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <Card 
            className="p-4 sm:p-6" 
            style={{ 
              borderColor: getBackgroundColorValue(backgroundColor), 
              backgroundColor: `${getBackgroundColorValue(backgroundColor)}10` 
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-lg sm:text-xl font-semibold" 
                style={{ color: getBackgroundColorValue(backgroundColor) }}
              >
                {instructionTitle || 'Instruction Title'}
              </h2>
            </div>
            
            <div className="space-y-2 mb-6">
              {instructionPoints.filter(point => point.trim()).map((point, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="font-medium min-w-[20px]">{index + 1}.</span>
                  <span className="text-sm sm:text-base">{point}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <Button 
                onClick={handleStartAssessment}
                style={{ backgroundColor: getBackgroundColorValue(backgroundColor) }} 
                className="text-white hover:opacity-90 w-full sm:w-auto"
              >
                Start Assessment
              </Button>
            </div>
          </Card>
        </div>

        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button 
              onClick={onSaveChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};