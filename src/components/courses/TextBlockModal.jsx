import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Heading1, Heading2, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TextBlockModal = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type) => {
    onSelect(type);
    onOpenChange(false);
  };

  const textBlockOptions = [
    {
      id: 'paragraph',
      icon: FileText,
      title: 'Paragraph',
      subtitle: 'A block of simple text.',
      preview: (
        <p className="text-xs text-gray-600">
          This is a sample paragraph text that would appear in your lesson content. It's perfect for standard explanations and body text.
        </p>
      )
    },
    {
      id: 'heading-paragraph',
      icon: Heading1,
      title: 'Heading + Paragraph',
      subtitle: 'A main heading followed by content.',
      preview: (
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-800">Main Heading</h3>
          <p className="text-xs text-gray-600">
            Content paragraph goes here, providing more detail under the main heading.
          </p>
        </div>
      )
    },
    {
      id: 'subheading-paragraph',
      icon: Heading2,
      title: 'Subheading + Paragraph',
      subtitle: 'A subheading with content.',
      preview: (
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-gray-700">Subheading</h4>
          <p className="text-xs text-gray-600">
            Content paragraph goes here, providing more detail under the subheading.
          </p>
        </div>
      )
    },
    {
      id: 'table',
      icon: Table,
      title: 'Table',
      subtitle: 'Display structured data in a table.',
      preview: (
        <div className="w-full border rounded-md p-1.5 text-xs bg-gray-50">
          <div className="flex font-semibold text-gray-800 border-b">
            <div className="flex-1 p-1">Header 1</div>
            <div className="flex-1 p-1 border-l">Header 2</div>
          </div>
          <div className="flex text-gray-600">
            <div className="flex-1 p-1">Data A</div>
            <div className="flex-1 p-1 border-l">Data B</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Text Block Type</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {textBlockOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => handleSelect(option.id)}
                className="h-auto w-full text-left p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-start gap-4 w-full">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div>
                      <div className="font-medium text-gray-900">{option.title}</div>
                      <div className="text-sm text-gray-500">{option.subtitle}</div>
                    </div>
                    <div className="border border-gray-200 rounded p-3 bg-gray-50">
                      {option.preview}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Define prop types for runtime type checking
TextBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};