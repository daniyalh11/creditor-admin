
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Inbox, Mail, MailOpen, Archive, Trash2, Reply } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

interface EmailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
}

interface EmailInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailInboxModal: React.FC<EmailInboxModalProps> = ({
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  
  const [emails, setEmails] = useState<EmailMessage[]>([
    {
      id: '1',
      sender: 'Sarah Johnson',
      senderEmail: 'sarah.j@lawfirm.com',
      subject: 'Case Review Meeting Tomorrow',
      preview: 'Hi Alex, Just wanted to remind you about our case review meeting scheduled for tomorrow at 2 PM...',
      content: 'Hi Alex,\n\nJust wanted to remind you about our case review meeting scheduled for tomorrow at 2 PM. We\'ll be discussing the Peterson vs. Williams case.\n\nPlease bring all relevant documents.\n\nBest regards,\nSarah',
      timestamp: '2024-01-16 09:30',
      isRead: false,
      isImportant: true
    },
    {
      id: '2',
      sender: 'Michael Chen',
      senderEmail: 'm.chen@university.edu',
      subject: 'Assignment Submission Reminder',
      preview: 'Dear Alex, This is a friendly reminder that your Constitutional Law assignment is due this Friday...',
      content: 'Dear Alex,\n\nThis is a friendly reminder that your Constitutional Law assignment is due this Friday at 11:59 PM.\n\nThe assignment should be submitted through the course portal.\n\nIf you have any questions, please don\'t hesitate to reach out.\n\nBest,\nProfessor Chen',
      timestamp: '2024-01-15 14:15',
      isRead: false,
      isImportant: false
    },
    {
      id: '3',
      sender: 'Legal Studies Group',
      senderEmail: 'noreply@legalstudies.org',
      subject: 'New Course: Advanced Criminal Procedure',
      preview: 'We are excited to announce a new course offering: Advanced Criminal Procedure. This comprehensive course...',
      content: 'We are excited to announce a new course offering: Advanced Criminal Procedure.\n\nThis comprehensive course covers advanced topics in criminal law and procedure, including:\n- Miranda Rights and Interrogation\n- Search and Seizure Laws\n- Evidence Handling\n- Trial Procedures\n\nEnrollment opens next Monday.\n\nBest regards,\nLegal Studies Team',
      timestamp: '2024-01-15 11:45',
      isRead: true,
      isImportant: false
    },
    {
      id: '4',
      sender: 'System Admin',
      senderEmail: 'admin@athena-lms.com',
      subject: 'System Maintenance Notice',
      preview: 'Scheduled maintenance on Sunday, January 21st from 2:00 AM to 6:00 AM EST...',
      content: 'Dear Users,\n\nWe will be performing scheduled system maintenance on Sunday, January 21st from 2:00 AM to 6:00 AM EST.\n\nDuring this time, the system may be temporarily unavailable.\n\nWe apologize for any inconvenience.\n\nThank you,\nSystem Administrator',
      timestamp: '2024-01-14 16:20',
      isRead: true,
      isImportant: false
    }
  ]);

  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);

  const unreadCount = emails.filter(email => !email.isRead).length;

  const handleEmailClick = (email: EmailMessage) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      setEmails(prev => 
        prev.map(e => 
          e.id === email.id ? { ...e, isRead: true } : e
        )
      );
    }
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };

  const handleMarkAsRead = (id: string) => {
    setEmails(prev => 
      prev.map(e => 
        e.id === id ? { ...e, isRead: true } : e
      )
    );
  };

  const handleMarkAsUnread = (id: string) => {
    setEmails(prev => 
      prev.map(e => 
        e.id === id ? { ...e, isRead: false } : e
      )
    );
  };

  const handleDelete = (id: string) => {
    const email = emails.find(e => e.id === id);
    setEmails(prev => prev.filter(e => e.id !== id));
    setSelectedEmail(null);
    toast({
      title: "Email deleted",
      description: `"${email?.subject}" has been moved to trash.`,
      duration: 3000,
    });
  };

  const handleReply = () => {
    toast({
      title: "Reply feature",
      description: "Reply functionality would open here in a full implementation.",
      duration: 3000,
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedEmail) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl bg-white max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={handleBackToInbox}>
                ← Back to Inbox
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReply}>
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(selectedEmail.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <div className="mb-4 pb-4 border-b">
              <h2 className="text-xl font-semibold mb-2">{selectedEmail.subject}</h2>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <span className="font-medium">{selectedEmail.sender}</span>
                  <span className="ml-2">&lt;{selectedEmail.senderEmail}&gt;</span>
                </div>
                <span>{formatTimestamp(selectedEmail.timestamp)}</span>
              </div>
            </div>
            
            <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
              {selectedEmail.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-gray-600" />
            Email Inbox
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Your recent email messages
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No emails</h3>
              <p className="text-gray-500">Your inbox is empty.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {emails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  className={cn(
                    "flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer",
                    !email.isRead ? "bg-blue-50 border-blue-200" : "bg-white"
                  )}
                >
                  <div className="mt-1">
                    {email.isRead ? (
                      <MailOpen className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Mail className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-medium truncate",
                          !email.isRead ? "text-gray-900" : "text-gray-700"
                        )}>
                          {email.sender}
                        </span>
                        {email.isImportant && (
                          <Badge variant="destructive" className="text-xs">
                            Important
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatTimestamp(email.timestamp)}
                      </span>
                    </div>
                    
                    <div className={cn(
                      "font-medium mb-1 truncate",
                      !email.isRead ? "text-gray-900" : "text-gray-700"
                    )}>
                      {email.subject}
                    </div>
                    
                    <div className="text-sm text-gray-500 truncate">
                      {email.preview}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        email.isRead ? handleMarkAsUnread(email.id) : handleMarkAsRead(email.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      {email.isRead ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <MailOpen className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
