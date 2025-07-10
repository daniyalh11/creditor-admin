import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Play, Hash, Space } from 'lucide-react';

export const DividerEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editedBlock, setEditedBlock] = useState(null);

  useEffect(() => {
    if (block) {
      // Create a copy of the block to avoid direct mutation of props
      setEditedBlock({ ...block });
    }
  }, [block]);

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock);
      onOpenChange(false);
    }
  };

  const getDividerIcon = (type) => {
    switch (type) {
      case 'continue': return <Play className="h-4 w-4" />;
      case 'divider': return <Minus className="h-4 w-4" />;
      case 'number': return <Hash className="h-4 w-4" />;
      case 'space': return <Space className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const getDividerTypeName = (type) => {
    switch (type) {
      case 'continue': return 'Continue Button';
      case 'divider': return 'Horizontal Divider';
      case 'number': return 'Number Divider';
      case 'space': return 'Vertical Space';
      default: return 'Divider';
    }
  };

  if (!block || !editedBlock) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getDividerIcon(editedBlock.style)}
            Edit {getDividerTypeName(editedBlock.style)}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {editedBlock.style === 'continue' && (
            <div className="space-y-2">
              <Label htmlFor="button-label">Button Label</Label>
              <Input
                id="button-label"
                placeholder="Continue"
                value={editedBlock.content.label || ''}
                onChange={(e) => {
                  setEditedBlock({
                    ...editedBlock,
                    content: {
                      ...editedBlock.content,
                      label: e.target.value
                    }
                  });
                }}
              />
            </div>
          )}

          {editedBlock.style === 'number' && (
            <div className="space-y-2">
              <Label htmlFor="step-number">Step Number</Label>
              <Input
                id="step-number"
                type="number"
                placeholder="1"
                value={editedBlock.content.number || 1}
                onChange={(e) => {
                  setEditedBlock({
                    ...editedBlock,
                    content: {
                      ...editedBlock.content,
                      number: parseInt(e.target.value, 10) || 1
                    }
                  });
                }}
              />
            </div>
          )}

          {(editedBlock.style === 'divider' || editedBlock.style === 'space') && (
            <div className="text-sm text-gray-600 text-center py-4">
              No additional configuration needed for this divider type.
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
DividerEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['divider']).isRequired,
    style: PropTypes.oneOf(['continue', 'divider', 'number', 'space']).isRequired,
    content: PropTypes.shape({
      label: PropTypes.string,
      number: PropTypes.number,
    }).isRequired,
  }), // block can be null, so it's not .isRequired
  onSave: PropTypes.func.isRequired,
};