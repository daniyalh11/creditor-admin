
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ChevronUp, ChevronDown, Maximize2, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryImage {
  id: string;
  src: string;
  caption: string;
}

interface GalleryBlock {
  id: string;
  type: 'gallery';
  style: 'carousel' | '2-column' | '3-column' | '4-column';
  content: {
    images: GalleryImage[];
  };
}

interface GalleryBlockEditorProps {
  block: GalleryBlock;
  onUpdate: (block: GalleryBlock) => void;
  onDelete: (blockId: string) => void;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const GalleryBlockEditor: React.FC<GalleryBlockEditorProps> = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const renderCarousel = () => (
    <Carousel className="w-full">
      <CarouselContent>
        {block.content.images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="aspect-video bg-gray-100 rounded overflow-hidden">
              <img 
                src={image.src} 
                alt={image.caption || 'Gallery image'} 
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setFullScreenImage(image.src)}
              />
            </div>
            {image.caption && (
              <p className="text-sm text-gray-600 mt-2 text-center">{image.caption}</p>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

  const renderGrid = () => {
    const getGridCols = () => {
      switch (block.style) {
        case '2-column': return 'grid-cols-2';
        case '3-column': return 'grid-cols-3';
        case '4-column': return 'grid-cols-4';
        default: return 'grid-cols-2';
      }
    };

    return (
      <div className={`grid ${getGridCols()} gap-4`}>
        {block.content.images.map((image) => (
          <div key={image.id} className="space-y-2">
            <div className="aspect-square bg-gray-100 rounded overflow-hidden">
              <img 
                src={image.src} 
                alt={image.caption || 'Gallery image'} 
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setFullScreenImage(image.src)}
              />
            </div>
            {image.caption && (
              <p className="text-sm text-gray-600 text-center">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
        {/* Block Controls */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded shadow-lg border flex">
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

        {/* Gallery Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              Gallery - {block.style === 'carousel' ? 'Carousel' : `${block.style.replace('-', ' ')}`}
            </span>
          </div>

          {block.content.images.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
              <p>No images added yet. Click edit to add images.</p>
            </div>
          ) : block.style === 'carousel' ? (
            renderCarousel()
          ) : (
            renderGrid()
          )}
        </div>
      </div>

      {/* Full Screen Preview */}
      <Dialog open={!!fullScreenImage} onOpenChange={() => setFullScreenImage(null)}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFullScreenImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
            {fullScreenImage && (
              <img 
                src={fullScreenImage} 
                alt="Full screen preview" 
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
