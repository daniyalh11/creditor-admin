
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Video, Image, Paperclip } from 'lucide-react';

interface ContentSection {
  id: string;
  type: 'text' | 'video' | 'image' | 'file';
  title: string;
  content: string;
}

interface AddContentSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (section: Omit<ContentSection, 'id'>) => void;
  section?: ContentSection | null;
  onUpdate?: (section: ContentSection) => void;
}

interface SectionType {
  type: ContentSection['type'];
  icon: JSX.Element;
  title: string;
  description: string;
}

export const AddContentSectionDialog: React.FC<AddContentSectionDialogProps> = ({ 
  open, 
  onOpenChange, 
  onAdd,
  section,
  onUpdate
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<ContentSection['type']>('text');
  const [errors, setErrors] = useState<{ title?: string }>({});

  const isEditMode = !!section;

  useEffect(() => {
    if (section && open) {
      setTitle(section.title);
      setContent(section.content);
      setType(section.type);
    } else if (open && !section) {
      setTitle('');
      setContent('');
      setType('text');
    }
    setErrors({});
  }, [section, open]);

  const contentTypes: SectionType[] = [
    { type: 'text', icon: <FileText className="h-6 w-6" />, title: 'Text', description: 'Add text content like paragraphs, lists, and headings' },
    { type: 'video', icon: <Video className="h-6 w-6" />, title: 'Video', description: 'Embed video content from YouTube, Vimeo, or other sources' },
    { type: 'image', icon: <Image className="h-6 w-6" />, title: 'Image', description: 'Add images, diagrams, or illustrations' },
    { type: 'file', icon: <Paperclip className="h-6 w-6" />, title: 'File', description: 'Upload documents, PDFs, or other files for download' },
  ];

  const validateForm = () => {
    const newErrors: { title?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const sectionData = {
      type,
      title,
      content
    };

    if (isEditMode && section && onUpdate) {
      onUpdate({
        ...sectionData,
        id: section.id
      });
    } else {
      onAdd(sectionData);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setType('text');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Section' : 'Add Content Section'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="section-title">Title</Label>
            <Input
              id="section-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({...errors, title: undefined});
              }}
              placeholder="Enter section title"
              className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {!isEditMode ? (
            <Tabs defaultValue="text" value={type} onValueChange={(value) => setType(value as ContentSection['type'])}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
                <TabsTrigger value="file">File</TabsTrigger>
              </TabsList>

              <div className="mt-6 grid grid-cols-1 gap-4">
                {contentTypes.map((contentType) => (
                  <TabsContent key={contentType.type} value={contentType.type}>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-blue-100 text-blue-600`}>
                          {contentType.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{contentType.title}</h3>
                          <p className="text-sm text-gray-600">{contentType.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder={`Enter ${contentType.type} content (URL, text, or reference)`}
                          rows={4}
                        />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md bg-blue-100 text-blue-600`}>
                  {contentTypes.find(t => t.type === type)?.icon}
                </div>
                <h3 className="font-medium">{contentTypes.find(t => t.type === type)?.title}</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`Enter ${type} content (URL, text, or reference)`}
                  rows={4}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            {isEditMode ? 'Update Section' : 'Add Section'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
