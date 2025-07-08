
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, FileText, File } from 'lucide-react';

export interface Attachment {
  id: string;
  file: File;
  url: string;
  type: 'image' | 'document';
}

interface AttachmentPreviewProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
  variant?: 'preview' | 'message';
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  attachments,
  onRemove,
  variant = 'preview'
}) => {
  if (attachments.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${variant === 'preview' ? 'p-3 border-t border-gray-200' : ''}`}>
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className={`relative group ${
            variant === 'preview' 
              ? 'bg-gray-50 border border-gray-200 rounded-lg overflow-hidden' 
              : 'max-w-xs'
          }`}
        >
          {attachment.type === 'image' ? (
            <div className="relative">
              <img
                src={attachment.url}
                alt={attachment.file.name}
                className={`object-cover rounded-lg ${
                  variant === 'preview' ? 'w-16 h-16' : 'max-w-full max-h-48'
                }`}
              />
              {variant === 'preview' && onRemove && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemove(attachment.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              {variant === 'message' && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate rounded-b-lg">
                  {attachment.file.name}
                </div>
              )}
            </div>
          ) : (
            <div className={`flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg ${
              variant === 'preview' ? 'w-48' : 'min-w-48'
            }`}>
              <div className="flex-shrink-0">
                {attachment.file.type.includes('pdf') ? (
                  <FileText className="h-8 w-8 text-red-500" />
                ) : (
                  <File className="h-8 w-8 text-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {attachment.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(attachment.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              {variant === 'preview' && onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemove(attachment.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
