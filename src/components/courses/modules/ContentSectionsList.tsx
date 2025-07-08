import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, FileText, Video, Image, Paperclip, Trash2, Edit, BookOpen, MessageSquare, Share2, PencilRuler } from 'lucide-react';
import { AddContentSectionDialog } from './AddContentSectionDialog';
import { useToast } from '@/hooks/use-toast';

interface ContentSection {
  id: string;
  type: 'text' | 'video' | 'image' | 'file';
  title: string;
  content: string;
}

interface ContentSectionsListProps {
  lessonId: string;
  sections: ContentSection[];
}

export const ContentSectionsList: React.FC<ContentSectionsListProps> = ({ 
  lessonId, 
  sections: initialSections 
}) => {
  const [sections, setSections] = useState<ContentSection[]>(initialSections);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const { toast } = useToast();

  const getSectionIcon = (type: ContentSection['type']) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'file': return <Paperclip className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getSectionTypeLabel = (type: ContentSection['type']) => {
    switch (type) {
      case 'text': return 'Text';
      case 'video': return 'Video';
      case 'image': return 'Image';
      case 'file': return 'File';
      default: return 'Content';
    }
  };

  const addSection = (section: Omit<ContentSection, 'id'>) => {
    const newSection: ContentSection = {
      ...section,
      id: Date.now().toString()
    };
    setSections([...sections, newSection]);
    setShowAddDialog(false);
    toast({
      title: "Section added",
      description: "Content section has been successfully added.",
    });
  };

  const editSection = (section: ContentSection) => {
    setEditingSection(section);
    setShowAddDialog(true);
  };

  const updateSection = (updatedSection: ContentSection) => {
    setSections(sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    ));
    setEditingSection(null);
    setShowAddDialog(false);
    toast({
      title: "Section updated",
      description: "Content section has been successfully updated.",
    });
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
    toast({
      title: "Section deleted",
      description: "Content section has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h6 className="text-xs font-medium flex items-center gap-1.5 text-gray-500">
          <PencilRuler className="h-3.5 w-3.5 text-blue-600" />
          Content Sections
        </h6>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setEditingSection(null);
              setShowAddDialog(true);
            }}
            className="text-xs h-7"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Section
          </Button>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-6 text-gray-500 border border-dashed rounded-lg border-gray-300">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No content sections yet</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setEditingSection(null);
              setShowAddDialog(true);
            }}
            className="mt-2"
          >
            Add First Section
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-full max-h-[300px] pr-4">
          <div className="space-y-2.5 pr-2">
            {sections.map((section) => (
              <Card key={section.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs flex items-center gap-1.5">
                      <div className={`
                        p-1.5 rounded-full 
                        ${section.type === 'text' ? 'bg-blue-100 text-blue-600' : ''}
                        ${section.type === 'video' ? 'bg-red-100 text-red-600' : ''}
                        ${section.type === 'image' ? 'bg-green-100 text-green-600' : ''}
                        ${section.type === 'file' ? 'bg-purple-100 text-purple-600' : ''}
                      `}>
                        {getSectionIcon(section.type)}
                      </div>
                      {section.title}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => editSection(section)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-3 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Badge variant="outline" className="text-[10px] font-normal h-5 px-1.5">
                        {getSectionTypeLabel(section.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:text-blue-600"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:text-blue-600"
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {section.content && (
                    <p className="text-xs mt-1 line-clamp-2 text-gray-600">{section.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <AddContentSectionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={addSection}
        section={editingSection}
        onUpdate={updateSection}
      />
    </div>
  );
};
