
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, X, FileText } from 'lucide-react';

interface AssignmentInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructions: string;
  onSave: (instructions: string) => void;
}

export const AssignmentInstructionsModal: React.FC<AssignmentInstructionsModalProps> = ({
  isOpen,
  onClose,
  instructions,
  onSave
}) => {
  const [formData, setFormData] = useState(instructions);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(instructions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              Edit Assignment Instructions
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              placeholder="Enter detailed instructions for the assignment..."
              rows={8}
              className="resize-none w-full"
            />
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-700 text-sm">
              <strong>Note:</strong> These instructions will be visible to all learners when they view the assignment. 
              Make sure to include all necessary guidelines, submission format requirements, and evaluation criteria.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Instructions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
