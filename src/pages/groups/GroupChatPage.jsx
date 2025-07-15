import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Send, Smile, Mic, Paperclip, Users, Square, Image, FileText, X } from 'lucide-react';
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
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const audioRefs = useRef({});
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  
  const [groupMembers] = useState([
    { id: '1', name: 'Evan Scott' },
    { id: '2', name: 'Sarah Adams' },
    { id: '3', name: 'Kate Johnson' },
    { id: '4', name: 'Mike Chen' },
    { id: '5', name: 'You' }
  ]);

  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: 'user1',
      senderName: 'Evan Scott',
      content: 'Recently I saw properties in a great location that I did not pay attention to before 😊',
      timestamp: '10:26 AM',
      isCurrentUser: false
    },
    {
      id: '2',
      senderId: 'user1',
      senderName: 'Evan Scott',
      content: 'Ops, why don\'t you say something more',
      timestamp: '10:26 AM',
      isCurrentUser: false
    },
    {
      id: '3',
      senderId: 'user2',
      senderName: 'Sarah Adams',
      content: '@Kate 😊',
      timestamp: '10:27 AM',
      isCurrentUser: false
    },
    {
      id: '4',
      senderId: 'current-user',
      senderName: 'You',
      content: 'She creates an atmosphere of mystery 😊',
      timestamp: '11:26 AM',
      isCurrentUser: true
    },
    {
      id: '5',
      senderId: 'current-user',
      senderName: 'You',
      content: '🤓 😊',
      timestamp: '11:26 AM',
      isCurrentUser: true
    },
    {
      id: '6',
      senderId: 'user1',
      senderName: 'Evan Scott',
      content: 'Kate, don\'t be like that and say something more :) 😊',
      timestamp: '11:34 AM',
      isCurrentUser: false
    }
  ]);

  const emojis = ['😊', '😂', '😍', '👍', '👎', '❤️', '🔥', '😎', '🤔', '😢', '😮', '😡', '🎉', '👏', '🙏'];

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      let messageContent = newMessage;
      
      if (attachments.length > 0) {
        const attachmentInfo = attachments.map(att => {
          if (att.type === 'image') {
            return `📷 ${att.file.name}`;
          } else {
            return `📄 ${att.file.name}`;
          }
        }).join(', ');
        
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

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleDocumentUpload = () => {
    documentInputRef.current?.click();
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

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
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
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
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
      alert('Microphone access denied or not available.');
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

  const togglePlayPause = (messageId, audioUrl) => {
    // If the same message is clicked, toggle play/pause
    if (currentlyPlayingId === messageId) {
      const audio = audioRefs.current[messageId];
      if (audio.paused) {
        audio.play().catch(e => console.error('Error playing audio:', e));
      } else {
        audio.pause();
      }
      return;
    }

    // Stop any currently playing audio
    if (currentlyPlayingId && audioRefs.current[currentlyPlayingId]) {
      audioRefs.current[currentlyPlayingId].pause();
    }

    // Play the new audio
    if (!audioRefs.current[messageId]) {
      audioRefs.current[messageId] = new Audio(audioUrl);
      audioRefs.current[messageId].onended = () => setCurrentlyPlayingId(null);
    }

    audioRefs.current[messageId].play()
      .then(() => setCurrentlyPlayingId(messageId))
      .catch(e => console.error('Error playing audio:', e));
  };

  const sendVoiceMessage = () => {
    if (!audioBlob || !audioUrl) {
      alert('No audio recorded');
      return;
    }
    
    const message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      type: 'voice',
      audioUrl,
      duration: recordingTime,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };
    
    setMessages([...messages, message]);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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

  const renderMessageContent = (message) => {
    if (message.type === 'voice') {
      const isPlaying = currentlyPlayingId === message.id;
      
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => togglePlayPause(message.id, message.audioUrl)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>
          <span className="text-sm font-medium">Voice message</span>
          <span className="text-xs text-gray-500">{formatTime(message.duration || 0)}</span>
        </div>
      );
    }
    
    if (typeof message.content === 'string') {
      const { text, attachments: messageAttachments } = parseMessageAttachments(message.content);
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
    return null;
  };

  useEffect(() => {
    return () => {
      // Clean up all audio elements and intervals
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.onended = null;
      });
      
      if (audioBlob && audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioBlob, audioUrl]);

  return (
    <div className="flex flex-col h-screen">
      {/* Group Chat Header - Fixed at top */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Web Development</h1>
          <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                <Users className="h-4 w-4" />
                <span>{groupMembers.length} participants</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Group Participants</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Messages Area - Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.isCurrentUser ? "justify-end" : "justify-start"
              )}
            >
              {!message.isCurrentUser && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                    {getInitials(message.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={cn(
                "flex flex-col",
                message.isCurrentUser ? "items-end" : "items-start"
              )}>
                {!message.isCurrentUser && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{message.senderName}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                    message.isCurrentUser
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  )}
                >
                  {renderMessageContent(message)}
                </div>
                
                {message.isCurrentUser && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    <span className="text-xs text-gray-500">Y</span>
                  </div>
                )}
              </div>
              
              {message.isCurrentUser && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-medium">
                    {getInitials(message.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Attachment Preview - Fixed at bottom */}
      {attachments.length > 0 && (
        <div className="border-t border-gray-200 bg-white">
          <AttachmentPreview
            attachments={attachments}
            onRemove={handleRemoveAttachment}
            variant="preview"
          />
        </div>
      )}

      {/* Message Input - Fixed at bottom */}
      <div className="border-t border-gray-200 bg-white p-4">
        {isRecording ? (
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700">Recording...</span>
              <span className="text-xs text-red-500">{formatTime(recordingTime)}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-100"
              onClick={stopRecording}
            >
              Stop Recording
            </Button>
          </div>
        ) : audioBlob ? (
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (!audioRefs.current['preview']) {
                    audioRefs.current['preview'] = new Audio(audioUrl);
                    audioRefs.current['preview'].onended = () => setCurrentlyPlayingId(null);
                  }
                  
                  if (currentlyPlayingId === 'preview') {
                    audioRefs.current['preview'].paused 
                      ? audioRefs.current['preview'].play().catch(e => console.error('Error playing audio:', e))
                      : audioRefs.current['preview'].pause();
                  } else {
                    if (currentlyPlayingId && audioRefs.current[currentlyPlayingId]) {
                      audioRefs.current[currentlyPlayingId].pause();
                    }
                    audioRefs.current['preview'].play()
                      .then(() => setCurrentlyPlayingId('preview'))
                      .catch(e => console.error('Error playing audio:', e));
                  }
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600"
              >
                {currentlyPlayingId === 'preview' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
              </button>
              <div>
                <p className="text-sm font-medium">Voice message</p>
                <p className="text-xs text-gray-500">{formatTime(recordingTime)} • {Math.floor(audioBlob.size / 1000)} KB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:bg-gray-100"
                onClick={() => {
                  setAudioBlob(null);
                  setAudioUrl(null);
                  setRecordingTime(0);
                  if (currentlyPlayingId === 'preview' && audioRefs.current['preview']) {
                    audioRefs.current['preview'].pause();
                  }
                  setCurrentlyPlayingId(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={sendVoiceMessage}
              >
                Send
              </Button>
            </div>
          </div>
        ) : null}
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleDocumentUpload}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input
            placeholder="Write your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" side="top">
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-lg hover:bg-gray-100"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoiceRecord}
            className={cn(
              "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
              isRecording && "bg-red-100 text-red-600 hover:bg-red-200",
              audioBlob && "bg-purple-100 text-purple-600 hover:bg-purple-200"
            )}
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={(!newMessage.trim() && attachments.length === 0) || isRecording || audioBlob}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

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

export default GroupChatPage;