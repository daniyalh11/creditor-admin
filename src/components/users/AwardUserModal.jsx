import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useUserFilter } from '@/contexts/UserFilterContext';

export const AwardUserModal = ({
  users,
  open,
  onOpenChange,
  onAwardGiven,
}) => {
  const { addAwardToUsers } = useUserFilter();
  const [awardData, setAwardData] = useState({
    title: '',
    description: '',
    type: 'achievement',
    icon: '🏆'
  });

  const awardTypes = [
    { value: 'achievement', label: 'Achievement', icon: '🏆' },
    { value: 'completion', label: 'Course Completion', icon: '🎓' },
    { value: 'excellence', label: 'Excellence', icon: '⭐' },
    { value: 'participation', label: 'Perfect Attendance', icon: '🎯' },
    { value: 'performance', label: 'Top Performer', icon: '🥇' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!awardData.title.trim()) {
      toast({
        title: "Award title required",
        description: "Please enter an award title.",
        variant: "destructive"
      });
      return;
    }

    const award = {
      id: Date.now().toString(),
      title: awardData.title,
      description: awardData.description,
      type: awardData.type,
      icon: awardData.icon,
      date: new Date().toISOString().split('T')[0],
      recipients: users.map(u => u.id)
    };

    // Add award to the selected users
    addAwardToUsers(users.map(u => u.id), award);
    
    onAwardGiven(award);

    toast({
      title: "Award given successfully",
      description: `"${awardData.title}" award given to ${users.length} user(s).`
    });

    setAwardData({
      title: '',
      description: '',
      type: 'achievement',
      icon: '🏆'
    });
    onOpenChange(false);
  };

  const handleTypeChange = (type) => {
    const selectedType = awardTypes.find(t => t.value === type);
    setAwardData(prev => ({
      ...prev,
      type,
      icon: selectedType?.icon || '🏆'
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Give Award {users.length > 1 ? `(${users.length} users)` : ''}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Recipients:</p>
          <div className="bg-gray-50 p-3 rounded max-h-24 overflow-y-auto">
            {users.map(user => (
              <div key={user.id} className="text-sm py-1">
                • {user.name}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Award Type</Label>
            <Select value={awardData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select award type" />
              </SelectTrigger>
              <SelectContent>
                {awardTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Award Title</Label>
            <Input
              id="title"
              value={awardData.title}
              onChange={(e) => setAwardData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Outstanding Performance"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={awardData.description}
              onChange={(e) => setAwardData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add a description for this award..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-3 rounded text-sm">
            <p className="text-blue-800">
              <span className="text-lg mr-2">{awardData.icon}</span>
              Preview: "{awardData.title || 'Award Title'}" will be added to the selected users' profiles.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Give Award</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};