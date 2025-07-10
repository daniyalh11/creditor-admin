import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/courses/RichTextEditor';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export const BulkMessageModal = ({ users, open, onOpenChange }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in both subject and message fields');
      return;
    }
    
    toast.success(`Message sent to ${users.length} users`);
    setSubject('');
    setMessage('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSubject('');
    setMessage('');
    onOpenChange(false);
  };

  const handleRemoveUser = (userId) => {
    // This would need to be implemented in the parent component
    // For now, we'll just show a toast
    toast.info('User removed from recipients');
  };

  const displayUsers = showAllUsers ? users : users.slice(0, 6);
  const remainingCount = users.length - 6;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold">New message</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Recipients Section */}
          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {displayUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{user.name}</span>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {!showAllUsers && remainingCount > 0 && (
                  <button
                    onClick={() => setShowAllUsers(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1"
                  >
                    +{remainingCount} more
                  </button>
                )}
              </div>
              {showAllUsers && remainingCount > 0 && (
                <button
                  onClick={() => setShowAllUsers(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Show less
                </button>
              )}
            </div>
          </div>

          {/* Subject Section */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full"
            />
          </div>
          
          {/* Message Section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Message
            </label>
            <div className="border rounded-md">
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
                <button
                  type="button"
                  className="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded"
                  onClick={() => {
                    // Bold functionality would be implemented here
                    console.log('Bold clicked');
                  }}
                >
                  B
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-sm italic hover:bg-gray-200 rounded"
                  onClick={() => {
                    // Italic functionality would be implemented here
                    console.log('Italic clicked');
                  }}
                >
                  I
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-sm underline hover:bg-gray-200 rounded"
                  onClick={() => {
                    // Underline functionality would be implemented here
                    console.log('Underline clicked');
                  }}
                >
                  U
                </button>
              </div>
              
              {/* Text Area */}
              <RichTextEditor
                value={message}
                onChange={setMessage}
                placeholder="Type your message here..."
                className="border-0 focus:ring-0 min-h-[200px] resize-none"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSend}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};