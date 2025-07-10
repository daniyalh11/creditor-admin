import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Edit, Trash2, Image, FileVideo, FileAudio, Globe, Paperclip, Download, Mic } from 'lucide-react';

export const MediaBlockEditor = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const getFileIcon = (fileType, multimediaType) => {
    if (multimediaType) {
      switch (multimediaType) {
        case 'audio': return <FileAudio className="h-4 w-4" />;
        case 'video': return <FileVideo className="h-4 w-4" />;
        case 'embedded': return <Globe className="h-4 w-4" />;
        case 'attachment': return <Paperclip className="h-4 w-4" />;
        default: return <Image className="h-4 w-4" />;
      }
    }
    
    switch (fileType) {
      case 'video': return <FileVideo className="h-4 w-4" />;
      case 'audio': return <FileAudio className="h-4 w-4" />;
      case 'embedded': return <Globe className="h-4 w-4" />;
      case 'attachment': return <Paperclip className="h-4 w-4" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  const getBlockTitle = () => {
    if (block.style === 'image') return 'Image';
    
    const multimediaType = block.content.multimediaType || block.content.fileType;
    switch (multimediaType) {
      case 'audio': return block.content.recordedAudio ? 'Recorded Audio' : 'Audio';
      case 'video': return 'Video';
      case 'embedded': return 'Embedded Content';
      case 'attachment': return 'Attachment';
      default: return 'Multimedia';
    }
  };

  const renderMedia = () => {
    const { src, fileType, multimediaType, embedCode, fileName, recordedAudio } = block.content;
    
    if (multimediaType === 'embedded' || fileType === 'embedded') {
      if (!embedCode && !src) {
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No embed code provided</p>
          </div>
        );
      }
      
      return (
        <div className="w-full">
          <div 
            className="w-full h-64 border rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: embedCode || `<iframe src="${src}" width="100%" height="100%" frameBorder="0"></iframe>` }}
          />
        </div>
      );
    }

    if (multimediaType === 'attachment' || fileType === 'attachment') {
      if (!src && !fileName) {
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No file attached</p>
          </div>
        );
      }
      
      return (
        <div className="border rounded-lg p-4 bg-gray-50 flex items-center gap-3">
          <Paperclip className="h-6 w-6 text-gray-600" />
          <div className="flex-1">
            <p className="font-medium">{fileName || 'Attached File'}</p>
            {block.content.fileSize && (
              <p className="text-sm text-gray-600">{block.content.fileSize}</p>
            )}
          </div>
          {src && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(src, '_blank')}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}
        </div>
      );
    }

    if (!src) {
      const mediaType = multimediaType || fileType;
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-2">
            {getFileIcon(fileType, multimediaType)}
          </div>
          <p className="text-gray-500">
            {mediaType === 'audio' ? 'No audio uploaded' : 
             mediaType === 'video' ? 'No video uploaded' : 
             'No media uploaded'}
          </p>
        </div>
      );
    }

    const mediaType = multimediaType || fileType;

    if (mediaType === 'video') {
      return (
        <video src={src} controls className="w-full rounded-lg max-w-2xl">
          Your browser does not support the video tag.
        </video>
      );
    }

    if (mediaType === 'audio') {
      return (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            {recordedAudio && <Mic className="h-4 w-4 text-blue-600" />}
            <span className="text-sm font-medium">
              {recordedAudio ? 'Recorded Audio' : 'Audio File'}
            </span>
          </div>
          <audio src={src} controls className="w-full">
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }

    return (
      <img src={src} alt="Media" className="w-full rounded-lg max-w-2xl" />
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`
            p-2 rounded-lg
            ${block.style === 'image' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}
          `}>
            {getFileIcon(block.content.fileType, block.content.multimediaType)}
          </div>
          <div>
            <h3 className="font-medium">{getBlockTitle()}</h3>
            <p className="text-sm text-gray-600">
              {block.content.title || block.content.fileName || block.content.caption || 'Media block'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="h-8 w-8 p-0"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="h-8 w-8 p-0"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(block.id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {block.content.title && (
          <h4 className="text-lg font-semibold">{block.content.title}</h4>
        )}
        
        {renderMedia()}
        
        {block.content.caption && (
          <p className="text-gray-600 text-sm italic">{block.content.caption}</p>
        )}
      </div>
    </div>
  );
};

// Define prop types for runtime type checking
MediaBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['media']).isRequired,
    style: PropTypes.oneOf(['image', 'multimedia']).isRequired,
    content: PropTypes.shape({
      src: PropTypes.string,
      caption: PropTypes.string,
      title: PropTypes.string,
      fileType: PropTypes.oneOf(['image', 'video', 'audio', 'embedded', 'attachment']),
      multimediaType: PropTypes.oneOf(['audio', 'video', 'embedded', 'attachment']),
      imageStyle: PropTypes.oneOf(['centered', 'full-width', 'image-and-text', 'text-on-image']),
      text: PropTypes.string,
      embedCode: PropTypes.string,
      fileName: PropTypes.string,
      fileSize: PropTypes.string,
      mimeType: PropTypes.string,
      recordedAudio: PropTypes.bool,
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