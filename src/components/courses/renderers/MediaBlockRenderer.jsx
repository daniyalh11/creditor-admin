import React from 'react';

export const MediaBlockRenderer = ({ block }) => {
  const renderImageWithStyle = () => {
    const { src, caption, title, text, imageStyle } = block.content;
    
    if (!src) {
      return (
        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No media selected</p>
        </div>
      );
    }

    switch (imageStyle) {
      case 'centered':
        return (
          <div className="text-center">
            <img src={src} alt={caption} className="mx-auto max-w-md rounded-lg" />
            {title && <h4 className="text-lg font-semibold mt-4 mb-2">{title}</h4>}
            {caption && <p className="text-sm text-gray-600">{caption}</p>}
          </div>
        );
        
      case 'full-width':
        return (
          <div>
            <img src={src} alt={caption} className="w-full rounded-lg" />
            {title && <h4 className="text-lg font-semibold mt-4 mb-2">{title}</h4>}
            {caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
          </div>
        );
        
      case 'image-and-text':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <img src={src} alt={caption || "Media content"} className="w-full rounded-lg" />
              {caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
            </div>
            <div>
              {title && <h4 className="text-lg font-semibold mb-3">{title}</h4>}
              {text && (
                <div className="prose prose-sm max-w-none">
                  <p>{text}</p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'text-on-image':
        return (
          <div className="relative">
            <img src={src} alt={caption || "Media content"} className="w-full rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-center text-white p-6 max-w-2xl">
                {title && <h4 className="text-2xl font-bold mb-3">{title}</h4>}
                {text && <p className="text-lg leading-relaxed">{text}</p>}
              </div>
            </div>
            {caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            <img src={src} alt={caption || "Media content"} className="mx-auto max-w-md rounded-lg" />
            {title && <h4 className="text-lg font-semibold mt-4 mb-2">{title}</h4>}
            {caption && <p className="text-sm text-gray-600">{caption}</p>}
          </div>
        );
    }
  };

  return (
    <div className="prose max-w-none">
      {block.content.fileType === 'video' ? (
        <div className="text-center">
          <video controls className="w-full max-w-2xl mx-auto rounded-lg">
            <source src={block.content.src} />
            Your browser does not support the video tag.
          </video>
          {block.content.title && (
            <h4 className="text-lg font-semibold mt-4 mb-2">{block.content.title}</h4>
          )}
          {block.content.caption && (
            <p className="text-sm text-gray-600">{block.content.caption}</p>
          )}
        </div>
      ) : block.content.fileType === 'audio' ? (
        <div className="text-center">
          <audio controls className="w-full max-w-xl mx-auto">
            <source src={block.content.src} />
            Your browser does not support the audio tag.
          </audio>
          {block.content.title && (
            <h4 className="text-lg font-semibold mt-4 mb-2">{block.content.title}</h4>
          )}
          {block.content.caption && (
            <p className="text-sm text-gray-600">{block.content.caption}</p>
          )}
        </div>
      ) : (
        renderImageWithStyle()
      )}
    </div>
  );
};

export default MediaBlockRenderer;