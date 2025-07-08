
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PublishCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
}

export const PublishCourseDialog: React.FC<PublishCourseDialogProps> = ({ 
  open, 
  onOpenChange, 
  courseId 
}) => {
  const { toast } = useToast();
  const [confirmPublish, setConfirmPublish] = useState(false);

  const handlePublish = () => {
    if (confirmPublish) {
      toast({
        title: "Course published",
        description: "Your course is now live and available to students.",
      });
      onOpenChange(false);
      setConfirmPublish(false);
    }
  };

  const handleClose = () => {
    setConfirmPublish(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Once published, your course will be available to students. You can still make changes after publishing.
          </p>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="confirm" 
              checked={confirmPublish}
              onCheckedChange={(checked) => setConfirmPublish(checked === true)}
            />
            <Label htmlFor="confirm" className="text-sm">
              I confirm that this course is ready to be published
            </Label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handlePublish}
              disabled={!confirmPublish}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Publish Course
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
