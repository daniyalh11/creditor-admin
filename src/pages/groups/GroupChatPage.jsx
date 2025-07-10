import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Send, Smile, Mic, Paperclip, Users, Square, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AttachmentPreview } from '@/components/messages/AttachmentPreview';

const GroupChatPage = () => {
  const { groupId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const [groupMembers] = useState([
    { id: '1', name: 'Evan Scott' },
    { id: '2', name: 'Sarah Adams' },
    { id: '3', name: 'Kate Johnson' },
    { id: '4', name: 'Mike Chen' },
    { id: '5', name: 'You' }
  ]);

  const [messages, setMessages] = useState([
    { id: '1', senderId: 'user1', senderName: 'Evan Scott', content: 'Recently I saw properties in a great location that I did not pay attention to before 😊', timestamp: '10:26 AM', isCurrentUser: false },
    { id: '2', senderId: 'user1', senderName: 'Evan Scott', content: "Ops, why don't you say something more", timestamp: '10:26 AM', isCurrentUser: false },
    { id: '3', senderId: 'user2', senderName: 'Sarah Adams', content: '@Kate 😊', timestamp: '10:27 AM', isCurrentUser: false },
    { id: '4', senderId: 'current-user', senderName: 'You', content: 'She creates an atmosphere of mystery 😊', timestamp: '11:26 AM', isCurrentUser: true },
    { id: '5', senderId: 'current-user', senderName: 'You', content: '🤓 😊', timestamp: '11:26 AM', isCurrentUser: true },
    { id: '6', senderId: 'user1', senderName: 'Evan Scott', content: "Kate, don't be like that and say something more :) 😊", timestamp: '11:34 AM', isCurrentUser: false }
  ]);

  const emojis = ['😊', '😂', '😍', '👍', '👎', '❤️', '🔥', '😎', '🤔', '😢', '😮', '😡', '🎉', '👏', '🙏'];

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      let messageContent = newMessage;

      if (attachments.length > 0) {
        const attachmentInfo = attachments.map(att => att.type === 'image' ? `📷 ${att.file.name}` : `📄 ${att.file.name}`).join(', ');
        messageContent = messageContent ? `${messageContent}\n${attachmentInfo}` : attachmentInfo;
      }

      const message = {
        id: Date.now().toString(),
        senderId: 'current-user',
        senderName: 'You',
        content: messageContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = () => imageInputRef.current?.click();
  const handleDocumentUpload = () => documentInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const attachment = { id: Date.now().toString(), file, url: URL.createObjectURL(file), type: 'image' };
      setAttachments(prev => [...prev, attachment]);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const attachment = { id: Date.now().toString(), file, url: URL.createObjectURL(file), type: 'document' };
      setAttachments(prev => [...prev, attachment]);
      setTimeout(() => handleSendMessage(), 100);
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === id);
      if (attachment) URL.revokeObjectURL(attachment.url);
      return prev.filter(att => att.id !== id);
    });
  };

  const handleOpenDocument = (attachment) => {
    setSelectedDocument(attachment);
    setIsDocumentModalOpen(true);
  };

  const handleEmojiSelect = (emoji) => setNewMessage(prev => prev + emoji);
  const handleVoiceRecord = () => setIsRecording(!isRecording);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const parseMessageAttachments = (content) => {
    const lines = content.split('\n');
    const textLines = lines.filter(line => !line.startsWith('📷') && !line.startsWith('📄'));
    const attachmentLines = lines.filter(line => line.startsWith('📷') || line.startsWith('📄'));

    const mockAttachments = attachmentLines.map((line, index) => {
      const fileName = line.substring(2);
      const isImage = line.startsWith('📷');
      return {
        id: `mock-${index}`,
        file: new File([], fileName),
        url: isImage ? '/lovable-uploads/127f270b-adf1-49f6-9723-6d800b658c1b.png' : '',
        type: isImage ? 'image' : 'document'
      };
    });

    return { text: textLines.join('\n'), attachments: mockAttachments };
  };

  const renderMessageContent = (content) => {
    const { text, attachments: messageAttachments } = parseMessageAttachments(content);

    return (
      <div>
        {text && <p className="text-sm mb-2">{text}</p>}
        {messageAttachments.length > 0 && (
          <div className="space-y-2">
            <AttachmentPreview attachments={messageAttachments} variant="message" />
            {messageAttachments.some(att => att.type === 'document') && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const docAttachment = messageAttachments.find(att => att.type === 'document');
                  if (docAttachment) handleOpenDocument(docAttachment);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Open Document
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    // Your component rendering logic remains unchanged...
    <></>
  );
};

export default GroupChatPage;