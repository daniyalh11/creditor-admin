
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Printer, Download } from 'lucide-react';
import { BlockPreviewRenderer } from './BlockPreviewRenderer';
import type { Block } from './types/blocks';

interface LessonPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blocks: Block[];
  lessonTitle?: string;
}

export const LessonPreviewModal: React.FC<LessonPreviewModalProps> = ({
  open,
  onOpenChange,
  blocks,
  lessonTitle = "Lesson Preview"
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = () => {
    // This would integrate with a PDF generation library in a real implementation
    console.log('Save as PDF functionality would be implemented here');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-semibold">{lessonTitle}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleSavePDF}>
              <Download className="h-4 w-4 mr-2" />
              Save PDF
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-3xl mx-auto">
            {blocks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">No content blocks added yet</p>
                <p className="text-sm">Add some content blocks to see the lesson preview</p>
              </div>
            ) : (
              <div className="space-y-6">
                {blocks.map((block) => (
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
