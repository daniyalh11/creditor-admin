
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AssignmentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentData: any;
  onUpdate: (data: any) => void;
}

export const AssignmentEditModal: React.FC<AssignmentEditModalProps> = ({ 
  isOpen, 
  onClose, 
  assignmentData, 
  onUpdate 
}) => {
  const [formData, setFormData] = React.useState(assignmentData);

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Assignment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <Textarea
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
              <Input
                type="number"
                value={formData.timeLimit}
                onChange={(e) => setFormData({...formData, timeLimit: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Word Limit</label>
              <Input
                type="number"
                value={formData.wordLimit}
                onChange={(e) => setFormData({...formData, wordLimit: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Score</label>
              <Input
                type="number"
                value={formData.maxScore}
                onChange={(e) => setFormData({...formData, maxScore: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">
            Update Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
