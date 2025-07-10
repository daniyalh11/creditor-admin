import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

export const QuoteEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editText, setEditText] = useState(block?.content.text || '');
  const [editAuthor, setEditAuthor] = useState(block?.content.author || '');
  const [editAuthorImage, setEditAuthorImage] = useState(block?.content.authorImage || '');
  const [editBackgroundImage, setEditBackgroundImage] = useState(block?.content.backgroundImage || '');
  const [editStyle, setEditStyle] = useState(block?.style || 'simple');

  useEffect(() => {
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

  const handleImageUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
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
    { id: 'circular-centerpiece', name: 'Quote A', title: 'Circular Centerpiece', needsAuthorImage: true },
    { id: 'vertical-spotlight', name: 'Quote B', title: 'Vertical Spotlight', needsAuthorImage: true },
    { id: 'side-by-side', name: 'Quote C', title: 'Side-by-Side', needsAuthorImage: true },
    { id: 'gray-panel', name: 'Quote D', title: 'Gray Panel', needsAuthorImage: true },
    { id: 'visual-highlight', name: 'Quote E', title: 'Visual Highlight', needsAuthorImage: true, needsBackground: true },
    { id: 'simple', name: '', title: 'Simple Quote' },
    { id: 'italic', name: '', title: 'Italic Quote' },
    { id: 'bold', name: '', title: 'Bold Quote' },
    { id: 'author', name: '', title: 'Quote with Author', needsAuthorImage: true }
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
              <RadioGroup value={editStyle} onValueChange={(value) => setEditStyle(value)} className="space-y-3">
                {quoteOptions.map((option) => (
                  <Label 
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
                  </Label>
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
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 p-0"
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
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 p-0"
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

// Define prop types for runtime type checking
QuoteEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['quote']).isRequired,
    style: PropTypes.oneOf([
      'simple', 'italic', 'bold', 'author',
      'circular-centerpiece', 'vertical-spotlight', 'side-by-side',
      'gray-panel', 'visual-highlight'
    ]).isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      authorImage: PropTypes.string,
      backgroundImage: PropTypes.string,
    }).isRequired,
  }),
};