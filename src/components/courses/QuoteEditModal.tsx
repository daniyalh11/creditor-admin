
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface QuoteBlock {
  id: string;
  type: 'quote';
  style: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight';
  content: {
    text: string;
    author: string;
    authorImage?: string;
    backgroundImage?: string;
  };
}

interface QuoteEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: QuoteBlock | null;
  onSave: (block: QuoteBlock) => void;
}

export const QuoteEditModal: React.FC<QuoteEditModalProps> = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editText, setEditText] = useState(block?.content.text || '');
  const [editAuthor, setEditAuthor] = useState(block?.content.author || '');
  const [editAuthorImage, setEditAuthorImage] = useState(block?.content.authorImage || '');
  const [editBackgroundImage, setEditBackgroundImage] = useState(block?.content.backgroundImage || '');
  const [editStyle, setEditStyle] = useState<'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight'>(block?.style || 'simple');

  React.useEffect(() => {
    if (block) {
      setEditText(block.content.text);
      setEditAuthor(block.content.author);
      setEditAuthorImage(block.content.authorImage || '');
      setEditBackgroundImage(block.content.backgroundImage || '');
      setEditStyle(block.style);
    }
  }, [block]);

  const handleSave = () => {
    if (block) {
      onSave({
        ...block,
        style: editStyle,
        content: { 
          text: editText, 
          author: editAuthor,
          authorImage: editAuthorImage,
          backgroundImage: editBackgroundImage
        }
      });
      onOpenChange(false);
    }
  };

  const handleImageUpload = (type: 'author' | 'background') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (type === 'author') {
            setEditAuthorImage(result);
          } else {
            setEditBackgroundImage(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const quoteOptions = [
    // Enhanced styles
    { id: 'circular-centerpiece' as const, name: 'Quote A', title: 'Circular Centerpiece', needsAuthorImage: true },
    { id: 'vertical-spotlight' as const, name: 'Quote B', title: 'Vertical Spotlight', needsAuthorImage: true },
    { id: 'side-by-side' as const, name: 'Quote C', title: 'Side-by-Side', needsAuthorImage: true },
    { id: 'gray-panel' as const, name: 'Quote D', title: 'Gray Panel', needsAuthorImage: true },
    { id: 'visual-highlight' as const, name: 'Quote E', title: 'Visual Highlight', needsAuthorImage: true, needsBackground: true },
    // Basic styles
    { id: 'simple' as const, name: '', title: 'Simple Quote' },
    { id: 'italic' as const, name: '', title: 'Italic Quote' },
    { id: 'bold' as const, name: '', title: 'Bold Quote' },
    { id: 'author' as const, name: '', title: 'Quote with Author', needsAuthorImage: true }
  ];

  const selectedOption = quoteOptions.find(opt => opt.id === editStyle);

  if (!block) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 p-6 pb-0">
          <DialogTitle>Edit Quote</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 max-h-[calc(90vh-140px)]">
          <div className="space-y-6 py-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Quote Text</Label>
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Enter your quote text"
                rows={3}
                className="resize-none"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Author Name</Label>
              <Input
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Quote Style</Label>
              <RadioGroup value={editStyle} onValueChange={(value) => setEditStyle(value as any)} className="space-y-3">
                {quoteOptions.map((option) => (
                  <label 
                    key={option.id}
                    htmlFor={`edit-quote-${option.id}`}
                    className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={option.id} id={`edit-quote-${option.id}`} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {option.name ? `${option.name} - ${option.title}` : option.title}
                      </div>
                      {option.needsAuthorImage && (
                        <div className="text-sm text-blue-600 mt-1">Supports author image</div>
                      )}
                      {option.needsBackground && (
                        <div className="text-sm text-purple-600 mt-1">Supports background image</div>
                      )}
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {selectedOption?.needsAuthorImage && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Author Image</Label>
                <div className="space-y-3">
                  {editAuthorImage && (
                    <div className="relative inline-block">
                      <img 
                        src={editAuthorImage} 
                        alt="Author" 
                        className="w-20 h-20 object-cover rounded-full border"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                        onClick={() => setEditAuthorImage('')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleImageUpload('author')}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {editAuthorImage ? 'Change Image' : 'Upload Author Image'}
                  </Button>
                </div>
              </div>
            )}

            {selectedOption?.needsBackground && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Background Image</Label>
                <div className="space-y-3">
                  {editBackgroundImage && (
                    <div className="relative inline-block">
                      <img 
                        src={editBackgroundImage} 
                        alt="Background" 
                        className="w-32 h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                        onClick={() => setEditBackgroundImage('')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleImageUpload('background')}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {editBackgroundImage ? 'Change Background' : 'Upload Background Image'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 p-6 pt-4 border-t flex-shrink-0 bg-white">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
