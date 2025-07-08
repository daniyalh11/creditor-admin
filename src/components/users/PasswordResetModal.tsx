
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  email: string;
}

interface PasswordResetModalProps {
  users: User[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  users,
  open,
  onOpenChange,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Mock password reset logic
    users.forEach(user => {
      console.log(`Sending password reset email to ${user.email}`);
    });

    toast({
      title: "Password reset initiated",
      description: `Password reset links sent to ${users.length} user(s).`
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Reset Password {users.length > 1 ? `(${users.length} users)` : ''}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Password reset links will be sent to:
          </p>
          <ul className="mt-2 space-y-1">
            {users.map(user => (
              <li key={user.id} className="text-sm">
                • {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Admin Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter your current password"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password for Users</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Reset Links</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
