import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, HelpCircle, FileCheck, Globe, Settings, BookOpen, CheckSquare, Video, BarChart3, MessageSquare, Users, X } from 'lucide-react';

export const AddSectionDialog = ({ isOpen, onClose, onAdd }) => {
  const [selectedType, setSelectedType] = useState(null);

  const contentTypes = [
    { type: 'page', icon: <FileText className="h-6 w-6" />, title: 'Page', description: 'Enter your own content, such as text, images and video' },
    { type: 'file', icon: <Upload className="h-6 w-6" />, title: 'File', description: 'A file from your computer such as a document or video' },
    { type: 'tool', icon: <Settings className="h-6 w-6" />, title: 'Tool', description: 'A provisioned tool provider' },
    { type: 'scorm', icon: <Globe className="h-6 w-6" />, title: 'SCORM', description: 'Content from a SCORM package' },
    { type: 'web-resource', icon: <Globe className="h-6 w-6" />, title: 'Web resource', description: 'A link to a resource on the web' },
    { type: 'library', icon: <BookOpen className="h-6 w-6" />, title: 'Library', description: 'Resources from a library or your favorites' }
  ];

  const assessmentTypes = [
    { type: 'quiz', icon: <HelpCircle className="h-6 w-6" />, title: 'Quiz', description: 'Take an online quiz' },
    { type: 'essay', icon: <FileText className="h-6 w-6" />, title: 'Essay', description: 'Respond to a question with some text and optional attachments' },
    { type: 'offline-assessment', icon: <FileCheck className="h-6 w-6" />, title: 'Offline assessment', description: 'An offline assessment such as taking a test or reading a book' },
    { type: 'survey', icon: <BarChart3 className="h-6 w-6" />, title: 'Survey', description: 'Take an online survey' },
    { type: 'discussion', icon: <MessageSquare className="h-6 w-6" />, title: 'Discussion', description: 'Participate in a discussion forum' },
    { type: 'debate', icon: <Users className="h-6 w-6" />, title: 'Debate', description: 'Engage in structured debates' }
  ];

  const otherTypes = [
    { type: 'checkbox', icon: <CheckSquare className="h-6 w-6" />, title: 'Checkbox', description: 'Add mandatory checkboxes' },
    { type: 'web-conferencing', icon: <Video className="h-6 w-6" />, title: 'Web conferencing', description: 'Add web conferencing' }
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

  const SectionGrid = ({ types }) => (
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