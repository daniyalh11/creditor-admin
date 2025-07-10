import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export const AddCourseTemplateModal = ({
  open,
  onOpenChange,
  onTemplateAdded
}) => {
  const [templateTitle, setTemplateTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    if (!templateTitle.trim()) {
      toast.error("Please enter a template title");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a course structure file");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      type: 'course-template',
      title: templateTitle.trim(),
      description: description.trim() || undefined,
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onTemplateAdded(newTemplate);
    toast.success(`Course template "${newTemplate.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setTemplateTitle('');
    setDescription('');
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Add Course Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-title">Template Title *</Label>
            <Input
              id="template-title"
              placeholder="Enter course template title"
              value={templateTitle}
              onChange={(e) => setTemplateTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-structure-file">Upload Course Structure File *</Label>
            <Input
              id="course-structure-file"
              type="file"
              accept=".json,.csv,.xml,.xlsx,.xls"
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: JSON, CSV, XML, XLSX, XLS
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-description">Description (Optional)</Label>
            <Textarea
              id="template-description"
              placeholder="Describe this course template and its structure..."
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
            disabled={!templateTitle.trim() || !selectedFile}
          >
            Save Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};