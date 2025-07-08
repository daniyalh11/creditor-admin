
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image, FileVideo, FileAudio, ArrowLeft, Globe, Paperclip } from 'lucide-react';

interface MediaBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (mediaType: 'image' | 'multimedia', multimediaType?: 'audio' | 'video' | 'embedded' | 'attachment') => void;
}

export const MediaBlockModal: React.FC<MediaBlockModalProps> = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const [selectedType, setSelectedType] = useState<'image' | 'multimedia' | null>(null);

  const handleSelect = (type: 'image' | 'multimedia') => {
    if (type === 'image') {
      setSelectedType('image');
    } else {
      setSelectedType('multimedia');
    }
  };

  const handleImageStyleSelect = (style: string) => {
    onSelect('image', undefined);
    onOpenChange(false);
  };

  const handleMultimediaSelect = (multimediaType: 'audio' | 'video' | 'embedded' | 'attachment') => {
    onSelect('multimedia', multimediaType);
    onOpenChange(false);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  const renderImageOptions = () => (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Choose Image Style</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => handleImageStyleSelect('centered')}
        >
          <div className="w-8 h-6 bg-blue-100 rounded flex items-center justify-center">
            <div className="w-4 h-3 bg-blue-400 rounded"></div>
          </div>
          <span className="text-sm font-medium">Image Centered</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300"
          onClick={() => handleImageStyleSelect('full-width')}
        >
          <div className="w-8 h-6 bg-green-100 rounded">
            <div className="w-full h-3 bg-green-400 rounded-t"></div>
          </div>
          <span className="text-sm font-medium">Image Full Width</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
          onClick={() => handleImageStyleSelect('image-and-text')}
        >
          <div className="w-8 h-6 bg-purple-100 rounded flex">
            <div className="w-3 h-3 bg-purple-400 rounded-l"></div>
            <div className="flex-1 h-3 bg-purple-200 rounded-r"></div>
          </div>
          <span className="text-sm font-medium">Image and Text</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-300"
          onClick={() => handleImageStyleSelect('text-on-image')}
        >
          <div className="w-8 h-6 bg-orange-100 rounded relative">
            <div className="w-full h-full bg-orange-400 rounded"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded"></div>
            </div>
          </div>
          <span className="text-sm font-medium">Text on Image</span>
        </Button>
      </div>
    </div>
  );

  const renderMultimediaOptions = () => (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Choose Multimedia Type</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => handleMultimediaSelect('audio')}
        >
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileAudio className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-sm">Audio</div>
            <div className="text-xs text-gray-600">Record or upload audio</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-green-50 hover:border-green-300"
          onClick={() => handleMultimediaSelect('video')}
        >
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <FileVideo className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-sm">Video</div>
            <div className="text-xs text-gray-600">Upload video files</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
          onClick={() => handleMultimediaSelect('embedded')}
        >
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Globe className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-sm">Embedded</div>
            <div className="text-xs text-gray-600">Embed videos & content</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-300"
          onClick={() => handleMultimediaSelect('attachment')}
        >
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Paperclip className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-center">
            <div className="font-medium text-sm">Attachment</div>
            <div className="text-xs text-gray-600">Upload any file type</div>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderMainOptions = () => (
    <div className="space-y-4 py-4">
      <Button
        variant="outline"
        className="w-full h-20 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
        onClick={() => handleSelect('image')}
      >
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Image className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <div className="font-medium">Image</div>
          <div className="text-sm text-gray-600">Upload a single image with optional caption</div>
        </div>
      </Button>

      <Button
        variant="outline"
        className="w-full h-20 flex flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
        onClick={() => handleSelect('multimedia')}
      >
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <div className="flex gap-1">
            <FileVideo className="h-3 w-3 text-purple-600" />
            <FileAudio className="h-3 w-3 text-purple-600" />
          </div>
        </div>
        <div>
          <div className="font-medium">Multimedia</div>
          <div className="text-sm text-gray-600">Audio, video, embeds, and attachments</div>
        </div>
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedType === 'image' ? 'Image Styles' : 
             selectedType === 'multimedia' ? 'Multimedia Options' : 
             'Choose Media Type'}
          </DialogTitle>
        </DialogHeader>

        {selectedType === 'image' ? renderImageOptions() : 
         selectedType === 'multimedia' ? renderMultimediaOptions() : 
         renderMainOptions()}
      </DialogContent>
    </Dialog>
  );
};
