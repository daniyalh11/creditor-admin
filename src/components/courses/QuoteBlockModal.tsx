
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface QuoteBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (quoteType: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight') => void;
}

export const QuoteBlockModal: React.FC<QuoteBlockModalProps> = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight') => {
    onSelect(type);
    onOpenChange(false);
  };

  const quoteOptions = [
    // Enhanced styles
    {
      id: 'circular-centerpiece' as const,
      icon: '💬',
      title: 'Quote A',
      subtitle: 'Circular Centerpiece',
      preview: (
        <div className="bg-white border rounded-lg p-3 text-center w-full min-h-[120px] flex flex-col justify-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-blue-600 text-sm">"</span>
          </div>
          <p className="text-gray-800 text-xs mb-2 break-words">"Success is not final, failure is not fatal."</p>
          <p className="text-gray-500 text-xs">— Winston Churchill</p>
        </div>
      )
    },
    {
      id: 'vertical-spotlight' as const,
      icon: '⭐',
      title: 'Quote B',
      subtitle: 'Vertical Spotlight',
      preview: (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg p-3 w-full min-h-[120px] flex items-center">
          <div className="border-l-4 border-blue-500 pl-3 w-full">
            <p className="text-gray-800 text-xs mb-2 break-words">"Innovation distinguishes between a leader and a follower."</p>
            <p className="text-gray-600 text-xs">— Steve Jobs</p>
          </div>
        </div>
      )
    },
    {
      id: 'side-by-side' as const,
      icon: '👤',
      title: 'Quote C',
      subtitle: 'Side-by-Side',
      preview: (
        <div className="bg-white border rounded-lg p-3 w-full flex items-start gap-2 min-h-[120px]">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0 mt-1"></div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 text-xs mb-1 break-words">"The only way to do great work is to love what you do."</p>
            <p className="text-gray-500 text-xs">— Steve Jobs</p>
          </div>
        </div>
      )
    },
    {
      id: 'gray-panel' as const,
      icon: '📝',
      title: 'Quote D',
      subtitle: 'Gray Panel',
      preview: (
        <div className="bg-gray-50 border rounded-lg p-3 w-full min-h-[120px] flex flex-col justify-center">
          <p className="text-gray-800 text-xs mb-2 italic break-words">"Be yourself; everyone else is already taken."</p>
          <p className="text-gray-600 text-xs">— Oscar Wilde</p>
        </div>
      )
    },
    {
      id: 'visual-highlight' as const,
      icon: '🎨',
      title: 'Quote E',
      subtitle: 'Visual Highlight',
      preview: (
        <div className="bg-white border-2 border-yellow-300 rounded-lg p-3 w-full relative min-h-[120px] flex flex-col justify-center">
          <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <p className="text-gray-800 text-xs mb-2 break-words pr-4">"Life is what happens to you while you're busy making other plans."</p>
          <p className="text-gray-600 text-xs">— John Lennon</p>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Quote Style</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {quoteOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="h-auto p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left flex flex-col items-start"
              onClick={() => handleSelect(option.id)}
            >
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-sm truncate">{option.title}</div>
                    <div className="text-xs text-gray-500 truncate">{option.subtitle}</div>
                  </div>
                </div>
                <div className="w-full overflow-hidden">
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
