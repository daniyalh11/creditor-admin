import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardList, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const AddRubricModal = ({
  open,
  onOpenChange,
  onRubricAdded
}) => {
  const [rubricTitle, setRubricTitle] = useState('');
  const [criteria, setCriteria] = useState([
    { id: 1, name: '', description: '', scoringScale: '1-5' }
  ]);

  const addCriterion = () => {
    const newCriterion = {
      id: Date.now(),
      name: '',
      description: '',
      scoringScale: '1-5'
    };
    setCriteria([...criteria, newCriterion]);
  };

  const removeCriterion = (id) => {
    if (criteria.length > 1) {
      setCriteria(criteria.filter(c => c.id !== id));
    }
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSave = () => {
    if (!rubricTitle.trim()) {
      toast.error("Please enter a rubric title");
      return;
    }

    const validCriteria = criteria.filter(c => c.name.trim() && c.description.trim());
    if (validCriteria.length === 0) {
      toast.error("Please add at least one complete criterion");
      return;
    }

    const newRubric = {
      id: Date.now(),
      type: 'rubric',
      title: rubricTitle.trim(),
      criteria: validCriteria,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onRubricAdded(newRubric);
    toast.success(`Rubric "${newRubric.title}" created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setRubricTitle('');
    setCriteria([{ id: 1, name: '', description: '', scoringScale: '1-5' }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-purple-600" />
            Create Rubric
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rubric-title">Rubric Title *</Label>
            <Input
              id="rubric-title"
              placeholder="Enter rubric title"
              value={rubricTitle}
              onChange={(e) => setRubricTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Criteria</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addCriterion}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Criterion
              </Button>
            </div>
            
            {criteria.map((criterion, index) => (
              <div key={criterion.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Criterion {index + 1}</h4>
                  {criteria.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCriterion(criterion.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Criterion Name</Label>
                    <Input
                      placeholder="e.g., Content Quality"
                      value={criterion.name}
                      onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Scoring Scale</Label>
                    <Select 
                      value={criterion.scoringScale} 
                      onValueChange={(value) => updateCriterion(criterion.id, 'scoringScale', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 Scale</SelectItem>
                        <SelectItem value="1-4">1-4 Scale</SelectItem>
                        <SelectItem value="1-3">1-3 Scale</SelectItem>
                        <SelectItem value="pass-fail">Pass/Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe what this criterion evaluates..."
                    value={criterion.description}
                    onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!rubricTitle.trim()}
          >
            Save Rubric
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};