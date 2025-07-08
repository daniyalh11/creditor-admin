
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Heading1, Heading2, Table } from 'lucide-react';

interface TextBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (blockType: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table') => void;
}

export const TextBlockModal: React.FC<TextBlockModalProps> = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table') => {
    onSelect(type);
    onOpenChange(false);
  };

  const textBlockOptions = [
    {
      id: 'paragraph' as const,
      icon: FileText,
      title: 'Paragraph',
      subtitle: 'Simple text paragraph',
      preview: 'This is a sample paragraph text that would appear in your lesson content.'
    },
    {
      id: 'heading-paragraph' as const,
      icon: Heading1,
      title: 'Heading + Paragraph',
      subtitle: 'Main heading with content',
      preview: 'Main Heading\nContent paragraph goes here.'
    },
    {
      id: 'subheading-paragraph' as const,
      icon: Heading2,
      title: 'Subheading + Paragraph',
      subtitle: 'Subheading with content',
      preview: 'Subheading\nContent paragraph goes here.'
    },
    {
      id: 'table' as const,
      icon: Table,
      title: 'Table',
      subtitle: 'Structured data table',
      preview: 'Header 1 | Header 2\nData 1   | Data 2'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Text Block Type</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {textBlockOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <IconComponent className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="font-medium text-gray-900">{option.title}</div>
                    <div className="text-sm text-gray-500">{option.subtitle}</div>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-line font-mono">
                    {option.preview}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
