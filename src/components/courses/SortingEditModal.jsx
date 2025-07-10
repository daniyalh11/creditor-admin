import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, GripVertical, X } from 'lucide-react';

export const SortingEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [items, setItems] = useState([]);
  const [correctFeedback, setCorrectFeedback] = useState('');
  const [incorrectFeedback, setIncorrectFeedback] = useState('');
  const [allowRetry, setAllowRetry] = useState(true);
  const [showCorrectOrder, setShowCorrectOrder] = useState(true);
  const [newItemText, setNewItemText] = useState('');
  const [newItemImage, setNewItemImage] = useState('');

  useEffect(() => {
    if (block && block.style === 'sorting') {
      const content = block.content;
      setTitle(content.title || '');
      setInstructions(content.instructions || '');
      setItems(content.items || []);
      setCorrectFeedback(content.correctFeedback || 'Excellent! You arranged the cards in the correct order.');
      setIncorrectFeedback(content.incorrectFeedback || 'Not quite right. Review the cards and try again.');
      setAllowRetry(content.allowRetry !== false);
      setShowCorrectOrder(content.showCorrectOrder !== false);
    }
  }, [block]);

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    
    const newItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      image: newItemImage.trim() || undefined,
      correctPosition: items.length + 1
    };
    
    setItems([...items, newItem]);
    setNewItemText('');
    setNewItemImage('');
  };

  const reorderPositions = (updatedItems) => {
    return updatedItems.map((item, index) => ({
      ...item,
      correctPosition: index + 1
    }));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(reorderPositions(updatedItems));
  };

  const handleItemTextChange = (itemId, newText) => {
    setItems(items.map(item => item.id === itemId ? { ...item, text: newText } : item));
  };

  const handleItemImageChange = (itemId, newImage) => {
    setItems(items.map(item => item.id === itemId ? { ...item, image: newImage || undefined } : item));
  };

  const handleRemoveItemImage = (itemId) => {
    setItems(items.map(item => item.id === itemId ? { ...item, image: undefined } : item));
  };

  const moveItemUp = (itemId) => {
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex > 0) {
      const newItems = [...items];
      [newItems[itemIndex - 1], newItems[itemIndex]] = [newItems[itemIndex], newItems[itemIndex - 1]];
      setItems(reorderPositions(newItems));
    }
  };

  const moveItemDown = (itemId) => {
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex < items.length - 1) {
      const newItems = [...items];
      [newItems[itemIndex], newItems[itemIndex + 1]] = [newItems[itemIndex + 1], newItems[itemIndex]];
      setItems(reorderPositions(newItems));
    }
  };

  const handleSave = () => {
    if (items.length === 0) {
      alert('Please add at least one sorting card.');
      return;
    }

    const updatedBlock = {
      ...block,
      content: {
        title: title || 'Sorting Activity',
        instructions: instructions || 'Drag cards from the stack to arrange them in the correct order.',
        items,
        correctFeedback,
        incorrectFeedback,
        allowRetry,
        showCorrectOrder
      }
    };

    onSave(updatedBlock);
    onOpenChange(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit Sorting Activity</DialogTitle></DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div><Label htmlFor="title">Activity Title</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter activity title" /></div>
            <div><Label htmlFor="instructions">Instructions</Label><Textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Enter instructions for learners" rows={3} /></div>
          </div>
          <div className="space-y-4">
            <Label className="text-base font-semibold">Add New Card</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="newItemText">Card Text</Label><Input id="newItemText" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} onKeyPress={handleKeyPress} placeholder="Enter card text" /></div>
              <div><Label htmlFor="newItemImage">Card Image URL (Optional)</Label><Input id="newItemImage" value={newItemImage} onChange={(e) => setNewItemImage(e.target.value)} placeholder="Enter image URL or select" /></div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Quick Select Sample Images:</Label>
              <div className="flex gap-2 mt-2">
                {sampleImages.map((imageUrl, index) => (<button key={index} type="button" onClick={() => setNewItemImage(imageUrl)} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors"><img src={imageUrl} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" /></button>))}
              </div>
            </div>
            {(newItemText || newItemImage) && (<div className="border rounded-lg p-3 bg-gray-50"><Label className="text-sm text-gray-600 mb-2 block">Preview:</Label><div className="bg-white border rounded-lg p-3 w-fit min-w-[200px]"><div className="flex flex-col items-center space-y-2">{newItemImage && (<div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100"><img src={newItemImage} alt="Preview" className="w-full h-full object-cover" /></div>)}{newItemText && (<span className="text-sm font-medium text-center">{newItemText}</span>)}</div></div></div>)}
            <Button onClick={handleAddItem} className="w-full"><Plus className="h-4 w-4 mr-2" />Add Card</Button>
          </div>
          <div className="space-y-4">
            <Label className="text-base font-semibold">Sorting Cards (in correct order)</Label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {items.map((item, index) => (
                <Card key={item.id} className="border-2"><CardContent className="p-4"><div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-sm font-semibold text-blue-600">{index + 1}</div><GripVertical className="h-5 w-5 text-gray-400" /></div>
                    <div className="flex gap-1"><Button variant="ghost" size="sm" onClick={() => moveItemUp(item.id)} disabled={index === 0}>↑</Button><Button variant="ghost" size="sm" onClick={() => moveItemDown(item.id)} disabled={index === items.length - 1}>↓</Button><Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button></div>
                  </div>
                  {item.image && (<div className="relative"><div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mx-auto"><img src={item.image} alt={item.text} className="w-full h-full object-cover" /></div><Button variant="ghost" size="sm" onClick={() => handleRemoveItemImage(item.id)} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 p-0"><X className="h-3 w-3" /></Button></div>)}
                  <div><Input value={item.text} onChange={(e) => handleItemTextChange(item.id, e.target.value)} placeholder="Card text" /></div>
                  <div><Input value={item.image || ''} onChange={(e) => handleItemImageChange(item.id, e.target.value)} placeholder="Image URL (optional)" /></div>
                </div></CardContent></Card>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-base font-semibold">Feedback Settings</Label>
            <div><Label htmlFor="correctFeedback">Correct Answer Feedback</Label><Textarea id="correctFeedback" value={correctFeedback} onChange={(e) => setCorrectFeedback(e.target.value)} placeholder="Message shown when answer is correct" rows={2} /></div>
            <div><Label htmlFor="incorrectFeedback">Incorrect Answer Feedback</Label><Textarea id="incorrectFeedback" value={incorrectFeedback} onChange={(e) => setIncorrectFeedback(e.target.value)} placeholder="Message shown when answer is incorrect" rows={2} /></div>
          </div>
          <div className="space-y-4">
            <Label className="text-base font-semibold">Activity Settings</Label>
            <div className="flex items-center justify-between"><div><Label htmlFor="allowRetry">Allow Retry</Label><p className="text-sm text-gray-600">Allow learners to try again after incorrect attempts</p></div><Switch id="allowRetry" checked={allowRetry} onCheckedChange={setAllowRetry} /></div>
            <div className="flex items-center justify-between"><div><Label htmlFor="showCorrectOrder">Show Correct Order</Label><p className="text-sm text-gray-600">Show correct order after incorrect attempts</p></div><Switch id="showCorrectOrder" checked={showCorrectOrder} onCheckedChange={setShowCorrectOrder} /></div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSave}>Save Changes</Button></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Define prop types for runtime type checking
const sortingItemPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  correctPosition: PropTypes.number.isRequired,
});

const sortingContentPropTypes = PropTypes.shape({
  title: PropTypes.string,
  instructions: PropTypes.string,
  items: PropTypes.arrayOf(sortingItemPropTypes).isRequired,
  correctFeedback: PropTypes.string,
  incorrectFeedback: PropTypes.string,
  allowRetry: PropTypes.bool,
  showCorrectOrder: PropTypes.bool,
});

SortingEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['interactive']).isRequired,
    style: PropTypes.oneOf(['sorting']).isRequired,
    content: sortingContentPropTypes.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};