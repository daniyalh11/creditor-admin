
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Edit, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InstructionBlockProps {
  title: string;
  instructions: string;
  onSave: (instructions: string) => void;
}

export const InstructionBlock: React.FC<InstructionBlockProps> = ({
  title,
  instructions,
  onSave
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState('');
  const { toast } = useToast();

  const handleEditClick = () => {
    setEditedInstructions(instructions);
    setShowEditModal(true);
  };

  const handleSave = () => {
    onSave(editedInstructions);
    setShowEditModal(false);
    toast({
      title: "✅ Instructions Updated",
      description: "Instructions have been successfully updated.",
    });
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setEditedInstructions('');
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {title} Instructions
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleEditClick}
              className="hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {instructions ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{instructions}</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-500 italic">No instructions have been added yet.</p>
              <Button 
                variant="link" 
                onClick={handleEditClick}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto"
              >
                Add instructions
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Instructions Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Edit {title} Instructions
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <Textarea
                value={editedInstructions}
                onChange={(e) => setEditedInstructions(e.target.value)}
                placeholder={`Enter instructions for the ${title.toLowerCase()}...`}
                rows={8}
                className="resize-none w-full"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> These instructions will be displayed to learners when they begin the {title.toLowerCase()}.
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Instructions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
