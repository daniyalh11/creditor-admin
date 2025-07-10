import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bold, Italic } from 'lucide-react'; // Import icons for better representation

export const StatementBlockModal = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type) => {
    onSelect(type);
    onOpenChange(false);
  };

  const statementOptions = [
    {
      id: 'italic',
      icon: <Italic className="h-4 w-4" />,
      title: 'Italic Statement',
      subtitle: 'Emphasized and centered text',
      preview: (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center max-w-sm mx-auto min-h-[100px] flex items-center justify-center">
          <p className="text-gray-800 text-sm leading-relaxed italic">
            "This is an important statement that stands out."
          </p>
        </div>
      )
    },
    {
      id: 'bold',
      icon: <Bold className="h-4 w-4" />,
      title: 'Bold Statement',
      subtitle: 'Strong, left-aligned text with a colored line',
      preview: (
        <div className="text-left p-3 bg-white border rounded max-w-sm min-h-[100px] flex flex-col justify-center">
          <div className="w-8 h-0.5 bg-blue-500 mb-3"></div>
          <p className="text-gray-800 text-sm leading-relaxed font-bold">
            "This is an important statement that stands out."
          </p>
        </div>
      )
    },
    {
      id: 'caps',
      icon: 'A',
      title: 'Uppercase Statement',
      subtitle: 'All caps for maximum impact',
      preview: (
        <div className="text-center p-3 bg-white max-w-sm min-h-[100px] flex items-center justify-center">
          <p className="text-gray-800 text-sm leading-relaxed uppercase font-semibold tracking-wider">
            "THIS IS AN IMPORTANT STATEMENT THAT STANDS OUT."
          </p>
        </div>
      )
    },
    {
      id: 'highlighted',
      icon: '⭐',
      title: 'Highlighted Statement',
      subtitle: 'Text with a colored background',
      preview: (
        <div className="p-3 bg-white max-w-sm min-h-[100px] flex items-center justify-center">
          <p className="text-sm leading-relaxed">
            <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded">
              "This is an important statement that stands out."
            </span>
          </p>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Statement Style</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {statementOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="h-auto p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
              onClick={() => handleSelect(option.id)}
            >
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{option.title}</div>
                    <div className="text-xs text-gray-500">{option.subtitle}</div>
                  </div>
                </div>
                <div className="w-full">
                  {option.preview}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Define prop types for runtime type checking
StatementBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};