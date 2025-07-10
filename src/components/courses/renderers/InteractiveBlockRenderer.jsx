import React from 'react';
import { AccordionComponent } from '../interactive/AccordionComponent';
import { TabsComponent } from '../interactive/TabsComponent';
import { LabeledGraphicComponent } from '../interactive/LabeledGraphicComponent';
import { ProcessComponent } from '../interactive/ProcessComponent';
import { FlashcardComponent } from '../interactive/FlashcardComponent';
import { TimelineComponent } from '../interactive/TimelineComponent';
import { SortingComponent } from '../interactive/SortingComponent';
import { ScenarioComponent } from '../interactive/ScenarioComponent';

export const InteractiveBlockRenderer = ({ block }) => {
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
      return (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600">Interactive content: {block.style}</p>
        </div>
      );
  }
};

export default InteractiveBlockRenderer;