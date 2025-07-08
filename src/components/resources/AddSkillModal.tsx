
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface AddSkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillAdded: (skill: any) => void;
}

const skillCategories = [
  'Technical Skills',
  'Soft Skills',
  'Leadership',
  'Communication',
  'Problem Solving',
  'Creative',
  'Analytical',
  'Management',
  'Other'
];

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  open,
  onOpenChange,
  onSkillAdded
}) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!skillName.trim()) {
      toast.error("Please enter a skill name");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    const newSkill = {
      id: Date.now(),
      type: 'skills',
      title: skillName.trim(),
      category: category,
      description: description.trim() || undefined,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onSkillAdded(newSkill);
    toast.success(`Skill "${newSkill.title}" added successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setSkillName('');
    setCategory('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            Add Skill
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Skill Name *</Label>
            <Input
              id="skill-name"
              placeholder="Enter skill name (e.g., JavaScript, Leadership, Public Speaking)"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skill-category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill category" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skill-description">Description (Optional)</Label>
            <Textarea
              id="skill-description"
              placeholder="Describe this skill and what competencies it includes..."
              rows={4}
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
            disabled={!skillName.trim() || !category}
          >
            Add Skill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
