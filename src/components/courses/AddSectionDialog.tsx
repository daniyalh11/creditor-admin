
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, HelpCircle, FileCheck, Globe, Settings, BookOpen, CheckSquare, Video, BarChart3, MessageSquare, Users, X } from 'lucide-react';

interface Section {
  type: 'page' | 'file' | 'quiz' | 'assignment' | 'web-resource' | 'tool' | 'library' | 'scorm' | 'essay' | 'offline-assessment' | 'survey' | 'discussion' | 'debate' | 'checkbox' | 'web-conferencing';
  title: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

interface AddSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (section: Omit<Section, 'id'>) => void;
}

interface SectionType {
  type: Section['type'];
  icon: JSX.Element;
  title: string;
  description: string;
}

export const AddSectionDialog: React.FC<AddSectionDialogProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedType, setSelectedType] = useState<Section['type'] | null>(null);

  const contentTypes: SectionType[] = [
    { type: 'page' as const, icon: <FileText className="h-6 w-6" />, title: 'Page', description: 'Enter your own content, such as text, images and video' },
    { type: 'file' as const, icon: <Upload className="h-6 w-6" />, title: 'File', description: 'A file from your computer such as a document or video' },
    { type: 'tool' as const, icon: <Settings className="h-6 w-6" />, title: 'Tool', description: 'A provisioned tool provider' },
    { type: 'scorm' as const, icon: <Globe className="h-6 w-6" />, title: 'SCORM', description: 'Content from a SCORM package' },
    { type: 'web-resource' as const, icon: <Globe className="h-6 w-6" />, title: 'Web resource', description: 'A link to a resource on the web' },
    { type: 'library' as const, icon: <BookOpen className="h-6 w-6" />, title: 'Library', description: 'Resources from a library or your favorites' }
  ];

  const assessmentTypes: SectionType[] = [
    { type: 'quiz' as const, icon: <HelpCircle className="h-6 w-6" />, title: 'Quiz', description: 'Take an online quiz' },
    { type: 'essay' as const, icon: <FileText className="h-6 w-6" />, title: 'Essay', description: 'Respond to a question with some text and optional attachments' },
    { type: 'offline-assessment' as const, icon: <FileCheck className="h-6 w-6" />, title: 'Offline assessment', description: 'An offline assessment such as taking a test or reading a book' },
    { type: 'survey' as const, icon: <BarChart3 className="h-6 w-6" />, title: 'Survey', description: 'Take an online survey' },
    { type: 'discussion' as const, icon: <MessageSquare className="h-6 w-6" />, title: 'Discussion', description: 'Participate in a discussion forum' },
    { type: 'debate' as const, icon: <Users className="h-6 w-6" />, title: 'Debate', description: 'Engage in structured debates' }
  ];

  const otherTypes: SectionType[] = [
    { type: 'checkbox' as const, icon: <CheckSquare className="h-6 w-6" />, title: 'Checkbox', description: 'Add mandatory checkboxes' },
    { type: 'web-conferencing' as const, icon: <Video className="h-6 w-6" />, title: 'Web conferencing', description: 'Add web conferencing' }
  ];

  const handleAddSection = () => {
    if (!selectedType) return;
    
    const typeConfig = [...contentTypes, ...assessmentTypes, ...otherTypes].find(t => t.type === selectedType);
    
    onAdd({
      type: selectedType,
      title: typeConfig?.title || 'New Section',
      status: 'not-started'
    });
    
    // Reset the selected type and close dialog
    setSelectedType(null);
    onClose();
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  const SectionGrid = ({ types }: { types: SectionType[] }) => (
    <div className="grid grid-cols-2 gap-4">
      {types.map((type) => (
        <button
          key={type.type}
          onClick={() => setSelectedType(type.type)}
          className={`p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
            selectedType === type.type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-blue-600">{type.icon}</div>
            <h3 className="font-medium">{type.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{type.description}</p>
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Add section</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <SectionGrid types={contentTypes} />
          </TabsContent>

          <TabsContent value="assessment" className="mt-6">
            <SectionGrid types={assessmentTypes} />
          </TabsContent>

          <TabsContent value="other" className="mt-6">
            <SectionGrid types={otherTypes} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddSection} disabled={!selectedType}>
            Add Section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
