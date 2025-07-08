
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { InstructionsBuilderHeader } from './InstructionsBuilderHeader';
import { SavedInstructionCard } from './SavedInstructionCard';
import { InstructionForm } from './InstructionForm';
import { InstructionPreviewModal } from './InstructionPreviewModal';

interface InstructionsBuilderProps {
  onBack: () => void;
  onContinue: () => void;
  instructions: string;
  onInstructionsChange: (instructions: string) => void;
  onSavedInstructionsUpdate?: (savedInstructions: any[]) => void;
}

interface SavedInstruction {
  id: string;
  title: string;
  points: string[];
  backgroundColor: string;
}

export const InstructionsBuilder: React.FC<InstructionsBuilderProps> = ({
  onBack,
  onContinue,
  instructions,
  onInstructionsChange,
  onSavedInstructionsUpdate
}) => {
  const [instructionTitle, setInstructionTitle] = useState('');
  const [instructionPoints, setInstructionPoints] = useState(['']);
  const [backgroundColor, setBackgroundColor] = useState('Blue');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedInstructions, setSavedInstructions] = useState<SavedInstruction[]>([]);
  const [editingInstruction, setEditingInstruction] = useState<string | null>(null);

  const handleAddInstruction = () => {
    if (editingInstruction) {
      // Update existing instruction
      const updatedInstructions = savedInstructions.map(inst => 
        inst.id === editingInstruction 
          ? { ...inst, title: instructionTitle, points: instructionPoints.filter(p => p.trim()), backgroundColor }
          : inst
      );
      setSavedInstructions(updatedInstructions);
      if (onSavedInstructionsUpdate) {
        onSavedInstructionsUpdate(updatedInstructions);
      }
      setEditingInstruction(null);
    } else {
      // Add new instruction
      const newInstruction: SavedInstruction = {
        id: Date.now().toString(),
        title: instructionTitle,
        points: instructionPoints.filter(point => point.trim()),
        backgroundColor
      };
      const updatedInstructions = [...savedInstructions, newInstruction];
      setSavedInstructions(updatedInstructions);
      if (onSavedInstructionsUpdate) {
        onSavedInstructionsUpdate(updatedInstructions);
      }
    }
    
    handleCancel();
    console.log('Instruction saved');
  };

  const handleCancel = () => {
    setInstructionTitle('');
    setInstructionPoints(['']);
    setBackgroundColor('Blue');
    setShowAddForm(false);
    setEditingInstruction(null);
  };

  const handleAddInstructionClick = () => {
    setShowAddForm(true);
  };

  const handleEditInstruction = (instruction: SavedInstruction) => {
    setInstructionTitle(instruction.title);
    setInstructionPoints(instruction.points.length > 0 ? instruction.points : ['']);
    setBackgroundColor(instruction.backgroundColor);
    setEditingInstruction(instruction.id);
    setShowAddForm(true);
  };

  const handleDeleteInstruction = (id: string) => {
    const updatedInstructions = savedInstructions.filter(inst => inst.id !== id);
    setSavedInstructions(updatedInstructions);
    if (onSavedInstructionsUpdate) {
      onSavedInstructionsUpdate(updatedInstructions);
    }
  };

  const handleSaveChanges = () => {
    console.log('Changes saved');
    setShowPreview(false);
  };

  const getBackgroundColorValue = (color: string) => {
    switch (color) {
      case 'Blue':
        return '#3b82f6';
      case 'Green':
        return '#10b981';
      case 'Yellow':
        return '#f59e0b';
      case 'Red':
        return '#ef4444';
      case 'Purple':
        return '#8b5cf6';
      case 'Orange':
        return '#f97316';
      case 'Neutral':
        return '#6b7280';
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <InstructionsBuilderHeader
        onBack={onBack}
        onPreview={() => setShowPreview(true)}
        hasInstructions={savedInstructions.length > 0}
      />

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Saved Instructions */}
            {savedInstructions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Assessment Instructions</h3>
                {savedInstructions.map((instruction) => (
                  <SavedInstructionCard
                    key={instruction.id}
                    instruction={instruction}
                    onEdit={handleEditInstruction}
                    onDelete={handleDeleteInstruction}
                    getBackgroundColorValue={getBackgroundColorValue}
                  />
                ))}
              </div>
            )}

            {/* Placeholder when no instructions exist */}
            {savedInstructions.length === 0 && !showAddForm && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Instructions</h3>
                <p className="text-gray-600 mb-6">Click the button below to begin adding assessment instructions.</p>
              </div>
            )}

            {/* Centered Add Instruction Button - Only show when form is not open */}
            {!showAddForm && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleAddInstructionClick}
                  className="text-gray-600 border-gray-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Additional Instruction Block
                </Button>
              </div>
            )}

            {/* Add New Instruction Form - Only show when add button is clicked */}
            {showAddForm && (
              <InstructionForm
                instructionTitle={instructionTitle}
                setInstructionTitle={setInstructionTitle}
                instructionPoints={instructionPoints}
                setInstructionPoints={setInstructionPoints}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                editingInstruction={editingInstruction}
                onAdd={handleAddInstruction}
                onCancel={handleCancel}
              />
            )}

            {/* Centered Continue Button */}
            <div className="flex justify-center pt-4">
              <Button 
                onClick={onContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={savedInstructions.length === 0}
              >
                Continue to Questions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <InstructionPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onSaveChanges={handleSaveChanges}
        instructionTitle={savedInstructions.length > 0 ? savedInstructions[0].title : ''}
        instructionPoints={savedInstructions.length > 0 ? savedInstructions[0].points : []}
        backgroundColor={savedInstructions.length > 0 ? savedInstructions[0].backgroundColor : 'Blue'}
        getBackgroundColorValue={getBackgroundColorValue}
      />
    </div>
  );
};
