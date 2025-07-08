import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Send, Smile, Mic, Square, Paperclip, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AttachmentPreview } from './AttachmentPreview';

export const ChatArea = ({
  contact,
  messages,
  onBack,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage(newMessage, attachments);
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const sendVoiceMessage = () => {
    if (audioBlob) {
      const voiceMessage = "🎤 Voice Note";
      onSendMessage(voiceMessage);
      setAudioBlob(null);
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
    setIsAttachmentOpen(false);
  };

  const handleDocumentUpload = () => {
    documentInputRef.current?.click();
    setIsAttachmentOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const attachment = {
        id: Date.now().toString(),
        file,
        url: URL.createObjectURL(file),
        type: 'image'
      };
      setAttachments(prev => [...prev, attachment]);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const attachment = {
        id: Date.now().toString(),
        file,
        url: URL.createObjectURL(file),
        type: 'document'
      };
      setAttachments(prev => [...prev, attachment]);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter(att => att.id !== id);
    });
  };

  const handleOpenDocument = (attachment) => {
    setSelectedDocument(attachment);
    setIsDocumentModalOpen(true);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
    
    return {
      text: textLines.join('\n'),
      attachments: mockAttachments
    };
  };

  const renderMessageContent = (content) => {
    const { text, attachments: messageAttachments } = parseMessageAttachments(content);
    
    return (
      <div>
        {text && <p className="text-sm mb-2">{text}</p>}
        {messageAttachments.length > 0 && (
          <div className="space-y-2">
            <AttachmentPreview
              attachments={messageAttachments}
              variant="message"
            />
            {messageAttachments.some(att => att.type === 'document') && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const docAttachment = messageAttachments.find(att => att.type === 'document');
                  if (docAttachment) {
                    handleOpenDocument(docAttachment);
                  }
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
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-medium text-gray-900">{contact.name}</h3>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.senderId === 'current-user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                message.senderId === 'current-user'
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              )}
            >
              {renderMessageContent(message.content)}
              <p className={cn(
                "text-xs mt-1",
                message.senderId === 'current-user' ? "text-blue-100" : "text-gray-500"
              )}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Voice Recording Preview */}
      {audioBlob && (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700">Voice note recorded</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAudioBlob(null)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  onSendMessage("🎤 Voice Note");
                  setAudioBlob(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <AttachmentPreview
          attachments={attachments}
          onRemove={handleRemoveAttachment}
          variant="preview"
        />
      )}

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
        onChange={handleDocumentChange}
        className="hidden"
      />

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-500 hover:text-gray-700"
          >
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isRecording}
          />
          
          {/* Attachment Popover */}
          <Popover open={isAttachmentOpen} onOpenChange={setIsAttachmentOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-500 hover:text-gray-700"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-48 p-2 bg-white border border-gray-200 shadow-lg z-50" 
              side="top" 
              align="end"
            >
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={handleImageUpload}
                  className="w-full justify-start gap-3 h-10 px-3 text-gray-700 hover:bg-gray-100"
                >
                  <Image className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Images</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDocumentUpload}
                  className="w-full justify-start gap-3 h-10 px-3 text-gray-700 hover:bg-gray-100"
                >
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Documents</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleMicClick}
            className={cn(
              "text-gray-500 hover:text-gray-700 transition-colors",
              isRecording && "bg-red-100 text-red-600 hover:bg-red-200 animate-pulse"
            )}
          >
            {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={(!newMessage.trim() && attachments.length === 0) || isRecording}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Document Modal */}
      <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">{selectedDocument.file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {(selectedDocument.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Document preview not available</p>
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = selectedDocument.url;
                    link.download = selectedDocument.file.name;
                    link.click();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Download Document
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};