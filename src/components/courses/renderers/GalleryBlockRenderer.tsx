
import React from 'react';
import type { GalleryBlock } from '../types/blocks';

const getGridCols = (style: string) => {
  switch (style) {
    case '2-column': return 'grid-cols-1 md:grid-cols-2';
    case '3-column': return 'grid-cols-1 md:grid-cols-3';
    case '4-column': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    default: return 'grid-cols-1';
  }
};

interface GalleryBlockRendererProps {
  block: GalleryBlock;
}

export const GalleryBlockRenderer: React.FC<GalleryBlockRendererProps> = ({ block }) => {
  if (block.style === 'carousel') {
    return (
      <div className="prose max-w-none">
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {block.content.images.map((image) => (
              <div key={image.id} className="flex-shrink-0 w-80">
                <img src={image.src} alt={image.caption} className="w-full h-60 object-cover rounded-lg" />
                {image.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="prose max-w-none">
      <div className={`grid gap-4 ${getGridCols(block.style)}`}>
        {block.content.images.map((image) => (
          <div key={image.id}>
            <img src={image.src} alt={image.caption} className="w-full h-48 object-cover rounded-lg" />
            {image.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
