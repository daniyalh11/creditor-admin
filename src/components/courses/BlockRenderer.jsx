import React from 'react';
import PropTypes from 'prop-types';
import { TextBlockEditor } from './TextBlockEditor';
import { StatementBlockEditor } from './StatementBlockEditor';
import { QuoteBlockEditor } from './QuoteBlockEditor';
import { ListBlockEditor } from './ListBlockEditor';
import { GalleryBlockEditor } from './GalleryBlockEditor';
import { InteractiveBlockEditor } from './InteractiveBlockEditor';
import { MediaBlockEditor } from './MediaBlockEditor';
import { ChartsBlockEditor } from './ChartsBlockEditor';
import { DividerBlockEditor } from './DividerBlockEditor';

export const BlockRenderer = ({
  block,
  index,
  totalBlocks,
  onUpdateBlock,
  onDeleteBlock,
  onEditBlock,
  onMoveBlockUp,
  onMoveBlockDown
}) => {
  const canMoveUp = index > 0;
  const canMoveDown = index < totalBlocks - 1;

  const commonProps = {
    onUpdate: onUpdateBlock,
    onDelete: onDeleteBlock,
    onEdit: () => onEditBlock(block),
    onMoveUp: () => onMoveBlockUp(block.id),
    onMoveDown: () => onMoveBlockDown(block.id),
    canMoveUp,
    canMoveDown
  };

  // Function to render the correct block editor based on block type
  const renderBlock = () => {
    switch (block.type) {
      case 'statement':
        return <StatementBlockEditor block={block} {...commonProps} />;
      
      case 'quote':
        return <QuoteBlockEditor block={block} {...commonProps} />;
      
      case 'list':
        return <ListBlockEditor block={block} {...commonProps} />;
      
      case 'gallery':
        return <GalleryBlockEditor block={block} {...commonProps} />;
      
      case 'interactive':
        return <InteractiveBlockEditor block={block} {...commonProps} />;
      
      case 'media':
        return <MediaBlockEditor block={block} {...commonProps} />;
      
      case 'charts':
        return <ChartsBlockEditor block={block} {...commonProps} />;
      
      case 'divider':
        return <DividerBlockEditor block={block} {...commonProps} />;
      
      default:
        return <TextBlockEditor block={block} {...commonProps} />;
    }
  };

  // Wrapper div to ensure all blocks have consistent fixed width
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden" style={{ width: '800px', margin: '0 auto' }}>
      {renderBlock()}
    </div>
  );
};

// PropTypes for type-checking in a JavaScript environment
BlockRenderer.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // You can add other properties of the block object here if known
    // For example: content: PropTypes.any
  }).isRequired,
  index: PropTypes.number.isRequired,
  totalBlocks: PropTypes.number.isRequired,
  onUpdateBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onEditBlock: PropTypes.func.isRequired,
  onMoveBlockUp: PropTypes.func.isRequired,
  onMoveBlockDown: PropTypes.func.isRequired,
};