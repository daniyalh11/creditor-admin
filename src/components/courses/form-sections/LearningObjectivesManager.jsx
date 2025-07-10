import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

export const LearningObjectivesManager = ({
  objectives,
  onObjectivesChange
}) => {
  const addLearningObjective = () => {
    onObjectivesChange([...objectives, '']);
  };

  const removeLearningObjective = (index) => {
    onObjectivesChange(objectives.filter((_, i) => i !== index));
  };

  const updateLearningObjective = (index, value) => {
    onObjectivesChange(objectives.map((obj, i) => i === index ? value : obj));
  };

  return (
    <div className="space-y-4">
      <Label>Learning Objectives</Label>
      <p className="text-sm text-gray-600">Define what students will be able to do after completing this course</p>
      
      {objectives.map((objective, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={objective}
            onChange={(e) => updateLearningObjective(index, e.target.value)}
            placeholder={`Learning objective ${index + 1}`}
            className="flex-1"
          />
          {objectives.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeLearningObjective(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addLearningObjective}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Learning Objective
      </Button>
    </div>
  );
};