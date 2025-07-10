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

export const BlockPreviewRenderer = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
    case 'heading-paragraph':
    case 'subheading-paragraph':
    case 'table':
      return <TextBlockRenderer block={block} />;

    case 'statement':
      return <StatementBlockRenderer block={block} />;

    case 'quote':
      return <QuoteBlockRenderer block={block} />;

    case 'list':
      return <ListBlockRenderer block={block} />;

    case 'gallery':
      return <GalleryBlockRenderer block={block} />;

    case 'interactive':
      return <InteractiveBlockRenderer block={block} />;

    case 'media':
      return <MediaBlockRenderer block={block} />;

    case 'charts':
      return <ChartsBlockRenderer block={block} />;

    case 'divider':
      return <DividerBlockRenderer block={block} />;

    default:
      return (
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600">Unknown block type</p>
        </div>
      );
  }
};