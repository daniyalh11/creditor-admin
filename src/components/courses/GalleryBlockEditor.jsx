import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ChevronUp, ChevronDown, Maximize2, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const GalleryBlockEditor = ({
  block,
  onUpdate,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);

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
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded shadow-lg border flex z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-8 w-8 p-0"
            title="Edit"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="h-8 w-8 p-0"
            title="Move Up"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="h-8 w-8 p-0"
            title="Move Down"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(block.id)}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            title="Delete"
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
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFullScreenImage(null)}
              className="absolute top-4 right-4 z-20 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
            {fullScreenImage && (
              <img 
                src={fullScreenImage} 
                alt="Full screen preview" 
                className="max-w-full max-h-[95vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
GalleryBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['gallery']).isRequired,
    style: PropTypes.oneOf(['carousel', '2-column', '3-column', '4-column']).isRequired,
    content: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired,
  canMoveUp: PropTypes.bool.isRequired,
  canMoveDown: PropTypes.bool.isRequired,
};