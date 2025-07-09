import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Package } from 'lucide-react';
import { toast } from 'sonner';

export const AddScormModal = ({
  open,
  onOpenChange,
  onScormAdded
}) => {
  const [packageTitle, setPackageTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.zip')) {
        setSelectedFile(file);
      } else {
        toast.error("Please upload a ZIP file");
        e.target.value = '';
      }
    }
  };

  const handleSave = () => {
    if (!packageTitle.trim()) {
      toast.error("Please enter a package title");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a SCORM package file");
      return;
    }

    const newScorm = {
      id: Date.now(),
      type: 'scorm-package',
      title: packageTitle.trim(),
      description: description.trim() || undefined,
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onScormAdded(newScorm);
    toast.success(`SCORM Package "${newScorm.title}" uploaded successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setPackageTitle('');
    setDescription('');
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            Upload SCORM Package
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="package-title">Title of Package *</Label>
            <Input
              id="package-title"
              placeholder="Enter SCORM package title"
              value={packageTitle}
              onChange={(e) => setPackageTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scorm-file">Upload SCORM File (.zip) *</Label>
            <Input
              id="scorm-file"
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            <p className="text-xs text-gray-500">
              Only ZIP files containing SCORM packages are supported
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="package-description">Description (Optional)</Label>
            <Textarea
              id="package-description"
              placeholder="Describe this SCORM package and its content..."
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
            disabled={!packageTitle.trim() || !selectedFile}
          >
            Upload Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};