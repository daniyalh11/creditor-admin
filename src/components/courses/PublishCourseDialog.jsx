import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const PublishCourseDialog = ({ 
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
        description: `Your course (ID: ${courseId}) is now live and available to students.`,
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
        <div className="space-y-4 pt-2">
          <p className="text-gray-600">
            Once published, your course will be available to students. You can still make changes after publishing.
          </p>
          
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md border">
            <Checkbox 
              id="confirm" 
              checked={confirmPublish}
              onCheckedChange={(checked) => setConfirmPublish(checked === true)}
            />
            <Label htmlFor="confirm" className="text-sm font-medium cursor-pointer">
              I confirm that this course is ready to be published
            </Label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
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

// Define prop types for runtime type checking
PublishCourseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
};