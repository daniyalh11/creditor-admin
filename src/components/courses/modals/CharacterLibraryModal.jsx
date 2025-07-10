import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Available character avatars - these are full-body transparent PNGs
const CHARACTERS = [
  // Newly added characters at the top
  {
    id: 'business-woman-glasses-new',
    name: 'Business Woman',
    url: '/lovable-uploads/3dfe0883-8aec-47eb-b199-f69148c0d059.png'
  },
  {
    id: 'casual-man-new',
    name: 'Casual Man',
    url: '/lovable-uploads/bcbf5334-51c4-4fce-8a07-0d62a475b0b4.png'
  },
  {
    id: 'teacher-new',
    name: 'Teacher',
    url: '/lovable-uploads/5848caf1-b8a9-4f1e-bd57-404952fa2ad9.png'
  },
  // Original characters
  {
    id: 'business-woman-glasses',
    name: 'Business Woman',
    url: '/lovable-uploads/a438d24c-d0d0-4265-a8b1-68b6793fadab.png'
  },
  {
    id: 'casual-man-orange',
    name: 'Casual Man',
    url: '/lovable-uploads/541bad34-26a5-4da7-ae53-44d3167de157.png'
  },
  {
    id: 'teacher-blonde',
    name: 'Teacher',
    url: '/lovable-uploads/ad5d18e1-e876-41b4-b9d4-e2cb4ed9ae20.png'
  },
  {
    id: 'business-woman-2',
    name: 'Business Woman',
    url: '/lovable-uploads/01fb7d9f-38e0-40ac-ac46-1445cd11b54f.png'
  },
  {
    id: 'business-woman-3',
    name: 'Business Woman',
    url: '/lovable-uploads/a65ad768-684f-423e-963d-21993987d929.png'
  },
  {
    id: 'casual-man-2',
    name: 'Casual Man',
    url: '/lovable-uploads/916f832c-a970-4160-9d5f-4aef09057aab.png'
  },
  {
    id: 'casual-man-3',
    name: 'Casual Man',
    url: '/lovable-uploads/e843a4e4-66a5-41a2-bd03-16440d081d82.png'
  },
  {
    id: 'teacher-2',
    name: 'Teacher',
    url: '/lovable-uploads/91248f2f-ccb9-4719-9547-658ff3bec29e.png'
  },
  {
    id: 'teacher-3',
    name: 'Teacher',
    url: '/lovable-uploads/828ed819-0e0c-4550-b951-b9cd2af4b53b.png'
  },
  {
    id: 'doctor',
    name: 'Doctor',
    url: '/lovable-uploads/ee8299a5-0df9-4a94-a29d-062b3cfce40d.png'
  },
  {
    id: 'engineer',
    name: 'Engineer',
    url: '/lovable-uploads/ee8299a5-0df9-4a94-a29d-062b3cfce40d.png'
  },
  {
    id: 'student',
    name: 'Student',
    url: '/lovable-uploads/ee8299a5-0df9-4a94-a29d-062b3cfce40d.png'
  }
];

export const CharacterLibraryModal = ({
  open,
  onOpenChange,
  onSelectCharacter
}) => {
  const handleSelectCharacter = (characterUrl) => {
    onSelectCharacter(characterUrl);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Choose a Character</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full p-4">
          <div className="grid grid-cols-3 gap-6">
            {CHARACTERS.map((character) => (
              <div
                key={character.id}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => handleSelectCharacter(character.url)}
              >
                <div className="w-32 h-48 mb-3 flex items-end justify-center bg-gradient-to-t from-gray-100 to-transparent rounded-lg overflow-hidden">
                  <img
                    src={character.url}
                    alt={character.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-sm font-medium text-center text-gray-800">
                  {character.name}
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectCharacter(character.url);
                  }}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};