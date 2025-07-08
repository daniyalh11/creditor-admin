
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface StatementBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (statementType: 'italic' | 'bold' | 'caps' | 'highlighted') => void;
}

export const StatementBlockModal: React.FC<StatementBlockModalProps> = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type: 'italic' | 'bold' | 'caps' | 'highlighted') => {
    onSelect(type);
    onOpenChange(false);
  };

  const statementOptions = [
    {
      id: 'italic' as const,
      icon: '💬',
      title: 'Statement A',
      subtitle: 'Center-aligned with boxed layout',
      preview: (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center max-w-sm mx-auto">
          <div className="border-t border-gray-300 w-8 mx-auto mb-3"></div>
          <p className="text-gray-800 text-sm leading-relaxed">
            You're the master of your life, the captain of your ship.
          </p>
          <div className="border-b border-gray-300 w-8 mx-auto mt-3"></div>
        </div>
      )
    },
    {
      id: 'bold' as const,
      icon: 'B',
      title: 'Statement B',
      subtitle: 'Left-aligned with colored line above',
      preview: (
        <div className="text-left p-3 bg-white border rounded max-w-sm">
          <div className="w-6 h-0.5 bg-orange-500 mb-3"></div>
          <p className="text-gray-700 text-sm leading-relaxed">
            You're the master of your life, the captain of your ship.
          </p>
        </div>
      )
    },
    {
      id: 'caps' as const,
      icon: 'A',
      title: 'Statement C',
      subtitle: 'Uppercase text style',
      preview: (
        <div className="text-left p-3 bg-white max-w-sm">
          <p className="text-gray-800 text-sm leading-relaxed">
            Stop chasing <span className="font-bold">your thoughts</span> in circles. <span className="font-bold">Open your eyes</span>, breathe deeply.
          </p>
        </div>
      )
    },
    {
      id: 'highlighted' as const,
      icon: '⭐',
      title: 'Statement D',
      subtitle: 'Highlighted statement',
      preview: (
        <div className="p-3 bg-white border rounded max-w-sm">
          <div className="w-6 h-0.5 bg-orange-500 mb-3"></div>
          <p className="text-gray-800 text-sm leading-relaxed">
            You're the master of your life, the captain of your ship.
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
