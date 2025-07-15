import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, Send, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const BulkMessageModal = ({
  open,
  onOpenChange,
  selectedLearners
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedLearners.length} participants successfully.`,
    });

    setSubject('');
    setMessage('');
    onOpenChange(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'learner': return 'bg-blue-100 text-blue-800';
      case 'instructor': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'learner': return '🧑‍🎓';
      case 'instructor': return '🧑‍🏫';
      case 'admin': return '🛠️';
      default: return '👤';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 gap-0">
        {/* Header - fixed */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <DialogTitle className="text-xl font-semibold">Send Message</DialogTitle>
          </div>
        </DialogHeader>
        
        {/* Content - scrollable */}
        <div
          className="overflow-auto p-6 space-y-6"
          style={{ maxHeight: 'calc(90vh - 72px - 80px)' }} // 72px header, 80px footer (adjust if needed)
        >
          {/* Recipients */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              To: ({selectedLearners.length} recipients)
            </Label>
            <div className="max-h-32 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {selectedLearners.map((learner) => (
                  <div key={learner.id} className="flex items-center gap-2 bg-white border rounded-full px-3 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {getInitials(learner.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{learner.name}</span>
                    <Badge className={`${getRoleColor(learner.role)} text-xs`}>
                      <span className="mr-1">{getRoleIcon(learner.role)}</span>
                      {learner.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject *
            </Label>
            <Input
              id="subject"
              placeholder="Enter message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message *
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-gray-500">
              This message will be sent to all selected participants.
            </p>
          </div>
        </div>

        {/* Footer - fixed */}
        <div className="flex justify-end gap-3 p-6 border-t bg-white flex-shrink-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            disabled={!subject.trim() || !message.trim()}
          >
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};