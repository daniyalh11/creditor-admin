import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

export const ImageUpload = ({ 
  currentImage, 
  onImageChange, 
  className = "" 
}) => {
  const [preview, setPreview] = useState(null);

  // Sync state with prop changes
  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
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
            type="button" // Explicitly set type to prevent form submission
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

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
ImageUpload.propTypes = {
  currentImage: PropTypes.string,
  onImageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};