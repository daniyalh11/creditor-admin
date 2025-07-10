import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { List, ListOrdered, CheckSquare } from 'lucide-react';

export const ListBlockModal = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type) => {
    onSelect(type);
    onOpenChange(false);
  };

  const listOptions = [
    {
      id: 'bullet',
      icon: <List className="h-4 w-4" />,
      title: 'Bullet List',
      subtitle: 'Unordered list with bullets',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-700">List item 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-700">List item 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-700">List item 3</span>
          </div>
        </div>
      )
    },
    {
      id: 'numbered',
      icon: <ListOrdered className="h-4 w-4" />,
      title: 'Numbered List',
      subtitle: 'Ordered list with numbers',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">1</div>
            <span className="text-sm text-gray-700">First item</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">2</div>
            <span className="text-sm text-gray-700">Second item</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">3</div>
            <span className="text-sm text-gray-700">Third item</span>
          </div>
        </div>
      )
    },
    {
      id: 'checklist',
      icon: <CheckSquare className="h-4 w-4" />,
      title: 'Checklist',
      subtitle: 'Interactive checklist',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
            <span className="text-sm text-gray-700">Task item 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 border border-blue-600 rounded flex items-center justify-center">
              <div className="w-2 h-1 border-l-2 border-b-2 border-white transform rotate-[-45deg] translate-x-[1px] translate-y-[-1px]"></div>
            </div>
            <span className="text-sm text-gray-700">Task item 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
            <span className="text-sm text-gray-700">Task item 3</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md max-h-[90vh] mx-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose List Style</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 pb-4">
          {listOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 mt-1 flex-shrink-0">
                {option.icon}
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Define prop types for runtime type checking
ListBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};