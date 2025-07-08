
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

interface SavedInstruction {
  id: string;
  title: string;
  points: string[];
  backgroundColor: string;
}

interface SavedInstructionCardProps {
  instruction: SavedInstruction;
  onEdit: (instruction: SavedInstruction) => void;
  onDelete: (id: string) => void;
  getBackgroundColorValue: (color: string) => string;
}

export const SavedInstructionCard: React.FC<SavedInstructionCardProps> = ({
  instruction,
  onEdit,
  onDelete,
  getBackgroundColorValue
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900">{instruction.title}</h4>
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getBackgroundColorValue(instruction.backgroundColor) }}
            />
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            {instruction.points.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="font-medium min-w-[20px]">{index + 1}.</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(instruction)}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(instruction.id)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
