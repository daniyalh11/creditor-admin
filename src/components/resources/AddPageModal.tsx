
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AddPageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPageAdded: (page: any) => void;
}

export const AddPageModal: React.FC<AddPageModalProps> = ({
  open,
  onOpenChange,
  onPageAdded
}) => {
  const [pageTitle, setPageTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSave = () => {
    if (!pageTitle.trim()) {
      toast.error("Please enter a page title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please add page content");
      return;
    }

    const newPage = {
      id: Date.now(),
      type: 'page',
      title: pageTitle.trim(),
      description: content.trim(),
      tags: tags.trim() ? tags.split(',').map(tag => tag.trim()) : undefined,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onPageAdded(newPage);
    toast.success(`Page "${newPage.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setPageTitle('');
    setContent('');
    setTags('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-blue-600" />
            Add New Page
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="page-title">Page Title *</Label>
            <Input
              id="page-title"
              placeholder="Enter page title"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="page-content">Content *</Label>
            <Textarea
              id="page-content"
              placeholder="Enter page content..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Rich text editor functionality will be enhanced in future updates
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="page-tags">Tags (Optional)</Label>
            <Input
              id="page-tags"
              placeholder="Enter tags separated by commas (e.g., tutorial, guide, reference)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!pageTitle.trim() || !content.trim()}
          >
            Save Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
