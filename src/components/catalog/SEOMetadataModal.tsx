
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
}

interface SEOMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (metadata: SEOMetadata) => void;
  currentMetadata: SEOMetadata;
}

export const SEOMetadataModal: React.FC<SEOMetadataModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentMetadata
}) => {
  const [metadata, setMetadata] = useState(currentMetadata);

  const handleSave = () => {
    onSave(metadata);
    onClose();
  };

  const handleCancel = () => {
    setMetadata(currentMetadata);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>SEO Metadata</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={metadata.title}
              onChange={(e) => setMetadata({...metadata, title: e.target.value})}
              placeholder="Enter SEO title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={metadata.description}
              onChange={(e) => setMetadata({...metadata, description: e.target.value})}
              placeholder="Enter SEO description..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoKeywords">Keywords</Label>
            <Input
              id="seoKeywords"
              value={metadata.keywords}
              onChange={(e) => setMetadata({...metadata, keywords: e.target.value})}
              placeholder="Enter keywords separated by commas..."
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
