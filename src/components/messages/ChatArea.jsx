import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Send, Smile, Mic, Square, Paperclip, Image, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AttachmentPreview } from './AttachmentPreview';

const waveStyle = {
  display: 'inline-block',
  position: 'relative',
  height: '20px',
  width: '20px',
  margin: '0 2px',
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    width: '3px',
    height: '5px',
    background: 'currentColor',
    borderRadius: '3px',
    animation: 'wave 1.5s ease-in-out infinite',
  },
  '&:before': {
    left: '4px',
    animationDelay: '0s',
  },
  '&:after': {
    left: '10px',
    animationDelay: '0.3s',
  },
  '@keyframes wave': {
    '0%, 100%': { height: '5px' },
    '50%': { height: '20px' },
  },
};

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
  const recordingTimeRef = useRef(0);

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
      recordingTimeRef.current = 0;
      const intervalId = setInterval(() => {
        recordingTimeRef.current += 1;
      }, 1000);
      return () => clearInterval(intervalId);
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
      {/* Chat Header - Fixed at top */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
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

      {/* Messages Area - Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
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
                {message.type === 'voice' ? (
                  <div className={`p-3 rounded-lg max-w-xs ${message.senderId === 'current-user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <div className="flex items-center">
                      <button 
                        onClick={() => new Audio(message.audioUrl).play()}
                        className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${message.senderId === 'current-user' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'} mr-3`}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={message.playing ? 'hidden' : 'block'}
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={message.playing ? 'block' : 'hidden'}
                        >
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Voice message</span>
                          <span className="text-xs text-gray-500">
                            {message.duration || '0'}"
                          </span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <div className="h-1.5 bg-gray-200 rounded-full flex-1 mr-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${message.senderId === 'current-user' ? 'bg-blue-500' : 'bg-gray-500'}`} 
                              style={{ width: message.progress || '0%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {message.timestamp}
                          </span>
                          {message.senderId === 'current-user' && (
                            <span className="ml-2 text-xs text-gray-500">
                              {message.isRead ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  renderMessageContent(message.content)
                )}
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
      </div>

      {/* Voice Recording Preview */}
      {isRecording ? (
        <div className="p-4 border-t border-gray-200 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700">Recording...</span>
              <span className="text-xs text-red-500">
                {Math.floor(recordingTimeRef.current / 60)}:{(recordingTimeRef.current % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:bg-red-100"
                onClick={stopRecording}
              >
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          </div>
        </div>
      ) : audioBlob ? (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => new Audio(URL.createObjectURL(audioBlob)).play()}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 truncate">Voice message</span>
                  <span className="text-xs text-gray-500">
                    {Math.floor(audioBlob.size / 1000)} KB
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 bg-blue-200 rounded-full flex-1 mr-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.floor(audioBlob.size / 1000)}s
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:bg-gray-100"
                onClick={() => setAudioBlob(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={sendVoiceMessage}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : null}

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
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full ${isRecording ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={handleMicClick}
          >
            {isRecording ? (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-1"></div>
                <Mic className="h-5 w-5" />
              </div>
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 rounded-full"
          />
          
          <Button 
            size="icon" 
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            <Send className="h-5 w-5" />
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