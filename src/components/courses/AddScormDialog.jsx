import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AddScormDialog = ({ 
  open, 
  onOpenChange 
}) => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/zip') {
      setSelectedFile(files[0]);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a ZIP file containing SCORM packages.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/zip') {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a ZIP file containing SCORM packages.",
        variant: "destructive",
      });
    }
  };

  const handleExtractPackage = () => {
    if (selectedFile) {
      toast({
        title: "Extracting SCORM package",
        description: "Processing your SCORM package...",
      });
      onOpenChange(false);
      setSelectedFile(null);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add SCORM Package</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select SCORM Package (ZIP file)
            </label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : selectedFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <Package className="mx-auto h-12 w-12 text-green-600" />
                  <p className="text-sm font-medium text-green-900">{selectedFile.name}</p>
                  <p className="text-xs text-green-600">Ready to extract</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Drop your ZIP file here or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Only ZIP files containing SCORM packages are accepted
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="scorm-file-input"
                  />
                  <label
                    htmlFor="scorm-file-input"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleExtractPackage}
              disabled={!selectedFile}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Extract Package
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};