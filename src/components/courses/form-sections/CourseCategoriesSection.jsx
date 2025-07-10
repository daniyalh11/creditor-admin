import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const availableCategories = [
  'General',
  'Finance',
  'SOVEREIGNTY 101',
  'Legal Studies',
  'Personal Development',
  'Professional Skills'
];

export const CourseCategoriesSection = ({
  selectedCategories,
  onCategoriesChange
}) => {
  const handleCategoryChange = (category, checked) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, category]);
    } else {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked)}
              />
              <Label htmlFor={category} className="text-sm font-medium cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
        
        {selectedCategories.length === 0 && (
          <p className="text-sm text-red-600">Please select at least one category</p>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add new category
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};