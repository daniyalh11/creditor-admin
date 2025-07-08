
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Target, Award, TrendingUp } from 'lucide-react';

interface AddMasteryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (masteryData: {
    title: string;
    description: string;
    type: 'skill' | 'competency' | 'objective';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    requiredScore: number;
  }) => void;
}

export const AddMasteryModal: React.FC<AddMasteryModalProps> = ({
  open,
  onOpenChange,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as 'skill' | 'competency' | 'objective' | '',
    level: '' as 'Beginner' | 'Intermediate' | 'Advanced' | '',
    requiredScore: 80
  });

  const masteryTypes = [
    {
      value: 'skill',
      label: 'Skill',
      description: 'A specific ability or technique students need to develop',
      icon: Target
    },
    {
      value: 'competency',
      label: 'Competency',
      description: 'A broader professional capability or expertise area',
      icon: Award
    },
    {
      value: 'objective',
      label: 'Objective',
      description: 'A specific learning goal with measurable outcomes',
      icon: TrendingUp
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.type && formData.level) {
      onAdd({
        title: formData.title,
        description: formData.description,
        type: formData.type as 'skill' | 'competency' | 'objective',
        level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
        requiredScore: formData.requiredScore
      });
      setFormData({
        title: '',
        description: '',
        type: '',
        level: '',
        requiredScore: 80
      });
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      type: '',
      level: '',
      requiredScore: 80
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 md:px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg md:text-xl font-semibold">Add Mastery Item</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
              <Input
                id="title"
                placeholder="Enter mastery item title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what students need to master..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Mastery Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mastery Type *</Label>
              <div className="grid grid-cols-1 gap-3">
                {masteryTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.value}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.type === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, type: type.value as any })}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          formData.type === type.value ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{type.label}</h4>
                          <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Difficulty Level *</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value as any })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Required Score */}
            <div className="space-y-2">
              <Label htmlFor="requiredScore" className="text-sm font-medium">Required Score (%)</Label>
              <Input
                id="requiredScore"
                type="number"
                min="0"
                max="100"
                value={formData.requiredScore}
                onChange={(e) => setFormData({ ...formData, requiredScore: parseInt(e.target.value) || 80 })}
              />
              <p className="text-xs text-gray-500">Minimum score students need to achieve mastery</p>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-3 p-4 md:p-6 border-t bg-white flex-shrink-0">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!formData.title || !formData.type || !formData.level}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Mastery Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
