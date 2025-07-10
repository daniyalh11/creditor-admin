import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const bloomsLevels = [
  'Remember',
  'Understand',
  'Apply',
  'Analyze',
  'Evaluate',
  'Create'
];

export const BloomsTaxonomySection = ({
  selectedLevels,
  onLevelsChange
}) => {
  const handleBloomsChange = (level, checked) => {
    if (checked) {
      onLevelsChange([...selectedLevels, level]);
    } else {
      onLevelsChange(selectedLevels.filter(l => l !== level));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bloom's Taxonomy Levels</CardTitle>
        <p className="text-sm text-gray-600">Select the cognitive levels this course will target</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {bloomsLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level}
                checked={selectedLevels.includes(level)}
                onCheckedChange={(checked) => handleBloomsChange(level, checked)}
              />
              <Label htmlFor={level} className="text-sm font-medium cursor-pointer">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};