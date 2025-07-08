
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddSurveyModalProps {
  onSurveyCreated?: (survey: any) => void;
}

export const AddSurveyModal: React.FC<AddSurveyModalProps> = ({ onSurveyCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'Active' as 'Active' | 'Closed'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.assignedTo.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSurvey = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        assignedTo: formData.assignedTo,
        status: formData.status,
        createdAt: new Date(),
        responseCount: 0,
        thumbnail: '/lovable-uploads/926858f6-3201-44d2-80fa-8bbc21bd5a72.png'
      };

      console.log('New survey created:', newSurvey);
      
      if (onSurveyCreated) {
        onSurveyCreated(newSurvey);
      }

      toast({
        title: "Survey Created",
        description: `"${formData.title}" has been created successfully`,
      });

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        status: 'Active'
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating survey:', error);
      toast({
        title: "Error",
        description: "Failed to create survey. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Survey
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Create New Survey
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Survey Title *</Label>
            <Input
              id="title"
              placeholder="Enter survey title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and content of this survey..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assign To *</Label>
            <Select 
              value={formData.assignedTo} 
              onValueChange={(value) => handleInputChange('assignedTo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select who this survey is for..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Employees">All Employees</SelectItem>
                <SelectItem value="Customer Service Team">Customer Service Team</SelectItem>
                <SelectItem value="Sales Team">Sales Team</SelectItem>
                <SelectItem value="Marketing Team">Marketing Team</SelectItem>
                <SelectItem value="IT Department">IT Department</SelectItem>
                <SelectItem value="HR Department">HR Department</SelectItem>
                <SelectItem value="Training Participants">Training Participants</SelectItem>
                <SelectItem value="New Hires">New Hires</SelectItem>
                <SelectItem value="Managers">Managers</SelectItem>
                <SelectItem value="Senior Leadership">Senior Leadership</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'Active' | 'Closed') => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Survey'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
