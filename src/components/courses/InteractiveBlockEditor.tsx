
import React from 'react';
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
import type { InteractiveBlock } from './types/blocks';

interface InteractiveBlockEditorProps {
  block: InteractiveBlock;
  onUpdate: (block: InteractiveBlock) => void;
  onDelete: (blockId: string) => void;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const InteractiveBlockEditor: React.FC<InteractiveBlockEditorProps> = ({
  block,
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
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="h-8 w-8 p-0"
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="h-8 w-8 p-0"
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(block.id)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
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
