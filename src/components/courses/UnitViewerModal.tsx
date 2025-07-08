
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Clock, FileText } from 'lucide-react';
import { BlockPreviewRenderer } from './BlockPreviewRenderer';
import type { Block } from './types/blocks';

interface PublishedUnit {
  id: string;
  title: string;
  blocks: Block[];
  publishedAt: string;
  status: 'published' | 'draft';
}

interface UnitViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: PublishedUnit | null;
}

export const UnitViewerModal: React.FC<UnitViewerModalProps> = ({
  open,
  onOpenChange,
  unit
}) => {
  if (!unit) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <div className="flex-1">
            <DialogTitle className="text-xl font-semibold">{unit.title}</DialogTitle>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Published {formatDate(unit.publishedAt)}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                {unit.blocks.length} blocks
              </span>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-3xl mx-auto">
            {unit.blocks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">No content blocks</p>
                <p className="text-sm">This lesson appears to be empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {unit.blocks.map((block) => (
                  <BlockPreviewRenderer key={block.id} block={block} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
