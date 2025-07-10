import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  List, 
  FolderOpen, 
  Tag, 
  Workflow, 
  CreditCard, 
  Clock,
  ArrowUpDown,
  Users,
  ChevronDown,
  Plus
} from 'lucide-react';

export const InteractiveBlockModal = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type) => {
    onSelect(type);
    onOpenChange(false);
  };

  const interactiveTypes = [
    {
      type: 'accordion',
      icon: List,
      title: 'Accordion',
      description: 'Collapsible content sections',
      preview: (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between bg-blue-50 p-2 rounded border">
            <span className="text-xs text-gray-700">Section 1</span>
            <ChevronDown className="h-3 w-3 text-blue-600" />
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
            <span className="text-xs text-gray-700">Section 2</span>
            <Plus className="h-3 w-3 text-gray-400" />
          </div>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
            <span className="text-xs text-gray-700">Section 3</span>
            <Plus className="h-3 w-3 text-gray-400" />
          </div>
        </div>
      )
    },
    {
      type: 'tabs',
      icon: FolderOpen,
      title: 'Tabs',
      description: 'Tabbed content interface',
      preview: (
        <div className="w-full">
          <div className="flex space-x-1 mb-3">
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-t text-xs">Tab 1</div>
            <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-t text-xs">Tab 2</div>
            <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-t text-xs">Tab 3</div>
          </div>
          <div className="bg-gray-50 p-3 rounded text-center">
            <span className="text-xs text-gray-500">Content area</span>
          </div>
        </div>
      )
    },
    {
      type: 'labeled-graphic',
      icon: Tag,
      title: 'Labeled Graphic',
      description: 'Interactive image with hotspots',
      preview: (
        <div className="w-full bg-gray-100 rounded p-4 relative h-16">
          <div className="text-center text-xs text-gray-500 mb-2">Image placeholder</div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      )
    },
    {
      type: 'process',
      icon: Workflow,
      title: 'Process',
      description: 'Step-by-step process flow',
      preview: (
        <div className="w-full flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">1</div>
            <span className="text-xs text-gray-600">Step</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
            <span className="text-xs text-gray-600">Step</span>
          </div>
        </div>
      )
    },
    {
      type: 'flashcard',
      icon: CreditCard,
      title: 'Flashcard',
      description: 'Front & Back learning cards',
      preview: (
        <div className="w-full bg-blue-50 border-2 border-blue-200 rounded p-4 text-center h-16 flex flex-col justify-center">
          <div className="text-xs font-medium text-gray-700 mb-1">Front</div>
          <div className="text-xs text-gray-500">Question or term</div>
        </div>
      )
    },
    {
      type: 'timeline',
      icon: Clock,
      title: 'Timeline',
      description: 'Chronological event timeline',
      preview: (
        <div className="w-full space-y-2 h-16 flex flex-col justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Event 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Event 2</span>
          </div>
        </div>
      )
    },
    {
      type: 'sorting',
      icon: ArrowUpDown,
      title: 'Sorting Activity',
      description: 'Drag & drop sorting exercise',
      preview: (
        <div className="w-full space-y-1 h-16">
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
            <ArrowUpDown className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">Item 1</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
            <ArrowUpDown className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">Item 2</span>
          </div>
        </div>
      )
    },
    {
      type: 'scenario',
      icon: Users,
      title: 'Scenario',
      description: 'Interactive storytelling scenarios',
      preview: (
        <div className="w-full bg-green-50 border border-green-200 rounded p-3 text-center h-16 flex flex-col justify-center">
          <div className="text-xs font-medium text-gray-700 mb-1">Character Scene</div>
          <div className="text-xs text-gray-500">Interactive dialogue</div>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Choose Interactive Component
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            Select an interactive component to enhance your lesson content
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interactiveTypes.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.type}
                onClick={() => handleSelect(item.type)}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Preview */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  {item.preview}
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
          Click on any interactive component to add it to your lesson
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
InteractiveBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};