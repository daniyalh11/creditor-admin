import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Upload, GripVertical } from 'lucide-react';

export const GalleryEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [style, setStyle] = useState('carousel');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (block) {
      setStyle(block.style);
      // Ensure images is always an array, even if undefined
      setImages(block.content?.images || []);
    }
  }, [block]);

  const handleSave = () => {
    if (!block) return;

    const updatedBlock = {
      ...block,
      style,
      content: {
        images: images.filter(img => img.src && img.src.trim() !== '')
      }
    };

    onSave(updatedBlock);
    onOpenChange(false);
  };

  const addImage = () => {
    const newImage = {
      id: Date.now().toString(),
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      caption: ''
    };
    setImages([...images, newImage]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const updateImage = (id, field, value) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updateImage(id, 'src', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!block) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] mx-4 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Edit Gallery</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Gallery Layout</label>
            <Select value={style} onValueChange={(value) => setStyle(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carousel">Carousel Gallery</SelectItem>
                <SelectItem value="2-column">2 Column Grid</SelectItem>
                <SelectItem value="3-column">3 Column Grid</SelectItem>
                <SelectItem value="4-column">4 Column Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">Images</label>
              <Button onClick={addImage} size="sm" className="h-8">
                <Plus className="h-3 w-3 mr-1" />
                Add Image
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {images.map((image) => (
                <div key={image.id} className="flex items-start gap-3 p-4 border rounded-lg">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move flex-shrink-0 mt-1" />
                  
                  <div className="w-20 h-20 bg-gray-100 rounded border flex-shrink-0 overflow-hidden">
                    {image.src ? (
                      <img src={image.src} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 min-w-0">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Image URL</label>
                      <Input
                        value={image.src}
                        onChange={(e) => updateImage(image.id, 'src', e.target.value)}
                        placeholder="Enter image URL or upload"
                        className="text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">Caption (Optional)</label>
                      <Input
                        value={image.caption}
                        onChange={(e) => updateImage(image.id, 'caption', e.taget.value)}
                        placeholder="Add a caption"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(image.id, e)}
                        className="hidden"
                        id={`upload-${image.id}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => document.getElementById(`upload-${image.id}`)?.click()}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={() => removeImage(image.id)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8 text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                <Upload className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p>No images yet. Click "Add Image" to get started.</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
GalleryEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['gallery']).isRequired,
    style: PropTypes.oneOf(['carousel', '2-column', '3-column', '4-column']).isRequired,
    content: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
      })),
    }),
  }), // block can be null
  onSave: PropTypes.func.isRequired,
};