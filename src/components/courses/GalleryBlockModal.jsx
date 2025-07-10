import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Images, Grid3X3, LayoutGrid } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const GalleryBlockModal = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type) => {
    onSelect(type);
    onOpenChange(false);
  };

  const galleryOptions = [
    {
      id: 'carousel',
      icon: <Images className="h-5 w-5" />,
      title: 'Carousel Gallery',
      subtitle: 'Sliding image carousel with navigation',
      preview: (
        <div className="relative bg-gray-100 rounded border p-6">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Add a caption</span>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      )
    },
    {
      id: '2-column',
      icon: <Grid3X3 className="h-5 w-5" />,
      title: '2 Column Grid',
      subtitle: 'Two column image grid layout',
      preview: (
        <div className="bg-gray-100 rounded border p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 1</span>
            </div>
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 2</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="text-sm text-gray-600 text-center">Add a caption</div>
            <div className="text-sm text-gray-600 text-center">Add a caption</div>
          </div>
        </div>
      )
    },
    {
      id: '3-column',
      icon: <LayoutGrid className="h-5 w-5" />,
      title: '3 Column Grid',
      subtitle: 'Three column image grid layout',
      preview: (
        <div className="bg-gray-100 rounded border p-6">
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 1</span>
            </div>
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 2</span>
            </div>
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 3</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="text-sm text-gray-600 text-center">Caption</div>
            <div className="text-sm text-gray-600 text-center">Caption</div>
            <div className="text-sm text-gray-600 text-center">Caption</div>
          </div>
        </div>
      )
    },
    {
      id: '4-column',
      icon: <LayoutGrid className="h-5 w-5" />,
      title: '4 Column Grid',
      subtitle: 'Four column image grid layout',
      preview: (
        <div className="bg-gray-100 rounded border p-6">
          <div className="grid grid-cols-4 gap-2">
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 1</span>
            </div>
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 2</span>
            </div>
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 3</span>
            </div>
            <div className="aspect-square bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm">Grid 4</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] mx-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Choose Gallery Type</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
          {galleryOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="flex flex-col gap-4 p-6 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 flex-shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-lg">{option.title}</div>
                  <div className="text-sm text-gray-500">{option.subtitle}</div>
                </div>
              </div>
              <div className="w-full">
                {option.preview}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
GalleryBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};