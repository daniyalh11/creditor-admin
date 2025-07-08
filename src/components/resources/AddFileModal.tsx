
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { File } from 'lucide-react';
import { toast } from 'sonner';

interface AddFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileAdded: (file: any) => void;
}

const fileCategories = [
  'Notes',
  'Supplementary Material',
  'Reference Documents',
  'Handouts',
  'Study Guides',
  'Assignments',
  'Resources',
  'Templates',
  'Forms',
  'Other'
];

export const AddFileModal: React.FC<AddFileModalProps> = ({
  open,
  onOpenChange,
  onFileAdded
}) => {
  const [fileTitle, setFileTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    if (!fileTitle.trim()) {
      toast.error("Please enter a file title");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a file");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    const newFile = {
      id: Date.now(),
      type: 'file',
      title: fileTitle.trim(),
      category: category,
      description: description.trim() || undefined,
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onFileAdded(newFile);
    toast.success(`File "${newFile.title}" uploaded successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setFileTitle('');
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
            <File className="h-5 w-5 text-gray-600" />
            Add File
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-title">File Title *</Label>
            <Input
              id="file-title"
              placeholder="Enter file title"
              value={fileTitle}
              onChange={(e) => setFileTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload File *</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt,.zip,.rar,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX, TXT, ZIP, RAR, PPT, PPTX, XLS, XLSX, JPG, PNG, GIF
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-category">Select Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {fileCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-description">File Description (Optional)</Label>
            <Textarea
              id="file-description"
              placeholder="Describe this file and its purpose..."
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
            disabled={!fileTitle.trim() || !selectedFile || !category}
          >
            Save File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
