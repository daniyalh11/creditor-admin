
import React from 'react';
import { TextBlockEditor } from './TextBlockEditor';
import { StatementBlockEditor } from './StatementBlockEditor';
import { QuoteBlockEditor } from './QuoteBlockEditor';
import { ListBlockEditor } from './ListBlockEditor';
import { GalleryBlockEditor } from './GalleryBlockEditor';
import { InteractiveBlockEditor } from './InteractiveBlockEditor';
import { MediaBlockEditor } from './MediaBlockEditor';
import { ChartsBlockEditor } from './ChartsBlockEditor';
import { DividerBlockEditor } from './DividerBlockEditor';
import type { Block } from './types/blocks';

interface BlockRendererProps {
  block: Block;
  index: number;
  totalBlocks: number;
  onUpdateBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onEditBlock: (block: Block) => void;
  onMoveBlockUp: (blockId: string) => void;
  onMoveBlockDown: (blockId: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
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

  // Wrapper div to ensure all blocks have consistent fixed width
  const renderBlock = () => {
    switch (block.type) {
      case 'statement':
        return <StatementBlockEditor block={block as any} {...commonProps} />;
      
      case 'quote':
        return <QuoteBlockEditor block={block as any} {...commonProps} />;
      
      case 'list':
        return <ListBlockEditor block={block as any} {...commonProps} />;
      
      case 'gallery':
        return <GalleryBlockEditor block={block as any} {...commonProps} />;
      
      case 'interactive':
        return <InteractiveBlockEditor block={block as any} {...commonProps} />;
      
      case 'media':
        return <MediaBlockEditor block={block as any} {...commonProps} />;
      
      case 'charts':
        return <ChartsBlockEditor block={block as any} {...commonProps} />;
      
      case 'divider':
        return <DividerBlockEditor block={block as any} {...commonProps} />;
      
      default:
        return <TextBlockEditor block={block as any} {...commonProps} />;
    }
  };

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden" style={{ width: '800px', margin: '0 auto' }}>
      {renderBlock()}
    </div>
  );
};
