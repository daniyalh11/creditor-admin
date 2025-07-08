
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (linkData: { url: string; text: string; title: string; target: string }) => void;
  initialData?: {
    url: string;
    text: string;
    title: string;
    target: string;
  };
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [url, setUrl] = useState(initialData?.url || '');
  const [text, setText] = useState(initialData?.text || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [target, setTarget] = useState(initialData?.target || 'current');

  const handleSave = () => {
    if (!url.trim()) return;
    
    onSave({
      url: url.trim(),
      text: text.trim(),
      title: title.trim(),
      target
    });
    
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setUrl(initialData?.url || '');
    setText(initialData?.text || '');
    setTitle(initialData?.title || '');
    setTarget(initialData?.target || 'current');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Insert/Edit Link</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link-text">Text to display</Label>
            <Input
              id="link-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Link text"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link-title">Title</Label>
            <Input
              id="link-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link-target">Open link in...</Label>
            <Select value={target} onValueChange={setTarget}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current window</SelectItem>
                <SelectItem value="new">New window</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!url.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
