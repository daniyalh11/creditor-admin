import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Image, FileVideo, FileAudio, Trash2, Globe, Paperclip, Mic, MicOff } from 'lucide-react';

export const MediaEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editedBlock, setEditedBlock] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef(null);

  useEffect(() => {
    if (block) {
      setEditedBlock(block);
    }
  }, [block]);

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock);
      onOpenChange(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && editedBlock) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result;
        let fileType;
        
        if (file.type.startsWith('video/')) {
          fileType = 'video';
        } else if (file.type.startsWith('audio/')) {
          fileType = 'audio';
        } else if (file.type.startsWith('image/')) {
          fileType = 'image';
        } else {
          fileType = 'attachment';
        }
        
        setEditedBlock(prev => prev ? ({
          ...prev,
          content: {
            ...prev.content,
            src,
            fileType,
            fileName: file.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            mimeType: file.type,
            recordedAudio: false
          }
        }) : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        
        if (editedBlock) {
          setEditedBlock(prev => prev ? ({
            ...prev,
            content: {
              ...prev.content,
              src: url,
              fileType: 'audio',
              recordedAudio: true,
              fileName: `Recorded Audio ${new Date().toLocaleTimeString()}`,
              fileSize: `${(blob.size / 1024 / 1024).toFixed(2)} MB`
            }
          }) : null);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      // Optionally, provide user feedback here
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const handleRemoveFile = () => {
    setEditedBlock(prev => prev ? ({
      ...prev,
      content: {
        ...prev.content,
        src: undefined,
        fileType: undefined,
        fileName: undefined,
        fileSize: undefined,
        mimeType: undefined,
        recordedAudio: false,
        embedCode: undefined
      }
    }) : null);
    setRecordedBlob(null);
  };

  const getFileIcon = (fileType, multimediaType) => {
    const type = multimediaType || fileType;
    switch (type) {
      case 'video': return <FileVideo className="h-4 w-4" />;
      case 'audio': return <FileAudio className="h-4 w-4" />;
      case 'embedded': return <Globe className="h-4 w-4" />;
      case 'attachment': return <Paperclip className="h-4 w-4" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  const renderMediaPreview = () => {
    if (!editedBlock) return null;
    
    const { src, fileType, multimediaType, embedCode, fileName, recordedAudio } = editedBlock.content;
    const mediaType = multimediaType || fileType;

    if (mediaType === 'embedded') {
      if (!embedCode && !src) return null;
      
      return (
        <div className="relative">
          <div 
            className="w-full h-48 border rounded-lg overflow-hidden bg-gray-100"
            dangerouslySetInnerHTML={{ 
              __html: embedCode || `<iframe src="${src}" width="100%" height="100%" frameBorder="0"></iframe>` 
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-auto"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    if (mediaType === 'attachment') {
      if (!src && !fileName) return null;
      
      return (
        <div className="relative border rounded-lg p-4 bg-gray-50 flex items-center gap-3">
          <Paperclip className="h-6 w-6 text-gray-600" />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{fileName || 'Attached File'}</p>
            {editedBlock.content.fileSize && (
              <p className="text-sm text-gray-600">{editedBlock.content.fileSize}</p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    if (!src) return null;

    if (mediaType === 'video') {
      return (
        <div className="relative">
          <video src={src} controls className="w-full max-w-md rounded-lg bg-black">
            Your browser does not support the video tag.
          </video>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-auto"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    if (mediaType === 'audio') {
      return (
        <div className="relative">
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              {recordedAudio && <Mic className="h-4 w-4 text-blue-600" />}
              <span className="text-sm font-medium">
                {recordedAudio ? 'Recorded Audio' : 'Audio File'}
              </span>
            </div>
            <audio src={src} controls className="w-full max-w-md">
              Your browser does not support the audio tag.
            </audio>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-auto"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className="relative">
        <img src={src} alt="Media preview" className="w-full max-w-md rounded-lg" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-auto"
          onClick={handleRemoveFile}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderUploadSection = () => {
    if (!editedBlock) return null;
    
    const mediaType = editedBlock.content.multimediaType || editedBlock.content.fileType;
    
    if (mediaType === 'embedded') {
      return (
        <div className="space-y-3">
          <Label htmlFor="embed-code">Embed Code or URL</Label>
          <Textarea
            id="embed-code"
            placeholder="Paste your embed code (e.g., from YouTube) or a direct URL here..."
            value={editedBlock.content.embedCode || ''}
            onChange={(e) => {
              const value = e.target.value;
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  embedCode: value,
                  // If it's a URL and not an iframe, set src for the preview iframe
                  src: !value.trim().startsWith('<iframe') ? value : prev.content.src,
                }
              }) : null);
            }}
            rows={4}
          />
        </div>
      );
    }

    if (mediaType === 'audio') {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1">
              <Label>Record Audio</Label>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={isRecording ? stopRecording : startRecording}
                  className="flex items-center gap-2"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isRecording ? 'Stop' : 'Record'}
                </Button>
                {isRecording && (
                  <span className="text-sm text-red-600 font-mono">
                    {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-center text-gray-400 text-sm">OR</div>
            
            <div className="flex-1">
              <Label htmlFor="audio-upload">Upload Audio File</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                />
                <Button type="button" variant="outline" asChild>
                  <label htmlFor="audio-upload" className="cursor-pointer flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const acceptedTypes = mediaType === 'video' ? 'video/*' : 
                         mediaType === 'attachment' ? '*/*' : 
                         editedBlock.style === 'image' ? 'image/*' : 
                         'image/*,video/*,audio/*';
    
    return (
      <div>
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileUpload}
          className="hidden"
          id="media-upload"
        />
        <Button type="button" variant="outline" asChild>
          <label htmlFor="media-upload" className="cursor-pointer flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            {editedBlock.content.src ? 'Replace File' : `Upload ${mediaType === 'video' ? 'Video' : mediaType === 'attachment' ? 'File' : 'Media'}`}
          </label>
        </Button>
      </div>
    );
  };

  if (!block || !editedBlock) {
    return null;
  }

  const mediaType = editedBlock.content.multimediaType || editedBlock.content.fileType;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getFileIcon(editedBlock.content.fileType, editedBlock.content.multimediaType)}
            Edit {editedBlock.style === 'image' ? 'Image' : 
                   mediaType === 'audio' ? 'Audio' :
                   mediaType === 'video' ? 'Video' :
                   mediaType === 'embedded' ? 'Embedded Content' :
                   mediaType === 'attachment' ? 'Attachment' :
                   'Multimedia'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div>
            <Label>Media Content</Label>
            <div className="mt-2 p-4 border rounded-lg space-y-4 bg-gray-50/50">
              {renderMediaPreview()}
              {(!editedBlock.content.src && !editedBlock.content.embedCode) && renderUploadSection()}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder={`Enter title...`}
              value={editedBlock.content.title || ''}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({ ...prev, content: { ...prev.content, title: e.target.value }}) : null);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="caption">Caption (Optional)</Label>
            <Input
              id="caption"
              placeholder={`Enter caption...`}
              value={editedBlock.content.caption || ''}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({ ...prev, content: { ...prev.content, caption: e.target.value }}) : null);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Define prop types for runtime type checking
MediaEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['media']).isRequired,
    style: PropTypes.oneOf(['image', 'multimedia']).isRequired,
    content: PropTypes.shape({
      src: PropTypes.string,
      caption: PropTypes.string,
      title: PropTypes.string,
      fileType: PropTypes.oneOf(['image', 'video', 'audio', 'embedded', 'attachment']),
      multimediaType: PropTypes.oneOf(['audio', 'video', 'embedded', 'attachment']),
      imageStyle: PropTypes.oneOf(['centered', 'full-width', 'image-and-text', 'text-on-image']),
      text: PropTypes.string,
      embedCode: PropTypes.string,
      fileName: PropTypes.string,
      fileSize: PropTypes.string,
      mimeType: PropTypes.string,
      recordedAudio: PropTypes.bool,
    }).isRequired,
  }),
};