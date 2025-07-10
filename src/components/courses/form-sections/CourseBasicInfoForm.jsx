import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LearningObjectivesManager } from './LearningObjectivesManager';

export const CourseBasicInfoForm = ({
  formData,
  onInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Course Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Describe what students will learn in this course"
            rows={4}
            required
          />
        </div>

        <LearningObjectivesManager
          objectives={formData.learningObjectives}
          onObjectivesChange={(objectives) => onInputChange('learningObjectives', objectives)}
        />
      </CardContent>
    </Card>
  );
};