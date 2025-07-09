import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Award } from 'lucide-react';
import { toast } from 'sonner';
import { BadgeEditor } from './BadgeEditor';

export const AddBadgeModal = ({
  open,
  onOpenChange,
  onBadgeAdded
}) => {
  const [badgeTitle, setBadgeTitle] = useState('');
  const [badgeCategory, setBadgeCategory] = useState('');
  const [description, setDescription] = useState('');
  const [badgeDesign, setBadgeDesign] = useState({
    backgroundColor: '#3B82F6',
    textElements: [],
    centerIcon: 'award'
  });
  const [isVisible, setIsVisible] = useState(true);

  const handleSave = () => {
    if (!badgeTitle.trim()) {
      toast.error("Please enter a badge title");
      return;
    }

    if (!badgeCategory) {
      toast.error("Please select a badge category");
      return;
    }

    // Generate a preview image from the badge design
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw circular background
      ctx.beginPath();
      ctx.arc(100, 100, 90, 0, 2 * Math.PI);
      ctx.fillStyle = badgeDesign.backgroundColor;
      ctx.fill();
      
      // Add text elements (simplified)
      badgeDesign.textElements.forEach(element => {
        ctx.fillStyle = element.color;
        ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(element.text, (element.x / 100) * 200, (element.y / 100) * 200);
      });
    }

    const newBadge = {
      id: Date.now(),
      type: 'badge',
      title: badgeTitle.trim(),
      category: badgeCategory,
      description: description.trim() || undefined,
      badgeDesign: badgeDesign,
      imagePreview: canvas.toDataURL('image/png'),
      isVisible: isVisible,
      dateAdded: new Date().toISOString().split('T')[0],
      fileSize: '1.2 KB'
    };

    onBadgeAdded(newBadge);
    toast.success(`Badge template "${newBadge.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setBadgeTitle('');
    setBadgeCategory('');
    setDescription('');
    setBadgeDesign({
      backgroundColor: '#3B82F6',
      textElements: [],
      centerIcon: 'award'
    });
    setIsVisible(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Add New Badge Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Badge Title */}
          <div className="space-y-2">
            <Label htmlFor="badge-title">Badge Title *</Label>
            <Input
              id="badge-title"
              placeholder="Enter badge title"
              value={badgeTitle}
              onChange={(e) => setBadgeTitle(e.target.value)}
            />
          </div>

          {/* Badge Category */}
          <div className="space-y-2">
            <Label htmlFor="badge-category">Badge Category *</Label>
            <Select value={badgeCategory} onValueChange={setBadgeCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select badge category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completion">Completion</SelectItem>
                <SelectItem value="excellence">Excellence</SelectItem>
                <SelectItem value="participation">Participation</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Badge Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Badge Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this badge represents..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Interactive Badge Editor */}
          <div className="space-y-2">
            <Label>Badge Design</Label>
            <div className="border rounded-lg p-4">
              <BadgeEditor 
                onDesignChange={setBadgeDesign}
                initialDesign={badgeDesign}
              />
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="visibility-toggle">Visibility</Label>
              <p className="text-sm text-gray-500">Show in instructor badge list</p>
            </div>
            <Switch
              id="visibility-toggle"
              checked={isVisible}
              onCheckedChange={setIsVisible}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!badgeTitle.trim() || !badgeCategory}
          >
            Save Badge Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};