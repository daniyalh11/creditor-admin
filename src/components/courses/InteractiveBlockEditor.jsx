import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { AccordionComponent } from './interactive/AccordionComponent';
import { TabsComponent } from './interactive/TabsComponent';
import { LabeledGraphicComponent } from './interactive/LabeledGraphicComponent';
import { ProcessComponent } from './interactive/ProcessComponent';
import { FlashcardComponent } from './interactive/FlashcardComponent';
import { TimelineComponent } from './interactive/TimelineComponent';
import { SortingComponent } from './interactive/SortingComponent';
import { ScenarioComponent } from './interactive/ScenarioComponent';

export const InteractiveBlockEditor = ({
  block,
  onUpdate,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const renderInteractiveComponent = () => {
    switch (block.style) {
      case 'accordion':
        return <AccordionComponent content={block.content} />;
      case 'tabs':
        return <TabsComponent content={block.content} />;
      case 'labeled-graphic':
        return <LabeledGraphicComponent content={block.content} />;
      case 'process':
        return <ProcessComponent content={block.content} />;
      case 'flashcard':
        return <FlashcardComponent content={block.content} />;
      case 'timeline':
        return <TimelineComponent content={block.content} />;
      case 'sorting':
        return <SortingComponent content={block.content} />;
      case 'scenario':
        return <ScenarioComponent content={block.content} />;
      default:
        return <div>Unknown interactive type</div>;
    }
  };

  const getComponentName = () => {
    switch (block.style) {
      case 'accordion': return 'Accordion';
      case 'tabs': return 'Tabs';
      case 'labeled-graphic': return 'Labeled Graphic';
      case 'process': return 'Process';
      case 'flashcard': return 'Flashcard';
      case 'timeline': return 'Timeline';
      case 'sorting': return 'Sorting Activity';
      case 'scenario': return 'Scenario';
      default: return 'Interactive';
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors w-full">
      {/* Block Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded shadow-lg border flex z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0"
          title="Edit"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="h-8 w-8 p-0"
          title="Move Up"
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="h-8 w-8 p-0"
          title="Move Down"
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(block.id)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
          title="Delete"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Interactive Content */}
      <div className="p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            Interactive - {getComponentName()}
          </span>
        </div>

        <div className="w-full">
          {renderInteractiveComponent()}
        </div>
      </div>
    </div>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
InteractiveBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['interactive']).isRequired,
    style: PropTypes.oneOf([
      'accordion', 
      'tabs', 
      'labeled-graphic', 
      'process', 
      'flashcard', 
      'timeline', 
      'sorting', 
      'scenario'
    ]).isRequired,
    content: PropTypes.object, // Content can be complex and vary, so object is a safe bet
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
};