
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardData {
  id: string;
  front: {
    text: string;
    image?: string;
  };
  back: {
    text: string;
    image?: string;
  };
}

interface FlashcardContentType {
  displayMode?: 'grid' | 'stack';
  cards?: FlashcardData[];
  // Legacy support
  front?: {
    text: string;
    image?: string;
  };
  back?: {
    text: string;
    image?: string;
  };
}

interface FlashcardComponentProps {
  content: FlashcardContentType;
}

export const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ content }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle legacy single flashcard format
  const isLegacyFormat = !content.cards && (content.front || content.back);
  const cards = isLegacyFormat 
    ? [{
        id: '1',
        front: content.front || { text: '' },
        back: content.back || { text: '' }
      }]
    : content.cards || [];

  const displayMode = content.displayMode || 'grid';

  if (!cards.length || (!cards[0].front?.text && !cards[0].back?.text)) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed w-full">
        <p>No flashcard content added yet. Click edit to add front and back content.</p>
      </div>
    );
  }

  const toggleCardFlip = (cardId: string) => {
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(cardId)) {
      newFlippedCards.delete(cardId);
    } else {
      newFlippedCards.add(cardId);
    }
    setFlippedCards(newFlippedCards);
  };

  const resetAllCards = () => {
    setFlippedCards(new Set());
    setCurrentCardIndex(0);
  };

  const nextCard = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Reset flip state for current card
    const newFlippedCards = new Set(flippedCards);
    newFlippedCards.delete(cards[currentCardIndex].id);
    setFlippedCards(newFlippedCards);
    
    // Transition to next card after a brief delay
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevCard = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Reset flip state for current card
    const newFlippedCards = new Set(flippedCards);
    newFlippedCards.delete(cards[currentCardIndex].id);
    setFlippedCards(newFlippedCards);
    
    // Transition to previous card after a brief delay
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setIsTransitioning(false);
    }, 300);
  };

  const renderSingleCard = (card: FlashcardData, index?: number, isStacked = false, stackOffset = 0, isActive = true) => {
    const isFlipped = flippedCards.has(card.id);
    
    return (
      <div 
        key={card.id} 
        className={`relative h-64 transition-all duration-300 ease-in-out w-full ${
          isStacked 
            ? `absolute inset-0 ${isActive ? 'z-20' : 'z-10'} ${
                isTransitioning && !isActive ? 'transform translate-y-2 scale-95 opacity-60' : ''
              }` 
            : ''
        }`}
        style={isStacked && !isActive ? {
          transform: `translateX(${stackOffset * 6}px) translateY(${stackOffset * 6}px) scale(${1 - stackOffset * 0.05})`,
          filter: `brightness(${1 - stackOffset * 0.1})`,
        } : {}}
      >
        <div 
          className={`relative w-full h-full cursor-pointer transition-all duration-500 ${
            isFlipped ? 'transform' : ''
          }`}
          onClick={() => toggleCardFlip(card.id)}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Side */}
          <div 
            className="absolute inset-0 w-full h-full bg-blue-50 border-2 border-blue-200 rounded-lg p-6 flex flex-col items-center justify-center shadow-lg"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)'
            }}
          >
            {card.front?.image && (
              <div className="mb-4 max-h-32 overflow-hidden rounded">
                <img 
                  src={card.front.image} 
                  alt="Front" 
                  className="max-w-full max-h-32 object-contain"
                />
              </div>
            )}
            <div className="text-center flex-1 flex flex-col justify-center">
              <p className="text-gray-900 text-lg font-medium">{card.front?.text}</p>
              {displayMode === 'grid' && cards.length > 1 && (
                <p className="text-xs text-blue-600 mt-2">Card {(index || 0) + 1} of {cards.length}</p>
              )}
              <p className="text-xs text-gray-500 mt-4">Click to flip</p>
            </div>
          </div>
          
          {/* Back Side */}
          <div 
            className="absolute inset-0 w-full h-full bg-green-50 border-2 border-green-200 rounded-lg p-6 flex flex-col items-center justify-center shadow-lg"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {card.back?.image && (
              <div className="mb-4 max-h-32 overflow-hidden rounded">
                <img 
                  src={card.back.image} 
                  alt="Back" 
                  className="max-w-full max-h-32 object-contain"
                />
              </div>
            )}
            <div className="text-center flex-1 flex flex-col justify-center">
              <p className="text-gray-900 text-lg font-medium">{card.back?.text}</p>
              {displayMode === 'grid' && cards.length > 1 && (
                <p className="text-xs text-green-600 mt-2">Card {(index || 0) + 1} of {cards.length}</p>
              )}
              <p className="text-xs text-gray-500 mt-4">Click to flip back</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (displayMode === 'stack') {
    const currentCard = cards[currentCardIndex];
    
    return (
      <div className="w-full">
        <div className="relative h-64 mb-6 w-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
          {/* Render background cards for stacked effect */}
          {cards.length > 1 && (
            <>
              {cards.slice(currentCardIndex + 1, currentCardIndex + 4).map((card, index) => {
                const stackIndex = index + 1;
                return (
                  <div
                    key={`stack-${card.id}`}
                    className="absolute inset-0 w-full h-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition-all duration-300"
                    style={{
                      transform: `translateX(${stackIndex * 8}px) translateY(${stackIndex * 8}px) scale(${1 - stackIndex * 0.03})`,
                      zIndex: 10 - stackIndex,
                      opacity: 0.7 - (stackIndex * 0.15),
                      filter: `brightness(${0.9 - stackIndex * 0.1})`
                    }}
                  />
                );
              })}
            </>
          )}
          
          {/* Current active card */}
          <div className={`relative transition-all duration-300 w-full ${isTransitioning ? 'transform scale-95 opacity-70' : 'z-20'}`}>
            {renderSingleCard(currentCard, currentCardIndex, true, 0, true)}
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevCard}
            disabled={cards.length <= 1 || isTransitioning}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {currentCardIndex + 1} of {cards.length}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toggleCardFlip(currentCard.id)}
              disabled={isTransitioning}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Flip
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextCard}
            disabled={cards.length <= 1 || isTransitioning}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        {cards.length > 1 && (
          <div className="text-center mt-4 w-full">
            <Button variant="ghost" size="sm" onClick={resetAllCards}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All Cards
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Grid View
  return (
    <div className="space-y-4 w-full">
      <div className={`grid gap-4 w-full ${cards.length === 1 ? 'justify-center' : cards.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {cards.map((card, index) => (
          <div key={card.id} className="w-full">
            {renderSingleCard(card, index)}
          </div>
        ))}
      </div>
      
      <div className="text-center w-full">
        <Button variant="outline" size="sm" onClick={resetAllCards}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Cards
        </Button>
      </div>
    </div>
  );
};
