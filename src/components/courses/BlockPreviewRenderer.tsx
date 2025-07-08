
import React from 'react';
import { TextBlockRenderer } from './renderers/TextBlockRenderer';
import { StatementBlockRenderer } from './renderers/StatementBlockRenderer';
import { QuoteBlockRenderer } from './renderers/QuoteBlockRenderer';
import { ListBlockRenderer } from './renderers/ListBlockRenderer';
import { GalleryBlockRenderer } from './renderers/GalleryBlockRenderer';
import { InteractiveBlockRenderer } from './renderers/InteractiveBlockRenderer';
import { MediaBlockRenderer } from './renderers/MediaBlockRenderer';
import { ChartsBlockRenderer } from './renderers/ChartsBlockRenderer';
import { DividerBlockRenderer } from './renderers/DividerBlockRenderer';
import type { Block } from './types/blocks';

interface BlockPreviewRendererProps {
  block: Block;
}

export const BlockPreviewRenderer: React.FC<BlockPreviewRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
    case 'heading-paragraph':
    case 'subheading-paragraph':
    case 'table':
      return <TextBlockRenderer block={block as any} />;

    case 'statement':
      return <StatementBlockRenderer block={block as any} />;

    case 'quote':
      return <QuoteBlockRenderer block={block as any} />;

    case 'list':
      return <ListBlockRenderer block={block as any} />;

    case 'gallery':
      return <GalleryBlockRenderer block={block as any} />;

    case 'interactive':
      return <InteractiveBlockRenderer block={block as any} />;

    case 'media':
      return <MediaBlockRenderer block={block as any} />;

    case 'charts':
      return <ChartsBlockRenderer block={block as any} />;

    case 'divider':
      return <DividerBlockRenderer block={block as any} />;

    default:
      return (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600">Unknown block type</p>
        </div>
      );
  }
};
