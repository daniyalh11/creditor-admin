import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * A section for editing the core details of a course, like price and level.
 *
 * @param {object} props
 * @param {object} props.formData - The current state of the form fields.
 * @param {string} props.formData.price - The price of the course.
 * @param {string} props.formData.level - The difficulty level of the course.
 * @param {string} props.formData.maxStudents - The maximum number of students allowed.
 * @param {string} props.formData.estimatedDuration - The estimated time to complete the course.
 * @param {(field: string, value: string) => void} props.onInputChange - Callback function to update the form data.
 */
export const CourseDetailsSection = ({
  formData,
  onInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Course Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => onInputChange('price', e.target.value)}
                placeholder="29.99"
                className="pl-8"
              />
            </div>
            <p className="text-xs text-gray-500">Set to 0 for free courses (optional)</p>
          </div>

          <div className="space-y-2">
            <Label>Course Level</Label>
            <Select value={formData.level} onValueChange={(value) => onInputChange('level', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Maximum Students</Label>
            <div className="relative">
              <Input
                id="maxStudents"
                type="number"
                min="1"
                value={formData.maxStudents}
                onChange={(e) => onInputChange('maxStudents', e.target.value)}
                placeholder="100"
              />
            </div>
            <p className="text-xs text-gray-500">Leave empty for unlimited</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Estimated Duration</Label>
          <Input
            id="duration"
            value={formData.estimatedDuration}
            onChange={(e) => onInputChange('estimatedDuration', e.target.value)}
            placeholder="e.g., 4 weeks, 10 hours, 3 months"
          />
          <p className="text-sm text-gray-600">How long will it take students to complete this course?</p>
        </div>
      </CardContent>
    </Card>
  );
};