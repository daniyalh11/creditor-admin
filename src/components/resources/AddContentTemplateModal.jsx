import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from 'lucide-react';
import { toast } from 'sonner';

const templateCategories = [
  'Lesson Plan',
  'Course Outline',
  'Assessment',
  'Presentation',
  'Worksheet',
  'Study Guide',
  'Lab Instructions',
  'Project Template',
  'Discussion Topics',
  'Assignment Brief',
  'Other'
];

export const AddContentTemplateModal = ({
  open,
  onOpenChange,
  onTemplateAdded
}) => {
  const [templateName, setTemplateName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a template file");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      type: 'content-template',
      title: templateName.trim(),
      category: category,
      description: description.trim() || undefined,
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onTemplateAdded(newTemplate);
    toast.success(`Content template "${newTemplate.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setTemplateName('');
    setCategory('');
    setDescription('');
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-purple-600" />
            Add Content Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name *</Label>
            <Input
              id="template-name"
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category/Subject *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {templateCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-file">Upload Template File *</Label>
            <Input
              id="template-file"
              type="file"
              accept=".doc,.docx,.pdf,.html,.txt,.ppt,.pptx"
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: DOC, DOCX, PDF, HTML, TXT, PPT, PPTX
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-description">Description (Optional)</Label>
            <Textarea
              id="template-description"
              placeholder="Describe this template and how it should be used..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!templateName.trim() || !category || !selectedFile}
          >
            Save Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};