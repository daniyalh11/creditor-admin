import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { MinimalInstructionTitleEditor } from './MinimalInstructionTitleEditor';
import { SimpleInstructionInput } from './SimpleInstructionInput';

export const InstructionForm = ({
  instructionTitle,
  setInstructionTitle,
  instructionPoints,
  setInstructionPoints,
  backgroundColor,
  setBackgroundColor,
  editingInstruction,
  onAdd,
  onCancel
}) => {
  const addPoint = () => {
    // Auto-sync with instruction title if it exists and this is the first point
    const newPoint = instructionPoints.length === 1 && !instructionPoints[0].trim() && instructionTitle.trim() 
      ? instructionTitle 
      : '';
    setInstructionPoints([...instructionPoints, newPoint]);
  };

  const removePoint = (index) => {
    if (instructionPoints.length > 1) {
      setInstructionPoints(instructionPoints.filter((_, i) => i !== index));
    }
  };

  const updatePoint = (index, value) => {
    const newPoints = [...instructionPoints];
    newPoints[index] = value;
    setInstructionPoints(newPoints);
  };

  return (
    <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 sm:p-6 bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {editingInstruction ? 'Edit Instruction Block' : 'Add Instruction Block'}
      </h3>
      
      <div className="space-y-6">
        {/* Instruction Title with Minimal Editor */}
        <div>
          <Label htmlFor="instructionTitle" className="text-base font-medium text-gray-900 mb-2 block">
            Instruction Title
          </Label>
          <MinimalInstructionTitleEditor
            value={instructionTitle}
            onChange={setInstructionTitle}
          />
        </div>

        {/* Instruction Points with Simple Inputs */}
        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">
            Instruction Points
          </Label>
          <div className="space-y-4">
            {instructionPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-gray-500 font-medium min-w-[24px] mt-3 text-sm">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <SimpleInstructionInput
                    value={point}
                    onChange={(value) => updatePoint(index, value)}
                    index={index}
                  />
                </div>
                {instructionPoints.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePoint(index)}
                    className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 flex-shrink-0 mt-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPoint}
            className="mt-3 text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Instruction Point
          </Button>
        </div>

        {/* Background Color */}
        <div>
          <Label className="text-base font-medium text-gray-900 mb-2 block">
            Background Color
          </Label>
          <Select value={backgroundColor} onValueChange={setBackgroundColor}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Blue">Blue</SelectItem>
              <SelectItem value="Green">Green</SelectItem>
              <SelectItem value="Yellow">Yellow</SelectItem>
              <SelectItem value="Red">Red</SelectItem>
              <SelectItem value="Purple">Purple</SelectItem>
              <SelectItem value="Orange">Orange</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
          <Button 
            variant="outline"
            onClick={onCancel}
            className="text-gray-600 border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            disabled={!instructionTitle.trim() || instructionPoints.every(point => !point.trim())}
          >
            {editingInstruction ? 'Update Instruction' : 'Save Instruction'}
          </Button>
        </div>
      </div>
    </div>
  );
};