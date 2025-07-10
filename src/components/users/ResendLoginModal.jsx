import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ResendLoginModal = ({
  users,
  open,
  onOpenChange,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const emailTemplate = (user) => `
    Subject: Login Information - Creditor Academy

    Dear ${user.name},

    Here are your login credentials for Creditor Academy:

    Email: ${user.email}
    Login URL: https://creditoracademy.com/login

    Please use your existing password to log in. If you've forgotten your password, you can reset it using the "Forgot Password" link on the login page.

    If you have any questions or need assistance, please don't hesitate to contact our support team.

    Best regards,
    Creditor Academy Team
  `;

  const handleSendEmails = () => {
    // Mock sending emails
    users.forEach(user => {
      console.log(`Sending login info to ${user.email}`);
    });

    toast({
      title: "Login information sent",
      description: `Login details sent to ${users.length} user(s) successfully.`
    });

    onOpenChange(false);
    setShowPreview(false);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Preview - Login Information</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              The following emails will be sent to {users.length} user(s):
            </p>
            
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">To: {user.email}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-line font-mono">
                    {emailTemplate(user)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Back
            </Button>
            <Button onClick={handleSendEmails}>
              Send Emails
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resend Login Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Login information will be sent to the following users:
          </p>
          
          <div className="max-h-40 overflow-y-auto border rounded p-3">
            {users.map(user => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 p-3 rounded text-sm">
            <p className="text-blue-800">
              Each user will receive an email with their login credentials and instructions to access the platform.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            Preview Emails
          </Button>
          <Button onClick={handleSendEmails}>
            Send Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};