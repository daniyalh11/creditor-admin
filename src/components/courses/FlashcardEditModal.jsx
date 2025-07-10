import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, Upload, Grid3X3, Layers } from 'lucide-react';

export const FlashcardEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [displayMode, setDisplayMode] = useState('grid');
  const [cards, setCards] = useState([
    {
      id: '1',
      front: { text: 'Front of card 1' },
      back: { text: 'Back of card 1' }
    }
  ]);

  const frontImageInputRefs = useRef({});
  const backImageInputRefs = useRef({});

  useEffect(() => {
    if (block?.content) {
      setDisplayMode(block.content.displayMode || 'grid');
      setCards(block.content.cards || []);
    }
  }, [block]);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now().toString(),
      front: { text: '' },
      back: { text: '' }
    };
    setCards([...cards, newCard]);
  };

  const handleRemoveCard = (cardId) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const handleUpdateCard = (cardId, side, field, value) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, [side]: { ...card[side], [field]: value } }
        : card
    ));
  };

  const handleImageUpload = (cardId, side, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      handleUpdateCard(cardId, side, 'image', result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageButtonClick = (cardId, side) => {
    const inputRef = side === 'front' ? frontImageInputRefs.current[cardId] : backImageInputRefs.current[cardId];
    if (inputRef) {
      inputRef.click();
    }
  };

  const handleRemoveImage = (cardId, side) => {
    handleUpdateCard(cardId, side, 'image', '');
  };

  const handleSave = () => {
    if (!block) return;

    const updatedBlock = {
      ...block,
      content: {
        displayMode,
        cards
      }
    };

    onSave(updatedBlock);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Flashcards</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Display Mode Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Display Mode</Label>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${displayMode === 'grid' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                onClick={() => setDisplayMode('grid')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Grid View</h4>
                      <p className="text-sm text-gray-600">Display cards side-by-side</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="h-8 bg-gray-100 rounded border"></div>
                    <div className="h-8 bg-gray-100 rounded border"></div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${displayMode === 'stack' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                onClick={() => setDisplayMode('stack')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Stack View</h4>
                      <p className="text-sm text-gray-600">Cards appear one at a time</p>
                    </div>
                  </div>
                  <div className="mt-3 relative">
                    <div className="h-8 bg-gray-100 rounded border transform rotate-1"></div>
                    <div className="h-8 bg-gray-200 rounded border absolute top-0 -rotate-1"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Cards Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Flashcards ({cards.length})</Label>
              <Button onClick={handleAddCard} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cards.map((card, index) => (
                <Card key={card.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Card {index + 1}</h4>
                      {cards.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCard(card.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Front Side */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-blue-600">Front Side</Label>
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Enter front text..."
                            value={card.front.text}
                            onChange={(e) => handleUpdateCard(card.id, 'front', 'text', e.target.value)}
                            rows={3}
                          />
                          
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              ref={(el) => { frontImageInputRefs.current[card.id] = el; }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(card.id, 'front', file);
                                }
                              }}
                              className="hidden"
                            />
                            
                            {card.front.image ? (
                              <div className="relative">
                                <img 
                                  src={card.front.image} 
                                  alt="Front" 
                                  className="w-full h-24 object-cover rounded border"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemoveImage(card.id, 'front')}
                                  className="absolute top-1 right-1 h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleImageButtonClick(card.id, 'front')}
                                className="w-full"
                              >
                                <Upload className="h-3 w-3 mr-1" />
                                Add Image
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-green-600">Back Side</Label>
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Enter back text..."
                            value={card.back.text}
                            onChange={(e) => handleUpdateCard(card.id, 'back', 'text', e.target.value)}
                            rows={3}
                          />
                          
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              ref={(el) => { backImageInputRefs.current[card.id] = el; }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(card.id, 'back', file);
                                }
                              }}
                              className="hidden"
                            />
                            
                            {card.back.image ? (
                              <div className="relative">
                                <img 
                                  src={card.back.image} 
                                  alt="Back" 
                                  className="w-full h-24 object-cover rounded border"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemoveImage(card.id, 'back')}
                                  className="absolute top-1 right-1 h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleImageButtonClick(card.id, 'back')}
                                className="w-full"
                              >
                                <Upload className="h-3 w-3 mr-1" />
                                Add Image
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Flashcards
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for type-checking in a JavaScript environment
const flashcardSidePropTypes = PropTypes.shape({
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
});

const flashcardPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  front: flashcardSidePropTypes.isRequired,
  back: flashcardSidePropTypes.isRequired,
});

FlashcardEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['interactive']).isRequired,
    style: PropTypes.oneOf(['flashcards']).isRequired,
    content: PropTypes.shape({
      displayMode: PropTypes.oneOf(['grid', 'stack']),
      cards: PropTypes.arrayOf(flashcardPropTypes),
    }),
  }), // block can be null
  onSave: PropTypes.func.isRequired,
};