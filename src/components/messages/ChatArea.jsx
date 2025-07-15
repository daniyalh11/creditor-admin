import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Send, Smile, Mic, Square, Paperclip, Image, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AttachmentPreview } from './AttachmentPreview';
import { toast } from 'sonner';

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

const emojiList = [
  '😊', '😂', '😍', '👍', '👎', '❤️', '🔥', '😎', '🤔', '😢', '😮', '😡', '🎉', '👏', '🙏', '🥳', '😇', '😜', '😏', '🙌', '💯', '🥰', '😅', '🤩', '😬', '😴', '🤗', '😱', '😋', '😃', '😆'
];

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
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [microphoneError, setMicrophoneError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (currentAudio) {
        currentAudio.pause();
      }
      if (audioBlob) {
        URL.revokeObjectURL(URL.createObjectURL(audioBlob));
      }
    };
  }, [currentAudio, audioBlob]);

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
      setMicrophoneError(null);
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
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      if (error.name === 'NotAllowedError') {
        setMicrophoneError('Microphone access was denied. Please allow microphone access to record voice messages.');
        toast.error('Microphone access was denied');
      } else {
        setMicrophoneError('Error accessing microphone. Please check your microphone settings.');
        toast.error('Error accessing microphone');
      }
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
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
    if (!audioBlob || !audioUrl) {
      toast.error('No audio recorded');
      return;
    }

    try {
      const duration = recordingTime;
      const voiceMessage = {
        id: Date.now().toString(),
        content: { type: 'voice', duration, audioUrl },
        senderId: 'current-user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'voice',
        audioUrl,
        duration,
        isRead: false,
        progress: '0%'
      };
      onSendMessage(voiceMessage);
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error sending voice message:', error);
      toast.error('Failed to send voice message');
    }
  };

  const playAudio = (audioUrl) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentAudio(audio);
    
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));
    
    audio.play().catch(e => console.error('Error playing audio:', e));
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
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
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
    if (file && file.type === 'application/pdf') {
      const attachment = {
        id: Date.now().toString(),
        file,
        url: URL.createObjectURL(file),
        type: 'document'
      };
      setAttachments(prev => [...prev, attachment]);
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
    // Handle cases where content is not a string
    if (typeof content !== 'string') {
      return {
        text: '',
        attachments: []
      };
    }

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

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  const renderMessageContent = (content, message) => {
    // Handle cases where content is null/undefined
    if (content == null) {
      return null;
    }

    // Handle voice messages with play button and playback UI
    if (typeof content === 'object' && content.type === 'voice' && message) {
      return (
        <div className={`p-3 rounded-lg max-w-xs ${message.senderId === 'current-user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <div className="flex items-center">
            <button 
              onClick={() => playAudio(content.audioUrl)}
              className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${message.senderId === 'current-user' ? 'bg-blue-200 hover:bg-blue-300' : 'bg-gray-200 hover:bg-gray-300'} mr-3`}
            >
              {isPlaying && currentAudio && currentAudio.src === content.audioUrl ? (
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
                >
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
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
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Voice message</span>
                <span className="text-xs text-gray-500">
                  {formatTime(content.duration || 0)}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <div className="h-1.5 bg-gray-200 rounded-full flex-1 mr-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${message.senderId === 'current-user' ? 'bg-blue-500' : 'bg-gray-500'}`} 
                    style={{ width: message.progress || '100%' }}
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
      );
    }

    // Handle string content
    if (typeof content === 'string') {
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
    }
    // Fallback for other content types
    return <p className="text-sm mb-2">{String(content)}</p>;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
                {renderMessageContent(message.type === 'voice' ? message : message.content, message)}
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
                {formatTime(recordingTime)}
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
                onClick={() => playAudio(audioUrl)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
              >
                {isPlaying && currentAudio && currentAudio.src === audioUrl ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
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
                    {formatTime(recordingTime)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:bg-gray-100"
                onClick={() => {
                  setAudioBlob(null);
                  setRecordingTime(0);
                  if (currentAudio) currentAudio.pause();
                  if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                    setAudioUrl(null);
                  }
                }}
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
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleImageChange}
        className="hidden"
      />
      <input
        ref={documentInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleDocumentChange}
        className="hidden"
      />

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        {microphoneError && (
          <div className="mb-2 p-2 bg-red-50 text-red-600 text-sm rounded-md">
            {microphoneError}
          </div>
        )}
        
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
          <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 hover:bg-gray-100"
                onClick={() => setIsEmojiPickerOpen((open) => !open)}
                tabIndex={-1}
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" side="top">
              <div className="grid grid-cols-8 gap-2">
                {emojiList.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-lg hover:bg-gray-100"
                    tabIndex={-1}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover open={isAttachmentOpen} onOpenChange={setIsAttachmentOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 hover:bg-gray-100"
                onClick={() => setIsAttachmentOpen((open) => !open)}
                tabIndex={-1}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" side="top">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsAttachmentOpen(false);
                    imageInputRef.current?.click();
                  }}
                >
                  <Image className="h-4 w-4" />
                  Image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 justify-start text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsAttachmentOpen(false);
                    documentInputRef.current?.click();
                  }}
                >
                  <FileText className="h-4 w-4" />
                  Document
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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