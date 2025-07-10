import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Upload, X, Image, Video } from 'lucide-react';

export const InteractiveEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editedBlock, setEditedBlock] = useState(null);

  useEffect(() => {
    if (block) {
      // Create a deep copy to avoid mutating the original prop
      setEditedBlock(JSON.parse(JSON.stringify(block)));
    }
  }, [block]);

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock);
      onOpenChange(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && editedBlock) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        if (imageUrl) {
          setEditedBlock(prev => prev ? ({
            ...prev,
            content: {
              ...prev.content,
              image: imageUrl
            }
          }) : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionMediaUpload = (sectionId, mediaType, event) => {
    const file = event.target.files?.[0];
    if (file && editedBlock) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const mediaUrl = e.target?.result;
        if (mediaUrl) {
          setEditedBlock(prev => prev ? ({
            ...prev,
            content: {
              ...prev.content,
              sections: prev.content.sections.map((s) => 
                s.id === sectionId ? { 
                  ...s, 
                  media: {
                    ...(s.media || {}),
                    [mediaType]: mediaUrl
                  }
                } : s
              )
            }
          }) : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSectionMedia = (sectionId, mediaType) => {
    if (editedBlock) {
      setEditedBlock(prev => {
        if (!prev) return null;
        const newSections = prev.content.sections.map((s) => {
          if (s.id === sectionId) {
            const newMedia = { ...s.media };
            delete newMedia[mediaType];
            return { ...s, media: newMedia };
          }
          return s;
        });
        return {
          ...prev,
          content: { ...prev.content, sections: newSections }
        };
      });
    }
  };

  if (!block || !editedBlock) {
    return null;
  }

  const renderAccordionEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Accordion Sections</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newSection = {
              id: Date.now().toString(),
              title: 'New Section',
              content: 'Section content',
              media: {}
            };
            setEditedBlock(prev => prev ? ({
              ...prev,
              content: {
                ...prev.content,
                sections: [...(prev.content.sections || []), newSection]
              }
            }) : null);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>
      
      {editedBlock.content.sections?.map((section, index) => (
        <div key={section.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label>Section {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    sections: prev.content.sections.filter((s) => s.id !== section.id)
                  }
                }) : null);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Section title"
            value={section.title}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  sections: prev.content.sections.map((s) => 
                    s.id === section.id ? { ...s, title: e.target.value } : s
                  )
                }
              }) : null);
            }}
          />
          <Textarea
            placeholder="Section content"
            value={section.content}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  sections: prev.content.sections.map((s) => 
                    s.id === section.id ? { ...s, content: e.target.value } : s
                  )
                }
              }) : null);
            }}
          />
          
          <div className="border-t pt-3 space-y-3">
            <Label className="text-sm font-medium">Media Gallery</Label>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Image</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSectionMediaUpload(section.id, 'image', e)}
                  className="hidden"
                  id={`image-upload-${section.id}`}
                />
                <Button asChild type="button" variant="outline" size="sm">
                  <label htmlFor={`image-upload-${section.id}`} className="cursor-pointer">
                    <Image className="h-4 w-4 mr-2" />
                    Upload Image
                  </label>
                </Button>
              </div>
              
              {section.media?.image && (
                <div className="relative inline-block">
                  <img src={section.media.image} alt="Section" className="w-full max-w-xs rounded-lg" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-auto"
                    onClick={() => removeSectionMedia(section.id, 'image')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Video</Label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleSectionMediaUpload(section.id, 'video', e)}
                  className="hidden"
                  id={`video-upload-${section.id}`}
                />
                <Button asChild type="button" variant="outline" size="sm">
                  <label htmlFor={`video-upload-${section.id}`} className="cursor-pointer">
                    <Video className="h-4 w-4 mr-2" />
                    Upload Video
                  </label>
                </Button>
              </div>
              
              {section.media?.video && (
                <div className="relative inline-block">
                  <video src={section.media.video} controls className="w-full max-w-xs rounded-lg">
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 h-auto"
                    onClick={() => removeSectionMedia(section.id, 'video')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Other render functions (tabs, scenario, etc.) would be here...

  const renderEditor = () => {
    switch (editedBlock.style) {
      case 'accordion':
        return renderAccordionEditor();
      // cases for 'tabs', 'labeled-graphic', 'process', etc. would go here
      default:
        return <div>Editor for {editedBlock.style} is coming soon...</div>;
    }
  };

  const getDisplayName = () => {
    if (!editedBlock?.style) return 'Interactive Block';
    return editedBlock.style.charAt(0).toUpperCase() + editedBlock.style.slice(1).replace(/-/g, ' ');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {getDisplayName()}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {renderEditor()}
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

// PropTypes for type-checking in a JavaScript environment
// You might need to install prop-types: npm install prop-types
InteractiveEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['interactive']).isRequired,
    style: PropTypes.oneOf([
      'accordion', 
      'tabs', 
      'labeled-graphic', 
      'process', 
      'scenario', 
      'flashcard', 
      'timeline'
    ]).isRequired,
    content: PropTypes.any, // Content structure varies greatly
  }), // block can be null
  onSave: PropTypes.func.isRequired,
};