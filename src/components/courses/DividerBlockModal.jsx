import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Minus, Hash, Space } from 'lucide-react';

export const DividerBlockModal = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type) => {
    onSelect(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Divider Type</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-6">
          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('continue')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Continue</div>
              <div className="text-sm text-gray-600 mb-4">Add a continue button for user interaction</div>
            </div>
            
            {/* Continue Button Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Continue Button</div>
              <div className="flex justify-center">
                <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                  Continue
                </div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('divider')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Minus className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Divider</div>
              <div className="text-sm text-gray-600 mb-4">Add a horizontal line to separate content</div>
            </div>
            
            {/* Horizontal Divider Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Horizontal Divider</div>
              <div className="flex justify-center">
                <div className="w-20 h-px bg-gray-300"></div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('number')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Hash className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Number Divider</div>
              <div className="text-sm text-gray-600 mb-4">Add a numbered step divider</div>
            </div>
            
            {/* Number Divider Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Number Divider</div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  1
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('space')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Space className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Space</div>
              <div className="text-sm text-gray-600 mb-4">Add vertical spacing between content</div>
            </div>
            
            {/* Vertical Space Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Vertical Space</div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-px bg-gray-300"></div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="w-12 h-px bg-gray-300"></div>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
DividerBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};