
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface EnrollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  open,
  onOpenChange
}) => {
  const [accessCode, setAccessCode] = useState('');

  const handleEnroll = () => {
    console.log('Enrolling with access code:', accessCode);
    // Handle enrollment logic here
    onOpenChange(false);
    setAccessCode('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enroll in Course</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              placeholder="Enter your access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEnroll}
              disabled={!accessCode.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Enroll
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
