
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  views: number;
  tags: string[];
  type: string;
}

interface DeleteGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: Guide | null;
  onConfirm: (guideId: number) => void;
}

export const DeleteGuideModal: React.FC<DeleteGuideModalProps> = ({
  isOpen,
  onClose,
  guide,
  onConfirm
}) => {
  const handleConfirm = () => {
    if (guide) {
      onConfirm(guide.id);
      onClose();
    }
  };

  if (!guide) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <DialogTitle>Delete Guide</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete this guide? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-medium text-sm">{guide.title}</p>
          <p className="text-sm text-gray-600">{guide.category}</p>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete Guide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
