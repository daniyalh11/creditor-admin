
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, RotateCcw, CheckCircle, XCircle, GripVertical } from 'lucide-react';

interface SortingItem {
  id: string;
  text: string;
  image?: string;
  correctPosition: number;
}

interface SortingContent {
  title?: string;
  instructions?: string;
  items: SortingItem[];
  correctFeedback?: string;
  incorrectFeedback?: string;
  allowRetry?: boolean;
  showCorrectOrder?: boolean;
}

interface SortingComponentProps {
  content: SortingContent;
}

export const SortingComponent: React.FC<SortingComponentProps> = ({ content }) => {
  const [sortedItems, setSortedItems] = useState<SortingItem[]>([]);
  const [dropZones, setDropZones] = useState<(SortingItem | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Initialize with randomized order and empty drop zones
  useEffect(() => {
    if (content.items && content.items.length > 0) {
      const shuffled = [...content.items].sort(() => Math.random() - 0.5);
      setSortedItems(shuffled);
      setDropZones(new Array(content.items.length).fill(null));
    }
  }, [content.items]);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (isSubmitted) return;
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToZone = (e: React.DragEvent, zoneIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem || isSubmitted) return;

    // Find the dragged item
    const draggedItemObj = sortedItems.find(item => item.id === draggedItem);
    if (!draggedItemObj) return;

    // Remove item from sortedItems
    const newSortedItems = sortedItems.filter(item => item.id !== draggedItem);
    
    // Add item to drop zone
    const newDropZones = [...dropZones];
    
    // If there's already an item in this zone, move it back to sorted items
    if (newDropZones[zoneIndex]) {
      newSortedItems.push(newDropZones[zoneIndex]!);
    }
    
    newDropZones[zoneIndex] = draggedItemObj;
    
    setSortedItems(newSortedItems);
    setDropZones(newDropZones);
    setDraggedItem(null);
  };

  const handleDropBackToStack = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedItem || isSubmitted) return;

    // Find the item in drop zones and move it back to stack
    const zoneIndex = dropZones.findIndex(item => item?.id === draggedItem);
    if (zoneIndex !== -1) {
      const item = dropZones[zoneIndex];
      if (item) {
        const newDropZones = [...dropZones];
        newDropZones[zoneIndex] = null;
        setDropZones(newDropZones);
        setSortedItems([...sortedItems, item]);
      }
    }
    
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleReset = () => {
    const shuffled = [...content.items].sort(() => Math.random() - 0.5);
    setSortedItems(shuffled);
    setDropZones(new Array(content.items.length).fill(null));
    setIsSubmitted(false);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleSubmit = () => {
    // Check if all zones are filled
    const allFilled = dropZones.every(zone => zone !== null);
    if (!allFilled) {
      alert('Please place all cards in the drop zones before submitting.');
      return;
    }

    const correct = dropZones.every((item, index) => item?.correctPosition === index + 1);
    setIsCorrect(correct);
    setIsSubmitted(true);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);
    
    // Record tracking data
    console.log('Sorting Activity Result:', {
      sortOrder: dropZones.map(item => item?.text),
      attempts: attempts + 1,
      result: correct ? 'pass' : 'fail',
      timestamp: new Date().toISOString()
    });
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  if (!content.items || content.items.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No sorting items configured</p>
        </CardContent>
      </Card>
    );
  }

  const renderSortingCard = (item: SortingItem, isInDropZone = false, zoneIndex?: number) => (
    <div
      key={item.id}
      draggable={!isSubmitted}
      onDragStart={(e) => handleDragStart(e, item.id)}
      onDragEnd={handleDragEnd}
      className={`
        relative bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-lg
        transition-all duration-200 cursor-grab min-h-[120px] w-full max-w-[280px]
        ${draggedItem === item.id ? 'opacity-50 scale-95 rotate-2 shadow-xl z-50' : ''}
        ${!isSubmitted ? 'hover:shadow-xl hover:scale-[1.02] hover:border-blue-300' : 'cursor-default'}
        ${isSubmitted && isInDropZone && item.correctPosition === (zoneIndex! + 1) ? 'border-green-400 bg-green-50' : ''}
        ${isSubmitted && isInDropZone && item.correctPosition !== (zoneIndex! + 1) ? 'border-red-400 bg-red-50' : ''}
      `}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Image */}
        {item.image && (
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.text}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Text */}
        <div className="text-center">
          <span className="text-gray-800 font-medium text-sm leading-relaxed">
            {item.text}
          </span>
        </div>
        
        {/* Drag Handle */}
        {!isSubmitted && (
          <div className="absolute top-2 right-2 text-gray-400">
            <GripVertical className="h-4 w-4" />
          </div>
        )}
        
        {/* Status Icon */}
        {isSubmitted && isInDropZone && (
          <div className="absolute top-2 left-2">
            {item.correctPosition === (zoneIndex! + 1) ? 
              <CheckCircle className="h-5 w-5 text-green-600" /> :
              <XCircle className="h-5 w-5 text-red-600" />
            }
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ArrowUpDown className="h-5 w-5 text-blue-600" />
          </div>
          {content.title || 'Sorting Activity'}
        </CardTitle>
        {content.instructions && (
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">{content.instructions}</p>
        )}
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Drag cards from the stack below to arrange them in the correct order
          </p>
        </div>

        {/* Drop Zones */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 text-center">Drop Zone - Arrange in Correct Order</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {dropZones.map((item, index) => (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropToZone(e, index)}
                className={`
                  relative border-2 border-dashed border-gray-300 rounded-2xl
                  min-h-[120px] w-full max-w-[280px] flex items-center justify-center
                  transition-all duration-200
                  ${draggedItem ? 'border-blue-400 bg-blue-50' : 'hover:border-gray-400'}
                `}
              >
                {item ? (
                  renderSortingCard(item, true, index)
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-gray-500">{index + 1}</span>
                    </div>
                    <p className="text-sm">Drop here</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards Stack - Queue Layout */}
        {sortedItems.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 text-center">Available Cards</h3>
            <div 
              className="relative min-h-[160px] flex items-center justify-center"
              onDragOver={handleDragOver}
              onDrop={handleDropBackToStack}
            >
              {/* Queue/Stack Container */}
              <div className="relative flex items-center justify-center w-full max-w-[400px] h-[140px]">
                {sortedItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="absolute"
                    style={{
                      zIndex: sortedItems.length - index,
                      left: `${index * 12}px`,
                      top: `${index * 8}px`,
                      transform: `rotate(${index * 2 - sortedItems.length}deg)`,
                    }}
                  >
                    <div className="transform transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-50">
                      {renderSortingCard(item)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          {!isSubmitted ? (
            <>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-xl"
                size="lg"
              >
                Submit
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="px-8 py-4 text-lg font-medium rounded-xl border-2"
                size="lg"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </>
          ) : (
            <div className="flex gap-4 w-full">
              {content.allowRetry !== false && !isCorrect && (
                <Button 
                  onClick={handleTryAgain} 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg font-medium rounded-xl border-2"
                >
                  Try Again
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleReset}
                size="lg"
                className="px-8 py-4 text-lg font-medium rounded-xl border-2"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <Card className={`border-2 rounded-2xl ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {isCorrect ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-xl mb-3 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className={`text-base mb-4 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 
                      (content.correctFeedback || 'Excellent! You arranged the cards in the correct order.') :
                      (content.incorrectFeedback || 'Not quite right. Review the cards and try again.')
                    }
                  </p>
                  
                  {/* Show correct order for incorrect attempts */}
                  {!isCorrect && content.showCorrectOrder !== false && (
                    <div className="mt-5 p-4 bg-white rounded-xl border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Correct Order:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[...content.items]
                          .sort((a, b) => a.correctPosition - b.correctPosition)
                          .map((item, index) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                                {index + 1}
                              </span>
                              {item.image && (
                                <div className="w-8 h-8 rounded overflow-hidden bg-gray-100">
                                  <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <span className="text-sm font-medium text-gray-700">{item.text}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Attempts counter */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 font-medium">
                  Attempts: {attempts}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
