
import React from 'react';
import { BlockRenderer } from './BlockRenderer';
import { EmptyLessonState } from './EmptyLessonState';
import type { Block } from './types/blocks';

interface LessonBuilderContentProps {
  addedBlocks: Block[];
  onUpdateBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onEditBlock: (block: Block) => void;
  onMoveBlockUp: (blockId: string) => void;
  onMoveBlockDown: (blockId: string) => void;
}

export const LessonBuilderContent: React.FC<LessonBuilderContentProps> = ({
  addedBlocks,
  onUpdateBlock,
  onDeleteBlock,
  onEditBlock,
  onMoveBlockUp,
  onMoveBlockDown
}) => {
  if (addedBlocks.length === 0) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <EmptyLessonState />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden">
      <div className="p-8 flex justify-center">
        <div className="w-full min-w-0 space-y-4" style={{ maxWidth: '3200px' }}>
          {addedBlocks.map((block, index) => (
            <div key={block.id} className="w-full min-w-0">
              <BlockRenderer
                block={block}
                index={index}
                totalBlocks={addedBlocks.length}
                onUpdateBlock={onUpdateBlock}
                onDeleteBlock={onDeleteBlock}
                onEditBlock={onEditBlock}
                onMoveBlockUp={onMoveBlockUp}
                onMoveBlockDown={onMoveBlockDown}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
