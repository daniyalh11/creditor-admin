import React from 'react';
import PropTypes from 'prop-types';
import { BlockRenderer } from './BlockRenderer';
import { EmptyLessonState } from './EmptyLessonState';

export const LessonBuilderContent = ({
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

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
LessonBuilderContent.propTypes = {
  addedBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      // The block object can have other properties, but id and type are fundamental.
      content: PropTypes.any,
    })
  ).isRequired,
  onUpdateBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onEditBlock: PropTypes.func.isRequired,
  onMoveBlockUp: PropTypes.func.isRequired,
  onMoveBlockDown: PropTypes.func.isRequired,
};