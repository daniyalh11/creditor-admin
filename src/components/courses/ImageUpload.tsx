
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (image: string | null) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageChange, 
  className = "" 
}) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Course cover" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Upload course cover image</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Choose File
          </Button>
        </div>
      )}
    </div>
  );
};
