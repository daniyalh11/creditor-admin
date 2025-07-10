import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Clock, FileText } from 'lucide-react';
import { BlockPreviewRenderer } from './BlockPreviewRenderer';

export const UnitViewerModal = ({
  open,
  onOpenChange,
  unit
}) => {
  if (!unit) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-xl font-semibold truncate">{unit.title}</DialogTitle>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Published {formatDate(unit.publishedAt)}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                {unit.blocks.length} block{unit.blocks.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-8 max-w-3xl mx-auto">
            {unit.blocks.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-semibold mb-2">No Content Blocks</p>
                <p className="text-sm">This lesson appears to be empty.</p>
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

// Define prop types for runtime type checking
const blockPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // Add other block properties if needed for more specific validation
  content: PropTypes.object.isRequired,
});

UnitViewerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    blocks: PropTypes.arrayOf(blockPropType).isRequired,
    publishedAt: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['published', 'draft']).isRequired,
  }),
};