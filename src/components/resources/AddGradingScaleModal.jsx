import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BarChart3, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const AddGradingScaleModal = ({
  open,
  onOpenChange,
  onScaleAdded
}) => {
  const [scaleTitle, setScaleTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gradeRanges, setGradeRanges] = useState([
    { id: 1, grade: 'A+', minScore: 97, maxScore: 100 },
    { id: 2, grade: 'A', minScore: 93, maxScore: 96 },
    { id: 3, grade: 'A-', minScore: 90, maxScore: 92 },
    { id: 4, grade: 'B+', minScore: 87, maxScore: 89 },
    { id: 5, grade: 'B', minScore: 83, maxScore: 86 },
    { id: 6, grade: 'B-', minScore: 80, maxScore: 82 },
    { id: 7, grade: 'C+', minScore: 77, maxScore: 79 },
    { id: 8, grade: 'C', minScore: 73, maxScore: 76 },
    { id: 9, grade: 'C-', minScore: 70, maxScore: 72 },
    { id: 10, grade: 'D', minScore: 60, maxScore: 69 },
    { id: 11, grade: 'F', minScore: 0, maxScore: 59 }
  ]);

  const addGradeRange = () => {
    const newId = Math.max(...gradeRanges.map(r => r.id)) + 1;
    setGradeRanges([...gradeRanges, { id: newId, grade: '', minScore: 0, maxScore: 0 }]);
  };

  const removeGradeRange = (id) => {
    setGradeRanges(gradeRanges.filter(range => range.id !== id));
  };

  const updateGradeRange = (id, field, value) => {
    setGradeRanges(gradeRanges.map(range => 
      range.id === id ? { ...range, [field]: value } : range
    ));
  };

  const handleSave = () => {
    if (!scaleTitle.trim()) {
      toast.error("Please enter a scale title");
      return;
    }

    if (gradeRanges.some(range => !range.grade.trim())) {
      toast.error("Please fill in all grade names");
      return;
    }

    const newScale = {
      id: Date.now(),
      type: 'grading-scale',
      title: scaleTitle.trim(),
      description: description.trim() || undefined,
      gradeRanges: gradeRanges.map(range => ({
        grade: range.grade,
        minScore: range.minScore,
        maxScore: range.maxScore
      })),
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onScaleAdded(newScale);
    toast.success(`Grading scale "${newScale.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setScaleTitle('');
    setDescription('');
    setGradeRanges([
      { id: 1, grade: 'A+', minScore: 97, maxScore: 100 },
      { id: 2, grade: 'A', minScore: 93, maxScore: 96 },
      { id: 3, grade: 'A-', minScore: 90, maxScore: 92 },
      { id: 4, grade: 'B+', minScore: 87, maxScore: 89 },
      { id: 5, grade: 'B', minScore: 83, maxScore: 86 },
      { id: 6, grade: 'B-', minScore: 80, maxScore: 82 },
      { id: 7, grade: 'C+', minScore: 77, maxScore: 79 },
      { id: 8, grade: 'C', minScore: 73, maxScore: 76 },
      { id: 9, grade: 'C-', minScore: 70, maxScore: 72 },
      { id: 10, grade: 'D', minScore: 60, maxScore: 69 },
      { id: 11, grade: 'F', minScore: 0, maxScore: 59 }
    ]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            Add Grading Scale
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scale-title">Scale Title *</Label>
            <Input
              id="scale-title"
              placeholder="Enter grading scale title"
              value={scaleTitle}
              onChange={(e) => setScaleTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Define Grade Ranges *</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-3">
              {gradeRanges.map((range) => (
                <div key={range.id} className="grid grid-cols-4 gap-2 items-center">
                  <Input
                    placeholder="Grade"
                    value={range.grade}
                    onChange={(e) => updateGradeRange(range.id, 'grade', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Min"
                    value={range.minScore}
                    onChange={(e) => updateGradeRange(range.id, 'minScore', parseInt(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={range.maxScore}
                    onChange={(e) => updateGradeRange(range.id, 'maxScore', parseInt(e.target.value) || 0)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGradeRange(range.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addGradeRange}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Grade Range
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scale-description">Description (Optional)</Label>
            <Textarea
              id="scale-description"
              placeholder="Describe when and how this grading scale should be used..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!scaleTitle.trim()}
          >
            Save Grading Scale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};