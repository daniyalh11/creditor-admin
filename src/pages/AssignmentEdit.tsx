
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const AssignmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock assignment data - in a real app, you would fetch this based on the ID
  const [formData, setFormData] = useState({
    title: "Credit Risk Analysis",
    description: "Analyze credit risk factors for a sample financial institution and provide recommendations.",
    dueDate: "2025-05-01",
    totalPoints: "100",
    groups: "Credit Analysis A, Credit Analysis B"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Updated assignment data:", formData);
    toast({
      title: "Assignment updated",
      description: "The assignment has been updated successfully."
    });
    navigate(`/assignments/view/${id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(`/assignments/view/${id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Edit Assignment</h1>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPoints">Total Points</Label>
                <Input
                  id="totalPoints"
                  name="totalPoints"
                  type="number"
                  value={formData.totalPoints}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="groups">Assigned Groups</Label>
              <Input
                id="groups"
                name="groups"
                value={formData.groups}
                onChange={handleChange}
                placeholder="Enter group names separated by commas"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentEdit;
