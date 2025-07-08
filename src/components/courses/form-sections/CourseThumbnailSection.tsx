
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '../ImageUpload';

interface CourseThumbnailSectionProps {
  currentImage: string;
  onImageChange: (image: string | null) => void;
}

export const CourseThumbnailSection: React.FC<CourseThumbnailSectionProps> = ({
  currentImage,
  onImageChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Thumbnail</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImageUpload 
          currentImage={currentImage} 
          onImageChange={onImageChange} 
        />
      </CardContent>
    </Card>
  );
};
